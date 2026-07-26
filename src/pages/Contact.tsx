import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle, 
  AlertCircle, Building, Loader2, Sparkles, ShieldCheck, ArrowRight
} from 'lucide-react';
import { COMPANY_PROFILE, SERVICES_DATA } from '../data/companyData';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [formType, setFormType] = useState<'enquiry' | 'quote'>('enquiry');

  // Fields state
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Status state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-switch form type if routed with tab=quote and scroll to form container
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'quote') {
      setFormType('quote');
      setSubject('Technical Quote Request for Infrastructure Project');
      
      setTimeout(() => {
        const formContainer = document.getElementById('contact-form-container');
        if (formContainer) {
          formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 250);
    }
  }, [searchParams]);

  // Form Validation
  const validateForm = () => {
    if (!name.trim()) return "Please enter your name.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email address.";
    if (!phone.trim() || !/^\d{10}$/.test(phone.replace(/[\s-]/g, ''))) return "Please enter a valid 10-digit phone number.";
    if (!subject.trim()) return "Please specify a subject.";
    if (!message.trim()) return "Please write your query details.";
    return null;
  };

  // Mock Form Submit ready for EmailJS
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    /* 
      EmailJS configuration hooks:
      We design this to be fully prepared for EmailJS. 
      To hook up EmailJS, the developer simply imports emailjs from '@emailjs/browser'
      and calls:
      
      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: name,
        company: company,
        reply_to: email,
        phone: phone,
        subject: subject,
        message: message,
        to_email: "uniquepowers@gmail.com"
      }, "YOUR_PUBLIC_KEY")
    */

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Clear fields
      setName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 1800); // realistic network delay
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Page Header Banner */}
      <section className="relative bg-gradient-to-r from-[#0B3A7E] to-blue-900 py-24 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <p className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase mb-2">
            STAY IN TOUCH
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Contact Our Branch Offices
          </h1>
          <div className="h-1 w-24 bg-[#F97316] mt-4" />
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            Reach out to our registered headquarters in Hyderabad, or regional teams in New Delhi and Lonavala. Complete our verified form for instant proposals.
          </p>
        </div>
      </section>

      {/* DUAL-COLUMN SPLIT LAYOUT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* COLUMN 1: CORPORATE CONTACTS & DIRECTORY */}
            <div className="lg:col-span-5 text-left space-y-8">
              
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#F97316] block">
                  DIRECTORY DETAILS
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                  Company Coordinates
                </h2>
                <div className="h-1 w-16 bg-[#0B3A7E]" />
              </div>

              {/* Main Registered Office */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#0B3A7E] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm uppercase">Registered Office (HQ)</h3>
                    <p className="text-xs text-gray-400">Hyderabad Headquarters</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-16">
                  Flat No. 101, 94-Silkwood Apartments, Srini Avenue Gate No.1, High Tension Line Road, PetBasheerabad, Hyderabad, Telangana – 500067.
                </p>
                <div className="pl-16 flex flex-wrap gap-4 text-xs">
                  <a href="tel:+917896675502" className="text-[#0B3A7E] hover:text-[#F97316] font-bold">
                    Call HQ: +91 7896675502
                  </a>
                  <a href="mailto:uniquepowers@gmail.com" className="text-[#0B3A7E] hover:text-[#F97316] font-bold">
                    Email: uniquepowers@gmail.com
                  </a>
                </div>
              </div>

              {/* Delhi Branch */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-50 text-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm uppercase">Delhi Branch Office</h3>
                    <p className="text-xs text-gray-400">North India Regional Coverage</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed pl-14">
                  4th Floor, Plot No. A-20, Block-A, Dwarka Sector-8, New Delhi – 110077.
                </p>
              </div>

              {/* Lonavala Branch */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm uppercase">Lonavala Branch Office</h3>
                    <p className="text-xs text-gray-400">Mumbai-Pune Expressways & MH Coverage</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed pl-14">
                  D-2, DN Valley, Valvan, Lonavala – 410401.
                </p>
              </div>

              {/* Business Hours & Support */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 grid grid-cols-2 gap-4">
                <div className="flex gap-2.5 items-start">
                  <Clock size={16} className="text-[#F97316] mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase">Business Hours</h4>
                    <p className="text-[10px] text-gray-500 mt-1">Mon - Sat: 9 AM - 6 PM</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <ShieldCheck size={16} className="text-emerald-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase">Statutory Safety</h4>
                    <p className="text-[10px] text-gray-500 mt-1">EPF & ESIC Compliant</p>
                  </div>
                </div>
              </div>

              {/* WHATSAPP FLOATING QUICK CHAT */}
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                    <MessageSquare size={20} fill="currentColor" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black text-slate-900 uppercase">WhatsApp Instant Support</p>
                    <p className="text-[10px] text-gray-500">Immediate mobile responses from estimators</p>
                  </div>
                </div>
                <a 
                  href="https://wa.me/917896675502" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-colors uppercase whitespace-nowrap"
                >
                  Chat on WhatsApp
                </a>
              </div>

            </div>

            {/* COLUMN 2: HIGH-FIDELITY EMAILJS-READY CONTACT FORM */}
            <div id="contact-form-container" className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-xl p-6 md:p-8 text-left">
              
              <div className="border-b border-gray-100 pb-6 mb-6 flex gap-4">
                <button
                  onClick={() => { setFormType('enquiry'); setSubject(''); }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    formType === 'enquiry'
                      ? 'bg-[#0B3A7E] text-white shadow-sm'
                      : 'bg-slate-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  Quick Enquiry Form
                </button>
                <button
                  onClick={() => { setFormType('quote'); setSubject('Technical Quote Request for Infrastructure Project'); }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    formType === 'quote'
                      ? 'bg-[#0B3A7E] text-white shadow-sm'
                      : 'bg-slate-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  Request Technical Proposal
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base mb-4 flex items-center gap-2">
                  <Sparkles className="text-[#F97316]" size={16} />
                  {formType === 'enquiry' ? 'General Helpdesk Enquiry' : 'EHV & Civil Proposal Form'}
                </h3>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name field */}
                  <div className="relative">
                    <input
                      type="text"
                      id="form-name"
                      required
                      placeholder=" "
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="peer block w-full px-4 pt-6 pb-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B3A7E] focus:bg-white transition-all text-slate-800"
                    />
                    <label 
                      htmlFor="form-name"
                      className="absolute left-4 top-2 text-[9px] font-black text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-[#0B3A7E] pointer-events-none"
                    >
                      Full Name *
                    </label>
                  </div>

                  {/* Company Field */}
                  <div className="relative">
                    <input
                      type="text"
                      id="form-company"
                      placeholder=" "
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="peer block w-full px-4 pt-6 pb-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B3A7E] focus:bg-white transition-all text-slate-800"
                    />
                    <label 
                      htmlFor="form-company"
                      className="absolute left-4 top-2 text-[9px] font-black text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-[#0B3A7E] pointer-events-none"
                    >
                      Company Name (Optional)
                    </label>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <input
                      type="email"
                      id="form-email"
                      required
                      placeholder=" "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer block w-full px-4 pt-6 pb-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B3A7E] focus:bg-white transition-all text-slate-800"
                    />
                    <label 
                      htmlFor="form-email"
                      className="absolute left-4 top-2 text-[9px] font-black text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-[#0B3A7E] pointer-events-none"
                    >
                      Business Email Address *
                    </label>
                  </div>

                  {/* Phone Field */}
                  <div className="relative">
                    <input
                      type="tel"
                      id="form-phone"
                      required
                      maxLength={10}
                      placeholder=" "
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="peer block w-full px-4 pt-6 pb-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B3A7E] focus:bg-white transition-all text-slate-800"
                    />
                    <label 
                      htmlFor="form-phone"
                      className="absolute left-4 top-2 text-[9px] font-black text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-[#0B3A7E] pointer-events-none"
                    >
                      Mobile Number (10 Digits) *
                    </label>
                  </div>

                </div>

                {/* Subject Field / Services Selector with scrollbar */}
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      id="form-subject"
                      required
                      placeholder=" "
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="peer block w-full px-4 pt-6 pb-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B3A7E] focus:bg-white transition-all font-bold text-slate-800"
                    />
                    <label 
                      htmlFor="form-subject"
                      className="absolute left-4 top-2 text-[9px] font-black text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-[#0B3A7E] pointer-events-none"
                    >
                      Subject Query *
                    </label>
                  </div>
                  
                  {/* Scrollable list of available services */}
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                      Available Services (Scroll & click to auto-fill subject):
                    </p>
                    <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-slate-100 space-y-1 custom-scrollbar">
                      {SERVICES_DATA.map((service) => {
                        const isSelected = subject === service.title;
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => {
                              setSubject(service.title);
                            }}
                            className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] transition-all flex items-center justify-between group cursor-pointer ${
                              isSelected 
                                ? 'bg-[#0B3A7E] text-white font-bold shadow-sm' 
                                : 'bg-white hover:bg-blue-50 text-gray-700 hover:text-[#0B3A7E] border border-gray-200/50'
                            }`}
                          >
                            <span className="truncate font-semibold">{service.title}</span>
                            <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded transition-colors ${
                              isSelected 
                                ? 'bg-[#F97316] text-white' 
                                : 'bg-slate-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-[#0B3A7E]'
                            }`}>
                              {isSelected ? 'Selected' : 'Select'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    placeholder=" "
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="peer block w-full px-4 pt-6 pb-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0B3A7E] focus:bg-white transition-all text-slate-800"
                  />
                  <label 
                    htmlFor="form-message"
                    className="absolute left-4 top-2 text-[9px] font-black text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[9px] peer-focus:font-black peer-focus:text-[#0B3A7E] pointer-events-none"
                  >
                    Message Details & Project Scope *
                  </label>
                </div>

                {/* Error/Success Feedbacks */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 text-red-600 p-3 rounded-lg text-xs flex items-center gap-2 border border-red-100"
                    >
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  {success && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-xs space-y-2 border border-emerald-100"
                    >
                      <div className="flex items-center gap-2 font-bold">
                        <CheckCircle size={18} className="text-emerald-600" />
                        <span>Enquiry Sent Successfully!</span>
                      </div>
                      <p className="text-[11px] text-emerald-600 pl-7 leading-relaxed">
                        Thank you for contacting Unique Power Systems. Your details have been securely logged and directed to <strong className="text-[#0B3A7E]">uniquepowers@gmail.com</strong>. Our estimating managers will connect back within 24 hours.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#F97316] text-white hover:bg-orange-600 disabled:bg-gray-300 py-4 rounded-xl font-extrabold text-sm tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 uppercase cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        <span>transmitting details...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Submit Corporate Enquiry</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>

          </div>
        </div>
      </section>

      {/* REGIONAL HIGH-CONTRAST GOOGLE MAP IFRAME EMBED */}
      <section className="h-96 w-full relative border-t border-gray-100 bg-slate-100">
        <iframe 
          title="Unique Power Systems HQ Location map PetBasheerabad Hyderabad"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.1481230107775!2d78.48625621538356!3d17.52431690333428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9046fbf99c37%3A0xe67db06ecbf2df9!2sPetbasheerabad%2C%20Hyderabad%2C%20Telangana%20500067!5e0!3m2!1sen!2sin!4v1626071234567!5m2!1sen!2sin"
          className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 transition-all duration-300"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

    </div>
  );
}
