import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { useFinance } from '../context/FinanceContext';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function TransactionModal({ open, onClose, editData }) {
  const { dispatch } = useFinance();
  const isEdit = !!editData;

  const empty = { date: new Date().toISOString().slice(0, 10), description: '', amount: '', category: CATEGORIES[0], type: 'expense' };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) setForm({ ...editData, amount: String(editData.amount) });
    else setForm(empty);
    setErrors({});
  }, [editData, open]);

  function validate() {
    const e = {};
    if (!form.date) e.date = 'Required';
    if (!form.description.trim()) e.description = 'Required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) e.amount = 'Must be a positive number';
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const payload = { ...form, amount: Number(form.amount), id: isEdit ? form.id : generateId() };
    dispatch({ type: isEdit ? 'EDIT_TRANSACTION' : 'ADD_TRANSACTION', payload });
    onClose();
  }

  if (!open) return null;

  const inputClass = "w-full bg-surface-700 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-cyan-500/60 transition-colors";
  const errClass = "text-xs text-rose-400 mt-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="glass-card rounded-2xl p-6 w-full max-w-md shadow-2xl border border-white/10"
        style={{ animation: 'slideUp 0.2s ease' }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">{isEdit ? 'Edit Transaction' : 'New Transaction'}</h2>
          <button onClick={onClose} className="text-slate-500 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-400 mb-1.5 block">Date</label>
              <input type="date" className={inputClass} value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              {errors.date && <p className={errClass}>{errors.date}</p>}
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Type</label>
              <select className={inputClass} value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Description</label>
            <input type="text" className={inputClass} placeholder="e.g. Monthly Salary" value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            {errors.description && <p className={errClass}>{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Amount (₹)</label>
              <input type="number" className={inputClass} placeholder="0.00" value={form.amount}
                onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
              {errors.amount && <p className={errClass}>{errors.amount}</p>}
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Category</label>
              <select className={inputClass} value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 text-sm hover:border-white/20 hover:text-slate-200 transition-all">
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ background: 'linear-gradient(135deg, #00e5cc, #00a896)', color: '#0a0c0f' }}>
            {isEdit ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}
