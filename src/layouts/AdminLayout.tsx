import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Images, Briefcase, FileText, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('adminToken');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Gallery', path: '/admin/gallery', icon: Images },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Ledgers', path: '/admin/ledgers', icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-gradient-to-br from-white via-slate-50 to-[#EAF4FF]/40">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30 pointer-events-none z-0" />

      {/* Mobile Header */}
      <div className="md:hidden bg-white text-slate-900 p-4 flex justify-between items-center border-b border-slate-200 z-20 relative shadow-sm">
        <div className="font-black text-xl tracking-tight text-[#0B3A7E]">Admin Panel</div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-[#F97316]">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className={`
              fixed md:sticky top-0 left-0 h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200 
              flex flex-col z-20 md:z-10 shadow-xl shadow-slate-200/50 transition-transform self-start
              ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}
          >
            <div className="p-6 hidden md:block border-b border-slate-100">
              <h2 className="text-2xl font-black text-[#0B3A7E] tracking-tight">Admin Panel</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">Unique Power Systems</p>
            </div>

            <nav className="flex-1 px-4 py-6 md:py-6 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#0B3A7E] text-white shadow-md shadow-blue-900/20' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B3A7E]'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-bold"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 overflow-x-hidden p-4 md:p-8 pt-6 relative z-10">
        <Outlet />
      </div>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
