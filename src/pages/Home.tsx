import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Tilt from '../components/Tilt';
import { 
  Zap, Building, Lightbulb, Wind, ShieldAlert, Cpu, HardHat, Settings,
  ArrowRight, Play, Briefcase, Award, Users, Globe, ChevronRight, CheckCircle2,
  Phone, Sparkles, X, Shield
} from 'lucide-react';
import { COMPANY_PROFILE, SERVICES_DATA, PROJECTS_DATA, ROAD_TUNNELS_EXPERIENCE } from '../data/companyData';

export default function Home() {
  const [activeVideoModal, setActiveVideoModal] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 85]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800";
  };

  // Take the first 3 services for quick feature, or show all 8 dynamically
  const servicesPreview = SERVICES_DATA.slice(0, 8);
  
  // Take top prominent projects for homepage
  const featuredProjects = PROJECTS_DATA.slice(0, 4);

  // Clients logos - visual placeholder with real name
  const clients = COMPANY_PROFILE.clients;

  // Icons lookup map for services
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

  const stats = [
    { value: '100+', label: 'Projects Completed', icon: Briefcase, color: 'text-blue-600' },
    { value: '16+', label: 'Years of Experience', icon: Award, color: 'text-orange-600' },
    { value: '117+', label: 'Skilled Workforce', icon: Users, color: 'text-emerald-600' },
    { value: '28+', label: 'States Covered', icon: Globe, color: 'text-indigo-600' }
  ];

  const whyChooseUs = [
    { title: "Experienced Engineers", desc: "14 senior project leaders managing complex civil layouts and high voltage systems with expert field coordination.", icon: HardHat },
    { title: "Quality Assurance", desc: "ISO compliance guidelines, premium calibration instruments, and top-tier industrial material supply chains.", icon: Shield },
    { title: "Latest Equipment", desc: "Equipped with state-of-the-art machinery including heavy-duty batching plants, concrete mixers, and electronic testing kits.", icon: Settings },
    { title: "Safety Standards", desc: "Zero-accident site policy, strict personal protective equipment (PPE) guidelines, and certified safety compliance.", icon: ShieldAlert },
    { title: "Skilled Workforce", desc: "Dedicated in-house strength of 117 professionals, certified supervisors, and expert electrical wiring teams.", icon: Users },
    { title: "Timely Delivery", desc: "16 years of solid reputation for mobilizing equipment and commissioning sites within stipulate timelines.", icon: CheckCircle2 }
  ];

  return (
    <div className="relative overflow-hidden bg-white">
      
      {/* 1. HERO SECTION - Clean white background, no dark hero, matching reference */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-white via-slate-50 to-[#EAF4FF]/40 pt-10 pb-20 lg:py-0 overflow-hidden" 
        id="hero"
      >
        
        {/* Subtle grid and decorative background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
        {/* Abstract blue & orange decorative visual lines resembling power lines */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

        {/* Dynamic floating circles with different speeds and delays */}
        <motion.div
          animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-12 w-3.5 h-3.5 rounded-full bg-[#F97316]/25 pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 22, 0], x: [0, -12, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute top-1/3 left-[18%] w-5 h-5 rounded-full bg-[#0B3A7E]/12 pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, -28, 0], x: [0, -8, 0] }}
          transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/3 right-1/4 w-7 h-7 rounded-full bg-orange-100/40 pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 15, 0], x: [0, 15, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
          className="absolute bottom-12 left-1/3 w-4 h-4 rounded-full bg-blue-100/50 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF4FF] text-[#0B3A7E] rounded-full text-xs font-bold tracking-widest uppercase"
              >
                <Sparkles size={14} className="text-[#F97316] animate-pulse" />
                <span>SERVICE PROMINENT</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 35 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none"
              >
                Electrical & Civil <br />
                <span className="text-[#F97316] relative inline-block">
                  Contractors
                  <span className="absolute bottom-2 left-0 w-full h-2 bg-orange-100 -z-10" />
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="text-gray-500 font-bold text-base sm:text-lg tracking-wide uppercase"
              >
                Delivering Reliable. Building Trust. Powering a Better Tomorrow.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="text-gray-600 text-sm sm:text-base max-w-xl leading-relaxed"
              >
                M/s Unique Power Systems (UPS) designs, engineers, and executes heavy infrastructure electrical systems, highway tunnel electrification, ventilation, firefighting mist setups, and civil structures for DRDO, Ministry of Defence, and major national projects.
              </motion.p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                >
                  <Link
                    to="/services"
                    className="bg-[#0B3A7E] text-white hover:bg-blue-800 px-8 py-4 rounded-lg font-extrabold text-sm tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span>OUR SERVICES</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                >
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 bg-white border-2 border-[#0B3A7E]/10 hover:border-[#0B3A7E] hover:bg-[#EAF4FF]/10 px-8 py-4 rounded-lg font-extrabold text-sm text-[#0B3A7E] tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <span>VIEW PROJECTS</span>
                    <ArrowRight size={16} className="text-[#F97316]" />
                  </Link>
                </motion.div>
              </div>

            </div>

            {/* Hero Right Media - Premium Engineer and grid image */}
            <motion.div 
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 40, damping: 14, delay: 0.3 }}
              className="lg:col-span-5 relative mt-8 lg:mt-0"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Floating Orange Accent Box behind image */}
                <motion.div 
                  animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -left-6 w-32 h-32 bg-[#F97316]/10 rounded-3xl -z-10" 
                />
                {/* Floating Blue Accent Grid lines */}
                <motion.div 
                  animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl -z-10 blur-xl opacity-80" 
                />
                
                {/* Primary Image: Construction Engineer with transmission lines on background */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/5] object-cover">
                  <motion.img 
                    style={{ y: heroY }}
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600" 
                    alt="Electrical Infrastructure Engineer with Orange Helmet" 
                    className="w-full h-full object-cover scale-[1.12] origin-top"
                    referrerPolicy="no-referrer"
                    onError={onImageError}
                  />
                  
                  {/* Subtle vector overlay resembling high tension grid */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Absolute Badge on image */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3">
                    <div className="bg-[#EAF4FF] p-2.5 rounded-lg text-[#0B3A7E]">
                      <Briefcase size={22} />
                    </div>
                    <div>
                      <p className="text-xs text-[#F97316] font-bold uppercase tracking-wider">Project Focus</p>
                      <p className="text-sm font-extrabold text-slate-800">Tunnel & Grid Infrastructure</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. FLOATING STATISTICS CARD - Overlaps Hero */}
      <section className="relative z-20 px-2 sm:px-4 max-w-7xl mx-auto -mt-10 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, type: 'spring', stiffness: 45, damping: 14, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-gray-100 items-stretch">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              const numericMatch = stat.value.match(/^(\d+)(\+)?$/);
              const isNumeric = !!numericMatch;
              const number = isNumeric ? parseInt(numericMatch[1], 10) : null;
              const suffix = isNumeric ? (numericMatch[2] || "") : "";

              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center text-center px-2  sm:flex-row sm:text-left gap-3 h-full px-4 py-6 cursor-default group"
                >
                  <div className={`p-3 bg-slate-50 rounded-xl ${stat.color} flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                    <IconComp size={24} />
                  </div>
                  <div className='flex flex-col justify-center min-h-[72px]'>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none h-10 flex items-center justify-center sm:justify-start">
                      {isNumeric && number !== null ? (
                        <>
                          <CountUp end={number} duration={2.5} enableScrollSpy={true} scrollSpyOnce={true} />
                          <span className="text-[#F97316] font-extrabold ml-0.5">{suffix}</span>
                        </>
                      ) : (
                        stat.value
                      )}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 font-bold mt-1 uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 3. WHAT WE DO SECTION - Services grid below stats */}
      <section className="py-20 bg-slate-50 border-y border-gray-100" id="what-we-do">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase block">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight relative inline-block pb-4">
              What We Do
              <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-[#F97316] rounded" />
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed pt-2">
              We leverage class-leading technical competencies, robust machines, and specialized in-house power teams to execute massive projects across extreme terrains.
            </p>
          </div>

          {/* Grid of 8 services cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {servicesPreview.map((service, idx) => {
              const IconComp = iconMap[service.iconName] || Zap;
              return (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.6, type: 'spring', stiffness: 70, damping: 14 }}
                  whileHover={{ y: -8, scale: 1.015, boxShadow: "0 20px 25px -5px rgb(11 58 126 / 0.05), 0 8px 10px -6px rgb(11 58 126 / 0.05)" }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-blue-100 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Card Image */}
                  <div className="h-44 overflow-hidden relative bg-slate-200">
                    <img 
                      src={service.imageUrl} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      onError={onImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 bg-[#F97316] text-white p-2.5 rounded-xl shadow-md transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                      <IconComp size={20} />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-[#0B3A7E] transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-gray-50 mt-5">
                      <Link 
                        to={`/services#${service.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-black text-[#0B3A7E] hover:text-[#F97316] transition-colors group/btn"
                      >
                        <span className="transform transition-transform duration-300 group-hover/btn:-translate-y-0.5">READ MORE</span>
                        <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-[#0B3A7E] text-white font-extrabold text-sm tracking-wide px-8 py-3.5 rounded-lg shadow-md hover:bg-blue-800 transition-colors"
            >
              <span>Explore All Engineering Services</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. ABOUT PREVIEW - Split layout with actual company info */}
      <section className="relative py-20 bg-white overflow-hidden" id="about-preview">
        {/* Subtle decorative background shapes */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-50/70 rounded-full blur-3xl opacity-60 pointer-events-none translate-y-1/3 translate-x-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column on Left */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 50, damping: 15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Backdrop */}
                <motion.div 
                  animate={{ rotate: [3, 4, 3], scale: [1, 1.02, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-blue-50 rounded-2xl transform rotate-3 -z-10 scale-105" 
                />
                
                {/* Real Site Photo representation: Engineers standing in tunnel with PPE */}
                <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-slate-100 aspect-video lg:aspect-[4/5] object-cover relative">
                  <img 
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600" 
                    alt="Tunnel Site Engineers in Reflective Jackets" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={onImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  
                  {/* Floating overlay showcasing the UPS logo wall */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl border border-gray-100 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-9 bg-[#EAF4FF] rounded flex items-center justify-center text-[#0B3A7E] font-black text-sm">
                        UPS
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-slate-800">ISO 9001:2015 Certified</p>
                        <p className="text-[10px] text-gray-500">Proven Safety & Compliance Record</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Column on Right */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 50, damping: 15 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <span className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase block">
                ABOUT US
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                M/s Unique Power Systems
              </h2>
              
              <div className="h-1 w-20 bg-[#F97316]" />

              <p className="text-slate-800 font-bold text-sm leading-relaxed">
                "We, Unique Power Systems established in 2010. We are in this field for last 16 years. We are very much particular about the 'Quality' and 'on time delivery' of services."
              </p>

              <p className="text-gray-600 text-sm leading-relaxed">
                As a highly accredited contractor, we specialize in high-security technical facilities, highway tunnel ventilation, automatic toll plazas, and custom power distribution systems. Our clientele includes prestigious public and private bodies like DRDO (Ministry of Defence), Navayuga Engineering, and Brahmos Aerospace.
              </p>

              {/* Core Strength bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#F97316] mt-0.5" size={18} />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">117+ Dynamic Workforce</h4>
                    <p className="text-xs text-gray-500">14 Lead Engineers & 25 Supervisors</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#F97316] mt-0.5" size={18} />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Class 'A' Electrical License</h4>
                    <p className="text-xs text-gray-500">Valid Class-A License for EHV lines</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#F97316] mt-0.5" size={18} />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Extensive Plant Machinery</h4>
                    <p className="text-xs text-gray-500">Concrete batching, pumps, & heavy crimpers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#F97316] mt-0.5" size={18} />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Audited Financial Safety</h4>
                    <p className="text-xs text-gray-500">Over Rs. 77 Crore annual turn volume</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="bg-slate-900 text-white hover:bg-[#0B3A7E] px-6 py-3 rounded-lg font-bold text-sm tracking-wide shadow-md transition-all duration-200 inline-flex items-center gap-2 group transform active:scale-95"
                >
                  <span>LEARN MORE</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS - High Value Corporate Cards */}
      <section className="py-20 bg-slate-900 text-white" id="featured-projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="text-left max-w-xl space-y-3">
              <span className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase block">
                PORTFOLIO DIRECTORY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-white">
                Featured Projects
              </h2>
              <p className="text-gray-400 text-sm">
                Engineering highlights of multi-crore national assets completed and currently executing under extreme timelines.
              </p>
            </div>
            <div>
              <Link 
                to="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#F97316] hover:text-white uppercase tracking-wider transition-colors"
              >
                <span>View Full Portfolio ({PROJECTS_DATA.length} Projects)</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <Tilt key={project.id} className="h-full">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, type: 'spring', stiffness: 50, damping: 14 }}
                  className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/60 flex flex-col sm:flex-row hover:border-slate-500 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-default h-full"
                >
                  {/* Card Image Column */}
                  <div className="w-full sm:w-2/5 h-56 sm:h-auto overflow-hidden relative bg-slate-700">
                    <img 
                      src={project.imageUrl} 
                      alt={project.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      onError={onImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent sm:bg-gradient-to-r sm:from-slate-950/80 sm:to-transparent" />
                    
                    {/* Status Tag on image */}
                    <span className={`absolute top-4 left-4 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                      project.status === 'Completed' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Card Content Column */}
                  <div className="w-full sm:w-3/5 p-6 flex flex-col justify-between text-left">
                    <div className="space-y-3">
                      <p className="text-xs text-[#F97316] font-extrabold uppercase tracking-widest">
                        {project.client}
                      </p>
                      <h3 className="text-sm font-black text-white group-hover:text-[#F97316] transition-colors line-clamp-2 leading-snug uppercase">
                        {project.name}
                      </h3>
                      <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* High Value Attributes Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/50 mt-4 text-xs">
                      <div>
                        <p className="text-gray-500 text-[10px] font-extrabold uppercase tracking-wider">Location</p>
                        <p className="font-bold text-slate-200 line-clamp-1">{project.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-[10px] font-extrabold uppercase tracking-wider">Contract Value</p>
                        <p className="font-black text-[#F97316]">{project.contractValue}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>

        </div>
      </section>

      {/* 6. WHY CHOOSE US - Six Premium Cards */}
      <section className="py-20 bg-white" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase block">
              OUR CREDENTIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight relative inline-block pb-4">
              Why Choose Unique Power Systems?
              <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-[#F97316] rounded" />
            </h2>
            <p className="text-gray-500 text-sm">
              We stand apart through structured process, high technical focus, financial strength, and an accident-free execution record.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.05, duration: 0.5, type: 'spring', stiffness: 80, damping: 15 }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 text-left space-y-4 group cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] text-[#0B3A7E] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <IconComp size={24} />
                  </div>
                  <h3 className="text-lg font-black text-slate-950 group-hover:text-[#0B3A7E] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. CLIENT LOGOS (SWIPER AUTOPLAY) */}
      <section className="py-14 bg-slate-50 border-y border-gray-100 overflow-hidden" id="clients">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-extrabold tracking-widest text-gray-400 uppercase text-center mb-8">
            TRUSTED BY LEADING CENTRAL DEPARTMENTS & MULTI-NATIONALS
          </p>
          
          <div className="relative w-full py-2">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1.5}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                480: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
              className="w-full animate-fadeIn"
            >
              {clients.map((client, idx) => (
                <SwiperSlide key={idx} className="py-2">
                  <div className="flex items-center justify-center bg-white border border-gray-100 shadow-sm rounded-full px-5 py-3 font-bold text-sm text-[#0B3A7E] select-none hover:border-[#0B3A7E] hover:shadow transition-all duration-300">
                    <div className="w-2.5 h-2.5 bg-[#F97316] rounded-full mr-2.5 flex-shrink-0" />
                    <span className="truncate">{client}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 9. LET'S BUILD CTA */}
      <section className="py-20 bg-[#0B3A7E] text-white relative overflow-hidden" id="cta">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-45 pointer-events-none -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-30 pointer-events-none -ml-48 -mb-48" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Let's Build the Future Together
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Partner with a class-leading certified electrical and civil contractor. From massive Himalayan road tunnels to highly secure aerospace tech shelters, we provide zero-failure executions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact?tab=quote"
              className="bg-[#F97316] text-white hover:bg-orange-600 px-8 py-4 rounded-lg font-extrabold text-sm tracking-widest shadow-lg hover:shadow-xl transition-all duration-200 uppercase"
            >
              Get Custom Quote
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border border-white hover:bg-white/10 px-8 py-4 rounded-lg font-extrabold text-sm tracking-widest transition-colors duration-200 uppercase"
            >
              Contact Branch Offices
            </Link>
          </div>
        </div>
      </section>

      {/* WATCH INTRO MODAL */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveVideoModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full text-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-slate-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-extrabold text-slate-900">Unique Power Systems Intro</h3>
                  <p className="text-xs text-gray-400">Class 'A' Electrical & Civil Contracting Excellence</p>
                </div>
                <button 
                  onClick={() => setActiveVideoModal(false)}
                  className="text-gray-400 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="aspect-video rounded-xl bg-slate-100 border border-gray-100 overflow-hidden relative flex flex-col justify-center items-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shadow-md animate-pulse mb-4">
                    <ShieldAlert size={28} />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base">Tunnel Operations Live Demonstration</h4>
                  <p className="text-xs text-gray-500 max-w-md mt-1">
                    To maintain strict military security guidelines (DRDO & Brahmos Aerospace), live corporate drones are prohibited on site.
                  </p>
                  <p className="text-xs text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full mt-3">
                    Security Level: Secure Site Clearance Required
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3 rounded-lg border border-gray-100">
                    <p className="font-bold text-slate-900">16+ Years Experience</p>
                    <p className="text-gray-500">Established 2010, certified team leads</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-gray-100">
                    <p className="font-bold text-slate-900">Accredited Grade 'A'</p>
                    <p className="text-gray-500">Certified for high tension grids</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setActiveVideoModal(false)}
                  className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
