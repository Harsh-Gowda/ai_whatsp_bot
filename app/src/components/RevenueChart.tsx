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
import { TrendingUp, Calendar, DollarSign, Clock } from 'lucide-react';

// Mock data for the chart
const generateChartData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, index) => ({
    day,
    afterHours: [450, 680, 520, 890, 750, 920, 410][index],
    regularHours: [320, 450, 380, 520, 410, 280, 190][index],
    total: 0, // calculated below
  })).map(d => ({ ...d, total: d.afterHours + d.regularHours }));
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
              ${entry.value.toLocaleString()}
            </span>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t border-[var(--noir-border)]">
          <span className="text-[var(--noir-text-secondary)] text-xs">Total: </span>
          <span className="text-emerald-400 font-semibold text-xs">
            ${payload.reduce((sum: number, entry: any) => sum + entry.value, 0).toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  const data = useMemo(() => generateChartData(), []);
  
  const totalAfterHours = data.reduce((sum, d) => sum + d.afterHours, 0);
  const totalRevenue = data.reduce((sum, d) => sum + d.total, 0);
  const afterHoursPercentage = Math.round((totalAfterHours / totalRevenue) * 100);
  const avgBookingValue = Math.round(totalAfterHours / 12); // Assuming 12 after-hours bookings

  const stats = [
    {
      label: 'After-Hours Revenue',
      value: `$${totalAfterHours.toLocaleString()}`,
      icon: Clock,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'AI Contribution',
      value: `${afterHoursPercentage}%`,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: 'Avg Booking Value',
      value: `$${avgBookingValue}`,
      icon: Calendar,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div 
            key={stat.label}
            className="flex items-center gap-3 p-3 rounded-xl bg-[var(--noir-surface)]/50 border border-[var(--noir-border)]"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] text-[var(--noir-text-secondary)] uppercase tracking-wider">
                {stat.label}
              </p>
              <p className={`text-lg font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAfterHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRegular" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--noir-border)" 
              vertical={false}
            />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--noir-text-secondary)', fontSize: 11 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--noir-text-secondary)', fontSize: 11 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="afterHours"
              name="After-Hours (AI)"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAfterHours)"
            />
            <Area
              type="monotone"
              dataKey="regularHours"
              name="Regular Hours"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRegular)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-[var(--noir-text-secondary)]">
            After-Hours Bookings (AI)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-xs text-[var(--noir-text-secondary)]">
            Regular Hours
          </span>
        </div>
      </div>

      {/* Insight */}
      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
        <p className="text-sm text-[var(--noir-text)]">
          <span className="text-emerald-400 font-semibold">Insight:</span> Your AI receptionist 
          secured <span className="text-emerald-400 font-semibold">${totalAfterHours.toLocaleString()}</span> in 
          after-hours bookings this week, representing a 
          <span className="text-emerald-400 font-semibold"> {afterHoursPercentage}%</span> contribution to total revenue.
        </p>
      </div>
    </div>
  );
}