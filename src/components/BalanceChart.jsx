import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { balanceTrendData } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card rounded-xl p-3 text-xs shadow-xl border border-white/10">
        <p className="font-semibold text-slate-900 dark:text-slate-200 mb-2 uppercase tracking-wider">{label}</p>
        {payload.map(p => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-slate-600 dark:text-slate-400 capitalize">{p.name}:</span>
            <span className="number-display font-medium" style={{ color: p.color }}>
              ₹{p.value.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function BalanceChart() {
  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">Balance Trend</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Jan – Jun 2025</p>
        </div>
        <div className="flex gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#00e5cc] inline-block rounded" />Balance</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#00d68f] inline-block rounded" />Income</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#ff4d6d] inline-block rounded" />Expense</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={balanceTrendData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00e5cc" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#00e5cc" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d68f" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#00d68f" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff4d6d" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ff4d6d" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false}
            tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="income" stroke="#00d68f" strokeWidth={2} fill="url(#gIncome)" dot={false} />
          <Area type="monotone" dataKey="expense" stroke="#ff4d6d" strokeWidth={2} fill="url(#gExpense)" dot={false} />
          <Area type="monotone" dataKey="balance" stroke="#00e5cc" strokeWidth={2.5} fill="url(#gBalance)"
            dot={{ fill: '#00e5cc', r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: '#00e5cc' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
