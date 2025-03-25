
import { AuditFinding, AuditTemplate, ScheduledAudit } from './types';

export const mockAuditFindings: AuditFinding[] = [
  {
    id: 'f1',
    description: 'Two machines on production line missing point of operation guards',
    location: 'Production Line A',
    severity: 'high',
    assignee: 'Tom Anderson',
    dueDate: '2023-12-05',
    status: 'resolved'
  },
  {
    id: 'f2',
    description: 'Emergency stop button not functioning on CNC machine',
    location: 'Machining Area',
    severity: 'critical',
    assignee: 'Tom Anderson',
    dueDate: '2023-12-01',
    status: 'open'
  },
  {
    id: 'f3',
    description: 'Control switches not clearly labeled on three machines',
    location: 'Assembly Area',
    severity: 'medium',
    assignee: 'Sarah Johnson',
    dueDate: '2023-12-10',
    status: 'in_progress'
  }
];

export const mockAuditTemplates: AuditTemplate[] = [
  {
    id: 't1',
    name: 'OSHA General Industry Compliance',
    description: 'Comprehensive checklist for OSHA general industry compliance',
    type: 'regulatory',
    sections: 2,
    items: 4
  },
  {
    id: 't2',
    name: 'Fire Safety Inspection',
    description: 'Checklist for fire prevention and protection',
    type: 'safety',
    sections: 2,
    items: 4
  },
  {
    id: 't3',
    name: 'Environmental Compliance Audit',
    description: 'Checklist for environmental regulations compliance',
    type: 'environmental',
    sections: 2,
    items: 4
  },
  {
    id: 't4',
    name: 'PPE Compliance Check',
    description: 'Inspection for proper use of personal protective equipment',
    type: 'safety',
    sections: 2,
    items: 4
  },
  {
    id: 't5',
    name: 'Machine Guarding Inspection',
    description: 'Checklist for machine guarding compliance',
    type: 'safety',
    sections: 2,
    items: 4
  }
];

export const mockScheduledAudits: ScheduledAudit[] = [
  {
    id: 'a1',
    name: 'Annual OSHA Compliance Review',
    date: '2023-12-20',
    time: '9:00 AM',
    type: 'external',
    location: 'Main Facility',
    assignee: 'Sarah Johnson',
    readiness: 87,
    status: 'scheduled'
  },
  {
    id: 'a2',
    name: 'Quarterly Fire Safety Inspection',
    date: '2023-12-15',
    time: '2:30 PM',
    type: 'internal',
    location: 'All Buildings',
    assignee: 'Mark Wilson',
    readiness: 92,
    status: 'scheduled'
  },
  {
    id: 'a3',
    name: 'Environmental Compliance Audit',
    date: '2023-12-18',
    time: '10:00 AM',
    type: 'external',
    location: 'Manufacturing Plant',
    assignee: 'Linda Martinez',
    readiness: 75,
    status: 'scheduled'
  },
  {
    id: 'a4',
    name: 'Safety Committee Walkthrough',
    date: '2023-12-12',
    time: '1:00 PM',
    type: 'internal',
    location: 'Warehouse Areas',
    assignee: 'Tom Anderson',
    readiness: 95,
    status: 'scheduled'
  },
  {
    id: 'a5',
    name: 'Machine Guarding Inspection',
    date: '2023-11-25',
    time: '10:00 AM',
    type: 'internal',
    location: 'Production Floor',
    assignee: 'Sarah Johnson',
    readiness: 100,
    status: 'completed'
  }
];

export const statisticsData = {
  openFindings: 12,
  inProgressFindings: 5,
  resolvedFindings: 24,
  verifiedFindings: 18,
  upcomingAudits: 10,
  completedAudits: 5,
  overdueAudits: 3,
  complianceScore: 78
};
