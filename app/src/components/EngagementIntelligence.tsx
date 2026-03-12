import { 
  Sparkles, MessageCircle, BarChart3, 
  BrainCircuit, Zap, CheckCircle2,
  TrendingUp, TrendingDown, Minus
} from 'lucide-react';

const topics = [
  { topic: 'Invisalign Pricing', count: 42, percentage: 85, trend: 'up' },
  { topic: 'Emergency Appointment', count: 31, percentage: 65, trend: 'up' },
  { topic: 'Insurance Coverage', count: 28, percentage: 58, trend: 'down' },
  { topic: 'Root Canal Inquiry', count: 15, percentage: 32, trend: 'stable' },
];

const highlights = [
  { 
    title: 'Smart Booking Secured', 
    desc: 'AI successfully scheduled a dental exam for a high-intent lead after 9 PM.',
    time: '2h ago',
    icon: CheckCircle2,
    color: 'text-emerald-400'
  },
  { 
    title: 'High-Intent Detected', 
    desc: 'New lead from "Sarah M." shows urgent intent regarding wisdom tooth pain.',
    time: '4h ago',
    icon: Zap,
    color: 'text-amber-400'
  },
  { 
    title: 'Language Switch', 
    desc: 'AI detected Spanish inquiry and adjusted response language automatically.',
    time: '8h ago',
    icon: BrainCircuit,
    color: 'text-blue-400'
  },
];

export function EngagementIntelligence() {
  return (
    <div className="glass-card h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[var(--noir-border)] flex items-center justify-between bg-gradient-to-r from-emerald-500/5 to-transparent">
        <div>
          <h3 className="text-sm font-semibold text-[var(--noir-text)] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Engagement Intelligence
          </h3>
          <p className="text-xs text-[var(--noir-text-secondary)] mt-0.5">
            AI-driven patient insights & trends
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {/* Sentiment Analysis Section */}
        <section>
          <h4 className="text-[10px] font-medium text-[var(--noir-text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-2">
            <MessageCircle className="w-3.5 h-3.5" />
            Patient Sentiment
          </h4>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-[var(--noir-surface)] h-2 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-500" style={{ width: '74%' }} />
              <div className="h-full bg-amber-500" style={{ width: '18%' }} />
              <div className="h-full bg-red-500" style={{ width: '8%' }} />
            </div>
            <span className="text-xs font-semibold text-emerald-400">74% POSITIVE</span>
          </div>
          <div className="flex items-center gap-4 mt-2 justify-between">
            <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
               <span className="text-[10px] text-[var(--noir-text-secondary)]">Satisfied</span>
            </div>
            <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
               <span className="text-[10px] text-[var(--noir-text-secondary)]">Neutral</span>
            </div>
            <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
               <span className="text-[10px] text-[var(--noir-text-secondary)]">Urgent</span>
            </div>
          </div>
        </section>

        {/* Top Topics Section */}
        <section>
          <h4 className="text-[10px] font-medium text-[var(--noir-text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5" />
            Top Inquiry Topics
          </h4>
          <div className="space-y-3">
            {topics.map((item) => (
              <div key={item.topic} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--noir-text)] font-medium">{item.topic}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--noir-text-secondary)]">{item.count}</span>
                    {item.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                    {item.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
                    {item.trend === 'stable' && <Minus className="w-3 h-3 text-amber-400" />}
                  </div>
                </div>
                <div className="w-full bg-[var(--noir-surface)] h-1 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500/30 border-r border-emerald-400" 
                    style={{ width: `${item.percentage}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence Highlights Section */}
        <section>
          <h4 className="text-[10px] font-medium text-[var(--noir-text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            AI Intelligence Highlights
          </h4>
          <div className="space-y-3">
            {highlights.map((item, i) => (
              <div 
                key={i} 
                className="p-3 rounded-xl bg-[var(--noir-surface)]/50 border border-[var(--noir-border)] hover:bg-[var(--noir-surface)] transition-colors cursor-default"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2 font-medium text-xs text-[var(--noir-text)]">
                    <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                    {item.title}
                  </div>
                  <span className="text-[10px] text-[var(--noir-text-secondary)]">{item.time}</span>
                </div>
                <p className="text-[10px] text-[var(--noir-text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer Label */}
      <div className="p-3 border-t border-[var(--noir-border)] text-center">
        <button className="text-[10px] text-emerald-400 hover:text-emerald-300 font-medium transition-colors uppercase tracking-widest">
          View full intelligence report
        </button>
      </div>
    </div>
  );
}
