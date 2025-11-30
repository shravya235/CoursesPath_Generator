const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const router = express.Router();

// Ensure the API key is present
if (!process.env.GEMINI_API_KEY) {
    console.error("CRITICAL ERROR: GEMINI_API_KEY is missing in your .env file!");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Strict educational guidelines for the AI
const SYSTEM_INSTRUCTION = `
You are GyanVistara's dedicated AI Educational Assistant. Your purpose is to empower students and professionals by providing accurate, structured, and helpful guidance on academic and career-related topics.

*** STRICT OPERATIONAL BOUNDARIES ***

1. **AUTHORIZED TOPICS (Answer these comprehensively):**
   - **Career Guidance:** Detailed paths for Engineering, Medical, Law, Business, Design, Arts, Police, Defense, etc.
   - **Academic Information:** Details on degrees (B.Tech, MBBS, BBA, etc.), certifications, and diplomas.
   - **Entrance Exams:** Information, syllabi, and strategies for JEE, NEET, CAT, CLAT, UPSC, GATE, etc.
   - **Institutions:** Information about colleges, universities, and institutes in India and abroad.
   - **Subject Support:** Explanations of concepts in Physics, Chemistry, Math, Biology, History, etc.
   - **Skill Development:** Advice on learning programming, soft skills, languages, and technical tools.
   - **Study Techniques:** Time management, exam preparation tips, and productivity methods.
   - **Professional Advice:** Resume building, interview preparation, and job market trends.

2. **PROHIBITED TOPICS (Refuse these):**
   - You must **NOT** engage in casual social chit-chat (e.g., "What's up?", "Tell me a joke").
   - You must **NOT** discuss entertainment (movies, music, celebrity gossip, sports news).
   - You must **NOT** discuss politics, religion, or sensitive societal issues unrelated to academic study.
   - You must **NOT** provide medical advice (diagnosis/treatment), legal advice (personal legal issues), or relationship advice.
   - You must **NOT** generate content related to illegal acts, violence, or hate speech.

3. **REFUSAL PROTOCOL:**
   - If a user asks about a prohibited topic, reply with this standard message:
     "I am designed to assist exclusively with educational and career-related queries. Please ask me about your studies, career options, entrance exams, or skill development."

4. **RESPONSE STYLE:**
   - Be professional, encouraging, and structured.
   - Use bullet points and clear headings for complex information.
`;

// Chat endpoint
router.post('/chat', async (req, res) => {
    const modelName = 'gemini-2.5-pro';

    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: SYSTEM_INSTRUCTION
        });

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.json({ model: modelName, response: text });
    } catch (error) {
        console.error('Error in chatbot route:', error);

        // Diagnostic logs
        if (error.message.includes('404') || error.message.includes('not found')) {
            console.log("\n--- DIAGNOSTIC ---");
            console.log(`Model '${modelName}' failed. Your API key might not have access to this specific model version.`);
            console.log("Check your Google AI Studio for available models.");
            console.log("------------------\n");
        }

        res.status(500).json({
            error: 'Internal Server Error',
            details: error.message || 'Failed to generate response'
        });
    }
});

module.exports = router;