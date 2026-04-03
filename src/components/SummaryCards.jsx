import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

function formatCurrency(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n.toLocaleString('en-IN')}`;
}

function SummaryCard({ title, value, subtitle, icon: Icon, color, glow, trend }) {
  return (
    <div className={`glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02] hover:border-opacity-20 ${glow}`}
      style={{ borderColor: `${color}22` }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-1" style={{ color: `${color}99` }}>{title}</p>
          <p className="number-display text-3xl font-semibold" style={{ color }}>{value}</p>
        </div>
        <div className="rounded-xl p-2.5" style={{ background: `${color}18` }}>
          <Icon size={20} style={{ color }} />
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        {trend > 0
          ? <ArrowUpRight size={13} className="text-emerald-400" />
          : <ArrowDownRight size={13} className="text-rose-400" />}
        <span className={trend > 0 ? 'text-emerald-400' : 'text-rose-400'}>
          {Math.abs(trend)}%
        </span>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}

export default function SummaryCards() {
  const { state } = useFinance();
  const { transactions } = state;

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <SummaryCard
        title="Total Balance"
        value={formatCurrency(balance)}
        subtitle="vs last month"
        icon={Wallet}
        color="#00e5cc"
        glow="hover:shadow-[0_0_24px_rgba(0,229,204,0.12)]"
        trend={13.2}
      />
      <SummaryCard
        title="Total Income"
        value={formatCurrency(income)}
        subtitle="vs last month"
        icon={TrendingUp}
        color="#00d68f"
        glow="hover:shadow-[0_0_24px_rgba(0,214,143,0.12)]"
        trend={8.4}
      />
      <SummaryCard
        title="Total Expenses"
        value={formatCurrency(expense)}
        subtitle="vs last month"
        icon={TrendingDown}
        color="#ff4d6d"
        glow="hover:shadow-[0_0_24px_rgba(255,77,109,0.12)]"
        trend={-3.1}
      />
    </div>
  );
}
