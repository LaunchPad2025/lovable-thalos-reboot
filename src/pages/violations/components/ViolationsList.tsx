
import React from 'react';
import ViolationsTable from '@/components/violations/ViolationsTable';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Plus } from 'lucide-react';

interface ViolationsListProps {
  violations: any[];
  onSelectViolation: (id: string) => void;
  onUpload: () => void;
}

const ViolationsList = ({ violations, onSelectViolation, onUpload }: ViolationsListProps) => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-white mb-1 flex items-center">
          <ShieldAlert className="mr-2 h-6 w-6 text-red-500" />
          Safety Violations
        </h1>
        <p className="text-gray-400">View and manage safety violations</p>
      </div>
      
      <div className="flex justify-end mb-6">
        <Button 
          onClick={onUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Detect New Violations
        </Button>
      </div>
      
      <ViolationsTable 
        violations={violations} 
        onSelectViolation={onSelectViolation}
      />
    </>
  );
};

export default ViolationsList;
