console.log("let's go girls...");

if (process.env.NODE_ENV === "develop") {
  require("dotenv").config();
};

// using Node Schedule from https://github.com/node-schedule/node-schedule suggested by Brendan O'leary https://twitter.com/olearycrew
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.hour = 12;
rule.minute = 1;
rule.tz = "Etc/GMT+4";


// Create an Twitter object to connect to Twitter API
var Twit = require('twit');

// Pulling keys from another file
var config = require('./configS.js');
// Making a Twit object for connection to the API
var T = new Twit(config);

// Setting up a user stream
// "this don't impress me much" - Daniel 2021 
var stream = T.stream('statuses/filter', { track: '@bot_shania' });

// Now looking for tweet events
// See: https://dev.twitter.com/streaming/userstreams
stream.on('tweet', tweetEvent);



//array to add random emojis to the beginning of the tweet
const thatDontImpressMeMuch = ["🎶🎵🙄🚀🤓", "🎶🎵🙄🏎", "🎶🎵🙄👨‍🎬🍿"];

// Here a tweet event is triggered!
async function tweetEvent(tweet) {

  var id = tweet.id_str;
  var text = tweet.text;
  var name = tweet.user.screen_name;

    let regex = /(impress)/gi;
    
    let impressive = text.match(regex) || [];
    
    await new Promise(resolve => setTimeout(resolve, 3000));

    var isItImpressive = impressive.length>0;
      console.log(impressive);
      console.log(isItImpressive);
  //from itsAydrian in twitch chat on 1/28 😘    
  let i = Math.floor(Math.random() * 3);


  // checks text of tweet for mention of Shania Bot
  if ((text.includes('@bot_shania') && isItImpressive === true)) {

    // Start a reply back to the sender
    var replyText = thatDontImpressMeMuch[i] + "@"+ name + " That don't impress me much. ";
    
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
    console.log("We can't go, girls");
  }
};


function letsGoGirls() 
{
  console.log("bah baaaaaaaah budah duh dah dah");
  T.post('statuses/update', {status: "...let's go, girls."});
};

const job1 = schedule.scheduleJob(rule, letsGoGirls);



