
import React from 'react';
import StatusCard from './StatusCard';

interface StatusCardGridProps {
  activeTab: string;
}

const StatusCardGrid = ({ activeTab }: StatusCardGridProps) => {
  // This could be expanded to change values based on the active tab
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatusCard 
        title="Tasks Due Soon" 
        value={5} 
        link="/tasks" 
        linkText="View all tasks" 
      />
      
      <StatusCard 
        title="Open Violations" 
        value={3} 
        link="/violations" 
        linkText="View all violations" 
      />
      
      <StatusCard 
        title="Training Complete" 
        value="87%" 
        link="/training" 
        linkText="View training status" 
      />
    </div>
  );
};

export default StatusCardGrid;
