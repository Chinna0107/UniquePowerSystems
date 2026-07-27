import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Download, Search, Filter, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface Transaction {
  id: number;
  type: 'credit' | 'debit';
  title: string;
  amount: number;
  date: string;
  bill_url: string | null;
  created_at: string;
}

interface Stats {
  monthly: { credits: number; debits: number };
  total: { credits: number; debits: number };
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Filters
  const [filterType, setFilterType] = useState<'' | 'credit' | 'debit'>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    type: 'credit' as 'credit' | 'debit',
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [uploading, setUploading] = useState(false);
  const [billUrl, setBillUrl] = useState<string | null>(null);

  const token = localStorage.getItem('adminToken');

  const fetchTransactions = async () => {
    try {
      let queryParams = new URLSearchParams();
      if (filterType) queryParams.append('type', filterType);
      if (startDate) queryParams.append('start_date', startDate);
      if (endDate) queryParams.append('end_date', endDate);

      const res = await fetch(`${API_URL}/transactions?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    } catch (err) {
      console.error('Failed to fetch transactions', err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/transactions/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchTransactions(), fetchStats()]);
      setLoading(false);
    };
    loadData();
  }, [filterType, startDate, endDate]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setBillUrl(data.url);
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error('Upload error', err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId 
        ? `${API_URL}/transactions/${editingId}` 
        : `${API_URL}/transactions`;
        
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          bill_url: billUrl
        }),
      });

      if (res.ok) {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ type: 'credit', title: '', amount: '', date: new Date().toISOString().split('T')[0] });
        setBillUrl(null);
        fetchTransactions();
        fetchStats();
      } else {
        alert('Failed to add transaction');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (t: Transaction) => {
    setFormData({
      type: t.type,
      title: t.title,
      amount: t.amount.toString(),
      date: new Date(t.date).toISOString().split('T')[0],
    });
    setBillUrl(t.bill_url);
    setEditingId(t.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    try {
      const res = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchTransactions();
        fetchStats();
      }
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Title', 'Amount', 'Bill URL'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        t.date,
        t.type,
        `"${t.title.replace(/"/g, '""')}"`,
        t.amount,
        t.bill_url || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Transactions</h1>
          <p className="text-slate-500 font-medium mt-1">Manage financial records and bills</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold transition-colors shadow-sm"
          >
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
          <button 
            onClick={() => {
              if (isAdding) {
                setIsAdding(false);
                setEditingId(null);
              } else {
                setFormData({ type: 'credit', title: '', amount: '', date: new Date().toISOString().split('T')[0] });
                setBillUrl(null);
                setEditingId(null);
                setIsAdding(true);
              }
            }}
            className="flex items-center px-4 py-2 bg-[#0B3A7E] text-white rounded-xl hover:bg-blue-900 font-bold transition-all shadow-md shadow-blue-900/20"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Transaction
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 text-emerald-600 mb-2">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <ArrowDownRight className="w-5 h-5" />
              </div>
              <span className="font-bold">Monthly Credits</span>
            </div>
            <p className="text-3xl font-black text-slate-900">₹{stats.monthly.credits.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 text-rose-600 mb-2">
              <div className="p-2 bg-rose-50 rounded-lg">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <span className="font-bold">Monthly Debits</span>
            </div>
            <p className="text-3xl font-black text-slate-900">₹{stats.monthly.debits.toLocaleString()}</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-200 opacity-80">
            <div className="flex items-center gap-3 text-slate-600 mb-2">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <ArrowDownRight className="w-5 h-5" />
              </div>
              <span className="font-bold">Total Credits</span>
            </div>
            <p className="text-2xl font-black text-slate-900">₹{stats.total.credits.toLocaleString()}</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-200 opacity-80">
            <div className="flex items-center gap-3 text-slate-600 mb-2">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <span className="font-bold">Total Debits</span>
            </div>
            <p className="text-2xl font-black text-slate-900">₹{stats.total.debits.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Add Form Modal/Expanded Area */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 mb-6 relative">
              <button 
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
              <h2 className="text-2xl font-black text-slate-900 mb-6">
                {editingId ? 'Edit Transaction' : 'Add Transaction'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all"
                  >
                    <option value="credit">Credit (Income)</option>
                    <option value="debit">Debit (Expense)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Title / Description</label>
                  <input 
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Office Rent, Client Payment"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Amount (₹)</label>
                  <input 
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0.00"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Date</label>
                  <input 
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700">Upload Bill / Receipt (Optional)</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center justify-center px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-[#F97316] transition-colors group">
                      <FileText className="w-5 h-5 text-slate-400 group-hover:text-[#F97316] mr-2" />
                      <span className="font-bold text-slate-600 group-hover:text-[#F97316]">
                        {uploading ? 'Uploading...' : 'Choose File'}
                      </span>
                      <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*,application/pdf" disabled={uploading} />
                    </label>
                    {billUrl && (
                      <a href={billUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold text-sm truncate max-w-xs">
                        View Uploaded File
                      </a>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 pt-4 border-t border-slate-100">
                  <button 
                    type="submit"
                    disabled={uploading || isSubmitting}
                    className="w-full md:w-auto px-8 py-3 bg-[#0B3A7E] text-white rounded-xl font-black hover:bg-blue-900 transition-colors shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : editingId ? 'Update Transaction' : 'Save Transaction'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters & Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-500 font-bold">
            <Filter className="w-5 h-5" />
            <span>Filters:</span>
          </div>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="p-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
          <input 
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
            title="Start Date"
          />
          <span className="text-slate-400">-</span>
          <input 
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
            title="End Date"
          />
          {(filterType || startDate || endDate) && (
            <button 
              onClick={() => { setFilterType(''); setStartDate(''); setEndDate(''); }}
              className="text-sm font-bold text-red-500 hover:text-red-700"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-slate-500 font-bold">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-lg font-bold text-slate-900">No transactions found</p>
              <p className="text-slate-500">Adjust filters or create a new transaction.</p>
            </div>
          ) : (
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-black">Date</th>
                  <th className="p-4 font-black">Title</th>
                  <th className="p-4 font-black">Type</th>
                  <th className="p-4 font-black">Amount</th>
                  <th className="p-4 font-black text-center">Bill</th>
                  <th className="p-4 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 font-medium text-slate-700 whitespace-nowrap">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      {t.title}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        t.type === 'credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="p-4 font-black text-slate-900 whitespace-nowrap">
                      ₹{parseFloat(t.amount.toString()).toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      {t.bill_url ? (
                        <a 
                          href={t.bill_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          title="View Bill"
                        >
                          <FileText className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleEdit(t)}
                        className="text-slate-400 hover:text-[#0B3A7E] opacity-0 group-hover:opacity-100 transition-all mr-3"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(t.id)}
                        className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
