import { TrendingUp, TrendingDown, Hash, Award, BarChart3 } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { CATEGORY_COLORS } from '../data/mockData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function InsightCard({ icon: Icon, label, value, subvalue, color, children }) {
  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-3 h-full">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg" style={{ background: `${color}18` }}>
          <Icon size={15} style={{ color }} />
        </div>
        <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">{label}</span>
      </div>
      <div>
        <p className="font-semibold text-slate-100 text-lg leading-tight">{value}</p>
        {subvalue && <p className="text-xs text-slate-400 mt-1">{subvalue}</p>}
      </div>
      {children}
    </div>
  );
}

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card rounded-xl p-3 text-xs shadow-xl border border-white/10">
        <p className="font-semibold text-slate-300 mb-1">{label}</p>
        {payload.map(p => (
          <div key={p.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
            <span className="text-slate-400 capitalize">{p.name}:</span>
            <span className="number-display font-medium" style={{ color: p.fill }}>₹{p.value.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Insights() {
  const { state } = useFinance();
  const { transactions } = state;

  const now = new Date('2025-06-30');
  const curMonth = `2025-06`;
  const prevMonth = `2025-05`;

  const curTx = transactions.filter(t => t.date.startsWith(curMonth));
  const prevTx = transactions.filter(t => t.date.startsWith(prevMonth));

  const curExpense = curTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const prevExpense = prevTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const curIncome = curTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const prevIncome = prevTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);

  const expenseDiff = prevExpense ? (((curExpense - prevExpense) / prevExpense) * 100).toFixed(1) : 0;
  const incomeDiff = prevIncome ? (((curIncome - prevIncome) / prevIncome) * 100).toFixed(1) : 0;

  // Highest spending category
  const byCat = transactions.filter(t => t.type === 'expense').reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const topCat = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];

  const comparisonData = [
    { name: 'Jun', income: curIncome, expense: curExpense },
    { name: 'May', income: prevIncome, expense: prevExpense },
  ].reverse();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Insights</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Financial intelligence at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Highest spending */}
        <InsightCard icon={Award} label="Top Spending" color={topCat ? CATEGORY_COLORS[topCat[0]] : '#00e5cc'}
          value={topCat?.[0] || '—'}
          subvalue={topCat ? `₹${topCat[1].toLocaleString('en-IN')} total spent` : ''}>
          {topCat && (
            <div className="h-1 rounded-full overflow-hidden" style={{ background: '#22262f' }}>
              <div className="h-full rounded-full" style={{
                width: `${Math.min(100, (topCat[1] / Object.values(byCat).reduce((a, b) => a + b, 0)) * 100).toFixed(0)}%`,
                background: CATEGORY_COLORS[topCat[0]] || '#00e5cc',
              }} />
            </div>
          )}
        </InsightCard>

        {/* Total transactions */}
        <InsightCard icon={Hash} label="Total Transactions" color="#7c5cfc"
          value={transactions.length}
          subvalue={`${transactions.filter(t => t.type === 'income').length} income · ${transactions.filter(t => t.type === 'expense').length} expense`}
        />

        {/* Income comparison */}
        <InsightCard icon={TrendingUp} label="Income vs Last Month" color="#00d68f"
          value={`₹${(curIncome / 1000).toFixed(0)}K`}
          subvalue={`${incomeDiff > 0 ? '+' : ''}${incomeDiff}% vs May`}>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            Number(incomeDiff) >= 0 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
          }`}>
            {Number(incomeDiff) >= 0 ? '↑' : '↓'} {Math.abs(incomeDiff)}%
          </span>
        </InsightCard>

        {/* Expense comparison */}
        <InsightCard icon={TrendingDown} label="Expense vs Last Month" color="#ff4d6d"
          value={`₹${(curExpense / 1000).toFixed(0)}K`}
          subvalue={`${expenseDiff > 0 ? '+' : ''}${expenseDiff}% vs May`}>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            Number(expenseDiff) <= 0 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
          }`}>
            {Number(expenseDiff) > 0 ? '↑' : '↓'} {Math.abs(expenseDiff)}%
          </span>
        </InsightCard>
      </div>

      {/* Monthly comparison bar chart */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={15} className="text-cyan-400" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Monthly Comparison — May vs June</h3>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={comparisonData} barGap={8} barCategoryGap="40%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false}
              tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar dataKey="income" fill="#00d68f" radius={[6, 6, 0, 0]} opacity={0.85} />
            <Bar dataKey="expense" fill="#ff4d6d" radius={[6, 6, 0, 0]} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
