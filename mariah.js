console.log("I don't want a lot for Christmas...");
//checking if it's in develop mode for local use
if (process.env.NODE_ENV === "develop") {
  require("dotenv").config();
};


// using Node Schedule from https://github.com/node-schedule/node-schedule suggested by Brendan O'leary https://twitter.com/olearycrew
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.hour = 6;
rule.minute = 30;
rule.tz = "Etc/GMT+4";

// Create an Twitter object to connect to Twitter API
const Twit = require('twit');

// Pulling keys from another file
const config = require('./configM.js');
// Making a Twit object for connection to the API
const T = new Twit(config);

// Setting up a user stream
const stream = T.stream('statuses/filter', { track: '@MechanicalCarey' });

// Now looking for tweet events
// See: https://dev.twitter.com/streaming/userstreams
stream.on('tweet', tweetEvent);


// Here a tweet event is triggered!
function tweetEvent(tweet) {

  var id = tweet.id_str;
  var text = tweet.text;
  var name = tweet.user.screen_name;

    let regex = /(👀🙄😒)/g;
    let str = text;
    
    let fantasy = str.match(regex) || [];

    let alwaysBeMyBaby = fantasy.length>0;
      console.log(fantasy);
      console.log(alwaysBeMyBaby);
  //from itsAydrian in twitch chat on 1/28 😘    
  let i = Math.floor(Math.random() * 3);
  
  // checks text of tweet for mention of Shania Bot
  if ((text.includes('@MechanicalCarey') && alwaysBeMyBaby === true)) {

    // Start a reply back to the sender
    const replyText = "@"+ name + "... I don't know her ¯\\_(ツ)_/¯... ‍";
    
    // Post that tweet
    T.post('statuses/update', { status: replyText, in_reply_to_status_id: id}, tweeted);

    // Make sure it worked!
    function tweeted(err, reply) {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Tweeted: ' + reply.text);
      }
    }    
  } else {
    console.log("Just a sweet sweet fantasy");
  }
};


function AlwaysBeMyBaby() 
{
  console.log("You can't escape me");
  T.post('statuses/update', {status: "Boy don't you know you can't escape me...  https://www.youtube.com/watch?v=Dxce3s7bV9s"});
};

const job1 = schedule.scheduleJob(rule, AlwaysBeMyBaby);

job1.on("tweetIt", AlwaysBeMyBaby);


