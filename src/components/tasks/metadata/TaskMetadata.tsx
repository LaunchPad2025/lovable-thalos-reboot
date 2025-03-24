
import React from 'react';
import { Calendar, Clock, User, AlertCircle, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Violation } from '@/types/models';
import { useNavigate } from 'react-router-dom';

interface TaskMetadataProps {
  dueDate: string;
  assigneeName: string;
  status: string;
  priority: string;
  violationDetails?: Violation | null;
}

const TaskMetadata = ({ 
  dueDate, 
  assigneeName, 
  status, 
  priority, 
  violationDetails 
}: TaskMetadataProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <Calendar size={16} className="text-gray-400 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Due Date</p>
            <p className="text-sm font-medium text-gray-300">{dueDate}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <User size={16} className="text-gray-400 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Assigned To</p>
            <p className="text-sm font-medium text-gray-300">{assigneeName}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Clock size={16} className="text-gray-400 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Status</p>
            <p className="text-sm font-medium text-gray-300">{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <AlertCircle size={16} className="text-gray-400 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Priority</p>
            <p className="text-sm font-medium text-gray-300">{priority.charAt(0).toUpperCase() + priority.slice(1)}</p>
          </div>
        </div>
      </div>
      
      {violationDetails && (
        <div className="mb-6 p-3 bg-[#131920] border border-gray-800 rounded-md">
          <div className="flex items-center">
            <Link2 size={16} className="text-thalos-blue mr-2" />
            <div>
              <p className="text-xs text-gray-500">Related Violation</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-sm font-medium text-thalos-blue hover:text-blue-400"
                onClick={() => navigate(`/violations/${violationDetails.id}`)}
              >
                {violationDetails.violation}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskMetadata;
