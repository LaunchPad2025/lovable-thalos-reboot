import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

// Import our components
import DemoHeader from './demo/DemoHeader';
import DemoSidebar from './demo/DemoSidebar';
import DashboardSection from './demo/sections/DashboardSection';
import ViolationsSection from './demo/sections/ViolationsSection';
import TasksSection from './demo/sections/TasksSection';
import DocumentsSection from './demo/sections/DocumentsSection';
import AuditsSection from './demo/sections/AuditsSection';
import FeatureInfo from './demo/FeatureInfo';
import ItemDetailView from './demo/ItemDetailView';

// Import utility data
import { getFeatureInfo } from './demo/featureInfoData';

const DemoDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showFeatureInfo, setShowFeatureInfo] = useState(false);
  
  const handleNavigation = (section: string) => {
    setActiveSection(section);
    setSelectedItem(null);
    setShowFeatureInfo(false);
  };
  
  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
    setShowFeatureInfo(true);
  };
  
  const featureInfo = getFeatureInfo(activeSection, selectedItem);
  
  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      <DemoHeader />
      <DemoSidebar activeSection={activeSection} onNavigate={handleNavigation} />
      
      <main className="ml-64 p-6">
        {showFeatureInfo && selectedItem ? (
          <ItemDetailView 
            content={featureInfo.content} 
            onBack={() => setShowFeatureInfo(false)} 
          />
        ) : (
          <>
            {activeSection === 'dashboard' && (
              <DashboardSection onShowFeatureInfo={() => setShowFeatureInfo(true)} />
            )}
            
            {activeSection === 'violations' && (
              <ViolationsSection 
                onShowFeatureInfo={() => setShowFeatureInfo(true)} 
                onItemSelect={handleItemSelect} 
              />
            )}
            
            {activeSection === 'tasks' && (
              <TasksSection 
                onShowFeatureInfo={() => setShowFeatureInfo(true)}
                onItemSelect={handleItemSelect}
              />
            )}
            
            {activeSection === 'documents' && (
              <DocumentsSection 
                onShowFeatureInfo={() => setShowFeatureInfo(true)}
                onItemSelect={handleItemSelect}
              />
            )}
            
            {activeSection === 'audits' && (
              <AuditsSection 
                onShowFeatureInfo={() => setShowFeatureInfo(true)}
                onItemSelect={handleItemSelect}
              />
            )}
          </>
        )}
        
        {!showFeatureInfo && (
          <FeatureInfo featureInfo={featureInfo} />
        )}
      </main>
    </div>
  );
};

export default DemoDashboard;
