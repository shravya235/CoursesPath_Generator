const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat endpoint
router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get the generative model
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        // Generate content
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error('Error in chatbot:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
