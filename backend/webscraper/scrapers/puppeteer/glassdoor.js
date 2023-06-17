const puppeteer = require("puppeteer");
const client = require(".././client/index.js");
const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

module.exports = (async () => {
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 0,
    protocolTimeout: 12540000,
  });
  const page = await browser.newPage(); // Create a new page instance

  async function getJob(url, next) {
    await page.setViewport({ width: 1280, height: 1220 });

    if (!next) {
      await page.goto(url, { waitUntil: "load", timeout: 0 });
    }

    if (next) {
      await page.waitForSelector(".nextButton", { visible: true });
      await page.click(".nextButton");
      await new Promise((resolve) => setTimeout(resolve, 3300)); // Wait for the jobs to load
    }

    const jobs = await page.evaluate(async () => {
      const jobElements = Array.from(
        document.querySelectorAll("#PanesWrap > #MainCol > div > .hover > li")
      );
      console.log("new jobs", jobElements);

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

        jobElements[i].click(); // Click on the job

        await new Promise((resolve) => setTimeout(resolve, 5300)); // Wait for the job description to load (adjust the delay as needed)
        console.log("nu der gået mere end 10 sekunder");

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
          job.description = "Job description not available";
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
      return jobs.concat(await getJob(nextUrl, true));
    }
  }

  const firstUrl =
    "https://www.glassdoor.com/Job/denmark-developer-jobs-SRCH_IL.0,7_IN63_KO8,17_IP1.htm";
  const jobListe = await getJob(firstUrl, false);
  const success = setAsync("glassdoor", JSON.stringify(jobListe));
  console.log("jobListe", jobListe);

  console.log({ success });

  await browser.close();
})();
