import { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Trash2, Pencil, ArrowUpDown, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { CATEGORY_COLORS } from '../data/mockData';
import TransactionModal from './TransactionModal';

function TypeBadge({ type }) {
  const isIncome = type === 'income';
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
      isIncome ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
    }`}>
      {isIncome ? '↑ Income' : '↓ Expense'}
    </span>
  );
}

function SortIcon({ col, sortBy, sortDir }) {
  if (sortBy !== col) return <ArrowUpDown size={12} className="text-slate-600" />;
  return sortDir === 'asc' ? <ArrowUp size={12} className="text-cyan-400" /> : <ArrowDown size={12} className="text-cyan-400" />;
}

export default function TransactionsTable() {
  const { state, dispatch } = useFinance();
  const { transactions, role, filters } = state;
  const isAdmin = role === 'admin';

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchInput, setSearchInput] = useState(filters.search || '');

  const { type, sortBy, sortDir } = filters;

  useEffect(() => {
    setSearchInput(filters.search || '');
  }, [filters.search]);

  function setFilter(patch) {
    dispatch({ type: 'SET_FILTER', payload: patch });
  }

  function handleSearchChange(value) {
    setSearchInput(value);
    setFilter({ search: value });
  }

  function handleSort(col) {
    if (sortBy === col) setFilter({ sortDir: sortDir === 'asc' ? 'desc' : 'asc' });
    else setFilter({ sortBy: col, sortDir: 'desc' });
  }

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (type !== 'all') list = list.filter(t => t.type === type);

    const term = searchInput.trim().toLowerCase();
    if (term) {
      const terms = term.split(/\s+/);
      list = list.filter(t => {
        const haystack = `${t.description} ${t.category} ${t.type}`.toLowerCase();
        return terms.every(part => haystack.includes(part));
      });
    }

    list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'date') cmp = new Date(a.date) - new Date(b.date);
      else if (sortBy === 'amount') cmp = a.amount - b.amount;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [transactions, type, searchInput, sortBy, sortDir]);

  function handleEdit(t) { setEditData(t); setModalOpen(true); }
  function handleDelete(id) {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    setDeleteConfirm(null);
  }

  const thClass = "px-4 py-3 text-left text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-medium select-none";

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border-b border-white/5">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">Transactions</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search by description, category, or type..." value={searchInput}
              onChange={e => handleSearchChange(e.target.value)}
              className="w-full sm:w-48 bg-surface-700 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 transition-colors" />
          </div>
          {/* Type filter */}
          <div className="relative">
            <Filter size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
            <select value={type} onChange={e => setFilter({ type: e.target.value })}
              className="bg-surface-700 border border-white/10 rounded-xl pl-7 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none">
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          {isAdmin && (
            <button onClick={() => { setEditData(null); setModalOpen(true); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #00e5cc, #00a896)', color: '#0a0c0f' }}>
              <Plus size={13} />
              Add
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-600 dark:text-slate-400">
            <div className="text-4xl mb-3 opacity-30">₹</div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-300">No transactions found</p>
            <p className="text-xs mt-1 text-slate-500 dark:text-slate-300">Try adjusting your search or filters</p>
          </div>
        ) : (
          <table className="w-full table-fixed min-w-full">
            <colgroup>
              <col style={{ width: '130px' }} />
              <col />
              <col style={{ width: '120px' }} />
              <col style={{ width: '140px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '120px' }} />
            </colgroup>
            <thead>
              <tr className="border-b border-white/5">
                <th className={`${thClass} cursor-pointer hover:text-slate-300`} onClick={() => handleSort('date')}>
                  <span className="flex items-center gap-1.5">Date <SortIcon col="date" sortBy={sortBy} sortDir={sortDir} /></span>
                </th>
                <th className={thClass}>Description</th>
                <th className={`${thClass} cursor-pointer hover:text-slate-300 text-right`} onClick={() => handleSort('amount')}>
                  <span className="flex items-center justify-end gap-1.5">Amount <SortIcon col="amount" sortBy={sortBy} sortDir={sortDir} /></span>
                </th>
                <th className={thClass}>Category</th>
                <th className={thClass}>Type</th>
                {isAdmin && <th className={thClass}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.id}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                  style={{ animationDelay: `${i * 0.02}s` }}>
                  <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-300 number-display whitespace-nowrap">
                    {new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100 max-w-[180px] truncate overflow-hidden">
                    {t.description}
                  </td>
                  <td className={`px-4 py-3 text-sm number-display font-medium whitespace-nowrap text-right ${
                    t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3">                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: `${CATEGORY_COLORS[t.category] || '#64748b'}20`,
                        color: CATEGORY_COLORS[t.category] || '#94a3b8',
                      }}>
                      {t.category}
                    </span>
                  </td>
                  <td className="px-4 py-3"><TypeBadge type={t.type} /></td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(t)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                          <Pencil size={13} />
                        </button>
                        {deleteConfirm === t.id ? (
                          <div className="flex gap-1">
                            <button onClick={() => handleDelete(t.id)}
                              className="px-2 py-1 rounded-lg bg-rose-500/20 text-rose-400 text-xs hover:bg-rose-500/30 transition-all">
                              Confirm
                            </button>
                            <button onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 rounded-lg bg-white/5 text-slate-400 text-xs hover:bg-white/10 transition-all">
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(t.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all">
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} editData={editData} />
    </div>
  );
}
