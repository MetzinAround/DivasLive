console.log("Do the dew");

if (process.env.NODE_ENV === "develop") {
  require("dotenv").config();
};

const schedule1 = require("node-schedule");
const rule1 = new schedule1.RecurrenceRule();
rule1.hour = 11;
rule1.minute = 17;
rule1.tz = "Etc/GMT+4";


var Twit = require('twit');

var config = require('./configPj.js');

var T = new Twit(config);

//var stream = T.stream('statuses/filter', { track: '@MetzinAround' });

//stream.on('tweet', letsGetIt);
  
function letsGetIt()
  {

    let date1 = new Date("2021/06/01");
    let date2 = new Date();
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let dayCounter = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    const postStatus = ` It's been ${dayCounter} days of asking @MountainDew for a Pineapple Orange Mango #KickstartDew sponsorship. I'm ready to do the Dew, are you, @MountainDew? `  ;

      T.post('statuses/update', {status: postStatus}, function (err, data, response)
        { 
          if(err) 
          {
          console.log(err);
          } else {
        console.log(data.text);
        }})
  }

const job3 = schedule1.scheduleJob(rule1, letsGetIt);
  
job3.on("Begging for a sponsor", letsGetIt);
