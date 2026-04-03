import SummaryCards from '../components/SummaryCards';
import BalanceChart from '../components/BalanceChart';
import SpendingChart from '../components/SpendingChart';
import TransactionsTable from '../components/TransactionsTable';

export default function DashboardPage() {
  return (
    <div className="space-y-5" style={{ animation: 'fadeIn 0.3s ease' }}>
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Overview
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">June 2025 · Financial Summary</p>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <BalanceChart />
        </div>
        <div>
          <SpendingChart />
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">Recent Transactions</h2>
        <TransactionsTable limit={8} />
      </div>
    </div>
  );
}
