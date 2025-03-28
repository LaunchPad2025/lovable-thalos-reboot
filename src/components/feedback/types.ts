
export interface FeedbackItem {
  id: string;
  question: string;
  response: string;
  helpful: boolean;
  notes?: string;
  created_at: string;
  user_id?: string;
  matched_keywords?: string[];
  matched_regulation_ids?: string[];
  message_id: string;
  review_status?: 'needs_review' | 'improved' | 'escalated';
  review_label?: 'unclear' | 'incomplete' | 'off_topic';
}

export interface KeywordStat {
  keyword: string;
  count: number;
}

export interface FeedbackData {
  rawData: FeedbackItem[];
  totalQueries: number;
  upvotes: number;
  downvotes: number;
  topDownvoted: FeedbackItem[];
  keywords: KeywordStat[];
  needsReview: FeedbackItem[];
}
