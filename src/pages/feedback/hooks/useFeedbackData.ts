
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FeedbackData, FeedbackItem, KeywordStat } from '@/components/feedback/types';

export const useFeedbackData = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedbackData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('paulie_queries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Process the data to match our FeedbackItem interface
      const processedData: FeedbackItem[] = (data || []).map(item => ({
        id: item.id,
        message_id: item.message_id || item.id,
        question: item.question || '',
        response: item.response || '',
        helpful: item.helpful === true,
        notes: item.notes,
        created_at: item.created_at || item.timestamp || new Date().toISOString(),
        user_id: item.user_id,
        matched_category: item.matched_category,
        matched_keywords: item.matched_keywords || [],
        matched_regulation_id: item.matched_regulation_id,
        review_status: item.review_status as "needs_review" | "improved" | "escalated" | undefined,
        review_label: item.review_label as "unclear" | "incomplete" | "off_topic" | undefined,
        timestamp: item.timestamp
      }));
      
      setFeedbackData({
        rawData: processedData,
        totalQueries: processedData.length || 0,
        upvotes: processedData.filter(item => item.helpful === true).length || 0,
        downvotes: processedData.filter(item => item.helpful === false).length || 0,
        topDownvoted: processedData.filter(item => item.helpful === false).slice(0, 10) || [],
        keywords: processKeywords(processedData),
        needsReview: processedData.filter(item => 
          item.helpful === false && 
          item.notes && 
          (!item.review_status || item.review_status === 'needs_review')
        ) || []
      });
    } catch (err) {
      console.error('Error fetching feedback data:', err);
      setError('Failed to load feedback data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const processKeywords = (data: FeedbackItem[]): KeywordStat[] => {
    const keywordCounts: Record<string, number> = {};
    
    data.forEach(item => {
      if (item.matched_keywords && Array.isArray(item.matched_keywords)) {
        item.matched_keywords.forEach((keyword: string) => {
          keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
        });
      }
    });
    
    return Object.entries(keywordCounts)
      .map(([keyword, count]) => ({ keyword, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  return {
    feedbackData,
    loading,
    error,
    fetchFeedbackData
  };
};
