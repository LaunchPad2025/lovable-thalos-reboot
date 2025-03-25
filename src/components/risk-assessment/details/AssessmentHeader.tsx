
import React from 'react';

interface AssessmentHeaderProps {
  title: string;
  createdDate: string;
  status: string;
  riskLevel: string;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({ 
  title, 
  createdDate, 
  status, 
  riskLevel 
}) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
        <p className="text-gray-400">Created on {createdDate}</p>
      </div>
      <div className="flex space-x-2">
        <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">{status}</span>
        <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">{riskLevel} Risk</span>
      </div>
    </div>
  );
};

export default AssessmentHeader;
