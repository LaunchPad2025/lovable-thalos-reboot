
export type AuditStatus = 'open' | 'in_progress' | 'resolved' | 'verified';
export type AuditSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AuditType = 'internal' | 'external' | 'regulatory';

export interface AuditFinding {
  id: string;
  description: string;
  location: string;
  severity: AuditSeverity;
  assignee: string;
  dueDate: string;
  status: AuditStatus;
}

export interface AuditTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  sections: number;
  items: number;
}

export interface ScheduledAudit {
  id: string;
  name: string;
  date: string;
  time: string;
  type: AuditType;
  location: string;
  assignee: string;
  readiness: number;
  status: 'scheduled' | 'completed' | 'overdue';
}
