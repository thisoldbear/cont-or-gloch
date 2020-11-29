require("dotenv").config();

const fs = require("fs");

const twitterKeys = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

// Generate new Twitter keys
["src", "lib"].map((path) => {
  fs.writeFile(
    `${path}/twitterKeys.json`,
    JSON.stringify(twitterKeys),
    function (err) {
      if (err) throw err;
    }
  );
});

// Copy the serviceAccount file to lib to be bundled
fs.copyFile("src/serviceAccount.json", "lib/serviceAccount.json", (err) => {
  if (err) throw err;
});
