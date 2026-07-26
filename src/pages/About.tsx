import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building, ShieldCheck, History, Award, Users, ClipboardList, 
  MapPin, Coins, ChevronRight, HardHat, TrendingUp, CheckCircle, 
  Wrench, ShieldAlert, CheckSquare, Search, FileText
} from 'lucide-react';
import { 
  COMPANY_PROFILE, FINANCIAL_GROWTH, MANPOWER_STRENGTH, 
  LICENSES, MEASURING_EQUIPMENTS, TOOLS_AND_PLANTS 
} from '../data/companyData';

export default function About() {
  const [activeEquipmentTab, setActiveEquipmentTab] = useState<'machinery' | 'measuring'>('machinery');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering equipment lists based on search to make it premium and highly interactive
  const filteredMachinery = TOOLS_AND_PLANTS.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (item.make && item.make.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredMeasuring = MEASURING_EQUIPMENTS.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (item.make && item.make.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white min-h-screen">
      
      {/* Page Header Banner */}
      <section className="relative bg-gradient-to-r from-[#0B3A7E] to-blue-900 py-24 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <p className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase mb-2">
            WHO WE ARE
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Our Corporate Profile
          </h1>
          <div className="h-1 w-24 bg-[#F97316] mt-4" />
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            Established in 2010, M/s Unique Power Systems (UPS) has delivered critical electrical contracting, tunnel ventilation, and heavy civil construction projects for 16 years.
          </p>
        </div>
      </section>

      {/* 1. COMPANY STORY SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F97316] block">
                ORGANIZATION ORIGINS
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Engineering Trust Since 2010
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Unique Power Systems (UPS) is led by proprietor <strong className="text-slate-900">K N V Rama Kumar</strong>. Under his vision, the firm has achieved a stellar reputation for executing versatile, complex civil and electrical works for national defense organizations and leading engineering entities.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                We maintain active, multi-state GST licenses and a premium <strong className="text-slate-900">Class 'A' Electrical Contractor License</strong>. Our specialized domain competency lies in subsurface tunnel environments, highway illumination, fire-hydrant systems, ventilation jet fans, and major industrial power panels.
              </p>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 space-y-3">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="text-[#F97316]" size={18} />
                  Proprietor's Assurance Message
                </h3>
                <p className="text-xs text-gray-500 italic leading-relaxed">
                  "We are very much particular about the 'Quality' and 'on time delivery' of services. We performed and continue to perform works more effectively & efficiently. We assure you that the details furnished by us are true and in order."
                </p>
                <p className="text-xs font-bold text-slate-800 text-right">
                  — K N V Rama Kumar, Proprietor
                </p>
              </div>
            </div>

            {/* Graphic Badge */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#EAF4FF] to-blue-50 border border-blue-100 rounded-3xl p-8 relative overflow-hidden text-left shadow-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/5 rounded-full blur-2xl" />
                
                <h3 className="text-slate-900 font-extrabold text-lg mb-6 flex items-center gap-2">
                  <TrendingUp className="text-[#F97316]" />
                  Executive Summary
                </h3>

                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="w-2 h-2 bg-[#F97316] rounded-full mt-2" />
                    <div>
                      <p className="text-xs text-gray-500">Legal Constitution</p>
                      <p className="text-sm font-bold text-slate-800">Proprietorship Concern</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-2 h-2 bg-[#F97316] rounded-full mt-2" />
                    <div>
                      <p className="text-xs text-gray-500">Core Expertise</p>
                      <p className="text-sm font-bold text-slate-800">Highway Tunnels & HT Substation Systems</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-2 h-2 bg-[#F97316] rounded-full mt-2" />
                    <div>
                      <p className="text-xs text-gray-500">Accreditations</p>
                      <p className="text-sm font-bold text-slate-800">Grade 'A' State License & GST in 4 States</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-2 h-2 bg-[#F97316] rounded-full mt-2" />
                    <div>
                      <p className="text-xs text-gray-500">Annual Turn Volume (2025-26)</p>
                      <p className="text-sm font-black text-[#0B3A7E]">Rs. 77.35 Crores Audited</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. VISION, MISSION & VALUES */}
      <section className="py-20 bg-slate-50 border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Vision card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 70 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 text-left space-y-4 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-default"
            >
              <div className="w-12 h-12 bg-blue-50 text-[#0B3A7E] rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                <CheckSquare size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-[#0B3A7E] transition-colors duration-200">
                Our Vision
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                To stand as the absolute national benchmark for tunnel electrification and critical defense engineering, recognized for powering public-private partnerships under zero-failure guidelines.
              </p>
            </motion.div>

            {/* Mission card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 70 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 text-left space-y-4 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-default"
            >
              <div className="w-12 h-12 bg-orange-50 text-[#F97316] rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-[#0B3A7E] transition-colors duration-200">
                Our Mission
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                To design and mobilize robust, high-safety power distributions and heavy excavations. We commit to strict quality, on-time delivery, and protecting active site workers.
              </p>
            </motion.div>

            {/* Core values card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 70 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 text-left space-y-4 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-default"
            >
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors duration-200">
                Our Values
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Unyielding commitment to engineering quality, strict transparent financial reporting, adherence to ESIC/EPF safety mandates, and respect for our 117-strong workforce.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. MANPOWER STRENGTH SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="text-xs font-bold tracking-widest text-[#F97316] uppercase block">
                OUR PEOPLE
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                A Strength of 117 In-House Workers
              </h2>
              <div className="h-1 w-20 bg-[#F97316]" />
              <p className="text-gray-600 text-sm leading-relaxed">
                Infrastructure engineering requires rigorous supervision. Unique Power Systems does not rely purely on subcontracted manpower. We maintain a strong in-house list of qualified personnel, ensuring immediate site mobilization.
              </p>
              
              <div className="bg-[#EAF4FF]/50 p-4 rounded-xl border border-blue-50">
                <p className="text-xs text-slate-700">
                  ⚡ All staff are registered under statutory <strong className="text-[#0B3A7E]">Employee State Insurance (ESIC)</strong> and <strong className="text-[#0B3A7E]">Employees Provident Fund (EPF)</strong> protocols, guaranteeing high job satisfaction and zero legal friction.
                </p>
              </div>
            </div>

            {/* Right List Representation */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-6 md:p-8 space-y-4 text-left">
                <h3 className="font-extrabold text-slate-900 text-base border-b border-gray-100 pb-4">
                  Workforce Allocation Profile
                </h3>

                <div className="space-y-4">
                  {MANPOWER_STRENGTH.map((manpower) => (
                    <div key={manpower.sNo} className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-slate-800">{manpower.role}</span>
                        <span className="font-black text-[#0B3A7E] bg-slate-50 px-3 py-1 rounded-full text-xs">
                          {manpower.count} Professionals
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#0B3A7E] to-[#F97316] rounded-full" 
                          style={{ width: `${(manpower.count / 117) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-slate-500">
                  <span>TOTAL ACCOUNTABLE STRENGTH</span>
                  <span className="text-[#F97316] text-sm font-black">117 ACTIVE STAFF</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. AUDITED FINANCIAL GROWTH */}
      <section className="py-20 bg-slate-50 border-t border-gray-100" id="growth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase block">
              FINANCIAL ROBUSTNESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight relative inline-block pb-4">
              9-Year Audited Financial Growth
              <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-[#F97316] rounded" />
            </h2>
            <p className="text-gray-500 text-sm">
              Our financial metrics represent pristine stability, reflecting massive trust from our clients. Audited annual work volume has grown over 500% from 2017 to 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Growth Graph - Custom HTML rendering of visual bars */}
            <div className="lg:col-span-8 bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm text-left">
              <h3 className="font-extrabold text-slate-900 text-sm mb-6 flex items-center justify-between">
                <span>Annual Work Volume Trend (INR)</span>
                <span className="text-xs text-[#F97316] font-bold uppercase">Compound Yearly Growth</span>
              </h3>

              <div className="space-y-4">
                {FINANCIAL_GROWTH.map((growth) => {
                  const maxVal = 773559652;
                  const pct = (growth.rawAmount / maxVal) * 100;
                  return (
                    <div key={growth.year} className="flex items-center gap-4 text-xs">
                      <span className="w-16 font-bold text-gray-500">{growth.year}</span>
                      <div className="flex-grow h-6 bg-slate-50 rounded-md overflow-hidden relative border border-gray-100/30">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-700 to-[#0B3A7E] rounded-r-sm transition-all duration-1000" 
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-24 font-black text-right text-slate-800 text-xs sm:text-sm">
                        {growth.revenue}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[10px] text-gray-400 mt-6 text-center italic">
                * Audited balances approved by chartered accounting standards represent actual received values till date.
              </p>
            </div>

            {/* Financial Strength Highlights */}
            <div className="lg:col-span-4 space-y-6 text-left">
              <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
                <h4 className="text-[#F97316] font-extrabold text-xs uppercase tracking-widest">
                  Key Milestones
                </h4>
                <div className="space-y-4 divide-y divide-slate-800">
                  <div className="pt-2 first:pt-0">
                    <p className="text-2xl font-black text-white">Rs. 77.35 Cr</p>
                    <p className="text-xs text-gray-400">Current annual capacity (2025-26)</p>
                  </div>
                  <div className="pt-4">
                    <p className="text-2xl font-black text-[#F97316]">Rs. 42.09 Cr</p>
                    <p className="text-xs text-gray-400">Pre-defense export capacity (2023-24)</p>
                  </div>
                  <div className="pt-4">
                    <p className="text-2xl font-black text-white">Rs. 15.28 Cr</p>
                    <p className="text-xs text-gray-400">Startup foundation capacity (2017-18)</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 p-5 rounded-2xl">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest mb-2">
                  Client Value Impact
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  With a solid financial base, Unique Power Systems commands instant credit ratings with national suppliers and maintains high purchasing authority for copper, cable runs, panels, and machinery.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE EQUIPMENT DIRECTORY */}
      <section className="py-20 bg-white" id="timeline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase block">
              INFRASTRUCTURE ASSETS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Tools, Machinery & Plants
            </h2>
            <div className="h-1 w-24 bg-[#F97316] mx-auto mt-4" />
            <p className="text-gray-500 text-xs sm:text-sm pt-2">
              We own an expansive range of heavy structural machinery, calibrated digital calibrators, and tools to run massive civil excavations and high tension electrical syncs.
            </p>
          </div>

          {/* Interactive Search & Filter bar */}
          <div className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 p-4 rounded-xl border border-gray-100">
            <div className="flex gap-2">
              <button
                onClick={() => { setActiveEquipmentTab('machinery'); setSearchQuery(''); }}
                className={`px-5 py-2.5 rounded-lg text-xs font-extrabold tracking-wider transition-all uppercase ${
                  activeEquipmentTab === 'machinery'
                    ? 'bg-[#0B3A7E] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Tools & Machinery Plant ({TOOLS_AND_PLANTS.length})
              </button>
              <button
                onClick={() => { setActiveEquipmentTab('measuring'); setSearchQuery(''); }}
                className={`px-5 py-2.5 rounded-lg text-xs font-extrabold tracking-wider transition-all uppercase ${
                  activeEquipmentTab === 'measuring'
                    ? 'bg-[#0B3A7E] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Calibration & Measuring Tools ({MEASURING_EQUIPMENTS.length})
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B3A7E]"
              />
            </div>
          </div>

          {/* Equipment Grid */}
          <div className="max-w-5xl mx-auto">
            {activeEquipmentTab === 'machinery' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
                {filteredMachinery.length > 0 ? (
                  filteredMachinery.map((item) => (
                    <div 
                      key={item.sNo} 
                      className="p-4 bg-white border border-gray-100 rounded-xl hover:border-orange-200 hover:shadow-md transition-all flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F97316] flex-shrink-0 flex items-center justify-center font-bold text-xs">
                        #{item.sNo}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-900 leading-snug">{item.name}</p>
                        {item.make && <p className="text-[10px] text-gray-400 font-mono">Make: {item.make}</p>}
                        {item.capacity && <p className="text-[10px] text-gray-400">Capacity: {item.capacity}</p>}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-extrabold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                            {item.qty}
                          </span>
                          <span className="text-[9px] text-gray-400 font-medium">Age: {item.calibrationAge}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-xs text-gray-400 py-12">No matching machinery plant items found.</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
                {filteredMeasuring.length > 0 ? (
                  filteredMeasuring.map((item) => (
                    <div 
                      key={item.sNo} 
                      className="p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B3A7E] flex-shrink-0 flex items-center justify-center font-bold text-xs">
                        #{item.sNo}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-900 leading-snug">{item.name}</p>
                        {item.make && <p className="text-[10px] text-[#0B3A7E] font-mono">Make: {item.make}</p>}
                        {item.capacity && <p className="text-[10px] text-gray-400">Range: {item.capacity}</p>}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-extrabold bg-[#EAF4FF] text-[#0B3A7E] px-2 py-0.5 rounded">
                            {item.qty}
                          </span>
                          <span className="text-[9px] text-gray-400 font-medium">Calibrated: {item.calibrationAge}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-xs text-gray-400 py-12">No matching measuring instrument items found.</p>
                )}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 6. REGISTRATIONS & COMMERCIAL LICENSES */}
      <section className="py-20 bg-slate-50 border-t border-gray-100" id="licenses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase block">
              OFFICIAL REGISTRATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Commercial Licenses & Registrations
            </h2>
            <div className="h-1 w-24 bg-[#F97316] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Electrical Contractor Class A License Focus */}
            <div className="bg-[#0B3A7E] text-white p-8 rounded-2xl flex flex-col justify-between text-left relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-800 rounded-full blur-2xl opacity-50" />
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#F97316]">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-black">
                  Electrical Contractor License
                </h3>
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                  Unique Power Systems is licensed for Class 'A' electrical execution, enabling work on ultra-high voltage substations, overhead lines, and general transmission grids across jurisdictions.
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-800 text-xs">
                  <div>
                    <p className="text-blue-300">License Number</p>
                    <p className="font-extrabold text-white">A T2-2556 / T-7003</p>
                  </div>
                  <div>
                    <p className="text-blue-300">Expiration Date</p>
                    <p className="font-extrabold text-[#F97316]">23.01.2027</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Remaining GST Registry Cards */}
            <div className="space-y-3 text-left">
              <h3 className="font-extrabold text-slate-900 text-sm mb-2 uppercase tracking-widest">
                National Tax & Welfare registrations
              </h3>
              {LICENSES.slice(1).map((license) => (
                <div 
                  key={license.sNo} 
                  className="bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors flex justify-between items-center shadow-sm"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-slate-800 uppercase">{license.name}</p>
                    <p className="text-[10px] text-gray-500">Registry: Permanent Status Account</p>
                  </div>
                  <span className="text-xs font-bold font-mono text-[#0B3A7E] bg-[#EAF4FF] px-3 py-1 rounded">
                    {license.number}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 7. THREE BRANCHES DIRECTORY */}
      <section className="py-20 bg-white border-t border-gray-100" id="branches">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase block">
              OUR SPREAD
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Registered & Branch Offices
            </h2>
            <div className="h-1 w-24 bg-[#F97316] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Registered Office Hyderabad */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-blue-50 text-[#0B3A7E] rounded-xl flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Registered Head Office</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Hyderabad, Telangana</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {COMPANY_PROFILE.addresses.registered.address}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <p className="text-[10px] text-gray-400">Mobile Support</p>
                <p className="font-extrabold text-slate-800 text-sm">{COMPANY_PROFILE.addresses.registered.mobile}</p>
              </div>
            </div>

            {/* Delhi Branch Office */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-orange-50 text-[#F97316] rounded-xl flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Delhi Branch Office</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Dwarka, Sector-8, New Delhi</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {COMPANY_PROFILE.addresses.delhi.address}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <p className="text-[10px] text-gray-400">Regional Coverage</p>
                <p className="font-extrabold text-slate-800 text-sm">Northern States & NCR Sites</p>
              </div>
            </div>

            {/* Lonavala Branch Office */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Lonavala Branch Office</h3>
                  <p className="text-xs text-gray-400 mt-0.5">DN Valley, Valvan, Lonavala</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {COMPANY_PROFILE.addresses.lonavala.address}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <p className="text-[10px] text-gray-400">Regional Coverage</p>
                <p className="font-extrabold text-slate-800 text-sm">Mumbai-Pune Expressways & MH Sites</p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
