console.log("Jump in my ride...");

//checking if it's in develop mode for local use
if (process.env.NODE_ENV === "develop") {
  require("dotenv").config();
};

// Create an Twitter object to connect to Twitter API
const Twit = require('twit');

// Pulling keys from another file
const config = require('./configN.js');
// Making a Twit object for connection to the API
const T = new Twit(config);

// Setting up a user stream
const stream = T.stream('statuses/filter', { track: '@JustBotPaid' });

// Now looking for tweet events
// See: https://dev.twitter.com/streaming/userstreams
stream.on('tweet', tweetEvent);


// Here a tweet event is triggered!
function tweetEvent(tweet) {

  var id = tweet.id_str;
  var text = tweet.text;
  var name = tweet.user.screen_name;

  let regex = /(💰💰💰)/g;
  let str = text;

  let partyHoppin = str.match(regex) || [];

  let feelinRight = partyHoppin.length > 0;

  console.log(partyHoppin);
  console.log(feelinRight);


  if ((text.includes('@JustBotPaid') && feelinRight === true)) {

    const gifPath = "./justGotPaid.gif"
    // Start a reply back to the sender
    const replyText = "@" + name + "‍ Check the mirror, lookin' fly!";

    // postMediaChunked is a twit method for posting gifs and movies, since Twitter requires a multiple step process to post. 
    T.postMediaChunked({ file_path: gifPath }, function (err, data, response) {
      // two variables: pulling the media_is_string for javascript and turning it into an object
      const checkTheMirror = data.media_id_string;
      const doubleCheckTheMirror = { media_id: checkTheMirror };
      if (!err) {
        //the timeout is necessary to give time for postMediaChunked to create a media post on twitter. 
        //it needs time to create a media Id string. 
        setTimeout(() => {
          T.post("media/metadata/create", doubleCheckTheMirror, function (err, data, response) {
            if (!err) {
              //creating an object for the T.post ('statuses/update') method
              const moneyMoneyMoney = { status: replyText, media_ids: checkTheMirror, in_reply_to_status_id: id }

              T.post('statuses/update', moneyMoneyMoney, function (err, data, response) {
                if (!err) {
                  console.log(response);
                } else {
                  console.log(err);
                }
              });
            }
          })
        }, 5000)
      } else {
        console.log(err);
      }
    });
  };
};

//node schedule
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 5;
rule.hour = 5;
rule.minute = 30;
rule.tz = "Etc/GMT+4";

function fridayNight() {

  const PATH = "./nsync.mp4";
  const postStatus = "Just Got Paid!";
  console.log(postStatus);

  T.postMediaChunked({ file_path: PATH }, function (err, data, response) {
    console.log(data)
    const checkTheMirror = data.media_id_string;

    if (!err) {

      const params = { media_id: checkTheMirror }

      setTimeout(() => {
        T.post('media/metadata/create', params, function (err, data, response) {

          if (!err) {
            const finalParams = { status: postStatus, media_ids: [checkTheMirror] }

            T.post('statuses/update', finalParams, function (err, data, response) {
              console.log(response)
            })
          } else {
            console.log(err);
          }
        }
        )
      }, 5000);
    } else {
      console.log(err)
    };
  })
};


const job1 = schedule.scheduleJob(rule, fridayNight);

job1.on("Just Got Paid!", fridayNight);


