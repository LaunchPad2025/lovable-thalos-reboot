
import { downloadTrainingData } from '@/utils/feedback/exportTrainingData';
import { toast } from 'sonner';
import { TrainingReviewItem } from '../types';

export const useTrainingExport = (data: TrainingReviewItem[]) => {
  const exportData = (format: 'json' | 'csv') => {
    // Only export approved and rewritten items
    const exportItems = data.filter(item => 
      item.status === 'approved' || item.status === 'rewritten'
    ).map(item => ({
      prompt: item.question,
      response: item.status === 'rewritten' && item.improved_response 
        ? item.improved_response 
        : item.response,
      feedback: 'helpful', // These are approved responses, so mark as helpful
      notes: item.feedback,
      matched_regulation: item.matched_regulation,
      industry_context: item.industry,
      matched_regulation_code: item.matched_keywords?.find(kw => 
        kw.match(/^\d+\.\d+/) || kw.match(/^[A-Z]+\d+/)
      ) || null,
      industry_detected: item.industry,
      status: item.status
    }));
    
    if (exportItems.length === 0) {
      toast.error('No approved or rewritten responses to export');
      return;
    }
    
    // Use the existing export utility
    downloadTrainingData(exportItems, format);
    toast.success(`Exported ${exportItems.length} training examples as ${format.toUpperCase()}`);
  };
  
  return { exportData };
};
