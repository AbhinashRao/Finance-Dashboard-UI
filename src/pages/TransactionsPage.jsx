import TransactionsTable from '../components/TransactionsTable';

export default function TransactionsPage() {
  return (
    <div className="space-y-5" style={{ animation: 'fadeIn 0.3s ease' }}>
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Transactions
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Full transaction history · All time</p>
      </div>
      <TransactionsTable />
    </div>
  );
}
