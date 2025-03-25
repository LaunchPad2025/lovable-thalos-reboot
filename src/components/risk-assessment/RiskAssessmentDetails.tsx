
import React, { useState } from 'react';
import AssessmentHeader from './details/AssessmentHeader';
import InfoCards from './details/InfoCards';
import RiskAssessmentTabsNav from './details/RiskAssessmentTabsNav';
import OverviewTab from './details/tabs/OverviewTab';
import FindingsTab from './details/tabs/FindingsTab';
import MitigationTab from './details/tabs/MitigationTab';
import DocumentsTab from './details/tabs/DocumentsTab';
import RelatedItemsTabs from './details/tabs/RelatedItemsTabs';

interface RiskAssessmentDetailsProps {
  id: string;
}

// Mock assessment data
const mockAssessment = {
  id: '1',
  title: 'Main Warehouse Annual Assessment',
  createdDate: 'Sep 14, 2023',
  department: 'Logistics',
  location: 'Building A - Warehouse',
  assessor: 'John Doe',
  assessmentDate: '9/14/2023',
  status: 'Approved',
  riskLevel: '3.5',
  riskLevelLabel: 'Low',
  notes: 'Overall, the warehouse safety conditions have improved since the last assessment. The implementation of the new cleaning schedule has reduced slip hazards significantly.',
  riskDistribution: {
    low: 1,
    medium: 1,
    high: 0,
    critical: 0
  },
  summary: {
    factors: 2,
    actions: 0,
    attachments: 0,
    highRisks: 0
  },
  findings: [
    {
      id: '1',
      category: 'General Hazards',
      score: 4,
      factors: [
        {
          id: 'factor-1',
          description: 'Some areas of the warehouse floor show minor wear and may become slippery when wet.',
          severity: 'Medium',
          likelihood: 'Possible',
          controls: 'Non-slip flooring installed, regular cleaning schedule'
        },
        {
          id: 'factor-3',
          description: 'Recent reorganization of storage has improved stability, but some high racks need additional securing.',
          severity: 'High',
          likelihood: 'Unlikely',
          controls: 'Secured shelving, hard hat policy in high-rack areas'
        }
      ]
    }
  ],
  tasks: [
    {
      id: 't1',
      title: 'Repair damaged guardrail on warehouse floor',
      priority: 'High',
      assignee: 'David Smith',
      dueDate: '12/14/2023',
      status: 'In Progress'
    },
    {
      id: 't2',
      title: 'Install additional warning signs in warehouse area',
      priority: 'Medium',
      assignee: 'Sarah Johnson',
      dueDate: '11/30/2023',
      status: 'Completed'
    },
    {
      id: 't3',
      title: 'Replace worn floor marking tape in loading zone',
      priority: 'Low',
      assignee: 'Mark Davis',
      dueDate: '12/10/2023',
      status: 'Pending'
    }
  ],
  violations: [
    {
      id: 'v1',
      title: 'Missing machine guard on band saw',
      regulation: 'OSHA 29 CFR 1910.212',
      location: 'Building A - Warehouse',
      detected: '10/14/2023',
      severity: 'High'
    },
    {
      id: 'v2',
      title: 'Blocked fire exit in east corridor',
      regulation: 'NFPA 101',
      location: 'Building A - Warehouse',
      detected: '11/02/2023',
      severity: 'Critical'
    }
  ],
  audits: [
    {
      id: 'a1',
      title: 'Quarterly Safety Inspection',
      findings: 12,
      date: '09/01/2023',
      compliance: '85%',
      status: 'Completed'
    }
  ]
};

const RiskAssessmentDetails: React.FC<RiskAssessmentDetailsProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real app, we would fetch the data based on the id
  const assessment = mockAssessment;
  
  return (
    <div className="space-y-6">
      <AssessmentHeader 
        title={assessment.title}
        createdDate={assessment.createdDate}
        status={assessment.status}
        riskLevel={assessment.riskLevelLabel}
      />
      
      <InfoCards 
        department={assessment.department}
        location={assessment.location}
        assessor={assessment.assessor}
        assessmentDate={assessment.assessmentDate}
      />
      
      <RiskAssessmentTabsNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'overview' && (
        <OverviewTab 
          riskLevel={assessment.riskLevel}
          riskLevelLabel={assessment.riskLevelLabel}
          status={assessment.status}
          summary={assessment.summary}
          notes={assessment.notes}
          riskDistribution={assessment.riskDistribution}
        />
      )}
      
      {activeTab === 'findings' && (
        <FindingsTab findings={assessment.findings} />
      )}
      
      {activeTab === 'mitigation' && (
        <MitigationTab tasks={assessment.tasks} />
      )}
      
      {activeTab === 'documents' && (
        <DocumentsTab />
      )}
      
      {activeTab === 'related' && (
        <RelatedItemsTabs 
          tasks={assessment.tasks}
          violations={assessment.violations}
          audits={assessment.audits}
        />
      )}
    </div>
  );
};

export default RiskAssessmentDetails;
