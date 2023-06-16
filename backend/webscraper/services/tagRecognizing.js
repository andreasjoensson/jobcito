const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

function generatePrompt(jobTitle, jobDescription) {
  return `From the job description and job title provided, I want to get skills about the job like programming languages or tech used. I want to know if it is full-time, part-time, remote. And also I want to know the seniority if it is Senior, Junior, or not known. If possible, also state if the job is remote, remote-friendly, or not. If you don't have a valid answer, you can just return null instead. I want to ONLY retrieve a JSON object, please dont include any notes or anything else:
This is how the ideal response should be like: {
  "skills": ["javascript", "react"],
  "time": "full time",
  "seniority": "junior",
  "remote": false
}

This is the provided information here:
Job title: ${jobTitle}
Job description: ${jobDescription}`;
}

const getTagsFromJobDescription = async (jobTitle, jobDescription) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  if (!apiKey) {
    console.error("OPENAI_API_KEY environment variable not found.");
    return "OPENAI_API_KEY environment variable not found.";
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant at describing jobs from the job description.",
        },
        { role: "user", content: generatePrompt(jobTitle, jobDescription) },
      ],
    });

    console.log(response.data.choices[0]);

    if (response.data.choices[0]) {
      const parsedTags = JSON.parse(response.data.choices[0].message.content);
      return parsedTags;
    } else {
      return null;
    }
  } catch (error) {
    console.log("error", error);
    // Consider adjusting the error handling logic for your use case
    console.error(`Error with OpenAI API request: ${error.message}`);
    return error.message;
  }
};
const tagAllJobs = async (jobs) => {
  const taggedJobs = [];
  let index = 0;

  for (const job of jobs) {
    const tags = await getTagsFromJobDescription(job.title, job.description);
    index += 1;
    console.log(tags);
    console.log(`Nået til ${jobs.length} ud af ${index}`);
    job.tags = tags;
    taggedJobs.push(job);
  }

  return taggedJobs;
};

module.exports = { tagAllJobs, getTagsFromJobDescription };
