import { useEffect, useState } from 'react';
import { TrendingUp, Users, Calendar, MessageCircle, DollarSign } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

interface StatCardProps {
  label: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  delay: number;
}

function StatCard({ label, value, change, icon: Icon, delay }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const isPositive = change >= 0;

  return (
    <div 
      className={`
        flex flex-col p-5 rounded-2xl bg-[var(--noir-charcoal-lifted)] border border-[var(--noir-border)]
        hover-lift transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-[var(--noir-text-secondary)] uppercase tracking-wider">
          {label}
        </span>
        <div className="w-8 h-8 rounded-lg bg-[var(--noir-surface)] flex items-center justify-center">
          <Icon className="w-4 h-4 text-emerald-400" />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-[var(--noir-text)] font-tabular">
          {typeof value === 'number' && value >= 1000 
            ? value.toLocaleString() 
            : value}
        </span>
        
        <div 
          className={`
            flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
            ${isPositive 
              ? 'bg-emerald-500/15 text-emerald-400' 
              : 'bg-red-500/15 text-red-400'
            }
          `}
        >
          <TrendingUp className={`w-3 h-3 ${!isPositive && 'rotate-180'}`} />
          {isPositive ? '+' : ''}{change}%
        </div>
      </div>
    </div>
  );
}

export function StatsBar() {
  const { stats, isLoading } = useDashboard();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const statItems = [
    { label: 'Leads Captured', value: stats.leadsCaptured, change: stats.leadsChange, icon: Users },
    { label: 'Bookings Secured', value: stats.bookingsSecured, change: stats.bookingsChange, icon: Calendar },
    { label: 'After-Hours Conversations', value: stats.afterHoursConversations, change: stats.conversationsChange, icon: MessageCircle },
    { label: 'Revenue Recovered', value: `$${stats.revenueRecovered.toLocaleString()}`, change: stats.revenueChange, icon: DollarSign },
  ];

  return (
    <div className="w-full bg-[var(--noir-charcoal)] border-b border-[var(--noir-border)]">
      <div className="px-4 sm:px-6 lg:px-7 py-6">
        {/* Header */}
        <div 
          className={`
            flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6
            transition-all duration-500
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}
        >
          <div>
            <h1 className="text-xl font-bold text-[var(--noir-text)] tracking-tight">
              Performance Overview
            </h1>
            <p className="text-sm text-[var(--noir-text-secondary)] mt-1">
              Last 7 days vs previous period
            </p>
          </div>
          
          {isLoading && (
            <div className="flex items-center gap-2 mt-3 sm:mt-0">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-[var(--noir-text-secondary)]">Updating...</span>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((stat, index) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              delay={200 + index * 80}
            />
          ))}
        </div>
      </div>
    </div>
  );
}