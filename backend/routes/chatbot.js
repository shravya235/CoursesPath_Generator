const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat endpoint
router.post('/chat', async (req, res) => {
    try {
        const { message, modelType } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Default model is Flash
        const modelName = modelType === 'pro' 
            ? 'gemini-3.0-pro'        // <- Gemini Pro 3 model
            : 'gemini-2.0-flash';     // <- Flash model (default)

        const model = genAI.getGenerativeModel({ model: modelName });

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.json({ model: modelName, response: text });
    } catch (error) {
        console.error('Error in chatbot:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
