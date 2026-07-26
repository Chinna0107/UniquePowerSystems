import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Check, X as XIcon } from 'lucide-react';
import { AVAILABLE_CATEGORIES, GalleryCategory } from '../../data/galleryData';
import { API_URL } from '../../config';

interface GalleryItem {
  id: string;
  src: string;
  category: GalleryCategory;
  title: string;
  alt: string;
}

export default function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const username = localStorage.getItem('adminUsername');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchItems();
  }, [navigate, token]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/gallery`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        setError('Failed to fetch gallery items');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setItems(items.filter(item => item.id !== id));
      } else {
        alert('Failed to delete item');
      }
    } catch (err) {
      alert('Error deleting item');
    }
  };

  const handleSave = async (item: GalleryItem, isNew: boolean) => {
    try {
      const url = isNew 
        ? `${API_URL}/api/gallery` 
        : `${API_URL}/api/gallery/${item.id}`;
      
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
        alert(data.error || 'Failed to save item');
      }
    } catch (err) {
      alert('Error saving item');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center text-slate-500 font-medium h-full">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gallery</h1>
          <p className="text-slate-500 font-medium">Manage your project images</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-[#F97316] text-white rounded-xl shadow-md shadow-orange-500/20 hover:bg-[#ea6b14] transition-all font-bold tracking-wide text-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Image
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
          <h2 className="text-xl font-bold text-[#0B3A7E] mb-4">Add New Item</h2>
          <EditForm 
            initialItem={{
              id: '', src: '', category: 'electrical', title: '', alt: ''
            }} 
            onSave={(item) => handleSave(item, true)} 
            onCancel={() => setIsAdding(false)} 
            isNew={true}
          />
        </motion.div>
      )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <>
                  <div className="aspect-[4/3] relative group">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 bg-white rounded-full text-slate-700 hover:text-[#0B3A7E] shadow-lg transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-white rounded-full text-slate-700 hover:text-red-500 shadow-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-3 py-1 bg-blue-50 text-[#0B3A7E] rounded-full text-[10px] font-black mb-3 uppercase tracking-wider">
                      {item.category.replace('-', ' ')}
                    </span>
                    <h3 className="text-slate-900 font-bold mb-1 truncate">{item.title}</h3>
                    <p className="text-slate-500 text-sm truncate font-medium">{item.id}</p>
                  </div>
                </>
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
  initialItem: GalleryItem; 
  onSave: (item: GalleryItem) => void; 
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
        setItem({ ...item, src: data.url });
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
    <div className="space-y-4">
      <div>
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
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Image Upload (Cloudinary)</label>
        <div className="flex flex-col gap-3">
          {item.src && (
            <div className="w-32 h-32 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
              <img src={item.src} alt="Preview" className="w-full h-full object-cover" />
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
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Category</label>
        <select
          value={item.category}
          onChange={e => setItem({...item, category: e.target.value as GalleryCategory})}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A7E] transition-all"
        >
          {AVAILABLE_CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Title</label>
        <input
          type="text"
          value={item.title}
          onChange={e => setItem({...item, title: e.target.value})}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A7E] transition-all"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Alt Text</label>
        <input
          type="text"
          value={item.alt}
          onChange={e => setItem({...item, alt: e.target.value})}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A7E] transition-all"
          required
        />
      </div>
      <div className="flex justify-end gap-3 mt-6">
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
