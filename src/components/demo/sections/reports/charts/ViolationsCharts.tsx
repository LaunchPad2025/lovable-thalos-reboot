
import React from 'react';

const ViolationsCharts = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
          <h3 className="font-medium text-white mb-2">Violation Summary</h3>
          <p className="text-gray-400 text-sm mb-6">Total violations detected</p>
          
          <div className="flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-white mb-2">0</div>
            <div className="text-gray-400 text-sm">From 62 analyses</div>
          </div>
        </div>
        
        <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
          <h3 className="font-medium text-white mb-2">Severity Distribution</h3>
          <p className="text-gray-400 text-sm mb-6">Violations by risk level</p>
          
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-400">No violations detected in this period</p>
          </div>
        </div>
      </div>
      
      <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6 mb-6">
        <h3 className="font-medium text-white mb-2">Top Violated Regulations</h3>
        <p className="text-gray-400 text-sm mb-4">Most frequently violated safety regulations</p>
        
        <div className="h-72 flex items-center justify-center">
          <p className="text-gray-400">No violations detected in this period</p>
        </div>
      </div>
    </>
  );
};

export default ViolationsCharts;
