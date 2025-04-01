
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const tasksByPriorityData = [
  { name: 'low', value: 0 },
  { name: 'medium', value: 4 },
  { name: 'high', value: 1 },
];

const TasksCharts = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
          <h3 className="font-medium text-white mb-2">Task Summary</h3>
          <p className="text-gray-400 text-sm mb-6">Current tasks by status</p>
          
          <div className="flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-white mb-2">5</div>
            <div className="text-gray-400 text-sm">4 completed, 0 pending, 0 in progress</div>
            <div className="text-red-400 text-sm">0 tasks overdue</div>
          </div>
        </div>
        
        <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
          <h3 className="font-medium text-white mb-2">Completion Rate</h3>
          <p className="text-gray-400 text-sm mb-6">Task completion percentage</p>
          
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#1e293b" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeDasharray={`${80 * 2.83} 283`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl font-bold text-white">80%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6 mb-6">
        <h3 className="font-medium text-white mb-2">Tasks by Priority</h3>
        <p className="text-gray-400 text-sm mb-4">Distribution by urgency level</p>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tasksByPriorityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis domain={[0, 5]} stroke="#64748b" />
              <Bar dataKey="value" fill="#3b82f6" name="Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default TasksCharts;
