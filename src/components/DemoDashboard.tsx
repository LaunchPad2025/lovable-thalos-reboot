
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, Lightbulb } from 'lucide-react';

// Import our components
import DemoHeader from './demo/DemoHeader';
import DemoSidebar from './demo/DemoSidebar';
import DashboardSection from './demo/sections/DashboardSection';
import ViolationsSection from './demo/sections/ViolationsSection';
import TasksSection from './demo/sections/TasksSection';
import ReportsSection from './demo/sections/ReportsSection';
import DocumentsSection from './demo/sections/DocumentsSection';
import AuditsSection from './demo/sections/AuditsSection';
import FeatureInfo from './demo/FeatureInfo';
import ItemDetailView from './demo/ItemDetailView';
import ChatInterface from './chatbot/ChatInterface';

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
      
      <main className="ml-64 p-6 pt-20">
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
            
            {activeSection === 'reports' && (
              <ReportsSection 
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
            
            {activeSection === 'copilot' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Safety Copilot</h1>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Lightbulb size={16} />
                    Suggest a Feature
                  </Button>
                </div>
                
                <Card className="border border-gray-800 bg-[#0d1117] shadow-xl">
                  <div className="p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white flex items-center">
                      <span className="bg-blue-600 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2">
                        <span className="font-semibold">P</span>
                      </span>
                      Ask Paulie
                    </h2>
                  </div>
                  <CardContent className="p-0 h-[600px]">
                    <ChatInterface />
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
        
        {!showFeatureInfo && activeSection !== 'copilot' && (
          <FeatureInfo featureInfo={featureInfo} />
        )}
      </main>
    </div>
  );
};

export default DemoDashboard;
