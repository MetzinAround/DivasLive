console.log("*Reggae horn noises*");

if (process.env.NODE_ENV === "develop") {
    require("dotenv").config();
};

//creates a time inside a variable to tell the bot when to tweet
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.date = 14, 28
rule.hour = 15;
rule.minute = 08;
rule.tz = "Etc/GMT+5";


// Create an Twitter object to connect to Twitter API
var Twit = require('twit');

// Pulling keys from another file
var config = require('./config.js');

// Making a Twit object for connection to the API
var T = new Twit(config);

//setting up request 
const request = require("request")

function bitThugs() {
    //using request to get the JSON from 8bits.tv 
    request("https://8bits.ghost.io/ghost/api/v4/content/posts/?key=c068c4a242e0b818b4009c7ad9", { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err);
        } else {
            // sorts JSON by date putting most recent date first. 
            body.posts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
            //create variable to be place into tweet later
            const address = body.posts[0].url;

            console.log("Hold on to your butts");
            T.post('statuses/update', {
                status: `Check out our most recent episode! ${address}`, function(err, data, response) {
                    if (err) {
                        console.log(err.message);
                    } else {
                        console.log(response.text);
                    }
                }
            })
        }
    })
}

const job1 = schedule.scheduleJob(rule, bitThugs);