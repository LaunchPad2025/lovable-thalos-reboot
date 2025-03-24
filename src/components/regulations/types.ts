
export interface RegulationProps {
  id: string;
  title: string;
  description: string | null;
  industry: string | null;
  document_type: string;
  file_path: string | null;
  file_type: string | null;
  version: string | null;
  effective_date: string | null;
  created_at: string;
  // New fields
  jurisdiction: string | null;
  authority: string | null;
  keywords: string[] | null;
  source_url: string | null;
  status: string | null;
  category: string | null;
  applicable_to: string[] | null;
  last_reviewed_date: string | null;
}

export interface ViolationProps {
  id: string;
  violation: string;
  description?: string;
  location?: string;
  severity?: string;
  status?: string;
  detected_at?: string;
}
