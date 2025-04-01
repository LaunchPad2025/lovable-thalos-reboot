
import React from 'react';

interface ReportHeaderProps {
  activeTab: string;
}

const ReportHeader = ({ activeTab }: ReportHeaderProps) => {
  return (
    <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6 mb-6">
      {activeTab === 'compliance' && (
        <>
          <h3 className="font-medium text-white mb-1">Compliance Score Report</h3>
          <p className="text-gray-400 text-sm mb-3">Safety compliance analysis over the selected month period</p>
          
          <div className="flex justify-between text-sm text-gray-400">
            <div>Report Period: Mar 1, 2025 - Apr 1, 2025</div>
            <div>Generated: Apr 1, 2025, 3:34 PM</div>
            <div>Data Sources: 67 items</div>
          </div>
        </>
      )}
      
      {activeTab === 'media' && (
        <>
          <h3 className="font-medium text-white mb-1">Media Analysis Report</h3>
          <p className="text-gray-400 text-sm mb-3">Analysis of media uploads and violation detection performance</p>
          
          <div className="flex justify-between text-sm text-gray-400">
            <div>Report Period: Mar 29, 2025 - Apr 1, 2025</div>
            <div>Generated: Apr 1, 2025, 3:35 PM</div>
            <div>Data Sources: 62 items</div>
          </div>
        </>
      )}
      
      {activeTab === 'tasks' && (
        <>
          <h3 className="font-medium text-white mb-1">Task Management Report</h3>
          <p className="text-gray-400 text-sm mb-3">Analysis of safety remediation tasks and their completion status</p>
          
          <div className="flex justify-between text-sm text-gray-400">
            <div>Report Period: Mar 31, 2025 - Apr 1, 2025</div>
            <div>Generated: Apr 1, 2025, 3:35 PM</div>
            <div>Data Sources: 5 items</div>
          </div>
        </>
      )}
      
      {activeTab === 'violations' && (
        <>
          <h3 className="font-medium text-white mb-1">Violation Analysis Report</h3>
          <p className="text-gray-400 text-sm mb-3">Detailed breakdown of safety violations by type, severity, and regulation</p>
          
          <div className="flex justify-between text-sm text-gray-400">
            <div>Report Period: Mar 1, 2025 - Apr 1, 2025</div>
            <div>Generated: Apr 1, 2025, 3:34 PM</div>
            <div>Data Sources: 62 items</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportHeader;
