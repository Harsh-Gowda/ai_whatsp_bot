import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Types
export interface Lead {
  id: string;
  name: string;
  phone: string;
  inquiry: string;
  timestamp: string;
  status: 'new' | 'replied' | 'booked' | 'escalated';
  intentLevel: 'high' | 'medium' | 'low';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface DashboardStats {
  leadsCaptured: number;
  leadsChange: number;
  bookingsSecured: number;
  bookingsChange: number;
  afterHoursConversations: number;
  conversationsChange: number;
  revenueRecovered: number;
  revenueChange: number;
}

export interface DashboardContextType {
  // Stats
  stats: DashboardStats;

  // Leads
  leads: Lead[];
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;

  // Chat
  chatMessages: ChatMessage[];

  // Actions
  isBotPaused: boolean;
  toggleBotPause: () => void;
  refreshData: () => void;

  // Loading states
  isLoading: boolean;
}

const initialStats: DashboardStats = {
  leadsCaptured: 0,
  leadsChange: 0,
  bookingsSecured: 0,
  bookingsChange: 0,
  afterHoursConversations: 0,
  conversationsChange: 0,
  revenueRecovered: 0,
  revenueChange: 0,
};

// Context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isBotPaused, setIsBotPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate stats from leads
  const calculateStats = useCallback((currentLeads: Lead[]) => {
    const booked = currentLeads.filter(l => l.status === 'booked').length;
    setStats({
      leadsCaptured: currentLeads.length,
      leadsChange: 12, // Mocked trend
      bookingsSecured: booked,
      bookingsChange: 8,
      afterHoursConversations: Math.floor(currentLeads.length * 0.8),
      conversationsChange: 22,
      revenueRecovered: booked * 150, // Assuming average $150 per booking
      revenueChange: 15,
    });
  }, []);

  // Fetch Leads
  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedLeads: Lead[] = data.map(l => ({
          id: l.id,
          name: l.name || 'New Lead',
          phone: l.phone,
          inquiry: l.inquiry || 'No inquiry text',
          timestamp: l.created_at,
          status: (l.status as any) || 'new',
          intentLevel: (l.intent_level as any) || 'medium',
        }));
        setLeads(mappedLeads);
        calculateStats(mappedLeads);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  }, [calculateStats]);

  // Fetch Chat Messages for selected lead
  const fetchMessages = useCallback(async (leadId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        setChatMessages(data.map(m => ({
          id: m.id,
          role: m.role as any,
          content: m.content,
          timestamp: m.created_at,
        })));
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  // Effect for fetching messages when lead changes
  useEffect(() => {
    if (selectedLead) {
      fetchMessages(selectedLead.id);

      // Subscribe to messages for this lead
      const channel = supabase
        .channel(`messages-${selectedLead.id}`)
        .on('postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `lead_id=eq.${selectedLead.id}` },
          () => {
            fetchMessages(selectedLead.id);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setChatMessages([]);
    }
  }, [selectedLead, fetchMessages]);

  const toggleBotPause = useCallback(() => {
    setIsBotPaused(prev => !prev);
    // In a real app, you would also update this in the database or via API
  }, []);

  const refreshData = useCallback(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Initial fetch and Real-time subscription for leads
  useEffect(() => {
    fetchLeads();

    const leadsChannel = supabase
      .channel('leads-all')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        () => {
          fetchLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(leadsChannel);
    };
  }, [fetchLeads]);

  const value: DashboardContextType = {
    stats,
    leads,
    selectedLead,
    setSelectedLead,
    chatMessages,
    isBotPaused,
    toggleBotPause,
    refreshData,
    isLoading,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}