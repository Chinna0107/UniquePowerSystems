import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleQuoteClick = () => {
    if (location.pathname === '/contact') {
      const formContainer = document.getElementById('contact-form-container');
      if (formContainer) {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/92 backdrop-blur-md shadow-lg border-b border-gray-100/40 py-2 md:py-3' 
            : 'bg-white/80 backdrop-blur-sm border-b border-gray-100/20 py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo on Left */}
            <Link to="/" className="flex-shrink-0">
              <Logo className="h-12 md:h-14" showText={true} />
            </Link>

            {/* Centered Navigation Menu on Desktop */}
            <nav className="hidden md:flex space-x-8 lg:space-x-10 items-center justify-center flex-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative text-sm font-semibold tracking-wide transition-colors duration-200 ${
                      isActive 
                        ? 'text-[#0B3A7E]' 
                        : 'text-gray-600 hover:text-[#0B3A7E]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-[-8px] left-0 right-0 h-0.5 bg-[#F97316]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Call to Action Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/contact?tab=quote"
                onClick={handleQuoteClick}
                className="bg-[#F97316] text-white hover:bg-orange-600 px-5 py-2.5 rounded-full font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1 group"
              >
                <span>GET QUOTE</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Trigger & Mobile Action */}
            <div className="flex md:hidden items-center gap-3">
              <Link
                to="/contact?tab=quote"
                onClick={handleQuoteClick}
                className="bg-[#0B3A7E] text-white px-3 py-1.5 rounded text-xs font-bold tracking-wide"
              >
                GET A QUOTE
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-[#0B3A7E] p-2 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide Drawer Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-inner"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`block py-2.5 px-4 rounded-lg font-bold text-base transition-all ${
                        isActive 
                          ? 'bg-[#EAF4FF] text-[#0B3A7E]' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#0B3A7E]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-gray-100 px-4 flex flex-col gap-3">
                  <Link
                    to="/contact?tab=quote"
                    onClick={handleQuoteClick}
                    className="w-full bg-[#F97316] text-white text-center py-3 rounded-full font-bold shadow-md hover:bg-orange-600 transition-colors"
                  >
                    Get Premium Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* Spacer to avoid navbar overlap */}
      <div className="h-16" />
    </>
  );
}
