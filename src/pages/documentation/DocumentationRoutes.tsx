
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Features from './Features';
import Guides from './Guides';
import ApiDocs from './ApiDocs';
import Updates from './Updates';
import HelpCenter from './HelpCenter';
import Integrations from './Integrations';
import Blog from './Blog';
import Legal from './Legal';
import Pricing from './Pricing';
import AboutUs from './AboutUs';
import Careers from './Careers';
import Contact from './Contact';

const DocumentationRoutes = () => {
  return (
    <Routes>
      <Route path="/features" element={<Features />} />
      <Route path="/guides" element={<Guides />} />
      <Route path="/api" element={<ApiDocs />} />
      <Route path="/updates" element={<Updates />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/integrations" element={<Integrations />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default DocumentationRoutes;
