
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from '@/pages/Dashboard';
import Violations from '@/pages/violations';
import Tasks from '@/pages/Tasks';
import RiskAssessment from '@/pages/RiskAssessment';
import Documents from '@/pages/Documents';
import Notifications from '@/pages/Notifications';
import Chatbot from '@/pages/Chatbot';
import Subscription from '@/pages/Subscription';
import Settings from '@/pages/Settings';
import Regulations from '@/pages/Regulations';
import Models from '@/pages/Models';
import SidebarExamples from '@/pages/SidebarExamples';
import Audits from '@/pages/Audits';
import ComingSoon from '@/pages/ComingSoon';
import Training from '@/pages/Training';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import Legal from '@/pages/Legal';

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/violations" element={<Violations />} />
            <Route path="/violations/:id" element={<Violations />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<Tasks />} />
            <Route path="/risk-assessment" element={<RiskAssessment />} />
            <Route path="/risk-assessment/:id" element={<RiskAssessment />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/regulations" element={<Regulations />} />
            <Route path="/regulations/:id" element={<Regulations />} />
            <Route path="/models" element={<Models />} />
            <Route path="/sidebar-examples" element={<SidebarExamples />} />
            <Route path="/audits" element={<Audits />} />
            <Route path="/reports" element={<ComingSoon />} />
            <Route path="/training" element={<Training />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/help" element={<ComingSoon />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
