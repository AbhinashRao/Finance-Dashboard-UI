import { Moon, Sun, Shield, Eye, LayoutDashboard, ArrowLeftRight, Lightbulb } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
];

export default function Navbar() {
  const { state, dispatch } = useFinance();
  const { role, darkMode, activeTab } = state;

  return (
    <header className="sticky top-0 z-40 border-b border-white/5"
      style={{ background: 'rgba(10,12,15,0.9)', backdropFilter: 'blur(16px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #00e5cc, #00a896)', color: '#0a0c0f' }}>
              F
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-200 text-sm hidden sm:block tracking-tight">FinanceOS</span>
          </div>

          {/* Tabs */}
          <nav className="flex items-center gap-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button key={tab.id}
                  onClick={() => dispatch({ type: 'SET_TAB', payload: tab.id })}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                  }`}>
                  <Icon size={13} />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Role toggle */}
            <button
              onClick={() => dispatch({ type: 'SET_ROLE', payload: role === 'admin' ? 'viewer' : 'admin' })}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                role === 'admin'
                  ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
                  : 'border-slate-600/50 text-slate-400 bg-white/5'
              }`}>
              {role === 'admin' ? <Shield size={12} /> : <Eye size={12} />}
              <span className="hidden sm:block">{role === 'admin' ? 'Admin' : 'Viewer'}</span>
            </button>

            {/* Dark mode toggle */}
            <button onClick={() => dispatch({ type: 'TOGGLE_DARK' })}
              aria-label="Toggle dark mode"
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/10 transition-all duration-200">
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
              <span className="text-xs font-medium hidden sm:inline">
                {darkMode ? 'Light' : 'Dark'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
