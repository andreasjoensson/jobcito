const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function generatePrompt(jobTitle, jobDescription) {
  return `From this job description and job title, i want to receive tags about the pgrogramming languages and frameworks that are mentioned in the job description. And also if possible mention if the position is full time or part time, remote. And also if possible add a tag for if it is a junior, senior position or similar. 
    Job title: ${jobTitle}
    Job description: ${jobDescription}
  `;
}

const getTagsFromJobDescription = async (jobTitle, jobDescription) => {
  if (!configuration.apiKey) {
    console.error("OPENAI_API_KEY environment variable not found.");
    return "OPENAI_API_KEY environment variable not found.";
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(jobTitle, jobDescription),
      temperature: 0.4,
    });
    const generatedText = completion.data.choices[0].text;
    const tagsRegex = /Tags:(.*)/g;
    const matches = tagsRegex.exec(generatedText);

    if (matches && matches[1]) {
      const tagsString = matches[1].trim();
      const tagsArray = tagsString.split(",").map((tag) => tag.trim());
      return tagsArray;
    } else {
      return [];
    }
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return error.response.data;
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return error.message;
    }
  }
};

module.exports = { getTagsFromJobDescription };
