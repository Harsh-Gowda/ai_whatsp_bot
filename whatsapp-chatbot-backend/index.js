const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const db = require('./services/supabase');
const gemini = require('./services/gemini');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

/**
 * Webhook Verification (Meta Challenge)
 */
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Webhook verified');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

/**
 * Receive WhatsApp Messages
 */
app.post('/webhook', async (req, res) => {
    try {
        const body = req.body;

        // Check if it's a message from WhatsApp
        if (body.object === 'whatsapp_business_account' && body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
            const message = body.entry[0].changes[0].value.messages[0];
            const phone = message.from;
            const text = message.text?.body || '';

            console.log(`Received message from ${phone}: ${text}`);

            // 1. Save/Get Lead in Supabase
            const lead = await db.getOrCreateLead(phone);

            // 2. Save User Message
            await db.saveMessage(lead.id, 'user', text);

            // 3. Call AI Service (Gemini)
            const aiResponse = await gemini.generateResponse(text);

            // 4. Save AI Response
            await db.saveMessage(lead.id, 'assistant', aiResponse);

            // 4. Send WhatsApp Reply (if configured)
            // TODO: Implement sendMessage utility

            res.status(200).send('EVENT_RECEIVED');
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).send('Webhook Error');
    }
});

/**
 * Health Check
 */
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`AI Chatbot server running on port ${PORT}`);
});
