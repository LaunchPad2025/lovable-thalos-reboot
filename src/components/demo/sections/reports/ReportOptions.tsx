
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface ReportOptionsProps {
  activeTab: string;
}

const ReportOptions = ({ activeTab }: ReportOptionsProps) => {
  return (
    <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6 mb-6">
      <h3 className="font-medium text-white mb-3">Report Options</h3>
      <p className="text-gray-400 text-sm mb-4">Customize your report by choosing filter options</p>
      
      {activeTab === 'compliance' && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Time Period:</span>
          <div className="relative inline-block w-48">
            <select 
              className="block appearance-none w-full bg-[#161b22] border border-gray-800 text-white py-2 px-3 pr-8 rounded leading-tight focus:outline-none"
            >
              <option>Last Month</option>
              <option>Last Week</option>
              <option>Last Quarter</option>
              <option>Last Year</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'media' && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Media Type:</span>
          <div className="relative inline-block w-48">
            <select 
              className="block appearance-none w-full bg-[#161b22] border border-gray-800 text-white py-2 px-3 pr-8 rounded leading-tight focus:outline-none"
            >
              <option>All media</option>
              <option>Images</option>
              <option>Video</option>
              <option>Audio</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'tasks' && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Task Status:</span>
          <div className="relative inline-block w-48">
            <select 
              className="block appearance-none w-full bg-[#161b22] border border-gray-800 text-white py-2 px-3 pr-8 rounded leading-tight focus:outline-none"
            >
              <option>All statuses</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>In Progress</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'violations' && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Date Range:</span>
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-[#0d1117]">
            <Calendar className="h-4 w-4" />
            Pick a start date
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-[#0d1117]">
            <Calendar className="h-4 w-4" />
            Pick an end date
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReportOptions;
