
import React from 'react';
import { ArrowLeft, User, MapPin, Calendar, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '../ui/StatusBadge';

interface Regulation {
  id: string;
  title: string;
  confidence: number;
}

interface ViolationDetailsProps {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  reportedBy: string;
  status: 'open' | 'in-progress' | 'resolved' | 'pending';
  severity: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  regulations?: Regulation[];
  notes?: string[];
  image?: string | null;
  onBack: () => void;
}

const ViolationDetails = ({
  id,
  title,
  description,
  location,
  date,
  reportedBy,
  status,
  severity,
  assignee,
  regulations = [],
  notes = [],
  image,
  onBack
}: ViolationDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-4">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">ID: {id}</p>
        </div>
        <div className="ml-auto flex space-x-2">
          <StatusBadge status={status} />
          <span 
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
              ${severity === 'low' ? 'bg-green-100 text-green-800' : 
                severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                severity === 'high' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'}`}
          >
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {image && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Image</h3>
                <img 
                  src={image} 
                  alt={title} 
                  className="rounded-md border max-h-[300px]" 
                />
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{description}</p>
            </div>
            
            {regulations.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Relevant Regulations</h3>
                <div className="space-y-3">
                  {regulations.map((regulation) => (
                    <div key={regulation.id} className="p-3 bg-gray-50 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">{regulation.title}</h4>
                        <span className="text-sm text-gray-500">
                          Confidence: {regulation.confidence}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {notes.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Notes</h3>
                <div className="space-y-4">
                  {notes.map((note, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-md">
                      <p className="text-gray-700">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-900 mb-4">Violation Details</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium">{location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar size={18} className="text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Date Reported</p>
                    <p className="text-sm font-medium">{date}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <User size={18} className="text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Reported By</p>
                    <p className="text-sm font-medium">{reportedBy}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <AlertTriangle size={18} className="text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Severity</p>
                    <p className="text-sm font-medium">{severity.charAt(0).toUpperCase() + severity.slice(1)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <User size={18} className="text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Assigned To</p>
                    <p className="text-sm font-medium">{assignee}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <Button className="w-full bg-thalos-blue hover:bg-blue-600">
                Update Status
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViolationDetails;
