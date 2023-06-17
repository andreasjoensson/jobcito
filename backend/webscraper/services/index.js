const client = require("../client");
const { tagAllJobs } = require("./tagRecognizing");
const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const getJobs = async (platform) => {
  try {
    const jobsUnparsed = await client.get(platform);
    const jobs = JSON.parse(jobsUnparsed);
    return jobs;
  } catch (error) {
    throw new Error(`Failed to get jobs from ${platform}: ${error.message}`);
  }
};

function filterJobsByQueryParams(jobs, queryParams) {
  const {
    fullTime,
    partTime,
    contract,
    internEmployment,
    seniorLevel,
    juniorLevel,
    internLevel,
    remote,
    chosenSpecialties,
  } = queryParams;

  const filteredJobs = jobs.filter((job) => {
    // Check if the job matches the time criteria
    if (
      (fullTime && job.tags?.time !== "full time") ||
      (partTime && job.tags?.time !== "part-time") ||
      (contract && job.tags?.time !== "contract") ||
      (internEmployment && job.tags?.time !== "intern")
    ) {
      return false;
    }

    // Check if the job matches the seniority criteria
    if (
      (seniorLevel && job.tags?.seniority !== "senior") ||
      (juniorLevel && job.tags?.seniority !== "junior") ||
      (internLevel && job.tags?.seniority !== "intern")
    ) {
      return false;
    }

    // Check if the job matches the remote criteria
    if (remote && job.tags?.remote !== true) {
      return false;
    }

    // Check if the job matches the chosen specialties criteria
    if (
      chosenSpecialties.length > 0 &&
      !chosenSpecialties.every((specialty) =>
        job.tags?.skills?.includes(specialty)
      )
    ) {
      return false;
    }

    // All criteria match, include the job in the filtered list
    return true;
  });

  return filteredJobs;
}

const getAllJobs = async () => {
  try {
    const parsedJobindex = await getJobs("jobindexTagged");
    const parsedItJobBank = await getJobs("joblisteTagged");
    const parsedGlassDoor = await getJobs("glassdoorTagged");

    const arr = parsedJobindex.concat(
      parsedItJobBank,
      parsedJobindex,
      parsedGlassDoor
    );
    const shuffledArray = arr.sort(() => 0.5 - Math.random());
    return shuffledArray;
  } catch (error) {
    throw new Error(`Failed to get all jobs: ${error.message}`);
  }
};
const getTop40Categories = async () => {
  try {
    const parsedJobindex = await getJobs("jobindexTagged");
    const parsedItJobBank = await getJobs("joblisteTagged");
    const parsedGlassDoor = await getJobs("glassdoorTagged");

    const arr = parsedJobindex.concat(parsedItJobBank, parsedGlassDoor);

    // Step 1: Extract skills from each job and create a single array
    const skills = arr.flatMap((job) => job.tags?.skills || []);

    // Step 2: Count the frequency of each skill
    const skillCounts = {};
    skills.forEach((skill) => {
      if (skill !== null && skill !== undefined) {
        const lowercaseSkill = skill.toLowerCase();
        skillCounts[lowercaseSkill] = (skillCounts[lowercaseSkill] || 0) + 1;
      }
    });

    // Step 3: Sort the skills based on frequency in descending order
    const sortedSkills = Object.entries(skillCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // Step 4: Get the top 40 most common skills
    const topSkills = sortedSkills
      .slice(0, 40)
      .map(([skill]) => skill.charAt(0).toUpperCase() + skill.slice(1));

    console.log("topSkills", topSkills);
    return topSkills;
  } catch (error) {
    throw new Error(`Failed to get all jobs: ${error.message}`);
  }
};
const getUniqueJobs = async (data) => {
  const duplicatesCountMap = new Map();
  const uniqueJobList = data.reduce((accumulator, job) => {
    const key = `${job.company}-${job.title}`; // Customize the key based on the properties you want to compare
    if (!duplicatesCountMap.has(key)) {
      duplicatesCountMap.set(key, 0);
      accumulator.push(job);
    }
    duplicatesCountMap.set(key, duplicatesCountMap.get(key) + 1);
    return accumulator;
  }, []);

  const duplicatesCount = Array.from(duplicatesCountMap.values()).reduce(
    (total, count) => total + (count > 1 ? 1 : 0),
    0
  );

  return uniqueJobList;
};

const tagJobs = async () => {
  //const parsedJobindex = await getJobs("jobindexTagged");
  //console.log("parsedJobindex", parsedJobindex);
  //const jobindexTagged = await tagAllJobs(parsedJobindex);
  //setAsync("jobindexTagged", JSON.stringify(jobindexTagged));

  /*const parsedItJobBank = await getJobs("jobliste");
  const itJobBankTagged = await tagAllJobs(parsedItJobBank);
  setAsync("joblisteTagged", JSON.stringify(itJobBankTagged));
  console.log("done");
  */

  const parsedGlassDoor = await getJobs("glassdoor");
  const glassDoorTagged = await tagAllJobs(parsedGlassDoor);
  setAsync("glassdoorTagged", JSON.stringify(glassDoorTagged));
  console.log("done");
};

const filterDuplicateJobs = async () => {
  const parsedGlassDoor = getUniqueJobs(await getJobs("glassdoor"));
  setAsync("glassdoor", JSON.stringify(parsedGlassDoor));
  const parsedJobindex = getUniqueJobs(await getJobs("jobindex"));
  setAsync("jobindex", JSON.stringify(parsedJobindex));
  const parsedItJobBank = getUniqueJobs(await getJobs("jobliste"));
  setAsync("jobliste", JSON.stringify(parsedItJobBank));
};

const filterJobsByCategory = (category, jobs) => {
  if (!category) return jobs;
  console.log("category", category);

  const filteredJobs = jobs.filter((job) => {
    // Check if the category is present in job.title
    const hasCategoryInTitle =
      job.title && job.title.toLowerCase().includes(category.toLowerCase());

    // Check if job.tags.skills is defined and the category is present in any skill
    const hasCategoryInSkills =
      job.tags.skills &&
      job.tags.skills.some(
        (skill) => skill && skill.toLowerCase().includes(category.toLowerCase())
      );

    return hasCategoryInTitle || hasCategoryInSkills;
  });

  return filteredJobs;
};

module.exports = {
  getAllJobs,
  getJobs,
  filterJobsByCategory,
  filterJobsByQueryParams,
};
