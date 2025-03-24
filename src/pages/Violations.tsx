
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import ViolationsTable, { Violation } from '@/components/violations/ViolationsTable';
import ViolationDetails from '@/components/violations/ViolationDetails';
import PageTitle from '@/components/ui/PageTitle';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

// Mock data
const mockViolations: Violation[] = [
  {
    id: 'V-1234',
    title: 'Missing guardrail on platform',
    location: 'Building A, Floor 2',
    date: 'October 15, 2023',
    status: 'open',
    severity: 'high',
    assignee: 'Sarah Johnson'
  },
  {
    id: 'V-1235',
    title: 'Improper chemical storage',
    location: 'Lab 3',
    date: 'October 12, 2023',
    status: 'in-progress',
    severity: 'medium',
    assignee: 'Mike Williams'
  },
  {
    id: 'V-1236',
    title: 'Blocked fire exit',
    location: 'Building B, Ground Floor',
    date: 'October 10, 2023',
    status: 'resolved',
    severity: 'critical',
    assignee: 'John Doe'
  },
  {
    id: 'V-1237',
    title: 'Exposed electrical wiring',
    location: 'Maintenance Room',
    date: 'October 8, 2023',
    status: 'open',
    severity: 'high',
    assignee: 'Emily Davis'
  },
  {
    id: 'V-1238',
    title: 'Inadequate ventilation',
    location: 'Paint Shop',
    date: 'October 5, 2023',
    status: 'in-progress',
    severity: 'medium',
    assignee: 'Robert Chen'
  },
  {
    id: 'V-1239',
    title: 'Slippery floor without warning signs',
    location: 'Cafeteria',
    date: 'October 3, 2023',
    status: 'resolved',
    severity: 'low',
    assignee: 'Lisa Martinez'
  },
  {
    id: 'V-1240',
    title: 'Forklift operating without certified driver',
    location: 'Warehouse',
    date: 'September 28, 2023',
    status: 'open',
    severity: 'critical',
    assignee: 'David Taylor'
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
    notes: [
      'Initial inspection conducted on October 15, 2023. Photos have been taken and added to the safety log.',
      'Temporary warning tape has been installed to mark the hazard area until proper guardrails can be installed.'
    ]
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
    notes: [
      'Safety team has been notified and is working on reorganizing the chemical storage area.',
      'Additional chemical storage cabinets have been ordered to properly separate incompatible materials.'
    ]
  }
};

const Violations = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedViolation, setSelectedViolation] = useState<string | null>(id || null);
  
  return (
    <PageContainer>
      {!selectedViolation ? (
        <>
          <PageTitle 
            title="Violations"
            subtitle="Manage and track safety violations"
            action={
              <Button className="bg-thalos-blue hover:bg-blue-600">
                <PlusCircle size={16} className="mr-2" />
                New Violation
              </Button>
            }
          />
          <ViolationsTable violations={mockViolations} />
        </>
      ) : (
        <ViolationDetails 
          {...mockViolationDetails[selectedViolation as keyof typeof mockViolationDetails]} 
        />
      )}
    </PageContainer>
  );
};

export default Violations;
