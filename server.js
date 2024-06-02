"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Groq = require("groq-sdk");

const app = express();
const port = process.env.PORT || 3000;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  try {
    const userInput = req.body.content;
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userInput,
        },
      ],
      model: "llama3-8b-8192",
    });

    const completion = response.choices[0]?.message?.content || "No response";
    res.json({ completion });
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    res.status(500).json({ error: "Failed to fetch chat completion" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
