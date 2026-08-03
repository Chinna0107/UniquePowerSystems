import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Zap, Building, Lightbulb, Wind, ShieldAlert, Cpu, HardHat, Settings,
  Check, ArrowRight, ShieldCheck, Award, ThumbsUp, Layers, HelpCircle
} from 'lucide-react';
import { SERVICES_DATA, PROJECTS_DATA } from '../data/companyData';
import { useSEO } from '../hooks/useSEO';

export default function Services() {
  useSEO({
    title: 'Services | Tunnel Electrification, EHV Substations, HVAC & Civil | Unique Power Systems',
    description: 'Unique Power Systems offers tunnel electrification, EHV cable laying, substation installation, tunnel ventilation, HVAC, fire fighting, ELV/SCADA, industrial electrification & O&M services across India.',
    canonical: 'https://upsinfra.in/services',
  });
  
  // Icon finder map
  const iconMap: Record<string, any> = {
    Zap: Zap,
    Building: Building,
    Lightbulb: Lightbulb,
    Wind: Wind,
    ShieldAlert: ShieldAlert,
    Cpu: Cpu,
    HardHat: HardHat,
    Settings: Settings
  };

  // Associate services with real projects for 'Related Projects' section
  const getRelatedProjects = (serviceId: string) => {
    switch (serviceId) {
      case 'electrical-contracting':
        return PROJECTS_DATA.filter(p => p.id === 'proj-rambilli-sub' || p.id === 'proj-missinglink-power');
      case 'tunnel-electrification':
        return PROJECTS_DATA.filter(p => p.id === 'proj-silkyara' || p.id === 'proj-missinglink-lighting');
      case 'civil-construction':
        return PROJECTS_DATA.filter(p => p.id === 'proj-silkyara-office' || p.id === 'proj-zambales-intl');
      case 'tunnel-ventilation-hvac':
        return PROJECTS_DATA.filter(p => p.id === 'proj-missinglink-ventilation' || p.id === 'proj-nmscew-jetfans');
      case 'fire-fighting':
        return PROJECTS_DATA.filter(p => p.id === 'proj-nmscew-pkg15' || p.id === 'proj-nmscew-pkg16');
      case 'elv-systems':
        return PROJECTS_DATA.filter(p => p.id === 'proj-khalapur-toll' || p.id === 'proj-talegaon-toll');
      default:
        return PROJECTS_DATA.slice(0, 2); // default placeholder
    }
  };

  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800";
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Services Header Banner */}
      <section className="relative bg-gradient-to-r from-[#0B3A7E] to-blue-900 py-24 text-white overflow-hidden">
        {/* Subtle decorative shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-700 rounded-full blur-3xl opacity-30 -mr-48 -mt-48" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <p className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase mb-2">
            WHAT WE DO
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Our Engineering Specializations
          </h1>
          <div className="h-1 w-24 bg-[#F97316] mt-4" />
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            Unique Power Systems provides comprehensive EHV substation grid erection, specialized tunnel safety electrical systems, heavy civil design, and 24/7 technical operations.
          </p>
        </div>
      </section>

      {/* STAGGERED ROW DIRECTORY */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
          
          {SERVICES_DATA.map((service, idx) => {
            const IconComponent = iconMap[service.iconName] || Zap;
            const isOdd = idx % 2 !== 0;
            const relatedProjects = getRelatedProjects(service.id);

            return (
              <motion.div 
                key={service.id} 
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 50, damping: 14 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24 group/row"
              >
                
                {/* Image Column - Staggered */}
                <div className={`lg:col-span-5 relative ${isOdd ? 'lg:order-last' : ''}`}>
                  <div className="relative mx-auto max-w-md lg:max-w-none">
                    {/* Backdrop Box */}
                    <motion.div 
                      animate={{ rotate: isOdd ? [-2, -3, -2] : [2, 3, 2] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -inset-4 bg-slate-50 rounded-2xl -z-10 border border-slate-100" 
                    />
                    
                    {/* Main Image */}
                    <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-video lg:aspect-[4/5] bg-slate-100 object-cover">
                      <img 
                        src={service.imageUrl} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/row:scale-105"
                        referrerPolicy="no-referrer"
                        onError={onImageError}
                      />
                    </div>

                    {/* Left Icon badge */}
                    <div className="absolute -top-4 -left-4 bg-[#F97316] text-white p-3.5 rounded-2xl shadow-lg border-2 border-white transition-all duration-300 group-hover/row:scale-110 group-hover/row:rotate-12">
                      <IconComponent size={24} />
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-7 text-left space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-[#F97316] uppercase tracking-widest block font-mono">
                      SPECIALIZATION AREA #{idx + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">
                      {service.title}
                    </h2>
                    <div className="h-1 w-16 bg-[#0B3A7E]" />
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Core Features list with Orange Checkmark */}
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                      Technical Scope of Execution:
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-gray-100">
                          <span className="bg-emerald-50 text-emerald-600 p-0.5 rounded-full flex-shrink-0">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span className="text-slate-700 font-medium leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefit highlights */}
                  <div className="bg-[#EAF4FF]/40 border border-blue-100/60 p-4 rounded-xl">
                    <h4 className="font-extrabold text-xs text-[#0B3A7E] uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                      <ThumbsUp size={14} className="text-[#F97316]" />
                      Value & Performance Benefits
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {service.benefits}
                    </p>
                  </div>

                  {/* Related Projects Tags */}
                  {relatedProjects.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                        Associated Executions
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {relatedProjects.map((p) => (
                          <Link 
                            key={p.id}
                            to={`/projects?id=${p.id}`}
                            className="bg-white hover:bg-slate-50 border border-gray-200 text-slate-700 hover:text-[#0B3A7E] font-bold text-[10px] uppercase px-3 py-1.5 rounded-md transition-colors inline-flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full" />
                            <span className="line-clamp-1 max-w-[200px]">{p.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Immediate CTA link */}
                  <div className="pt-2">
                    <Link
                      to="/contact?tab=quote"
                      className="inline-flex items-center gap-1 text-xs font-black text-[#0B3A7E] hover:text-[#F97316] tracking-wider transition-colors uppercase group"
                    >
                      <span>Request Specialized Technical Quote</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>
      </section>

      {/* ACCREDITATION & QUALITY POLICIES */}
      <section className="py-20 bg-slate-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F97316] block">
                COMPLIANCE FOCUS
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                Safety & Quality Assurance Code
              </h2>
              <div className="h-1 w-20 bg-[#F97316]" />
              <p className="text-gray-600 text-sm leading-relaxed">
                Unique Power Systems operates under strict ISO 9001:2015, Central Electricity Authority (CEA) guidelines, and standard safety codes. We prioritize life safety in deep subterranean sites.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                
                {/* Policy 1 */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-2">
                  <span className="p-2 bg-blue-50 text-[#0B3A7E] rounded-lg inline-block">
                    <ShieldCheck size={18} />
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm">Material Sourcing Integrity</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We use exclusively ISI-marked, certified copper wireruns, galvanized steel conduits, and premium switchgear from brands like Siemens, ABB, and Larsen & Toubro.
                  </p>
                </div>

                {/* Policy 2 */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-2">
                  <span className="p-2 bg-orange-50 text-[#F97316] rounded-lg inline-block">
                    <Award size={18} />
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm">Zero-Accident Site Mandate</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Double-insulated heavy tools, compulsory reflective jackets, and standard steel-toe protective boots ensure that our 117-strong workforce returns home safely.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-[#0B3A7E] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-black tracking-tight leading-none">
            Need Custom Technical Engineering Services?
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Our engineers can draft single-line circuit diagrams, mobilize concrete pumps, lay EHV underground cabling, or setup centralized Ventilation networks within strict stipulate timelines.
          </p>
          <div className="pt-2">
            <Link
              to="/contact?tab=quote"
              className="bg-[#F97316] text-white hover:bg-orange-600 px-8 py-3.5 rounded-lg font-extrabold text-sm tracking-wider shadow-lg hover:shadow-xl transition-colors uppercase inline-block"
            >
              Get Engineering Proposal
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
