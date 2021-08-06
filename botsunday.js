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

var stream = T.stream('statuses/filter', { track: '@TakingB_tSunday' });

stream.on('tweet', cuteWithoutTheE);

function greatRomances(tweet) 
{
    const dateObj = new Date();
    let monthName = dateObj.toLocaleString("default", { month: "long" });
    
    let statusPost = `${monthName} never stays this cold, where I come from and you know.`

  console.log("I'm not one for complaining");
  T.post('statuses/update', {status: statusPost});
};

const job1 = schedule.scheduleJob(rule, greatRomances);

let youKnowHowIDo = ["https://youtu.be/4ldjbjwim4k", "https://youtu.be/Hw7WbowK_x0", "https://youtu.be/y4AelQt5Fv0", "https://youtu.be/ap0mqwvf7H0", "https://youtu.be/CQE7gu4D1R4", "https://youtu.be/S9z3gv3MWaM", "https://youtu.be/_PBy3Lwi4Lo", "https://youtu.be/CkfOJy3TJdw", "https://youtu.be/-tyX8Ok6cQ0", "https://youtu.be/Rb1ZFBckgfM" ]

let headClub = [" I just wanna break you down so badly...", " The weight of my decisions were impossible to hold, But they were never yours, they were never yours", " When I let you down, look past your doubt, just please, don't lose your faith in me...", " Your lipstick - his collar, Angel. I know exactly what goes on...", " Maybe I should hate you for this, never really did ever quite get that far...", " To hell with you and all your friends...", " Literate and stylish, kissable and quiet...", " I'm still not sleeping thinking I've crawled home from worse than this...", " I'm an addict for dramatics, I confuse the two for love...", " We won't stand for hazy eyes anymore..."  ]

function cuteWithoutTheE() {
    var id = tweet.id_str;
    var text = tweet.text;
    var name = tweet.user.screen_name;

    let regex = /(emo)/gi;
    
    let timberwolves = text.match(regex) || [];

    var bikeScene = taking.length>0;
      console.log(timberwolves);
      console.log(bikeScene);
  //from Aydrian in twitch chat on 1/28 😘    
  let i = Math.floor(Math.random() * youKnowHowIDo.length);
  
  // checks text of tweet for mention of Shania Bot
  if ((text.includes('@TakingB_tSunday') && bikeScene === true)) {

    // Start a reply back to the sender
    var replyText = youKnowHowIDo[i] + "@"+ name + headClub[i]  ;
    
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
    console.log("My pictures, well they don't line your mirror...");
  }
};
    

