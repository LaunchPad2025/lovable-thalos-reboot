
// Mock violation data
export const mockViolations = [
  { id: 1, description: 'Missing guardrail on platform', severity: 'High', location: 'Building A, Floor 3', date: '2023-12-05' },
  { id: 2, description: 'Improper chemical storage', severity: 'Critical', location: 'Laboratory', date: '2023-12-10' },
  { id: 3, description: 'Blocked emergency exit', severity: 'High', location: 'Warehouse', date: '2023-12-08' },
  { id: 4, description: 'Exposed electrical wiring', severity: 'Medium', location: 'Office Area', date: '2023-12-12' },
  { id: 5, description: 'Inadequate ventilation', severity: 'Low', location: 'Break Room', date: '2023-12-01' }
];

// Mock audit data
export const mockAudits = [
  { id: 1, title: 'Monthly Safety Inspection', status: 'Completed', date: '2023-11-15', score: '92%' },
  { id: 2, title: 'OSHA Compliance Review', status: 'Scheduled', date: '2023-12-20', score: 'Pending' },
  { id: 3, title: 'Fire Safety Audit', status: 'In Progress', date: '2023-12-12', score: 'In Progress' },
  { id: 4, title: 'Equipment Safety Check', status: 'Completed', date: '2023-10-30', score: '88%' }
];

export const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical': return 'text-red-500 bg-red-500/10';
    case 'high': return 'text-orange-500 bg-orange-500/10';
    case 'medium': return 'text-amber-500 bg-amber-500/10';
    case 'low': return 'text-green-500 bg-green-500/10';
    default: return 'text-blue-500 bg-blue-500/10';
  }
};
