
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
}
