
import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface Violation {
  id: string;
  title: string;
  location: string;
  date: string;
  status: 'open' | 'in-progress' | 'resolved' | 'pending';
  severity: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  image?: string | null;
}

interface ViolationsTableProps {
  violations: Violation[];
  onSelectViolation: (id: string) => void;
}

const ViolationsTable = ({ violations, onSelectViolation }: ViolationsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const filteredViolations = violations.filter(violation => {
    const matchesSearch = 
      violation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      violation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      violation.assignee.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || violation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex items-center">
          <Search size={18} className="absolute left-3 text-gray-400" />
          <Input
            type="text"
            placeholder="Search violations..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full sm:w-64"
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <div className="flex items-center space-x-1">
              <Filter size={18} className="text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border-none bg-transparent focus:ring-0 text-sm font-medium cursor-pointer pr-8"
              >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="pending">Pending</option>
              </select>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Violation
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignee
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredViolations.length > 0 ? (
              filteredViolations.map((violation) => (
                <tr 
                  key={violation.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onSelectViolation(violation.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{violation.title}</div>
                    <div className="text-xs text-gray-500">ID: {violation.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {violation.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {violation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={violation.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${violation.severity === 'low' ? 'bg-green-100 text-green-800' : 
                          violation.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          violation.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'}`}
                    >
                      {violation.severity.charAt(0).toUpperCase() + violation.severity.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {violation.assignee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button 
                      variant="ghost" 
                      className="text-thalos-blue hover:text-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectViolation(violation.id);
                      }}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No violations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViolationsTable;
