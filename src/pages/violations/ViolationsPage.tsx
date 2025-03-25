import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import ViolationsList from './components/ViolationsList';
import ViolationDetails from '@/components/violations/ViolationDetails';
import ViolationUploadView from './components/ViolationUploadView';
import ViolationResultsView from './components/ViolationResultsView';
import { ViolationAnalysisProvider } from '@/components/violations/ViolationAnalysisProvider';

// Mock data with fixed status types - keeping the same data as the original file
const mockViolations = [
  {
    id: 'V-1234',
    title: 'Missing guardrail on platform',
    location: 'Building A, Floor 2',
    date: 'October 15, 2023',
    status: 'open' as const, 
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

const ViolationsPage = () => {
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
      <ViolationAnalysisProvider>
        {currentView === 'list' && (
          <ViolationsList 
            violations={mockViolations} 
            onSelectViolation={handleSelectViolation} 
            onUpload={() => setCurrentView('upload')} 
          />
        )}
        
        {currentView === 'details' && selectedViolation && (
          <ViolationDetails 
            {...mockViolationDetails[selectedViolation as keyof typeof mockViolationDetails]} 
            onBack={handleViewViolationsList}
          />
        )}
        
        {currentView === 'upload' && (
          <ViolationUploadView 
            onUploadComplete={handleUploadComplete} 
            onViewViolationsList={handleViewViolationsList} 
          />
        )}
        
        {currentView === 'results' && testResults && (
          <ViolationResultsView 
            testResults={testResults} 
            onBackToUpload={handleBackToUpload} 
            onViewViolationsList={handleViewViolationsList} 
          />
        )}
      </ViolationAnalysisProvider>
    </PageContainer>
  );
};

export default ViolationsPage;
