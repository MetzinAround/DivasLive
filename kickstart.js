console.log("Do the dew");

if (process.env.NODE_ENV === "develop") {
  require("dotenv").config();
};

const schedule1 = require("node-schedule");
const rule1 = new schedule1.RecurrenceRule();
rule.hour = 11;
rule.minute = 17;
rule.tz = "Etc/GMT+4";


var Twit = require('twit');

var config = require('./configPj.js');

var T = new Twit(config);

//var stream = T.stream('statuses/filter', { track: '@MetzinAround' });

//stream.on('tweet', letsGetIt);
  
function letsGetIt()
  {
    let dayToday = new Date().toISOString().slice(0, 10)
    const postStatus = `I'm once again asking @KickstartDew and @MountainDew for a sponsorship. Hit me up!`  ;

      T.post('statuses/update', {status: postStatus}, function (err, data, response)
        { 
          if(err) 
          {
          console.log(err);
          } else {
        console.log(data.text);
        }})
  }

const job3 = schedule.scheduleJob(rule1, letsGetIt);
  
job3.on("Begging for a sponsor", letsGetIt);
