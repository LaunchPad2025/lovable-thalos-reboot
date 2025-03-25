
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Task {
  id: string;
  title: string;
  priority: string;
  assignee: string;
  dueDate: string;
  status: string;
}

interface Violation {
  id: string;
  title: string;
  regulation: string;
  location: string;
  detected: string;
  severity: string;
}

interface Audit {
  id: string;
  title: string;
  findings: number;
  date: string;
  compliance: string;
  status: string;
}

interface RelatedItemsTabsProps {
  tasks: Task[];
  violations: Violation[];
  audits: Audit[];
}

const RelatedItemsTabs: React.FC<RelatedItemsTabsProps> = ({ 
  tasks, 
  violations, 
  audits 
}) => {
  const [activeSection, setActiveSection] = useState('tasks');

  return (
    <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
      <h3 className="text-white font-medium mb-4">Related Items</h3>
      <p className="text-gray-400 mb-4">Tasks, violations, and audits connected to this assessment</p>
      
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="bg-[#1a1f29] w-full p-0">
          <TabsTrigger value="tasks" className="flex-1 text-sm">Tasks</TabsTrigger>
          <TabsTrigger value="violations" className="flex-1 text-sm">Violations</TabsTrigger>
          <TabsTrigger value="audits" className="flex-1 text-sm">Audits</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {activeSection === 'tasks' && (
        <div className="space-y-4 mt-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-[#1a1f29] p-4 rounded-md border border-gray-800">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-white font-medium">{task.title}</h4>
                  <div className="flex items-center text-sm mt-1">
                    <span className="text-gray-400 mr-1">Priority:</span>
                    <span className={`font-medium ${task.priority === 'High' ? 'text-red-400' : task.priority === 'Medium' ? 'text-yellow-400' : 'text-blue-400'}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <span className="text-gray-400 mr-1">Assigned to:</span>
                    <span className="text-white">{task.assignee}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-gray-400 text-sm mb-1">Due: {task.dueDate}</span>
                  <span className={`px-2 py-0.5 text-xs rounded ${task.status === 'Completed' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}>
                    {task.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activeSection === 'violations' && (
        <div className="space-y-4 mt-4">
          {violations.map((violation) => (
            <div key={violation.id} className="bg-[#1a1f29] p-4 rounded-md border border-gray-800">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-white font-medium">{violation.title}</h4>
                  <div className="flex items-center text-sm mt-1">
                    <span className="text-gray-400 mr-1">Regulation:</span>
                    <span className="text-white">{violation.regulation}</span>
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <span className="text-gray-400 mr-1">Location:</span>
                    <span className="text-white">{violation.location}</span>
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <span className="text-gray-400 mr-1">Detected:</span>
                    <span className="text-white">{violation.detected}</span>
                  </div>
                </div>
                <div>
                  <span className={`px-2 py-0.5 text-xs rounded ${violation.severity === 'Critical' ? 'bg-red-500' : 'bg-orange-500'} text-white`}>
                    {violation.severity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activeSection === 'audits' && (
        <div className="space-y-4 mt-4">
          {audits.map((audit) => (
            <div key={audit.id} className="bg-[#1a1f29] p-4 rounded-md border border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-white font-medium">{audit.title}</h4>
                <span className="px-2 py-0.5 text-xs rounded bg-green-500 text-white">
                  {audit.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400">Findings: {audit.findings}</div>
                <div className="text-gray-400">Date: {audit.date}</div>
                <div className="text-gray-400">Compliance: {audit.compliance}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedItemsTabs;
