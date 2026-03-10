import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

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

// Mock Data
const mockStats: DashboardStats = {
  leadsCaptured: 128,
  leadsChange: 12,
  bookingsSecured: 34,
  bookingsChange: 8,
  afterHoursConversations: 89,
  conversationsChange: 22,
  revenueRecovered: 4120,
  revenueChange: 15,
};

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Marcus Reid',
    phone: '+1 (555) 123-4567',
    inquiry: 'Whitening consultation',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: 'new',
    intentLevel: 'high',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    phone: '+1 (555) 234-5678',
    inquiry: 'Implant pricing',
    timestamp: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    status: 'replied',
    intentLevel: 'high',
  },
  {
    id: '3',
    name: 'Diego Ortiz',
    phone: '+1 (555) 345-6789',
    inquiry: 'Book cleaning',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    status: 'booked',
    intentLevel: 'medium',
  },
  {
    id: '4',
    name: 'Aisha Patel',
    phone: '+1 (555) 456-7890',
    inquiry: 'Emergency visit',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'escalated',
    intentLevel: 'high',
  },
  {
    id: '5',
    name: 'James Wilson',
    phone: '+1 (555) 567-8901',
    inquiry: 'Invisalign consultation',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: 'replied',
    intentLevel: 'medium',
  },
];

const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'Hi, do you offer weekend appointments?',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Yes—Saturday 9am–2pm. Would you like me to hold a slot?',
    timestamp: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    role: 'user',
    content: 'Yes please, 10am.',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    role: 'assistant',
    content: "Reserved 10am Saturday. I'll text a confirmation shortly.",
    timestamp: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
  },
];

// Context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [stats] = useState<DashboardStats>(mockStats);
  const [leads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [chatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [isBotPaused, setIsBotPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleBotPause = useCallback(() => {
    setIsBotPaused(prev => !prev);
  }, []);

  const refreshData = useCallback(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshData]);

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