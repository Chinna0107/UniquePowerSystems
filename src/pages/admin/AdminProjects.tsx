import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Check, X as XIcon } from 'lucide-react';
import { Project } from '../../data/companyData';
import { API_URL } from '../../config';

export default function AdminProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchItems();
  }, [navigate, token]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/projects`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        setError('Failed to fetch projects');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setItems(items.filter(item => item.id !== id));
      } else {
        alert('Failed to delete project');
      }
    } catch (err) {
      alert('Error deleting project');
    }
  };

  const handleSave = async (item: Project, isNew: boolean) => {
    try {
      const url = isNew 
        ? `${API_URL}/api/projects` 
        : `${API_URL}/api/projects/${item.id}`;
      
      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item)
      });
      
      if (response.ok) {
        const savedItem = await response.json();
        if (isNew) {
          setItems([savedItem, ...items]);
          setIsAdding(false);
        } else {
          setItems(items.map(i => i.id === savedItem.id ? savedItem : i));
          setEditingItem(null);
        }
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save project');
      }
    } catch (err) {
      alert('Error saving project');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center text-slate-500 font-medium h-full">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Projects</h1>
          <p className="text-slate-500 font-medium">Manage your projects portfolio</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-[#F97316] text-white rounded-xl shadow-md shadow-orange-500/20 hover:bg-[#ea6b14] transition-all font-bold tracking-wide text-sm uppercase"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Project
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-8 shadow-sm">
          {error}
        </div>
      )}

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 mb-8 shadow-lg shadow-slate-200/50"
        >
          <h2 className="text-xl font-bold text-[#0B3A7E] mb-4">Add New Project</h2>
          <EditForm 
            initialItem={{
              id: '', sNo: items.length + 1, name: '', client: '', location: '', status: 'Ongoing', contractValue: '', rawAmount: 0, dateOfStart: '', dateOfCompletion: '', description: '', imageUrl: ''
            }} 
            onSave={(item) => handleSave(item, true)} 
            onCancel={() => setIsAdding(false)} 
            isNew={true}
          />
        </motion.div>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            {editingItem?.id === item.id ? (
              <div className="p-6">
                <EditForm 
                  initialItem={item} 
                  onSave={(updated) => handleSave(updated, false)} 
                  onCancel={() => setEditingItem(null)} 
                />
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-50 text-[#0B3A7E] rounded-full text-[10px] font-black mb-2 uppercase tracking-wider">
                        {item.status}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                      <p className="text-slate-500 text-sm font-medium">Client: {item.client} | Location: {item.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 bg-slate-50 rounded-full text-slate-700 hover:text-[#0B3A7E] hover:bg-slate-100 transition-colors shadow-sm"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-slate-50 rounded-full text-slate-700 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-2 mt-2">{item.description}</p>
                  <div className="flex flex-wrap gap-4 mt-4 text-xs font-semibold text-slate-400">
                    {item.contractValue && <span>Contract Value: {item.contractValue}</span>}
                    {item.dateOfStart && <span>Start: {item.dateOfStart}</span>}
                    {item.dateOfCompletion && <span>Completion: {item.dateOfCompletion}</span>}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EditForm({ 
  initialItem, 
  onSave, 
  onCancel,
  isNew = false
}: { 
  initialItem: Project; 
  onSave: (item: Project) => void; 
  onCancel: () => void;
  isNew?: boolean;
}) {
  const [item, setItem] = useState(initialItem);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      const data = await response.json();
      if (data.url) {
        setItem({ ...item, imageUrl: data.url });
      } else {
        alert("Upload failed. Check console for details.");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">ID (Unique)</label>
        <input
          type="text"
          value={item.id}
          onChange={e => setItem({...item, id: e.target.value})}
          disabled={!isNew}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#0B3A7E] transition-all"
          required
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Name</label>
        <input
          type="text"
          value={item.name}
          onChange={e => setItem({...item, name: e.target.value})}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A7E] transition-all"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Client</label>
        <input
          type="text"
          value={item.client}
          onChange={e => setItem({...item, client: e.target.value})}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A7E] transition-all"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Location</label>
        <input
          type="text"
          value={item.location}
          onChange={e => setItem({...item, location: e.target.value})}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A7E] transition-all"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Status</label>
        <select
          value={item.status}
          onChange={e => setItem({...item, status: e.target.value as Project['status']})}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A7E] transition-all"
        >
          <option value="Completed">Completed</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Tunnel">Tunnel</option>
          <option value="International">International</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Contract Value (String)</label>
        <input
          type="text"
          value={item.contractValue}
          onChange={e => setItem({...item, contractValue: e.target.value})}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A7E] transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Start Date</label>
        <input
          type="text"
          value={item.dateOfStart || ''}
          onChange={e => setItem({...item, dateOfStart: e.target.value})}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A7E] transition-all"
          placeholder="e.g. 16-Apr-24"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Completion Date</label>
        <input
          type="text"
          value={item.dateOfCompletion || ''}
          onChange={e => setItem({...item, dateOfCompletion: e.target.value})}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A7E] transition-all"
          placeholder="e.g. 30-Nov-23"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Image Upload (Cloudinary)</label>
        <div className="flex flex-col gap-3">
          {item.imageUrl && (
            <div className="w-32 h-32 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
              <img src={item.imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0B3A7E] hover:file:bg-blue-100 transition-all cursor-pointer"
          />
          {isUploading && <span className="text-xs font-bold text-orange-500 uppercase tracking-wide">Uploading...</span>}
        </div>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Description</label>
        <textarea
          value={item.description}
          onChange={e => setItem({...item, description: e.target.value})}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A7E] transition-all h-24"
          required
        />
      </div>
      <div className="md:col-span-2 flex justify-end gap-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 flex items-center font-bold transition-all text-sm"
        >
          <XIcon className="w-4 h-4 mr-2" /> Cancel
        </button>
        <button
          onClick={() => onSave(item)}
          className="px-4 py-2 bg-[#F97316] text-white rounded-xl shadow-md shadow-orange-500/20 hover:bg-[#ea6b14] flex items-center font-bold transition-all text-sm"
        >
          <Check className="w-4 h-4 mr-2" /> Save
        </button>
      </div>
    </div>
  );
}
