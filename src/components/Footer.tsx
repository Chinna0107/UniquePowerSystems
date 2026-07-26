import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Facebook, ShieldCheck, Clock, Award } from 'lucide-react';
import Logo from './Logo';
import { COMPANY_PROFILE } from '../data/companyData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          
          {/* Column 1: Company Profile Info */}
          <div className="space-y-6">
            <div className="bg-white p-3 rounded-lg inline-block shadow-sm">
              <Logo className="h-10" showText={false} />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              M/s Unique Power Systems (UPS) is an ISO certified, leading Class 'A' electrical and heavy civil contracting firm with 16+ years of premium engineering excellence in highway tunnels, power distribution, and national infrastructures.
            </p>
            {/* Accreditation Badge */}
            <div className="flex items-center gap-3 bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
              <Award className="text-[#F97316] flex-shrink-0" size={24} />
              <div className="text-xs">
                <p className="font-bold text-white uppercase tracking-wider">Class 'A' Contractor</p>
                <p className="text-gray-400">License No: A T2-2556 / T-7003</p>
              </div>
            </div>
          </div>

          {/* Column 2: Engineering Services Links */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-base tracking-wider uppercase relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#F97316]">
              Our Specializations
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/services#electrical-contracting" className="hover:text-[#F97316] transition-colors duration-200">
                  Electrical Contracting
                </Link>
              </li>
              <li>
                <Link to="/services#tunnel-electrification" className="hover:text-[#F97316] transition-colors duration-200">
                  Tunnel Electrification
                </Link>
              </li>
              <li>
                <Link to="/services#civil-construction" className="hover:text-[#F97316] transition-colors duration-200">
                  Civil Infrastructure
                </Link>
              </li>
              <li>
                <Link to="/services#tunnel-ventilation-hvac" className="hover:text-[#F97316] transition-colors duration-200">
                  Tunnel Ventilation & HVAC
                </Link>
              </li>
              <li>
                <Link to="/services#fire-fighting" className="hover:text-[#F97316] transition-colors duration-200">
                  Fire Fighting & Mist Systems
                </Link>
              </li>
              <li>
                <Link to="/services#elv-systems" className="hover:text-[#F97316] transition-colors duration-200">
                  ELV & SCADA Networks
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Directory */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-base tracking-wider uppercase relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#F97316]">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-[#F97316] transition-colors duration-200">Home Portal</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F97316] transition-colors duration-200">About Our Company</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F97316] transition-colors duration-200">Detailed Services</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#F97316] transition-colors duration-200">Project Portfolio</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#F97316] transition-colors duration-200">Project Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F97316] transition-colors duration-200">Contact & Support</Link>
              </li>
              <li>
                <Link to="/about#growth" className="hover:text-[#F97316] transition-colors duration-200">Audited Growth Metrics</Link>
              </li>
              <li>
                <Link to="/about#timeline" className="hover:text-[#F97316] transition-colors duration-200">Machinery & Equipment</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Main Offices & Address */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-base tracking-wider uppercase relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#F97316]">
              Registered Office
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#F97316] mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400 text-xs leading-relaxed">
                  Flat No. 101, 94-Silkwood Apartments, Srini Avenue Gate No.1, High Tension Line Road, PetBasheerabad, Hyderabad, Telangana – 500067.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#F97316] flex-shrink-0" size={16} />
                <a href="tel:+917896675502" className="hover:text-[#F97316] transition-colors">
                  +91 7896675502
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#F97316] flex-shrink-0" size={16} />
                <a href="mailto:uniquepowers@gmail.com" className="hover:text-[#F97316] transition-colors text-xs break-all">
                  uniquepowers@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-[#F97316] flex-shrink-0" size={16} />
                <span className="text-gray-400 text-xs">
                  Mon - Sat: 09:00 AM - 06:00 PM
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>
            <p>© {currentYear} M/s Unique Power Systems. All Rights Reserved.</p>
            <p className="mt-1">
              Established 2010 | Registered Class 'A' Electrical and Engineering Contractors
            </p>
          </div>
          <div className="flex gap-4">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-slate-800 hover:bg-[#0B3A7E] text-gray-400 hover:text-white p-2 rounded-full transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-slate-800 hover:bg-[#0B3A7E] text-gray-400 hover:text-white p-2 rounded-full transition-colors"
              aria-label="Facebook Page"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
