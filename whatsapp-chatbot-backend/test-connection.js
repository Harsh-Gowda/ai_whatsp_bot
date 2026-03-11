const axios = require('axios');
const db = require('./services/supabase');
require('dotenv').config();

const testWebhook = async () => {
    console.log('--- Starting Automated Test ---');

    // 1. Verify Database Connection
    try {
        console.log('1. Checking database connection...');
        const { data, error } = await require('@supabase/supabase-js').createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
        ).from('leads').select('count', { count: 'exact', head: true });

        if (error) throw error;
        console.log('✅ Database connected successfully!');
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    }

    // 2. Simulate WhatsApp Webhook Call
    try {
        console.log('\n2. Simulating WhatsApp Webhook message...');
        const payload = {
            object: 'whatsapp_business_account',
            entry: [{
                changes: [{
                    value: {
                        messages: [{
                            from: '1234567890',
                            text: { body: 'Test message from Automated Script' },
                            timestamp: `${Math.floor(Date.now() / 1000)}`
                        }]
                    },
                    field: 'messages'
                }]
            }]
        };

        const response = await axios.post('http://localhost:3000/webhook', payload);
        console.log(`✅ Webhook simulation status: ${response.status} (${response.data})`);
    } catch (err) {
        console.error('❌ Webhook simulation failed:', err.message);
    }

    // 3. Verify Data in Supabase
    try {
        console.log('\n3. Verifying data in Supabase...');
        const { data: lead, error: leadError } = await require('@supabase/supabase-js').createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
        ).from('leads')
            .select('*, chat_messages(*)')
            .eq('phone', '1234567890')
            .single();

        if (leadError) throw leadError;

        console.log('✅ Lead found in Supabase!');
        console.log(`- Lead ID: ${lead.id}`);
        console.log(`- Messages: ${lead.chat_messages.length}`);
        console.log('--- Test Complete ---');
    } catch (err) {
        console.error('❌ Data verification failed:', err.message);
    }
};

testWebhook();
