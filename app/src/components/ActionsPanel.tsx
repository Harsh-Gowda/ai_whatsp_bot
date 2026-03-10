import { useState } from 'react';
import { 
  Pause, Play, Star, Download, MessageSquare, 
  TrendingUp, Calendar, Clock 
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RevenueChart } from './RevenueChart';

// Animated Orb Component
function AIOrb({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-28 h-28 mx-auto">
      {/* Outer rotating ring */}
      <svg 
        className="absolute inset-0 w-full h-full ring-rotate"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="rgba(16, 185, 129, 0.2)"
          strokeWidth="1"
          strokeDasharray="8 4"
        />
      </svg>
      
      {/* Middle ring */}
      <svg 
        className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)]"
        style={{ animation: 'ring-rotate 12s linear infinite reverse' }}
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="rgba(16, 185, 129, 0.15)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      </svg>
      
      {/* Inner glowing orb */}
      <div 
        className={`
          absolute inset-4 rounded-full orb-glow transition-all duration-500
          ${isActive 
            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' 
            : 'bg-gradient-to-br from-amber-400 to-amber-600'
          }
        `}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          {isActive ? (
            <div className="w-3 h-3 rounded-full bg-white/80 animate-pulse" />
          ) : (
            <Pause className="w-6 h-6 text-white/80" />
          )}
        </div>
      </div>
    </div>
  );
}

// Quick Stat Card
function QuickStat({ 
  icon: Icon, 
  label, 
  value, 
  trend 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string; 
  trend?: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--noir-surface)]/50 border border-[var(--noir-border)]">
      <div className="w-8 h-8 rounded-lg bg-[var(--noir-charcoal)] flex items-center justify-center">
        <Icon className="w-4 h-4 text-emerald-400" />
      </div>
      <div>
        <p className="text-xs text-[var(--noir-text-secondary)]">{label}</p>
        <p className="text-sm font-semibold text-[var(--noir-text)]">{value}</p>
        {trend && (
          <p className="text-[10px] text-emerald-400">{trend}</p>
        )}
      </div>
    </div>
  );
}

export function ActionsPanel() {
  const { isBotPaused, toggleBotPause, stats } = useDashboard();
  const [showRevenueDialog, setShowRevenueDialog] = useState(false);

  const quickActions: Array<{
    label: string;
    icon: React.ElementType;
    onClick: () => void;
    variant: "default" | "outline";
    className: string;
  }> = [
    {
      label: isBotPaused ? 'Resume Bot' : 'Pause Bot',
      icon: isBotPaused ? Play : Pause,
      onClick: toggleBotPause,
      variant: isBotPaused ? 'default' : 'outline',
      className: isBotPaused 
        ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
        : 'border-amber-500/50 text-amber-400 hover:bg-amber-500/10',
    },
    {
      label: 'Request Review',
      icon: Star,
      onClick: () => {},
      variant: 'outline',
      className: 'border-[var(--noir-border)] text-[var(--noir-text-secondary)] hover:text-[var(--noir-text)] hover:bg-[var(--noir-surface)]',
    },
    {
      label: 'Export Leads',
      icon: Download,
      onClick: () => {},
      variant: 'outline',
      className: 'border-[var(--noir-border)] text-[var(--noir-text-secondary)] hover:text-[var(--noir-text)] hover:bg-[var(--noir-surface)]',
    },
  ];

  return (
    <div className="glass-card h-full flex flex-col min-h-[500px]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--noir-border)]">
        <h3 className="text-sm font-semibold text-[var(--noir-text)] uppercase tracking-wider">
          Actions
        </h3>
        <p className="text-xs text-[var(--noir-text-secondary)] mt-0.5">
          Quick controls & insights
        </p>
      </div>

      {/* AI Status Orb */}
      <div className="p-6 text-center border-b border-[var(--noir-border)]">
        <AIOrb isActive={!isBotPaused} />
        <p className="mt-4 text-sm font-medium text-[var(--noir-text)]">
          {isBotPaused ? 'AI Paused' : 'AI Active'}
        </p>
        <p className="text-xs text-[var(--noir-text-secondary)] mt-1">
          {isBotPaused 
            ? 'Bot will not respond to messages' 
            : 'Responding to patient inquiries'
          }
        </p>
      </div>

      {/* Quick Actions */}
      <div className="p-4 space-y-2">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            className={`w-full justify-start gap-3 ${action.className}`}
            onClick={action.onClick}
          >
            <action.icon className="w-4 h-4" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="flex-1 p-4 space-y-3">
        <p className="text-xs font-medium text-[var(--noir-text-secondary)] uppercase tracking-wider">
          Quick Stats
        </p>
        
        <QuickStat
          icon={TrendingUp}
          label="Response Rate"
          value="94%"
          trend="+3% this week"
        />
        
        <QuickStat
          icon={Clock}
          label="Avg Response Time"
          value="12s"
          trend="-2s improvement"
        />
        
        <QuickStat
          icon={MessageSquare}
          label="Conversations Today"
          value="23"
        />

        {/* Revenue Recovery Card */}
        <Dialog open={showRevenueDialog} onOpenChange={setShowRevenueDialog}>
          <DialogTrigger asChild>
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/15 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-[var(--noir-text-secondary)]">Revenue Recovery</span>
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-[var(--noir-text)]">
                ${stats.revenueRecovered.toLocaleString()}
              </p>
              <p className="text-xs text-emerald-400 mt-1">
                +{stats.revenueChange}% from last period
              </p>
              <p className="text-[10px] text-[var(--noir-text-secondary)] mt-2">
                Click to view breakdown
              </p>
            </div>
          </DialogTrigger>
          
          <DialogContent className="bg-[var(--noir-charcoal-lifted)] border-[var(--noir-border)] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[var(--noir-text)]">
                Revenue Recovery Breakdown
              </DialogTitle>
              <DialogDescription className="text-[var(--noir-text-secondary)]">
                After-hours bookings secured by AI receptionist
              </DialogDescription>
            </DialogHeader>
            <RevenueChart />
          </DialogContent>
        </Dialog>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-[var(--noir-border)]">
        <div className="flex items-center justify-between text-xs text-[var(--noir-text-secondary)]">
          <span>Last synced</span>
          <span className="text-emerald-400">Just now</span>
        </div>
      </div>
    </div>
  );
}