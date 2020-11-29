import * as functions from "firebase-functions";
const { log } = require("firebase-functions/lib/logger");
const admin = require("firebase-admin");
const Twitter = require("twitter");
const serviceAccount = require("./serviceAccount.json");
const twitterKeys = require("./twitterKeys.json");

admin.initializeApp(serviceAccount);

const client = new Twitter(twitterKeys);

const now = new Date();

// ["9", "am"]
const [hours] = now
  .toLocaleString("en-GB", {
    timeZone: "Europe/London",
    hour: "numeric",
    hour12: true,
  })
  .split(" ");

interface Tweet {
  text: string;
  id_str: string;
}

exports.tweet = functions.pubsub.schedule("1 * * * *").onRun(() => {
  /**
   * In order to avoid the Twitter API throwing a 187 error:
   * (The status text has already been Tweeted by the authenticated account)
   *  https://developer.twitter.com/en/support/twitter-api/error-troubleshooting
   *
   * We need to
   * - Get the latest tweets
   * - Find the tweet with the same text as the new status,
   * - Remove the former
   * - Tweet the new status
   */

  // Get the latest tweets
  client.get(
    "/statuses/user_timeline",
    { screen_name: "cont_or_gloch", count: 12 },
    (error: unknown, tweets: Tweet[]) => {
      // Const new status
      const status = Array(parseInt(hours)).fill("CONT").join(" ");

      // Find the latest tweet that matches the status
      const tweet = tweets.find((t) => t.text === status);

      // If there is not a matching tweet
      if (!tweet) {
        log("No matching tweet");
        client.post("statuses/update", { status }, (updateError: unknown) => {
          if (updateError) {
            log(updateError);
            throw updateError;
          }
        });
      } else {
        log(`Found matching tweet: ${tweet.id_str}`);

        //Delete the existing tweet first
        client.post(
          `statuses/destroy/${tweet.id_str}`,
          (destroyError: unknown) => {
            if (destroyError) {
              log(destroyError);
              throw destroyError;
            }

            // Post a new tweet
            client.post(
              "statuses/update",
              { status },
              (updateError: unknown) => {
                if (updateError) {
                  log(updateError);
                  throw updateError;
                }
              }
            );
          }
        );
      }
    }
  );

  return 0; // Return any value for Firebase functions
});
