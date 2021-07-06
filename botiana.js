console.log("one taught me patience...");
//checking if it's in develop mode for local use
if (process.env.NODE_ENV === "develop") {
  require("dotenv").config();
};

//node schedule
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.hour = 12;
rule.minute = 30;
rule.tz = "Etc/GMT+4";


//march 11, trying to get this to it's own repo :(
// Create an Twitter object to connect to Twitter API
var Twit = require('twit');

// Pulling keys from another file
var config = require('./configB.js');
// Making a Twit object for connection to the API
var T = new Twit(config);

// Setting up a user stream
var stream = T.stream('statuses/filter', { track: '@BotianaGrande' });

// Now looking for tweet events
// See: https://dev.twitter.com/streaming/userstreams
stream.on('tweet', tweetEvent);


// Here a tweet event is triggered!
function tweetEvent(tweet) {

  var id = tweet.id_str;
  var text = tweet.text;
  var name = tweet.user.screen_name;

    let regex = /(👀💅)/g;
    var str = text;
    
    let godIsAWoman = str.match(regex) || [];

    var sevenRings = godIsAWoman.length>0;
      console.log(godIsAWoman);
      console.log(sevenRings);
  //from itsAydrian in twitch chat on 1/28 😘    
  let i = Math.floor(Math.random() * 3);
  
  // checks text of tweet for mention of Bot 
  if ((text.includes('@BotianaGrande') && sevenRings === true)) {

    // Start a reply back to the sender
    var replyText = "@"+ name + " Thank you, next...";
    
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
    console.log("One taught me pain");
  }
}

/*function letsGoGirls() 
{
  console.log("I don't know a lot of Ariana Grande");
  T.post('statuses/update', {status: "...let's go, girls."});
};

const job1 = schedule.scheduleJob(rule, letsGoGirls());

job1.on("tweetIt", letsGoGirls)*/