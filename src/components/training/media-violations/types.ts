
export interface MediaViolationTraining {
  id: string;
  violation_id: string;
  industry: string;
  category: string;
  media_type: string;
  sample_caption: string;
  violation_type: string;
  regulation_citation: string | null;
  regulation_summary: string | null;
  risk_level: 'Low' | 'Medium' | 'High' | 'Critical';
  labels: string[];
  remediation_steps: string[];
  tags: string[];
  copilot_response_sample: string | null;
  copilot_task_sample: string | null;
  status: 'needs_review' | 'ready' | 'approved';
  created_at: string;
}

export interface MediaViolationFilters {
  industry: string;
  category: string;
  risk_level: string;
  status: string;
  searchQuery: string;
}

export type ViolationCategory = 
  | 'Fall Protection' 
  | 'PPE' 
  | 'Machine Safety' 
  | 'Electrical Safety' 
  | 'Confined Space' 
  | 'Process Safety' 
  | 'Fire Safety' 
  | 'Chemical Safety' 
  | 'Housekeeping';

export type IndustryType = 
  | 'Construction' 
  | 'Manufacturing' 
  | 'Oil & Gas' 
  | 'Healthcare' 
  | 'Mining' 
  | 'Agriculture' 
  | 'Retail' 
  | 'Laboratory' 
  | 'Logistics' 
  | 'Food Processing';
