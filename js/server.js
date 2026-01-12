const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve icons
app.use('/icons', express.static(path.join(__dirname, 'icons')));

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt for the travel assistant
const SYSTEM_PROMPT = "You are a helpful Travel Assistant. Answer only travel-related questions.";

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 200,
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Combine system prompt with user message
    const prompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\nAssistant:`;

    // Generate content using the model
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Error generating travel response:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Chatbot API is running' });
});

app.listen(PORT, () => {
  console.log(`Chatbot server running on port ${PORT}`);
});