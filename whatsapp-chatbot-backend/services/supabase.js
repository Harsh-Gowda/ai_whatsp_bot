const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Service to handle database operations for WhatsApp Chatbot
 */
const db = {
    /**
     * Get or create a lead by phone number
     */
    getOrCreateLead: async (phone, name = 'New Patient') => {
        // 1. Check if lead exists
        const { data: existingLead, error: findError } = await supabase
            .from('leads')
            .select('*')
            .eq('phone', phone)
            .single();

        if (existingLead) {
            // Update last_message_at
            await supabase
                .from('leads')
                .update({ last_message_at: new Date() })
                .eq('id', existingLead.id);
            return existingLead;
        }

        // 2. Create new lead if not found
        const { data: newLead, error: createError } = await supabase
            .from('leads')
            .insert([{ phone, name, status: 'new', intent_level: 'medium' }])
            .select()
            .single();

        if (createError) {
            console.error('Error creating lead:', createError);
            throw createError;
        }

        return newLead;
    },

    /**
     * Save a chat message
     */
    saveMessage: async (leadId, role, content) => {
        const { data, error } = await supabase
            .from('chat_messages')
            .insert([{ lead_id: leadId, role, content }])
            .select();

        if (error) {
            console.error('Error saving message:', error);
            throw error;
        }

        return data[0];
    },

    /**
     * Update lead info (name, inquiry, intent)
     */
    updateLead: async (leadId, updates) => {
        const { data, error } = await supabase
            .from('leads')
            .update(updates)
            .eq('id', leadId)
            .select();

        if (error) {
            console.error('Error updating lead:', error);
            throw error;
        }

        return data[0];
    }
};

module.exports = db;
