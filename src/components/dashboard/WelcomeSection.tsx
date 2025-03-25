
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface WelcomeSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const WelcomeSection = ({ activeTab, setActiveTab }: WelcomeSectionProps) => {
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="bg-[#0d1117] rounded-lg border border-gray-800">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Welcome back, Alex</h2>
          
          <div className="flex space-x-2 bg-gray-800 p-1 rounded-md">
            <Button
              onClick={() => handleTabChange('personal')}
              variant="ghost"
              className={`text-sm px-3 py-1 rounded-md ${
                activeTab === 'personal' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Personal
            </Button>
            <Button
              onClick={() => handleTabChange('organization')}
              variant="ghost"
              className={`text-sm px-3 py-1 rounded-md ${
                activeTab === 'organization' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Organization
            </Button>
          </div>
        </div>
        
        <p className="text-gray-400 mb-6">
          {activeTab === 'personal' 
            ? 'Here\'s a summary of your personal safety compliance status.' 
            : 'Here\'s a summary of your organization\'s safety compliance status.'}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#151c25] p-4 rounded-lg border border-gray-800">
            <h3 className="text-lg font-medium text-white">Tasks Due Soon</h3>
            <p className="text-3xl font-bold text-white mt-2">5</p>
            <Link to="/tasks" className="text-blue-400 text-sm mt-2 block hover:text-blue-300">
              View all tasks
            </Link>
          </div>
          
          <div className="bg-[#151c25] p-4 rounded-lg border border-gray-800">
            <h3 className="text-lg font-medium text-white">Open Violations</h3>
            <p className="text-3xl font-bold text-white mt-2">3</p>
            <Link to="/violations" className="text-blue-400 text-sm mt-2 block hover:text-blue-300">
              View all violations
            </Link>
          </div>
          
          <div className="bg-[#151c25] p-4 rounded-lg border border-gray-800">
            <h3 className="text-lg font-medium text-white">Training Complete</h3>
            <p className="text-3xl font-bold text-white mt-2">87%</p>
            <Link to="/training" className="text-blue-400 text-sm mt-2 block hover:text-blue-300">
              View training status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
