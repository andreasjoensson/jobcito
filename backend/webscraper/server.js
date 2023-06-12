const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
const { getAllJobs, filterJobsByCategory } = require("./services");

app.use(cors());

app.get("/api/c", async (req, res) => {
  const jobs = await getAllJobs();
  const CJobs = filterJobsByCategory("C#", jobs);
  return res.send(JSON.stringify(CJobs));
});

app.get("/api/jobs", async (req, res) => {
  console.log("test test");
  const jobs = await getAllJobs();
  const softwareJobs = filterJobsByCategory("software", jobs);
  return res.send(JSON.stringify(softwareJobs));
});

app.get("/api/javascript", async (req, res) => {
  const jobs = await getAllJobs();
  const javascriptJobs = filterJobsByCategory("javascript", jobs);
  return res.send(JSON.stringify(javascriptJobs));
});

app.get("/api/net", async (req, res) => {
  const jobs = await getAllJobs();
  const netJobs = filterJobsByCategory(".net", jobs);
  return res.send(JSON.stringify(netJobs));
});

app.get("/api/java", async (req, res) => {
  const jobs = await getAllJobs();
  const javaJobs = filterJobsByCategory("java", jobs);
  return res.send(JSON.stringify(javaJobs));
});

app.get("/api/python", async (req, res) => {
  const jobs = await getAllJobs();
  const pythonJobs = filterJobsByCategory("python", jobs);
  return res.send(JSON.stringify(pythonJobs));
});

app.get("/api/fullstack", async (req, res) => {
  const jobs = await getAllJobs();
  const fullstackJobs = filterJobsByCategory("full", jobs);
  return res.send(JSON.stringify(fullstackJobs));
});

app.get("/api/frontend", async (req, res) => {
  const jobs = await getAllJobs();
  const frontendJobs = filterJobsByCategory("frontend", jobs);
  return res.send(JSON.stringify(frontendJobs));
});

app.get("/api/junior", async (req, res) => {
  const jobs = await getAllJobs();
  const juniorJobs = filterJobsByCategory("junior", jobs);
  return res.send(JSON.stringify(juniorJobs));
});

app.get("/api/backend", async (req, res) => {
  const jobs = await getAllJobs();
  const backendJobs = filterJobsByCategory("backend", jobs);
  return res.send(JSON.stringify(backendJobs));
});

app.get("/api/machine", async (req, res) => {
  const jobs = await getAllJobs();
  const machineJobs = filterJobsByCategory("machine", jobs);
  return res.send(JSON.stringify(machineJobs));
});

app.get("/api/senior", async (req, res) => {
  const jobs = await getAllJobs();
  const seniorJobs = filterJobsByCategory("senior", jobs);
  return res.send(JSON.stringify(seniorJobs));
});

app.get("/api/cloud", async (req, res) => {
  const jobs = await getAllJobs();
  const cloudJobs = filterJobsByCategory("cloud", jobs);
  return res.send(JSON.stringify(cloudJobs));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
