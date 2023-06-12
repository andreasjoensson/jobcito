const jobindex = require("./scrapers/jobindex");
const itJobbank = require("./scrapers/it-jobbank");
const glassdoor = require("./scrapers/glassdoor");
const indeed = require("./scrapers/indeed");

let CronJob = require("cron").CronJob;
let jobs = new CronJob(
  "0 23 * * *",
  function () {
    jobindex();
    itJobbank();
    glassdoor();
    indeed();
  },
  null,
  true,
  "Europe/Copenhagen"
);
jobs.start();
