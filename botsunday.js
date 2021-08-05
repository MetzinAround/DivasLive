console.log("Make Damn sure...");

if (process.env.NODE_ENV === "develop") {
  require("dotenv").config();
};

// using Node Schedule from https://github.com/node-schedule/node-schedule suggested by Brendan O'leary https://twitter.com/olearycrew
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.date = 1;
rule.hour = 6;
rule.minute = 30;
rule.tz = "Etc/GMT+4";


// Create an Twitter object to connect to Twitter API
var Twit = require('twit');

// Pulling keys from another file
var config = require('./configBS.js');
// Making a Twit object for connection to the API
var T = new Twit(config);

function greatRomances() 
{
    const dateObj = new Date();
    let monthName = dateObj.toLocaleString("default", { month: "long" });
    
    let statusPost = `${monthName} never stays this cold, where I come from and you know.`

  console.log("I'm not one for complaining");
  T.post('statuses/update', {status: statusPost});
};

const job1 = schedule.scheduleJob(rule, greatRomances);

let youKnowHowIDo = ["https://youtu.be/4ldjbjwim4k", "https://youtu.be/Hw7WbowK_x0", "https://youtu.be/y4AelQt5Fv0", "https://youtu.be/ap0mqwvf7H0", "https://youtu.be/CQE7gu4D1R4", "https://youtu.be/S9z3gv3MWaM", "https://youtu.be/_PBy3Lwi4Lo", "https://youtu.be/CkfOJy3TJdw", "https://youtu.be/-tyX8Ok6cQ0", "https://youtu.be/Rb1ZFBckgfM" ]

let headClub = [""]

function cuteWithoutTheE() {
    var id = tweet.id_str;
    var text = tweet.text;
    var name = tweet.user.screen_name;

    let regex = /(please)/gi;
    
    let timberwolves = text.match(regex) || [];

    var bikeScene = taking.length>0;
      console.log(timberwolves);
      console.log(bikeScene);
  //from Aydrian in twitch chat on 1/28 😘    
  let i = Math.floor(Math.random() * youKnowHowIDo.length);
  
  // checks text of tweet for mention of Shania Bot
  if ((text.includes('TakingB_tSunday') && bikeScene === true)) {

    // Start a reply back to the sender
    var replyText = youKnowHowIDo[i] + "@"+ name + "  ";
    
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
    

