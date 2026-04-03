import Insights from '../components/Insights';
import SpendingChart from '../components/SpendingChart';

export default function InsightsPage() {
  return (
    <div className="space-y-5" style={{ animation: 'fadeIn 0.3s ease' }}>
      <Insights />
      <div className="max-w-sm">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">Category Breakdown</h2>
        <SpendingChart />
      </div>
    </div>
  );
}
