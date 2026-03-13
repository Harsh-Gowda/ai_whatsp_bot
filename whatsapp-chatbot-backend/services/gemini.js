const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Service to handle Gemini AI interactions
 */
const gemini = {
    /**
     * Generate a response based on user message and context
     */
    generateResponse: async (userMessage, history = []) => {
        try {
            // Build prompt with context if history exists
            const systemPrompt = `You are a helpful AI dental assistant for ${process.env.CLINIC_NAME || 'Dental Studio'}. 
            Your goal is to help patients with inquiries about dental services, pricing, and booking appointments.
            Be professional, empathetic, and concise. 
            If you don't know something, ask them to leave their details for a human representative.`;

            const chat = model.startChat({
                history: history,
                generationConfig: {
                    maxOutputTokens: 500,
                },
            });

            const result = await chat.sendMessage(`${systemPrompt}\n\nUser: ${userMessage}`);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Error generating Gemini response:', error);
            if (error.response) console.error('Error Details:', error.response);
            return "I'm sorry, I'm having trouble processing that right now. Could you please try again later?";
        }
    }
};

module.exports = gemini;
