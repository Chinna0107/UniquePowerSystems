import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Printer, Eye, X, Search, FileText, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { API_URL as BASE_URL } from '../../config';
const API_URL = `${BASE_URL}/api`;

interface InvoiceItem {
  sl_no: number;
  item_description: string;
  hsn_code: string;
  units: string;
  qty: string;
  rate: string;
  amount: string;
}

interface Invoice {
  id: number;
  invoice_no: string;
  invoice_date: string;
  po_no: string;
  po_date: string;
  buyer_name: string;
  buyer_address: string;
  buyer_gstin: string;
  delivery_address: string;
  payment_terms: string;
  basic_total: number;
  igst_percent: number;
  igst_amount: number;
  total_amount: number;
  items: InvoiceItem[];
  created_at: string;
}

const emptyItem = (): InvoiceItem => ({
  sl_no: 1,
  item_description: '',
  hsn_code: '',
  units: '',
  qty: '',
  rate: '',
  amount: '',
});

const emptyForm = () => ({
  invoice_no: '',
  invoice_date: new Date().toISOString().split('T')[0],
  po_no: '',
  po_date: '',
  buyer_name: '',
  buyer_address: '',
  buyer_gstin: '',
  delivery_address: '',
  payment_terms: 'Immediately',
  items: [emptyItem()],
});

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'form' | 'print'>('list');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(emptyForm());
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem('adminToken');

  // Fetch all invoices
  const fetchInvoices = async () => {
    try {
      const res = await fetch(`${API_URL}/invoices`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setInvoices(data);
      }
    } catch (err) {
      console.error('Failed to fetch invoices', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Calculate totals
  const calculateTotals = (items: InvoiceItem[]) => {
    const basicTotal = items.reduce((sum, item) => {
      const amount = parseFloat(item.amount) || 0;
      return sum + amount;
    }, 0);
    const igstPercent = 18;
    const igstAmount = basicTotal * (igstPercent / 100);
    const totalAmount = basicTotal + igstAmount;
    return { basicTotal, igstPercent, igstAmount, totalAmount };
  };

  // Update item and recalculate
  const updateItem = (index: number, field: keyof InvoiceItem, value: string) => {
    const newItems = [...formData.items];
    (newItems[index] as any)[field] = value;

    // Auto-calculate amount
    if (field === 'qty' || field === 'rate') {
      const qty = parseFloat(newItems[index].qty) || 0;
      const rate = parseFloat(newItems[index].rate) || 0;
      newItems[index].amount = (qty * rate).toFixed(2);
    }

    setFormData({ ...formData, items: newItems });
  };

  const addRow = () => {
    const newItems = [...formData.items, { ...emptyItem(), sl_no: formData.items.length + 1 }];
    setFormData({ ...formData, items: newItems });
  };

  const removeRow = (index: number) => {
    if (formData.items.length <= 1) return;
    const newItems = formData.items.filter((_, i) => i !== index).map((item, i) => ({ ...item, sl_no: i + 1 }));
    setFormData({ ...formData, items: newItems });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const totals = calculateTotals(formData.items);
    const payload = {
      ...formData,
      po_date: formData.po_date || null,
      basic_total: totals.basicTotal,
      igst_percent: totals.igstPercent,
      igst_amount: totals.igstAmount,
      total_amount: totals.totalAmount,
      items: formData.items.map(item => ({
        ...item,
        qty: parseFloat(item.qty) || null,
        rate: parseFloat(item.rate) || null,
        amount: parseFloat(item.amount) || null,
      })),
    };

    try {
      const url = editingId ? `${API_URL}/invoices/${editingId}` : `${API_URL}/invoices`;
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setView('list');
        setEditingId(null);
        setFormData(emptyForm());
        fetchInvoices();
      } else {
        alert('Failed to save invoice');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save invoice');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit
  const handleEdit = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/invoices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFormData({
          invoice_no: data.invoice_no || '',
          invoice_date: data.invoice_date || '',
          po_no: data.po_no || '',
          po_date: data.po_date || '',
          buyer_name: data.buyer_name || '',
          buyer_address: data.buyer_address || '',
          buyer_gstin: data.buyer_gstin || '',
          delivery_address: data.delivery_address || '',
          payment_terms: data.payment_terms || 'Immediately',
          items: data.items && data.items.length > 0
            ? data.items.map((item: any) => ({
                sl_no: item.sl_no,
                item_description: item.item_description || '',
                hsn_code: item.hsn_code || '',
                units: item.units || '',
                qty: item.qty?.toString() || '',
                rate: item.rate?.toString() || '',
                amount: item.amount?.toString() || '',
              }))
            : [emptyItem()],
        });
        setEditingId(id);
        setView('form');
      }
    } catch (err) {
      console.error('Failed to load invoice', err);
    }
  };

  // View / Print
  const handleViewPrint = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/invoices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedInvoice(data);
        setView('print');
      }
    } catch (err) {
      console.error('Failed to load invoice', err);
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return;
    try {
      const res = await fetch(`${API_URL}/invoices/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchInvoices();
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  // Print
  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${selectedInvoice?.invoice_no}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; font-size: 12px; color: #000; }
          @page { size: A4; margin: 10mm; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
          .invoice-container { width: 100%; max-width: 210mm; margin: 0 auto; border: 2px solid #000; }
          .original-tag { text-align: right; padding: 4px 8px; font-weight: bold; font-size: 11px; }
          .invoice-title { text-align: center; font-size: 18px; font-weight: bold; padding: 8px; border-bottom: 1px solid #000; }
          .header-grid { display: grid; grid-template-columns: 1fr 1fr; }
          .company-section { padding: 8px 12px; border-right: 1px solid #000; }
          .company-name { font-size: 18px; font-weight: bold; text-align: center; padding: 16px 0 8px; }
          .gstin-section { padding: 8px 12px; }
          .gstin-section p { font-weight: bold; margin-bottom: 2px; }
          .detail-row { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #000; }
          .detail-cell { padding: 4px 12px; border-right: 1px solid #000; display: flex; }
          .detail-cell:last-child { border-right: none; }
          .detail-label { font-weight: bold; margin-right: 8px; white-space: nowrap; }
          .detail-value { flex: 1; }
          .buyer-section { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #000; }
          .buyer-left { padding: 8px 12px; border-right: 1px solid #000; }
          .buyer-right { padding: 8px 12px; }
          .buyer-label { font-weight: bold; text-decoration: underline; margin-bottom: 4px; }
          .gstin-row { padding: 4px 12px; border-top: 1px solid #000; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; }
          table th, table td { border: 1px solid #000; padding: 4px 8px; text-align: center; font-size: 11px; }
          table th { background: #f0f0f0; font-weight: bold; }
          table td.left { text-align: left; }
          table td.right { text-align: right; }
          .totals-section { border-top: 1px solid #000; }
          .total-row { display: flex; justify-content: flex-end; border-bottom: 1px solid #000; padding: 4px 0; }
          .total-label { font-weight: bold; text-align: right; padding-right: 12px; width: 85%; }
          .total-value { width: 15%; text-align: right; padding-right: 12px; }
          .payment-row { padding: 4px 12px; border-bottom: 1px solid #000; display: flex; justify-content: space-between; }
          .terms-section { padding: 8px 12px; border-top: 1px solid #000; }
          .terms-title { font-weight: bold; text-decoration: underline; margin-bottom: 4px; }
          .terms-list { list-style: none; }
          .terms-list li { margin-bottom: 2px; }
          .signature-section { text-align: right; padding: 20px 12px 8px; font-weight: bold; }
          .footer { text-align: center; padding: 8px; border-top: 2px solid #000; font-weight: bold; font-size: 11px; }
          .footer p { margin-bottom: 1px; text-decoration: underline; }
          .footer .phone { text-decoration: none; }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  const filteredInvoices = invoices.filter(inv =>
    inv.invoice_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inv.buyer_name && inv.buyer_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totals = calculateTotals(formData.items);

  // Format date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // ============ PRINT VIEW ============
  if (view === 'print' && selectedInvoice) {
    const displayItems = [...(selectedInvoice.items || [])];

    return (
      <div className="max-w-7xl mx-auto">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6 no-print">
          <button
            onClick={() => { setView('list'); setSelectedInvoice(null); }}
            className="flex items-center px-4 py-2 text-slate-600 hover:text-slate-900 font-bold transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Invoices
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center px-6 py-3 bg-[#0B3A7E] text-white rounded-xl hover:bg-blue-900 font-bold transition-all shadow-md shadow-blue-900/20"
          >
            <Printer className="w-5 h-5 mr-2" />
            Print Invoice
          </button>
        </div>

        {/* Print Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 overflow-x-auto">
          <div ref={printRef}>
            <div className="invoice-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', border: '2px solid #000', fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#000' }}>
              {/* Original Tag */}
              <div style={{ textAlign: 'right', padding: '4px 8px', fontWeight: 'bold', fontSize: '11px' }}>ORIGINAL</div>

              {/* Title */}
              <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #000', borderTop: '1px solid #000' }}>PROFORMA INVOICE</div>

              {/* Company Name + GSTIN */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ padding: '8px 12px', borderRight: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                  <img src="/images/logo.png" alt="Logo" style={{ height: '40px', width: 'auto' }} />
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>UNIQUE POWER SYSTEMS</div>
                </div>
                <div style={{ padding: '8px 12px' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>GSTIN : 27ANKPK6462D1ZW</p>
                  <p style={{ fontWeight: 'bold' }}>PAN  : ANKPK6462D</p>
                </div>
              </div>

              {/* Invoice No / PO No */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #000' }}>
                <div style={{ padding: '4px 12px', borderRight: '1px solid #000', display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '8px', whiteSpace: 'nowrap' }}>Invoice No :</span>
                  <span>{selectedInvoice.invoice_no}</span>
                </div>
                <div style={{ padding: '4px 12px', display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '8px', whiteSpace: 'nowrap' }}>PO No.</span>
                  <span>{selectedInvoice.po_no || ''}</span>
                </div>
              </div>

              {/* Invoice Date / PO Date */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #000' }}>
                <div style={{ padding: '4px 12px', borderRight: '1px solid #000', display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '8px', whiteSpace: 'nowrap' }}>Invoice Date :</span>
                  <span>{formatDate(selectedInvoice.invoice_date)}</span>
                </div>
                <div style={{ padding: '4px 12px', display: 'flex' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '8px', whiteSpace: 'nowrap' }}>PO Date.</span>
                  <span>{selectedInvoice.po_date ? formatDate(selectedInvoice.po_date) : ''}</span>
                </div>
              </div>

              {/* Buyer / Delivery */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #000' }}>
                <div style={{ padding: '8px 12px', borderRight: '1px solid #000' }}>
                  <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '4px' }}>Buyer : - ( If other than Consignee)</div>
                  <div>M/s. {selectedInvoice.buyer_name || ''}</div>
                  <div style={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}>{selectedInvoice.buyer_address || ''}</div>
                </div>
                <div style={{ padding: '8px 12px' }}>
                  <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '4px' }}>Delivery Address:</div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>{selectedInvoice.delivery_address || ''}</div>
                </div>
              </div>

              {/* GSTIN */}
              <div style={{ padding: '4px 12px', borderTop: '1px solid #000', fontWeight: 'bold' }}>
                GSTIN: {selectedInvoice.buyer_gstin || ''}
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', borderTop: '1px solid #000' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #000', padding: '4px 8px', width: '50px', fontWeight: 'bold', fontSize: '11px' }}>SI No</th>
                    <th style={{ border: '1px solid #000', padding: '4px 8px', fontWeight: 'bold', fontSize: '11px' }}>Item Discription</th>
                    <th style={{ border: '1px solid #000', padding: '4px 8px', width: '90px', fontWeight: 'bold', fontSize: '11px' }}>HSN CODE</th>
                    <th style={{ border: '1px solid #000', padding: '4px 8px', width: '60px', fontWeight: 'bold', fontSize: '11px' }}>Units</th>
                    <th style={{ border: '1px solid #000', padding: '4px 8px', width: '50px', fontWeight: 'bold', fontSize: '11px' }}>Qty</th>
                    <th style={{ border: '1px solid #000', padding: '4px 8px', width: '80px', fontWeight: 'bold', fontSize: '11px' }}>Rate Rs</th>
                    <th style={{ border: '1px solid #000', padding: '4px 8px', width: '100px', fontWeight: 'bold', fontSize: '11px' }}>Amount Rs.</th>
                  </tr>
                </thead>
                <tbody>
                  {displayItems.map((item, i) => (
                    <tr key={i}>
                      <td style={{ border: '1px solid #000', padding: '4px 8px', textAlign: 'center', fontSize: '11px' }}>{item.item_description ? item.sl_no : ''}</td>
                      <td style={{ border: '1px solid #000', padding: '4px 8px', textAlign: 'left', fontSize: '11px' }}>{item.item_description || ''}</td>
                      <td style={{ border: '1px solid #000', padding: '4px 8px', textAlign: 'center', fontSize: '11px' }}>{item.hsn_code || ''}</td>
                      <td style={{ border: '1px solid #000', padding: '4px 8px', textAlign: 'center', fontSize: '11px' }}>{item.units || ''}</td>
                      <td style={{ border: '1px solid #000', padding: '4px 8px', textAlign: 'center', fontSize: '11px' }}>{item.qty || ''}</td>
                      <td style={{ border: '1px solid #000', padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>{item.rate || ''}</td>
                      <td style={{ border: '1px solid #000', padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>{item.amount ? parseFloat(item.amount as string).toLocaleString('en-IN') : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ borderTop: '1px solid #000' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid #000', padding: '4px 0' }}>
                  <span style={{ fontWeight: 'bold', textAlign: 'right', paddingRight: '12px', width: '85%' }}>BASIC TOTAL Rs.</span>
                  <span style={{ width: '15%', textAlign: 'right', paddingRight: '12px' }}>{parseFloat(selectedInvoice.basic_total?.toString() || '0').toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000', padding: '4px 0' }}>
                  <span style={{ fontWeight: 'bold', textDecoration: 'underline', paddingLeft: '12px' }}>Payment Terms :  {selectedInvoice.payment_terms || 'Immediately'}</span>
                  <div style={{ display: 'flex', width: '40%' }}>
                    <span style={{ fontWeight: 'bold', textAlign: 'right', paddingRight: '12px', flex: 1 }}>IGST {selectedInvoice.igst_percent || 18}%</span>
                    <span style={{ width: '120px', textAlign: 'right', paddingRight: '12px' }}>{parseFloat(selectedInvoice.igst_amount?.toString() || '0').toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid #000', padding: '4px 0' }}>
                  <span style={{ fontWeight: 'bold', textAlign: 'right', paddingRight: '12px', width: '85%' }}>TOTAL AMOUNT</span>
                  <span style={{ width: '15%', textAlign: 'right', paddingRight: '12px', fontWeight: 'bold' }}>{parseFloat(selectedInvoice.total_amount?.toString() || '0').toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div style={{ padding: '8px 12px', borderTop: '1px solid #000' }}>
                <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '4px' }}>Terms & Conditions :</div>
                <div>1) All Disputes Subjected to Pune Jurisdiction Only</div>
                <div>2) Goods once sold will not be taken back</div>
                <div>3) Intrest @24% will be charges go belated payment</div>
              </div>

              {/* Signature */}
              <div style={{ textAlign: 'right', padding: '24px 12px 8px', fontWeight: 'bold' }}>
                Authorised Signatory
              </div>

              {/* Footer */}
              <div style={{ textAlign: 'center', padding: '8px', borderTop: '2px solid #000', fontWeight: 'bold', fontSize: '11px' }}>
                <p style={{ textDecoration: 'underline', marginBottom: '1px' }}>339, SATHE WASTI, KUSGAON BUDRUK, Pune, Maharashtra,</p>
                <p style={{ textDecoration: 'underline', marginBottom: '1px' }}>410401</p>
                <p>Ph:+91 8368652556</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ FORM VIEW ============
  if (view === 'form') {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {editingId ? 'Edit Invoice' : 'Create Invoice'}
            </h1>
            <p className="text-slate-500 font-medium mt-1">Fill in the proforma invoice details</p>
          </div>
          <button
            onClick={() => { setView('list'); setEditingId(null); setFormData(emptyForm()); }}
            className="flex items-center px-4 py-2 text-slate-600 hover:text-slate-900 font-bold transition-colors"
          >
            <X className="w-5 h-5 mr-1" />
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Invoice Details Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 mb-6">
            <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#0B3A7E]" />
              Invoice Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Invoice No *</label>
                <input
                  type="text"
                  required
                  value={formData.invoice_no}
                  onChange={e => setFormData({ ...formData, invoice_no: e.target.value })}
                  placeholder="e.g., MH/26-27/08"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Invoice Date *</label>
                <input
                  type="date"
                  required
                  value={formData.invoice_date}
                  onChange={e => setFormData({ ...formData, invoice_date: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">PO No.</label>
                <input
                  type="text"
                  value={formData.po_no}
                  onChange={e => setFormData({ ...formData, po_no: e.target.value })}
                  placeholder="Purchase Order No."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">PO Date</label>
                <input
                  type="date"
                  value={formData.po_date}
                  onChange={e => setFormData({ ...formData, po_date: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Buyer & Delivery Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 mb-6">
            <h2 className="text-lg font-black text-slate-900 mb-6">Buyer & Delivery Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Buyer Name (M/s.)</label>
                  <input
                    type="text"
                    value={formData.buyer_name}
                    onChange={e => setFormData({ ...formData, buyer_name: e.target.value })}
                    placeholder="Company / Buyer Name"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Buyer Address</label>
                  <textarea
                    value={formData.buyer_address}
                    onChange={e => setFormData({ ...formData, buyer_address: e.target.value })}
                    placeholder="Full address of the buyer"
                    rows={3}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Buyer GSTIN</label>
                  <input
                    type="text"
                    value={formData.buyer_gstin}
                    onChange={e => setFormData({ ...formData, buyer_gstin: e.target.value })}
                    placeholder="e.g., 27AAACN1234A1ZA"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Delivery Address</label>
                  <textarea
                    value={formData.delivery_address}
                    onChange={e => setFormData({ ...formData, delivery_address: e.target.value })}
                    placeholder="Delivery / Site address"
                    rows={4}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Payment Terms</label>
                  <input
                    type="text"
                    value={formData.payment_terms}
                    onChange={e => setFormData({ ...formData, payment_terms: e.target.value })}
                    placeholder="e.g., Immediately, 30 Days"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Items Table Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-slate-900">Invoice Items</h2>
              <button
                type="button"
                onClick={addRow}
                className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 font-bold transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Row
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="p-3 font-black w-14 text-center">Sl No</th>
                    <th className="p-3 font-black">Item Description</th>
                    <th className="p-3 font-black w-28">HSN Code</th>
                    <th className="p-3 font-black w-24">Units</th>
                    <th className="p-3 font-black w-20">Qty</th>
                    <th className="p-3 font-black w-28">Rate (₹)</th>
                    <th className="p-3 font-black w-28">Amount (₹)</th>
                    <th className="p-3 font-black w-14 text-center">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {formData.items.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-2 text-center font-bold text-slate-500">{item.sl_no}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.item_description}
                          onChange={e => updateItem(index, 'item_description', e.target.value)}
                          placeholder="Item description"
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.hsn_code}
                          onChange={e => updateItem(index, 'hsn_code', e.target.value)}
                          placeholder="HSN"
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.units}
                          onChange={e => updateItem(index, 'units', e.target.value)}
                          placeholder="Units"
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          step="0.01"
                          value={item.qty}
                          onChange={e => updateItem(index, 'qty', e.target.value)}
                          placeholder="0"
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          step="0.01"
                          value={item.rate}
                          onChange={e => updateItem(index, 'rate', e.target.value)}
                          placeholder="0.00"
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium outline-none transition-all text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.amount}
                          readOnly
                          placeholder="0.00"
                          className="w-full p-2 bg-blue-50 border border-blue-100 rounded-lg font-bold text-slate-900 outline-none text-sm cursor-not-allowed"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeRow(index)}
                          disabled={formData.items.length <= 1}
                          className="text-slate-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Summary */}
            <div className="mt-6 flex justify-end">
              <div className="w-full md:w-80 space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="font-bold text-slate-600">Basic Total</span>
                  <span className="font-black text-slate-900">₹{totals.basicTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="font-bold text-slate-600">IGST 18%</span>
                  <span className="font-black text-slate-900">₹{totals.igstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-[#0B3A7E]/5 rounded-xl px-4 -mx-4">
                  <span className="font-black text-[#0B3A7E] text-lg">Total Amount</span>
                  <span className="font-black text-[#0B3A7E] text-lg">₹{totals.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => { setView('list'); setEditingId(null); setFormData(emptyForm()); }}
              className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#0B3A7E] text-white rounded-xl font-black hover:bg-blue-900 transition-colors shadow-md shadow-blue-900/20 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : editingId ? 'Update Invoice' : 'Save Invoice'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ============ LIST VIEW ============
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Invoices</h1>
          <p className="text-slate-500 font-medium mt-1">Create and manage proforma invoices</p>
        </div>
        <button
          onClick={() => {
            setFormData(emptyForm());
            setEditingId(null);
            setView('form');
          }}
          className="flex items-center px-4 py-2 bg-[#0B3A7E] text-white rounded-xl hover:bg-blue-900 font-bold transition-all shadow-md shadow-blue-900/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Invoice
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 text-[#0B3A7E] mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-bold">Total Invoices</span>
          </div>
          <p className="text-3xl font-black text-slate-900">{invoices.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 text-emerald-600 mb-2">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-bold">Total Value</span>
          </div>
          <p className="text-3xl font-black text-slate-900">
            ₹{invoices.reduce((sum, inv) => sum + parseFloat(inv.total_amount?.toString() || '0'), 0).toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 text-amber-600 mb-2">
            <div className="p-2 bg-amber-50 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-bold">This Month</span>
          </div>
          <p className="text-3xl font-black text-slate-900">
            {invoices.filter(inv => {
              const d = new Date(inv.invoice_date);
              const now = new Date();
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by invoice no or buyer..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-slate-500 font-bold">Loading invoices...</div>
          ) : filteredInvoices.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-lg font-bold text-slate-900">No invoices found</p>
              <p className="text-slate-500">Create your first proforma invoice.</p>
            </div>
          ) : (
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-black">Invoice No</th>
                  <th className="p-4 font-black">Date</th>
                  <th className="p-4 font-black">Buyer</th>
                  <th className="p-4 font-black">Amount</th>
                  <th className="p-4 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 font-black text-[#0B3A7E]">{inv.invoice_no}</td>
                    <td className="p-4 font-medium text-slate-700 whitespace-nowrap">
                      {formatDate(inv.invoice_date)}
                    </td>
                    <td className="p-4 font-bold text-slate-900">{inv.buyer_name || '-'}</td>
                    <td className="p-4 font-black text-slate-900 whitespace-nowrap">
                      ₹{parseFloat(inv.total_amount?.toString() || '0').toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleViewPrint(inv.id)}
                          className="p-2 text-slate-400 hover:text-[#0B3A7E] hover:bg-blue-50 rounded-lg transition-all"
                          title="View & Print"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(inv.id)}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(inv.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
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
