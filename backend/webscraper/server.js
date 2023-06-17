const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
const {
  getAllJobs,
  filterJobsByCategory,
  filterJobsByQueryParams,
} = require("./services");
const { getTagsFromJobDescription } = require("./services/tagRecognizing.js");
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

app.get("/api/jobs", async (req, res) => {
  const jobs = await getAllJobs();
  const category = req.query.category;

  if (category) {
    const filteredJobs = filterJobsByCategory(category, jobs);
    return res.send(JSON.stringify(filteredJobs));
  } else {
    const softwareJobs = filterJobsByCategory("software", jobs);
    // Limit the number of jobs to a maximum of 400
    const limitedJobs = softwareJobs.slice(0, 400);
    return res.send(JSON.stringify(limitedJobs));
  }
});

function parseBoolean(value) {
  return value === "true";
}

app.get("/api/jobs/filter", async (req, res) => {
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
  } = req.query;

  const jobs = await getAllJobs();

  const parsedQueryParams = {
    fullTime: parseBoolean(fullTime),
    partTime: parseBoolean(partTime),
    contract: parseBoolean(contract),
    internEmployment: parseBoolean(internEmployment),
    seniorLevel: parseBoolean(seniorLevel),
    juniorLevel: parseBoolean(juniorLevel),
    internLevel: parseBoolean(internLevel),
    remote: parseBoolean(remote),
    chosenSpecialties: chosenSpecialties.split(",").filter(Boolean),
  };
  console.log("parsedQueryParams: ", parsedQueryParams);

  const filteredJobs = filterJobsByQueryParams(jobs, parsedQueryParams);
  console.log("filteredJobs: ", filteredJobs);

  res.json(filteredJobs);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
