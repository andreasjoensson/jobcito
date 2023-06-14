const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
const { getAllJobs, filterJobsByCategory } = require("./services");
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
    return res.send(JSON.stringify(softwareJobs));
  }
});

app.post("/api/tags", async (req, res) => {
  const { jobTitle, jobDescription } = req.body;

  return res.send(
    JSON.stringify(await getTagsFromJobDescription(jobTitle, jobDescription))
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
