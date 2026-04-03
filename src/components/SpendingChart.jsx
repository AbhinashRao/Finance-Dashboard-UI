import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useFinance } from '../context/FinanceContext';
import { CATEGORY_COLORS } from '../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const d = payload[0];
    return (
      <div className="glass-card rounded-xl p-3 text-xs shadow-xl border border-white/10">
        <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{d.name}</p>
        <p className="number-display" style={{ color: d.payload.fill }}>
          ₹{d.value.toLocaleString('en-IN')}
        </p>
        <p className="text-slate-600 dark:text-slate-400 mt-0.5">{d.payload.percent}% of spending</p>
      </div>
    );
  }
  return null;
};

export default function SpendingChart() {
  const { state } = useFinance();
  const expenses = state.transactions.filter(t => t.type === 'expense');
  const total = expenses.reduce((s, t) => s + t.amount, 0);

  const byCategory = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const data = Object.entries(byCategory)
    .map(([name, value]) => ({
      name,
      value,
      fill: CATEGORY_COLORS[name] || '#64748b',
      percent: ((value / total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 7);

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Spending Breakdown</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">By category</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={72}
                dataKey="value" paddingAngle={2} strokeWidth={0}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} opacity={0.9} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs text-slate-600 dark:text-slate-400">Total</p>
            <p className="number-display text-sm font-semibold text-slate-900 dark:text-slate-100">
              ₹{(total / 1000).toFixed(0)}K
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.fill }} />
              <span className="text-xs text-slate-400 flex-1 truncate">{item.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-surface-600 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.percent}%`, background: item.fill }} />
                </div>
                <span className="text-xs number-display text-slate-300 w-8 text-right">{item.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
