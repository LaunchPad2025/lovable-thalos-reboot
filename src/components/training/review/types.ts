
export interface TrainingReviewItem {
  id: string;
  question: string;
  response: string;
  matched_regulation: string;
  industry: string;
  feedback: string;
  status: 'pending' | 'approved' | 'rejected' | 'rewritten';
  review_status: 'needs_review' | 'improved' | 'escalated' | null;
  matched_keywords: string[];
  created_at: string;
  improved_response: string;
}

export interface TrainingStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  rewritten: number;
  byIndustry: { name: string; count: number }[];
  byRegulation: { name: string; count: number }[];
}

export interface TrainingFilters {
  status: 'all' | 'pending' | 'approved' | 'rejected' | 'rewritten';
  industry: string;
  regulation: string;
  searchQuery: string;
}

export interface RejectionReason {
  value: string;
  label: string;
}

export const REJECTION_REASONS: RejectionReason[] = [
  { value: 'incorrect_regulation', label: 'Incorrect regulation match' },
  { value: 'wrong_industry', label: 'Wrong industry detection' },
  { value: 'too_vague', label: 'Response too vague' },
  { value: 'hallucination', label: 'Contains hallucination/fabrication' },
  { value: 'misleading', label: 'Misleading or confusing' },
  { value: 'incomplete', label: 'Incomplete response' },
  { value: 'irrelevant', label: 'Irrelevant to question' },
  { value: 'other', label: 'Other reason' }
];
