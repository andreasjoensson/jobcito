const client = require("../client");

const getJobs = async (platform) => {
  try {
    const jobsUnparsed = await client.get(platform);
    console.log(jobsUnparsed);
    const jobs = JSON.parse(jobsUnparsed);
    return jobs;
  } catch (error) {
    throw new Error(`Failed to get jobs from ${platform}: ${error.message}`);
  }
};

const getAllJobs = async () => {
  try {
    const parsedJobindex = await getJobs("jobindex");
    const parsedItJobBank = await getJobs("jobliste");
    const parsedGlassDoor = await getJobs("glassdoor");
    const parsedIndeed = await getJobs("indeed");

    const arr = parsedJobindex.concat(
      parsedItJobBank,
      parsedGlassDoor,
      parsedIndeed
    );
    const shuffledArray = arr.sort(() => 0.5 - Math.random());
    return shuffledArray;
  } catch (error) {
    throw new Error(`Failed to get all jobs: ${error.message}`);
  }
};

const filterJobsByCategory = (category, jobs) => {
  return jobs.filter((job) => {
    let Regex = new RegExp(category, "gi");
    return job.Titel.match(Regex);
  });
};

module.exports = { getAllJobs, getJobs, filterJobsByCategory };
