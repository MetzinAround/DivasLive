console.log("wake up wake up wake up");

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
var config = require('./config1st.js');
// Making a Twit object for connection to the API
var T = new Twit(config);


function boneThugs() 
{
  console.log("It's the 1st of tha mooooooooooonth");
  T.post('statuses/update', {status: "It's the 1st of the month...   https://youtu.be/37YDcIQABEs"});
};

const job1 = schedule.scheduleJob(rule, boneThugs);
