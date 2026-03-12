import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Users, MessageSquare, Target, Activity } from 'lucide-react';

const generateData = () => {
    const hours = ['8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'];
    return hours.map((hour, index) => ({
        hour,
        conversations: [5, 12, 18, 15, 22, 19, 25, 14][index],
        bookings: [1, 3, 5, 4, 6, 5, 8, 3][index],
    }));
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="chart-tooltip">
                <p className="text-xs font-medium text-[var(--noir-text)] mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                        <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-[var(--noir-text-secondary)]">{entry.name}:</span>
                        <span className="text-[var(--noir-text)] font-medium">
                            {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export function PerformanceStats() {
    const data = useMemo(() => generateData(), []);

    const metrics = [
        {
            label: 'Lead Conversion',
            value: '24.8%',
            trend: '+2.1%',
            icon: Target,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10'
        },
        {
            label: 'AI Auto-Reply',
            value: '92%',
            trend: '+4.5%',
            icon: Activity,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10'
        },
        {
            label: 'Active Leads',
            value: '154',
            trend: '+12',
            icon: Users,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10'
        }
    ];

    return (
        <div className="glass-card h-full flex flex-col p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-[var(--noir-text)] uppercase tracking-wider">
                        Performance Overview
                    </h3>
                    <p className="text-xs text-[var(--noir-text-secondary)] mt-0.5">
                        Real-time engagement metrics
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] font-medium text-emerald-400 uppercase">Live</span>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4">
                {metrics.map((metric) => (
                    <div key={metric.label} className="p-4 rounded-2xl bg-[var(--noir-surface)]/50 border border-[var(--noir-border)]">
                        <div className={`w-8 h-8 rounded-lg ${metric.bg} flex items-center justify-center mb-3`}>
                            <metric.icon className={`w-4 h-4 ${metric.color}`} />
                        </div>
                        <p className="text-[10px] text-[var(--noir-text-secondary)] uppercase tracking-wider">
                            {metric.label}
                        </p>
                        <div className="flex items-end gap-2 mt-1">
                            <p className="text-xl font-bold text-[var(--noir-text)]">{metric.value}</p>
                            <span className="text-[10px] text-emerald-400 mb-1">{metric.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Chart */}
            <div className="flex-1 min-h-[250px] mt-4">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-medium text-[var(--noir-text-secondary)] flex items-center gap-2">
                        <MessageSquare className="w-3 h-3" />
                        Engagement over time
                    </h4>
                    <div className="flex items-center gap-4 text-[10px]">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-[var(--noir-text-secondary)]">Conversations</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-[var(--noir-text-secondary)]">Bookings</span>
                        </div>
                    </div>
                </div>
                
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorBook" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke="var(--noir-border)" 
                            vertical={false}
                            opacity={0.3}
                        />
                        <XAxis 
                            dataKey="hour" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--noir-text-secondary)', fontSize: 10 }}
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--noir-text-secondary)', fontSize: 10 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="conversations"
                            name="Conversations"
                            stroke="#10B981"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorConv)"
                        />
                        <Area
                            type="monotone"
                            dataKey="bookings"
                            name="Bookings"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorBook)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
            <div className="pt-4 border-t border-[var(--noir-border)]">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] text-[var(--noir-text-secondary)]">
                        AI Efficiency: <span className="text-emerald-400 font-medium">98.2% accuracy</span>
                    </p>
                    <button className="text-[10px] text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                        View detailed report →
                    </button>
                </div>
            </div>
        </div>
    );
}
