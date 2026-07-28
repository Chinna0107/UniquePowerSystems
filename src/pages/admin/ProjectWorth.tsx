import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Wallet, FileSpreadsheet, HandCoins, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { API_URL as BASE_URL } from '../../config';
const API_URL = `${BASE_URL}/api`;

interface Payment {
  id: number;
  amount: string;
  date: string;
  description: string;
}

interface Finance {
  id: number;
  project_name: string;
  contract_value: string;
  advance_amount: string;
  payments: Payment[];
}

export default function ProjectWorth() {
  const [finances, setFinances] = useState<Finance[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

  // Add Project Form State
  const [projectData, setProjectData] = useState({
    project_name: '',
    contract_value: '',
    advance_amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Add Payment Form State
  const [addingPaymentToId, setAddingPaymentToId] = useState<number | null>(null);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const token = localStorage.getItem('adminToken');

  const fetchFinances = async () => {
    try {
      const res = await fetch(`${API_URL}/finances`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setFinances(data);
      }
    } catch (err) {
      console.error('Failed to fetch finances', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinances();
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingProject(true);
    try {
      const res = await fetch(`${API_URL}/finances`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(projectData)
      });
      if (res.ok) {
        setIsAddingProject(false);
        setProjectData({ project_name: '', contract_value: '', advance_amount: '', date: new Date().toISOString().split('T')[0] });
        fetchFinances();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingProject(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project finance tracker?')) return;
    try {
      const res = await fetch(`${API_URL}/finances/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchFinances();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addingPaymentToId) return;
    setIsSubmittingPayment(true);
    try {
      const res = await fetch(`${API_URL}/finances/${addingPaymentToId}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(paymentData)
      });
      if (res.ok) {
        setAddingPaymentToId(null);
        setPaymentData({ amount: '', date: new Date().toISOString().split('T')[0], description: '' });
        fetchFinances();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingPayment(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Wallet className="w-8 h-8 text-[#0B3A7E]" />
            Project Worth
          </h1>
          <p className="text-slate-500 font-medium mt-1">Track contract values, advances, and payments</p>
        </div>
        <button
          onClick={() => setIsAddingProject(!isAddingProject)}
          className="flex items-center px-4 py-2 bg-[#0B3A7E] text-white rounded-xl hover:bg-blue-900 font-bold transition-all shadow-md shadow-blue-900/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Tracker
        </button>
      </div>

      {/* Add Project Modal/Expanded Area */}
      <AnimatePresence>
        {isAddingProject && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 mb-6 relative">
              <button onClick={() => setIsAddingProject(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">Close</button>
              <h2 className="text-2xl font-black text-slate-900 mb-6">New Project Tracker</h2>
              <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 md:col-span-3">
                  <label className="text-sm font-bold text-slate-700">Project Name</label>
                  <input required value={projectData.project_name} onChange={e => setProjectData({ ...projectData, project_name: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Total Contract Value (₹)</label>
                  <input type="number" required value={projectData.contract_value} onChange={e => setProjectData({ ...projectData, contract_value: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Advance Amount (₹)</label>
                  <input type="number" required value={projectData.advance_amount} onChange={e => setProjectData({ ...projectData, advance_amount: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Date</label>
                  <input type="date" required value={projectData.date} onChange={e => setProjectData({ ...projectData, date: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none" />
                </div>
                <div className="flex items-end md:col-span-3">
                  <button type="submit" disabled={isSubmittingProject} className="w-full p-3 bg-[#0B3A7E] text-white rounded-xl font-black hover:bg-blue-900 transition-colors shadow-md disabled:opacity-50">
                    {isSubmittingProject ? 'Creating...' : 'Create Tracker'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trackers List */}
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-bold">Loading...</div>
        ) : finances.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-lg font-bold text-slate-900">No project trackers found</p>
            <p className="text-slate-500">Click "Add Tracker" to start tracking project finances.</p>
          </div>
        ) : (
          finances.map(finance => {
            const contractVal = parseFloat(finance.contract_value);
            const advance = parseFloat(finance.advance_amount);
            const totalPayments = finance.payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
            const totalReceived = advance + totalPayments;
            const remaining = contractVal - totalReceived;
            const progress = contractVal > 0 ? Math.min(100, Math.max(0, (totalReceived / contractVal) * 100)) : 0;
            const isExpanded = expandedProjectId === finance.id;

            return (
              <motion.div
                key={finance.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
              >
                {/* Tracker Header */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{finance.project_name}</h3>
                      <p className="text-slate-500 font-medium mt-1">Financial Overview</p>
                    </div>
                    <button onClick={() => handleDeleteProject(finance.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Contract Value</p>
                      <p className="text-xl font-black text-slate-900">₹{contractVal.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Advance Received</p>
                      <p className="text-xl font-black text-emerald-600">₹{advance.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Payments Received</p>
                      <p className="text-xl font-black text-blue-600">₹{totalPayments.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Remaining Balance</p>
                      <p className="text-xl font-black text-rose-600">₹{remaining.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-slate-600">Progress (Received / Total)</span>
                      <span className="text-[#0B3A7E]">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-[#0B3A7E] to-blue-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-slate-100 bg-slate-50/50 p-4 flex justify-between items-center">
                  <button
                    onClick={() => setAddingPaymentToId(finance.id)}
                    className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-bold transition-all shadow-sm"
                  >
                    <HandCoins className="w-4 h-4 mr-2" />
                    Add Payment
                  </button>
                  <button
                    onClick={() => setExpandedProjectId(isExpanded ? null : finance.id)}
                    className="flex items-center text-slate-600 hover:text-slate-900 font-bold transition-colors"
                  >
                    {isExpanded ? (
                      <><ChevronUp className="w-5 h-5 mr-1" /> Hide Payments</>
                    ) : (
                      <><ChevronDown className="w-5 h-5 mr-1" /> View Payments ({finance.payments.length})</>
                    )}
                  </button>
                </div>

                {/* Payments Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-slate-100 bg-white"
                    >
                      <div className="p-6">
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <FileSpreadsheet className="w-5 h-5 text-slate-400" />
                          Payment History
                        </h4>
                        {finance.payments.length === 0 ? (
                          <p className="text-sm text-slate-500 font-medium">No payments recorded yet.</p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[500px]">
                              <thead>
                                <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                                  <th className="pb-3 font-bold">Date</th>
                                  <th className="pb-3 font-bold">Amount</th>
                                  <th className="pb-3 font-bold">Description</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {finance.payments.map(p => (
                                  <tr key={p.id}>
                                    <td className="py-3 font-medium text-slate-600 whitespace-nowrap">{new Date(p.date).toLocaleDateString()}</td>
                                    <td className="py-3 font-black text-slate-900">₹{parseFloat(p.amount).toLocaleString()}</td>
                                    <td className="py-3 text-slate-500">{p.description || '-'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Add Payment Modal Overlay */}
      {addingPaymentToId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full relative"
          >
            <button onClick={() => setAddingPaymentToId(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">Close</button>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Add Payment</h2>
            <form onSubmit={handleAddPayment} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700">Amount (₹)</label>
                <input type="number" required value={paymentData.amount} onChange={e => setPaymentData({ ...paymentData, amount: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700">Date</label>
                <input type="date" required value={paymentData.date} onChange={e => setPaymentData({ ...paymentData, date: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700">Description</label>
                <input type="text" placeholder="e.g., Milestone 1, Cheque No..." value={paymentData.description} onChange={e => setPaymentData({ ...paymentData, description: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none" />
              </div>
              <button type="submit" disabled={isSubmittingPayment} className="w-full p-3 bg-emerald-500 text-white rounded-xl font-black hover:bg-emerald-600 transition-colors shadow-md mt-4 disabled:opacity-50">
                {isSubmittingPayment ? 'Saving...' : 'Save Payment'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
