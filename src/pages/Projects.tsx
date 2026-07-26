import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Tilt from '../components/Tilt';
import { 
  Briefcase, Calendar, MapPin, Landmark, Coins, Layers, Search, 
  X, ShieldAlert, CheckCircle2, ChevronRight, Compass, Eye, TrendingUp
} from 'lucide-react';
import { ROAD_TUNNELS_EXPERIENCE, Project } from '../data/companyData';
import { API_URL } from '../config';

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Completed' | 'Ongoing' | 'Tunnel' | 'International'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProjectsData(data);
      })
      .catch(err => console.error('Failed to fetch projects', err))
      .finally(() => setIsLoading(false));
  }, []);

  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800";
  };

  // Read query parameter if redirected from another page to view a specific project
  useEffect(() => {
    const projectId = searchParams.get('id');
    if (projectId && projectsData.length > 0) {
      const proj = projectsData.find(p => p.id === projectId);
      if (proj) {
        setSelectedProject(proj);
      }
    }
  }, [searchParams, projectsData]);

  // Handle Filtering
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Tunnel') {
      // Tunnel categorizes projects containing 'TUNNEL' in name or description
      return matchesSearch && (
        project.name.toUpperCase().includes('TUNNEL') || 
        project.description.toUpperCase().includes('TUNNEL')
      );
    }
    return matchesSearch && project.status === activeFilter;
  });

  return (
    <div className="bg-white min-h-screen">
      
      {/* Page Header Banner */}
      <section className="relative bg-gradient-to-r from-[#0B3A7E] to-blue-900 py-24 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <p className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase mb-2">
            TRACK RECORD
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Our Executed Project Directory
          </h1>
          <div className="h-1 w-24 bg-[#F97316] mt-4" />
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            Unique Power Systems has executed over 100 electrical and civil projects. We command high capacity installations, defense storage facilities, and complex tunnel configurations.
          </p>
        </div>
      </section>

      {/* SPECIAL TUNNEL LENGTH EXPERIENCE BANNER DIRECTORY */}
      <section className="py-16 bg-slate-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[10px] font-black tracking-widest text-[#F97316] uppercase block font-mono">
                CORE TECHNICAL COMPETENCY
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Road Tunnels Executed Length Directory
              </h2>
              <div className="h-1 w-16 bg-[#0B3A7E] mt-2" />
            </div>
            <div className="text-xs text-gray-500 font-medium max-w-sm">
              * Active engineering design and EHV cabling runs completed for major NHAI & BRO tunnel systems spanning multiple KMS.
            </div>
          </div>

          {/* Tunnel Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROAD_TUNNELS_EXPERIENCE.map((tunnel) => (
              <div 
                key={tunnel.sNo}
                className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between hover:border-blue-100 hover:shadow-md transition-all text-left"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-[#F97316] font-mono uppercase bg-orange-50 px-2.5 py-1 rounded-full">
                      Tunnel #{tunnel.sNo}
                    </span>
                    <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                      <MapPin size={12} className="text-gray-400" />
                      {tunnel.location}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-tight leading-snug line-clamp-2 min-h-[40px]">
                    {tunnel.name}
                  </h3>
                </div>

                <div className="pt-4 border-t border-gray-50 mt-4 flex justify-between items-center">
                  <span className="text-xs text-slate-500">Boring / cabling length</span>
                  <span className="font-black text-[#0B3A7E] text-base font-mono">{tunnel.length}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PRIMARY PROJECTS PORTFOLIO */}
      <section className="py-20" id="portfolio-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase block">
              CORPORATE REGISTER
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Interactive Project Portfolio
            </h2>
            <div className="h-1 w-24 bg-[#F97316] mx-auto mt-3" />
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col xl:flex-row gap-6 justify-between items-center bg-slate-50 p-4 rounded-2xl border border-gray-100 mb-12 max-w-6xl mx-auto">
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              {(['All', 'Completed', 'Ongoing', 'Tunnel', 'International'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wider transition-all uppercase ${
                    activeFilter === filter
                      ? 'bg-[#0B3A7E] text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {filter === 'Tunnel' ? 'Tunnel Projects' : filter}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full xl:w-80">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search by client, location, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white pl-9 pr-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0B3A7E]"
              />
            </div>
          </div>

          {/* Projects Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <Tilt key={project.id} className="h-full">
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full text-left cursor-default"
                    >
                      {/* Card Media */}
                      <div className="h-52 overflow-hidden relative bg-slate-200">
                        <img 
                          src={project.imageUrl} 
                          alt={project.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                          onError={onImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
                        
                        {/* Status Tag */}
                        <span className={`absolute top-4 left-4 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md ${
                          project.status === 'Completed' 
                            ? 'bg-emerald-500 text-white shadow-sm' 
                            : project.status === 'Ongoing' 
                            ? 'bg-orange-500 text-white shadow-sm' 
                            : 'bg-blue-600 text-white shadow-sm'
                        }`}>
                          {project.status}
                        </span>

                        {/* S.No Badge */}
                        <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-[#0B3A7E] font-black text-[10px] font-mono px-2 py-1 rounded">
                          RECORD #{project.sNo}
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                          <p className="text-[10px] font-black text-[#F97316] uppercase tracking-widest">
                            {project.client}
                          </p>
                          <h3 className="text-sm font-black text-slate-950 leading-snug line-clamp-3 uppercase group-hover:text-[#0B3A7E] transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* Financial & Location details */}
                        <div className="pt-4 border-t border-gray-50 space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Location</span>
                            <span className="font-extrabold text-slate-800 line-clamp-1 max-w-[150px]">{project.location}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Contract Value</span>
                            <span className="font-black text-[#F97316] text-sm">{project.contractValue}</span>
                          </div>
                        </div>

                        {/* Action trigger */}
                        <div className="pt-2">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="w-full bg-[#EAF4FF] hover:bg-[#0B3A7E] hover:text-white text-[#0B3A7E] text-center font-bold text-xs uppercase py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 group/btn"
                          >
                            <span>View Technical Specs</span>
                            <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  </Tilt>
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-400 text-sm">
                  No matching projects or registrations found. Please modify your filter or keywords.
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* TECHNICAL DETAIL MODAL POPUP */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full text-slate-800 relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image banner inside modal */}
              <div className="h-44 bg-slate-100 relative">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={onImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-[10px] font-black text-[#F97316] uppercase tracking-wider font-mono">
                    Official Contract Register S.No #{selectedProject.sNo}
                  </span>
                  <h3 className="text-white font-extrabold text-sm sm:text-base tracking-tight leading-snug line-clamp-1">
                    {selectedProject.client}
                  </h3>
                </div>
              </div>

              {/* Specs Content */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-black text-slate-950 text-sm uppercase leading-snug">
                    {selectedProject.name}
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Spec sheet table representing professional engineering data */}
                <div className="border border-gray-100 rounded-xl overflow-hidden text-xs">
                  <div className="bg-slate-50 p-3 border-b border-gray-100 font-extrabold text-slate-900 tracking-wider uppercase">
                    Technical Specifications Sheet
                  </div>
                  <div className="divide-y divide-gray-100">
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-400 font-medium">Principal Client</span>
                      <span className="col-span-2 font-bold text-slate-800 uppercase">{selectedProject.client}</span>
                    </div>
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-400 font-medium">Site Location</span>
                      <span className="col-span-2 font-bold text-slate-800">{selectedProject.location}</span>
                    </div>
                    {selectedProject.dateOfStart && (
                      <div className="grid grid-cols-3 p-3">
                        <span className="text-slate-400 font-medium">Mobilization Period</span>
                        <span className="col-span-2 font-bold text-slate-800 font-mono">
                          {selectedProject.dateOfStart} to {selectedProject.dateOfCompletion || 'Stipulated Dates'}
                        </span>
                      </div>
                    )}
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-400 font-medium">Contract Value (INR)</span>
                      <span className="col-span-2 font-black text-[#F97316]">{selectedProject.contractValue}</span>
                    </div>
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-400 font-medium">Status</span>
                      <span className="col-span-2 inline-flex items-center gap-1 font-bold text-slate-800">
                        {selectedProject.status === 'Completed' ? (
                          <>
                            <CheckCircle2 className="text-emerald-500" size={14} /> Completed & Audited
                          </>
                        ) : (
                          <>
                            <TrendingUp className="text-orange-500 animate-pulse" size={14} /> Active Site Operations
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Safety & Quality disclaimer */}
                <div className="bg-slate-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2.5 text-[10px] text-gray-500">
                  <ShieldAlert className="text-[#F97316] flex-shrink-0" size={16} />
                  <span>
                    This project is audited and complies with the necessary government licensing regulations for high tension works.
                  </span>
                </div>
              </div>

              {/* Modal Footer actions */}
              <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-lg transition-colors"
                >
                  Close Specification
                </button>
                <Link
                  to="/contact?tab=quote"
                  className="bg-[#0B3A7E] hover:bg-blue-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-lg transition-colors uppercase"
                >
                  Enquire Project Specs
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
