
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import ViolationsTable from '@/components/violations/ViolationsTable';
import ViolationDetails from '@/components/violations/ViolationDetails';
import ViolationUpload from '@/components/violations/ViolationUpload';
import ViolationResults from '@/components/violations/ViolationResults';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, ShieldAlert } from 'lucide-react';

// Mock data with fixed status types
const mockViolations = [
  {
    id: 'V-1234',
    title: 'Missing guardrail on platform',
    location: 'Building A, Floor 2',
    date: 'October 15, 2023',
    status: 'open' as const, // Using const assertion to ensure literal type
    severity: 'high' as const,
    assignee: 'Sarah Johnson',
    image: null
  },
  {
    id: 'V-1235',
    title: 'Improper chemical storage',
    location: 'Lab 3',
    date: 'October 12, 2023',
    status: 'in-progress' as const,
    severity: 'medium' as const,
    assignee: 'Mike Williams',
    image: null
  },
  {
    id: 'V-1236',
    title: 'Blocked fire exit',
    location: 'Building B, Ground Floor',
    date: 'October 10, 2023',
    status: 'resolved' as const,
    severity: 'critical' as const,
    assignee: 'John Doe',
    image: null
  },
  {
    id: 'V-1237',
    title: 'Exposed electrical wiring',
    location: 'Maintenance Room',
    date: 'October 8, 2023',
    status: 'open' as const,
    severity: 'high' as const,
    assignee: 'Emily Davis',
    image: null
  },
  {
    id: 'V-1238',
    title: 'Inadequate ventilation',
    location: 'Paint Shop',
    date: 'October 5, 2023',
    status: 'in-progress' as const,
    severity: 'medium' as const,
    assignee: 'Robert Chen',
    image: null
  },
  {
    id: 'V-1239',
    title: 'Slippery floor without warning signs',
    location: 'Cafeteria',
    date: 'October 3, 2023',
    status: 'resolved' as const,
    severity: 'low' as const,
    assignee: 'Lisa Martinez',
    image: null
  },
  {
    id: 'V-1240',
    title: 'Forklift operating without certified driver',
    location: 'Warehouse',
    date: 'September 28, 2023',
    status: 'open' as const,
    severity: 'critical' as const,
    assignee: 'David Taylor',
    image: null
  }
];

const mockViolationDetails = {
  'V-1234': {
    id: 'V-1234',
    title: 'Missing guardrail on platform',
    description: 'The elevated platform in Building A, Floor 2 is missing a guardrail on the north side, creating a fall hazard for workers. The platform is approximately 2 meters high.',
    location: 'Building A, Floor 2',
    date: 'October 15, 2023',
    reportedBy: 'Alice Brown',
    status: 'open' as const,
    severity: 'high' as const,
    assignee: 'Sarah Johnson',
    regulations: [
      { id: 'OSHA-1926.501', title: 'OSHA 29 CFR 1926.501(b)(1)', confidence: 85 }
    ],
    notes: [
      'Initial inspection conducted on October 15, 2023. Photos have been taken and added to the safety log.',
      'Temporary warning tape has been installed to mark the hazard area until proper guardrails can be installed.'
    ],
    image: null
  },
  'V-1235': {
    id: 'V-1235',
    title: 'Improper chemical storage',
    description: 'Several incompatible chemicals are being stored together in Lab 3, creating a potential reaction hazard. The chemicals include oxidizers and flammable solvents.',
    location: 'Lab 3',
    date: 'October 12, 2023',
    reportedBy: 'Thomas Wilson',
    status: 'in-progress' as const,
    severity: 'medium' as const,
    assignee: 'Mike Williams',
    regulations: [
      { id: 'OSHA-1910.106', title: 'OSHA 29 CFR 1910.106', confidence: 72 }
    ],
    notes: [
      'Safety team has been notified and is working on reorganizing the chemical storage area.',
      'Additional chemical storage cabinets have been ordered to properly separate incompatible materials.'
    ],
    image: null
  }
};

type ViolationView = 'list' | 'details' | 'upload' | 'results';

const Violations = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedViolation, setSelectedViolation] = useState<string | null>(id || null);
  const [currentView, setCurrentView] = useState<ViolationView>(id ? 'details' : 'upload');
  const [testResults, setTestResults] = useState<any>(null);
  
  const handleUploadComplete = (results: any) => {
    setTestResults(results);
    setCurrentView('results');
  };
  
  const handleBackToUpload = () => {
    setTestResults(null);
    setCurrentView('upload');
  };
  
  const handleViewViolationsList = () => {
    setSelectedViolation(null);
    setCurrentView('list');
  };
  
  const handleSelectViolation = (violationId: string) => {
    setSelectedViolation(violationId);
    setCurrentView('details');
  };
  
  return (
    <PageContainer className="bg-[#070b11] text-white">
      {currentView === 'list' && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-white mb-1 flex items-center">
              <ShieldAlert className="mr-2 h-6 w-6 text-red-500" />
              Safety Violations
            </h1>
            <p className="text-gray-400">View and manage safety violations</p>
          </div>
          
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setCurrentView('upload')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
            >
              <span className="mr-2">+</span> Detect New Violations
            </button>
          </div>
          
          <ViolationsTable 
            violations={mockViolations} 
            onSelectViolation={handleSelectViolation}
          />
        </>
      )}
      
      {currentView === 'details' && selectedViolation && (
        <ViolationDetails 
          {...mockViolationDetails[selectedViolation as keyof typeof mockViolationDetails]} 
          onBack={handleViewViolationsList}
        />
      )}
      
      {currentView === 'upload' && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-white mb-1 flex items-center">
              <ShieldAlert className="mr-2 h-6 w-6 text-yellow-500" />
              Safety Violation Detection
            </h1>
            <p className="text-gray-400">Upload images to automatically detect and analyze workplace safety violations using AI</p>
          </div>
          
          <div className="flex justify-end mb-6">
            <button 
              onClick={handleViewViolationsList}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center"
            >
              View All Violations
            </button>
          </div>
          
          <Alert className="mb-6 bg-blue-900/30 border border-blue-800 text-blue-200">
            <InfoIcon className="h-4 w-4 text-blue-400 mr-2" />
            <AlertDescription>
              Our AI analyzes your workplace images to identify safety violations and suggest corrective actions. 
              If no violations are detected, you'll receive a safety compliance confirmation. 
              Remember that AI analysis should supplement, not replace, regular physical safety inspections.
            </AlertDescription>
          </Alert>
          
          <ViolationUpload onUploadComplete={handleUploadComplete} />
        </>
      )}
      
      {currentView === 'results' && testResults && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-white mb-1">Analysis Results</h1>
            <p className="text-gray-400">AI-detected safety violations</p>
          </div>
          
          <div className="flex justify-end mb-6 space-x-2">
            <button 
              onClick={handleBackToUpload}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center"
            >
              New Analysis
            </button>
            <button 
              onClick={handleViewViolationsList}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center"
            >
              View All Violations
            </button>
          </div>
          
          <ViolationResults 
            results={testResults} 
            onSave={() => {
              // In a real implementation, this would save the violation to the database
              handleViewViolationsList();
            }} 
          />
        </>
      )}
    </PageContainer>
  );
};

export default Violations;
