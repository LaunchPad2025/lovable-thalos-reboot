
import React from 'react';
import ComplianceCard from './ComplianceCard';
import TasksCard from './TasksCard';
import IncidentsCard from './IncidentsCard';

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ComplianceCard />
      <TasksCard />
      <IncidentsCard />
    </div>
  );
};

export default StatsCards;
