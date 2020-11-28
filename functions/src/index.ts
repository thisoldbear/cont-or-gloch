import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
const Twitter = require('twitter');
const serviceAccount = require("./serviceAccount.json");
const twitterKeys = require("./twitterKeys.json");

admin.initializeApp(serviceAccount);

const client = new Twitter(twitterKeys);

const now = new Date();

// ["9", "am"]
const [hours, ] = now.toLocaleString('en-GB', { timeZone: 'Europe/London', hour: 'numeric', hour12: true }).split(" ");

exports.tweet = functions.pubsub.schedule('1 * * * *').onRun(() => {
  client.post('statuses/update', { status: `${Array(parseInt(hours)).fill("CONT").join(" ")}` }, (error: unknown, tweet: unknown, response: unknown) => {
    if (error) throw error;
  });

  return 0; // Return any value for Firebase functions
});
