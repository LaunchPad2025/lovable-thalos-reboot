
import React from 'react';

interface InfoCardProps {
  label: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ label, value }) => {
  return (
    <div className="bg-[#0f1419] p-4 rounded-md border border-gray-800 flex items-center space-x-3">
      <div className="bg-[#1a1f29] p-2 rounded">
        <div className="h-6 w-6 text-gray-400" />
      </div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-white">{value}</p>
      </div>
    </div>
  );
};

interface InfoCardsProps {
  department: string;
  location: string;
  assessor: string;
  assessmentDate: string;
}

const InfoCards: React.FC<InfoCardsProps> = ({ 
  department, 
  location, 
  assessor, 
  assessmentDate 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <InfoCard label="Department" value={department} />
      <InfoCard label="Location" value={location} />
      <InfoCard label="Assessor" value={assessor} />
      <InfoCard label="Assessment Date" value={assessmentDate} />
    </div>
  );
};

export default InfoCards;
