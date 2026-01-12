// src/api.js
// API integration for Travel Assistant AI Chatbot


// Configuration
const API_KEY = window.GEMINI_API_KEY || "AIzaSyDb_tjgY0-2B2S8Xn3iaeQ_pr3FSzV3dPg";
const SYSTEM_PROMPT = "You are a helpful Travel Assistant. Answer only travel-related questions.";
const TEMPERATURE = 0.7;
const MAX_OUTPUT_TOKENS = 200;

// Initialize Google Generative AI

const genAI = new window.GoogleGenerativeAI(API_KEY);

// Get the generative model with configuration
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: TEMPERATURE,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
  }
});

/**
 * Generate a travel-related response using Gemini API
 * @param {string} message - User's message/query
 * @returns {Promise<string>} - AI-generated response
 */
export async function generateTravelResponse(message) {
  console.log('generateTravelResponse called with:', message);
  
  try {
    // Combine system prompt with user message
    const prompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\nAssistant:`;
    console.log('Sending prompt to model:', prompt);
    
    // Generate content using the new API
    const result = await model.generateContent([prompt]);
    const text = result.response.text();
    
    console.log('Received response from model:', text);
    return text;
  } catch (error) {
    console.error("Error generating travel response:", error);
    
    // Return a fallback response in case of error
    return getFallbackResponse(message);
  }
}

/**
 * Generate a fallback response when API is not available
 * @param {string} message - User's message/query
 * @returns {string} - Fallback response
 */
function getFallbackResponse(message) {
  // Travel-themed responses
  const responses = [
    `I'd be happy to help you with information about "${message}". Based on my knowledge, there are several great options for your travel needs. Would you like me to provide specific recommendations for destinations, hotels, or travel tips?`,
    `Great question about "${message}"! For travel planning, I recommend considering the season, local events, and your personal interests. Would you like me to suggest some specific destinations that match your query?`,
    `Regarding "${message}", I can provide personalized travel advice. Many travelers find that planning with flexibility leads to the best experiences. Would you like me to help you create a customized itinerary?`,
    `I understand you're interested in "${message}". For the best travel experience, I suggest researching local customs, checking weather conditions, and booking accommodations in advance. Would you like more specific information?`,
    `That's an excellent travel topic! "${message}" is something many travelers inquire about. Based on current trends, I can suggest some fantastic options that align with your interests. Shall I provide more details?`
  ];
  
  // Return a random response for demo purposes
  return responses[Math.floor(Math.random() * responses.length)];
}