
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const complianceTrendData = [
  { month: 'Jan 1', compliance: 100, violations: 0 },
  { month: 'Feb 1', compliance: 100, violations: 0 },
  { month: 'Mar 1', compliance: 80, violations: 2 },
  { month: 'Apr 1', compliance: 100, violations: 0 },
];

const ComplianceCharts = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
          <h3 className="font-medium text-white mb-2">Compliance Score</h3>
          <p className="text-gray-400 text-sm mb-6">Overall safety compliance percentage</p>
          
          <div className="flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-white mb-2">80%</div>
            <div className="text-gray-400 text-sm">4 of 5 tasks completed</div>
          </div>
        </div>
        
        <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
          <h3 className="font-medium text-white mb-2">Violation Severity</h3>
          <p className="text-gray-400 text-sm mb-6">Distribution by risk level</p>
          
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-400">No violations detected in this period</p>
          </div>
        </div>
      </div>
      
      <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6 mb-6">
        <h3 className="font-medium text-white mb-2">Compliance Trend</h3>
        <p className="text-gray-400 text-sm mb-4">Score trends over time</p>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={complianceTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis domain={[0, 100]} stroke="#64748b" />
              <Line type="monotone" dataKey="compliance" stroke="#3b82f6" strokeWidth={2} name="Compliance Score %" />
              <Line type="monotone" dataKey="violations" stroke="#ef4444" strokeWidth={2} name="Violations" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default ComplianceCharts;
