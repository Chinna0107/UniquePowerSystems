import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import AdminProjects from './pages/admin/AdminProjects';
import AdminLedgers from './pages/admin/AdminLedgers';
import Transactions from './pages/admin/Transactions';
import Dashboard from './pages/admin/Dashboard';
import ProjectWorth from './pages/admin/ProjectWorth';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="project-worth" element={<ProjectWorth />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="ledgers" element={<AdminLedgers />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
        
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Projects />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
