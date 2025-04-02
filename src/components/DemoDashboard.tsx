
import React, { useState } from 'react';
import DemoSidebar from './demo/DemoSidebar';
import DemoHeader from './demo/DemoHeader';
import DashboardSection from './demo/sections/DashboardSection';
import ViolationsSection from './demo/sections/ViolationsSection';
import TasksSection from './demo/sections/TasksSection';
import ReportsSection from './demo/sections/ReportsSection';
import DocumentsSection from './demo/sections/DocumentsSection';
import AuditsSection from './demo/sections/AuditsSection';

const DemoDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'violations':
        return <ViolationsSection />;
      case 'tasks':
        return <TasksSection />;
      case 'reports':
        return <ReportsSection />;
      case 'documents':
        return <DocumentsSection />;
      case 'audits':
        return <AuditsSection />;
      default:
        return <div className="p-6 text-white">Feature Coming Soon</div>;
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-[#0c1117]">
      <DemoSidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <div className="flex-1 flex flex-col">
        <DemoHeader activeSection={activeSection} />
        <main className="flex-1 overflow-y-auto pt-16">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default DemoDashboard;
