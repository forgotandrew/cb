const express = require("express");
const bodyParser = require("body-parser");
const openai = require("openai");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parse request body as JSON
app.use(bodyParser.json());

// Set up the OpenAI API client
const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiApiClient = new openai.OpenAI(openaiApiKey);

// Endpoint to receive messages from the client
app.post("/chatbot", async (req, res) => {
  const message = req.body.message;

  // Set up the parameters for the completion
  const prompt = `User: ${message}\nBot: `;
  const parameters = {
    prompt: prompt,
    model: "text-davinci-003",
    maxTokens: 150,
    n: 1,
    stop: "\n",
    temperature: 0.7,
  };

  // Call the OpenAI API to complete the prompt
  const result = await openaiApiClient.completions.create(parameters);

  // Extract the bot's response from the result
  const botResponse = result.choices[0].text.trim();

  // Send the bot's response back to the client
  res.send({ message: botResponse });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
