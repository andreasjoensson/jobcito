const puppeteer = require("puppeteer");
const client = require(".././client/index.js");
const { promisify } = require("util");
const { getTagsFromJobDescription } = require("../services/tagRecognizing.js");
const setAsync = promisify(client.set).bind(client);

module.exports = (async () => {
  async function getJob(url) {
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url, { waitUntil: "load", timeout: 0 });

    await page.exposeFunction("get_tags", getTagsFromJobDescription);

    const jobs = await page.evaluate(async () => {
      const jobElements = Array.from(
        document.querySelectorAll("#PanesWrap > #MainCol > div > .hover > li")
      );

      const jobList = [];
      for (let i = 0; i < jobElements.length; i++) {
        const job = {};
        // Check for the element to instantly click
        const loginModalElement = document.querySelector(
          "#LoginModal > div > div > div.modal_main.actionBarMt0 > span"
        );
        if (loginModalElement) {
          console.log("loginModalElement", loginModalElement);
          loginModalElement.click();
        }

        job.logo = null;
        job.company = jobElements[i]
          .querySelector("div div a div div div:nth-child(2)")
          .innerHTML.split("<")[0];
        job.applyLink = jobElements[i].querySelector("div div a").href;
        job.title = jobElements[i].querySelector(
          "div div a div > .job-title"
        ).innerText;
        job.location = jobElements[i].querySelector(
          "div div a div > .location"
        ).innerText;
        job.postedAt = jobElements[i].querySelector(
          "div div a > div:nth-child(2)"
        ).innerText;

        const min = 2600;
        const max = 3600;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for the job description to load (adjust the delay as needed)

        jobElements[i].click(); // Click on the job

        await new Promise((resolve) => setTimeout(resolve, randomNumber)); // Wait for the job description to load (adjust the delay as needed)

        const jobDescriptionElement = document.querySelector(
          ".jobDescriptionContent"
        );
        if (jobDescriptionElement) {
          console.log(
            "HER ER DER BESKRIVELSE",
            jobDescriptionElement.innerHTML
          );
          job.description = jobDescriptionElement.innerHTML.replace(
            /<[^>]*>?/gm,
            ""
          ); // Fetch the job description
        } else {
          await new Promise((resolve) => setTimeout(resolve, 20000)); // Wait for the job description to load (adjust the delay as needed)
          const retryBtn = document.querySelector(
            "#JDCol > div > div.css-17bh0pp.erj00if0 > button"
          );
          console.log("retryBtn", retryBtn);
          if (retryBtn) {
            retryBtn.click();
            await new Promise((resolve) => setTimeout(resolve, randomNumber)); // Wait for the job description to load (adjust the delay as needed)
            const jobDescriptionElement = document.querySelector(
              ".jobDescriptionContent"
            );
            if (jobDescriptionElement) {
              console.log(
                "HER ER DER BESKRIVELSE",
                jobDescriptionElement.innerHTML
              );
              job.description = jobDescriptionElement.innerHTML.replace(
                /<[^>]*>?/gm,
                ""
              );
            } else {
              job.description = "Job description not available";
            }
          } else {
            job.description = "Job description not available";
          }
        }
        console.log("job", job);
        jobList.push(job);
      }

      return jobList;
    });

    console.log("jobs", jobs);

    // Skal man afslutte recursion
    if (jobs.length < 1) {
      return jobs;
    } else {
      const nextPageNumber = parseInt(url.match(/\IP(\d*)/)[1], 10) + 1;
      if (nextPageNumber == 12) {
        return jobs;
      }
      const nextUrl = `https://www.glassdoor.com/Job/denmark-developer-jobs-SRCH_IL.0,7_IN63_KO8,17_IP${nextPageNumber}.htm`;
      return jobs.concat(await getJob(nextUrl));
    }
  }
  //const proxyServer = "2.56.119.93:5074:qcxwqldg:ixz09511pyon";
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 0,
    protocolTimeout: 240000,
  });
  const firstUrl =
    "https://www.glassdoor.com/Job/denmark-developer-jobs-SRCH_IL.0,7_IN63_KO8,17_IP1.htm";
  const jobListe = await getJob(firstUrl);
  const success = setAsync("glassdoor", JSON.stringify(jobListe));
  console.log("jobListe", jobListe);

  console.log({ success });

  await browser.close();
})();
