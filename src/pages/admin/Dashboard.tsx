import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Images, Briefcase, Activity, CheckCircle, Globe, TrendingUp, TrendingDown, Pickaxe, Wallet, Receipt, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { API_URL as BASE_URL } from '../../config';
const API_URL = `${BASE_URL}/api`;

interface DashboardStats {
  galleryImages: number;
  projects: {
    ongoing: number;
    completed: number;
    tunnel: number;
    international: number;
  };
  finances: {
    totalCredits: number;
    totalDebits: number;
  };
  projectWorthSummary: {
    totalContractValue: number;
    totalAdvances: number;
    totalPayments: number;
  };
  recentTransactions: any[];
  recentProjectPayments: any[];
  monthlyTransactions: any[];
  projectWorthStats: any[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  if (loading) {
    return <div className="flex items-center justify-center h-full font-bold text-slate-500">Loading Dashboard...</div>;
  }

  if (!stats) {
    return <div className="text-center font-bold text-red-500">Failed to load dashboard data.</div>;
  }

  const statCards = [
    { title: 'Gallery Images', value: stats.galleryImages, icon: Images, color: 'bg-blue-50', textColor: 'text-blue-600' },
    { title: 'Ongoing Projects', value: stats.projects.ongoing, icon: Activity, color: 'bg-amber-50', textColor: 'text-amber-600' },
    { title: 'Completed Projects', value: stats.projects.completed, icon: CheckCircle, color: 'bg-emerald-50', textColor: 'text-emerald-600' },
    { title: 'Tunnel Projects', value: stats.projects.tunnel, icon: Pickaxe, color: 'bg-slate-100', textColor: 'text-slate-700' },
    { title: 'International Projects', value: stats.projects.international, icon: Globe, color: 'bg-indigo-50', textColor: 'text-indigo-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-[#0B3A7E]" />
          Dashboard Overview
        </h1>
        <p className="text-slate-500 font-medium mt-1">High-level metrics for Unique Power Systems</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={card.title} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-6"
          >
            <div className={`p-4 rounded-2xl ${card.color} ${card.textColor}`}>
              <card.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">{card.title}</p>
              <p className="text-4xl font-black text-slate-900">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Financial Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 rounded-3xl shadow-lg shadow-emerald-900/20 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-20"><TrendingUp className="w-32 h-32" /></div>
          <div className="relative z-10">
            <p className="font-bold text-emerald-100 uppercase tracking-widest text-sm mb-2">Total Credits</p>
            <p className="text-5xl font-black">₹{stats.finances.totalCredits.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-rose-500 to-rose-700 p-8 rounded-3xl shadow-lg shadow-rose-900/20 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-20"><TrendingDown className="w-32 h-32" /></div>
          <div className="relative z-10">
            <p className="font-bold text-rose-100 uppercase tracking-widest text-sm mb-2">Total Debits</p>
            <p className="text-5xl font-black">₹{stats.finances.totalDebits.toLocaleString()}</p>
          </div>
        </motion.div>
      </div>

      <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Project Worth Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-[#0B3A7E] to-blue-800 p-6 rounded-3xl shadow-lg shadow-blue-900/20 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-20"><Wallet className="w-24 h-24" /></div>
          <div className="relative z-10">
            <p className="font-bold text-blue-200 uppercase tracking-widest text-xs mb-2">Total Contract Value</p>
            <p className="text-3xl font-black">₹{stats.projectWorthSummary.totalContractValue.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 rounded-3xl shadow-lg shadow-indigo-900/20 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-20"><Receipt className="w-24 h-24" /></div>
          <div className="relative z-10">
            <p className="font-bold text-indigo-200 uppercase tracking-widest text-xs mb-2">Total Advances</p>
            <p className="text-3xl font-black">₹{stats.projectWorthSummary.totalAdvances.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 rounded-3xl shadow-lg shadow-emerald-900/20 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-20"><TrendingUp className="w-24 h-24" /></div>
          <div className="relative z-10">
            <p className="font-bold text-emerald-200 uppercase tracking-widest text-xs mb-2">Total Payments Received</p>
            <p className="text-3xl font-black">₹{stats.projectWorthSummary.totalPayments.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-br from-amber-500 to-amber-700 p-6 rounded-3xl shadow-lg shadow-amber-900/20 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-20"><Activity className="w-24 h-24" /></div>
          <div className="relative z-10">
            <p className="font-bold text-amber-200 uppercase tracking-widest text-xs mb-2">Remaining Payments</p>
            <p className="text-3xl font-black">₹{Math.max(0, stats.projectWorthSummary.totalContractValue - (stats.projectWorthSummary.totalAdvances + stats.projectWorthSummary.totalPayments)).toLocaleString()}</p>
          </div>
        </motion.div>
      </div>

      <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Financial Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-slate-400" />
            Credits vs Debits (Monthly)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyTransactions}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`} />
                <Tooltip 
                  cursor={{fill: '#F1F5F9'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'}} 
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="credit" name="Credit" fill="#10B981" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="debit" name="Debit" fill="#F43F5E" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-slate-400" />
            Project Worth (Collected vs Remaining)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.projectWorthStats} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} width={100} />
                <Tooltip 
                  cursor={{fill: '#F1F5F9'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'}} 
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="collected" name="Collected" stackId="a" fill="#0B3A7E" radius={[0, 0, 0, 0]} barSize={20} />
                <Bar dataKey="remaining" name="Remaining" stackId="a" fill="#E2E8F0" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" />
              Recent Ledger Transactions
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-500 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {stats.recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-600 whitespace-nowrap">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900 truncate max-w-[200px]">{tx.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        tx.type === 'credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm font-black text-right whitespace-nowrap ${tx.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      ₹{parseFloat(tx.amount).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {stats.recentTransactions.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-sm font-medium text-slate-500">No recent transactions</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Project Payments */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" />
              Recent Project Payments
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-500 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {stats.recentProjectPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-600 whitespace-nowrap">{new Date(p.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900 truncate max-w-[200px]">{p.project_name}</td>
                    <td className="px-6 py-4 text-sm font-black text-right text-[#0B3A7E] whitespace-nowrap">
                      ₹{parseFloat(p.amount).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {stats.recentProjectPayments.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-sm font-medium text-slate-500">No recent project payments</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
