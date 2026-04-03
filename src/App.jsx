import { useFinance } from './context/FinanceContext';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';

function AppContent() {
  const { state } = useFinance();
  const { activeTab, darkMode } = state;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-surface-900 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'transactions' && <TransactionsPage />}
        {activeTab === 'insights' && <InsightsPage />}
      </main>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
