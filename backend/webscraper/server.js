const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
const { getAllJobs, filterJobsByCategory } = require("./services");

app.use(cors());

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
