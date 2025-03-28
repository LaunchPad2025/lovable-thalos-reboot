
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import MockDataAlert from '@/components/ui/MockDataAlert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DownloadIcon, ThumbsDown, ThumbsUp, Filter } from 'lucide-react';
import FeedbackStats from '@/components/feedback/FeedbackStats';
import TopDownvotedTable from '@/components/feedback/TopDownvotedTable';
import CategoryBreakdown from '@/components/feedback/CategoryBreakdown';
import { FeedbackData } from '@/components/feedback/types';
import LoadingState from '@/components/feedback/LoadingState';

const PaulieFeedback = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('paulie_queries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setFeedbackData({
        rawData: data || [],
        totalQueries: data?.length || 0,
        upvotes: data?.filter(item => item.helpful === true).length || 0,
        downvotes: data?.filter(item => item.helpful === false).length || 0,
        topDownvoted: data?.filter(item => item.helpful === false).slice(0, 10) || [],
        keywords: processKeywords(data || [])
      });
    } catch (err) {
      console.error('Error fetching feedback data:', err);
      setError('Failed to load feedback data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const processKeywords = (data: any[]) => {
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

  const exportToCSV = () => {
    if (!feedbackData?.rawData.length) return;
    
    const headers = [
      'Question', 
      'Response', 
      'Helpful', 
      'Notes', 
      'Created At',
      'Keywords'
    ];
    
    const dataRows = feedbackData.rawData.map(item => [
      `"${item.question?.replace(/"/g, '""') || ''}"`,
      `"${item.response?.replace(/"/g, '""') || ''}"`,
      item.helpful ? 'Yes' : 'No',
      `"${item.notes?.replace(/"/g, '""') || ''}"`,
      new Date(item.created_at).toLocaleString(),
      (item.matched_keywords || []).join(', ')
    ]);
    
    const csvContent = [
      headers.join(','),
      ...dataRows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `paulie-feedback-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <MockDataAlert featureName="Paulie Feedback Dashboard" />
        
        <div className="flex justify-between items-center">
          <div>
            <PageTitle title="Paulie Feedback Dashboard" />
            <p className="text-muted-foreground mt-1">
              View insights and analytics from user interactions with the AI assistant
            </p>
          </div>
          
          <Button 
            onClick={exportToCSV} 
            disabled={!feedbackData?.rawData.length || loading}
            className="flex items-center gap-2"
          >
            <DownloadIcon className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-red-500">{error}</div>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="downvoted">Top Downvoted</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {feedbackData && <FeedbackStats feedbackData={feedbackData} />}
            </TabsContent>
            
            <TabsContent value="downvoted" className="space-y-6">
              {feedbackData && <TopDownvotedTable feedbackData={feedbackData} />}
            </TabsContent>
            
            <TabsContent value="categories" className="space-y-6">
              {feedbackData && <CategoryBreakdown feedbackData={feedbackData} />}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </PageContainer>
  );
};

export default PaulieFeedback;
