
import React, { useState, useEffect } from 'react';
import DemoSidebar from './demo/DemoSidebar';
import DemoHeader from './demo/DemoHeader';
import DashboardSection from './demo/sections/DashboardSection';
import ViolationsSection from './demo/sections/ViolationsSection';
import TasksSection from './demo/sections/TasksSection';
import ReportsSection from './demo/sections/ReportsSection';
import DocumentsSection from './demo/sections/DocumentsSection';
import AuditsSection from './demo/sections/AuditsSection';
import { useMobile } from '@/hooks/useMobile';

const DemoDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useMobile();
  
  // Auto-collapse sidebar on mobile
  useEffect(() => {
    setSidebarCollapsed(isMobile);
  }, [isMobile]);
  
  // Define common handlers for all sections
  const handleShowFeatureInfo = () => {
    console.log('Feature info requested');
    // This could show a modal or other UI in a real implementation
  };
  
  const handleItemSelect = (item: any) => {
    console.log('Item selected:', item);
    // This could open a detail view in a real implementation
  };
  
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection onShowFeatureInfo={handleShowFeatureInfo} />;
      case 'violations':
        return <ViolationsSection onShowFeatureInfo={handleShowFeatureInfo} onItemSelect={handleItemSelect} />;
      case 'tasks':
        return <TasksSection onShowFeatureInfo={handleShowFeatureInfo} onItemSelect={handleItemSelect} />;
      case 'reports':
        return <ReportsSection onShowFeatureInfo={handleShowFeatureInfo} onItemSelect={handleItemSelect} />;
      case 'documents':
        return <DocumentsSection onShowFeatureInfo={handleShowFeatureInfo} onItemSelect={handleItemSelect} />;
      case 'audits':
        return <AuditsSection onShowFeatureInfo={handleShowFeatureInfo} onItemSelect={handleItemSelect} />;
      default:
        return <div className="p-6 text-white">Feature Coming Soon</div>;
    }
  };
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-[#0c1117]">
      <DemoSidebar 
        activeSection={activeSection} 
        onNavigate={setActiveSection}
        collapsed={sidebarCollapsed}
      />
      <div className={`flex-1 flex flex-col ${!sidebarCollapsed ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        <DemoHeader 
          activeSection={activeSection} 
          onToggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />
        <main className="flex-1 overflow-y-auto pt-16">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default DemoDashboard;
