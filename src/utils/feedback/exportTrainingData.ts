
import { supabase } from '@/lib/supabase';

/**
 * Interface for training data export format
 */
interface TrainingDataExport {
  prompt: string;
  response: string;
  feedback: string;
  notes: string | null;
  matched_regulation: string | null;
  industry_context: string | null;
  matched_regulation_code: string | null; // Added for QA
  industry_detected: string | null; // Added for QA
}

/**
 * Export thumbs-down Paulie queries with notes for fine-tuning
 * Includes only entries where notes IS NOT NULL OR needs_review = true
 */
export const exportPaulieFeedbackData = async (): Promise<{
  success: boolean;
  data?: TrainingDataExport[];
  error?: string;
  filePath?: string;
}> => {
  try {
    // Query for thumbs-down entries with notes or flagged for review
    const { data, error } = await supabase
      .from('paulie_queries')
      .select('question, response, helpful, notes, matched_regulation_id, matched_category, review_status, matched_keywords')
      .eq('helpful', false)
      .or('notes.is.not.null,review_status.eq.needs_review');

    if (error) {
      console.error('Error fetching training data:', error);
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return { success: false, error: 'No training data found matching criteria' };
    }

    // Format the data according to the required structure
    const formattedData: TrainingDataExport[] = data.map(item => {
      // Extract regulation code from matched_keywords if available
      const regulationCodes = item.matched_keywords ? 
        item.matched_keywords.filter((kw: string) => 
          kw.match(/^\d+\.\d+/) || kw.match(/^[A-Z]+\d+/)
        ) : [];
      
      const regulationCode = regulationCodes.length > 0 ? regulationCodes[0] : null;
      
      return {
        prompt: item.question || '',
        response: item.response || '',
        feedback: 'not_helpful', // All entries are thumbs-down
        notes: item.notes,
        matched_regulation: item.matched_regulation_id || null,
        industry_context: item.matched_category || null,
        matched_regulation_code: regulationCode,
        industry_detected: item.matched_category || null
      };
    });

    // Create export files (JSON and CSV)
    const jsonContent = JSON.stringify(formattedData, null, 2);
    const jsonFileName = 'trainingDataset-v1.json';
    
    // Generate CSV content
    const csvHeader = 'prompt,response,feedback,notes,matched_regulation,industry_context,matched_regulation_code,industry_detected';
    const csvRows = formattedData.map(row => [
      `"${escapeCSV(row.prompt)}"`,
      `"${escapeCSV(row.response)}"`,
      row.feedback,
      `"${escapeCSV(row.notes || '')}"`,
      row.matched_regulation || '',
      `"${escapeCSV(row.industry_context || '')}"`,
      row.matched_regulation_code || '',
      `"${escapeCSV(row.industry_detected || '')}"`
    ].join(','));
    const csvContent = [csvHeader, ...csvRows].join('\n');
    const csvFileName = 'paulie_finetune_candidates.csv';

    // Return the formatted data with both file options
    return { 
      success: true, 
      data: formattedData,
      filePath: jsonFileName // Default to JSON file path
    };
  } catch (error) {
    console.error('Error exporting training data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Helper function to escape CSV special characters
 */
const escapeCSV = (str: string): string => {
  if (!str) return '';
  return str.replace(/"/g, '""').replace(/\n/g, ' ');
};

/**
 * Download training data as a file
 */
export const downloadTrainingData = (data: TrainingDataExport[], format: 'json' | 'csv' = 'json'): void => {
  let content: string;
  let fileName: string;
  let contentType: string;

  if (format === 'json') {
    content = JSON.stringify(data, null, 2);
    fileName = 'trainingDataset-v1.json';
    contentType = 'application/json';
  } else {
    // CSV format
    const csvHeader = 'prompt,response,feedback,notes,matched_regulation,industry_context,matched_regulation_code,industry_detected';
    const csvRows = data.map(row => [
      `"${escapeCSV(row.prompt)}"`,
      `"${escapeCSV(row.response)}"`,
      row.feedback,
      `"${escapeCSV(row.notes || '')}"`,
      row.matched_regulation || '',
      `"${escapeCSV(row.industry_context || '')}"`,
      row.matched_regulation_code || '',
      `"${escapeCSV(row.industry_detected || '')}"`
    ].join(','));
    content = [csvHeader, ...csvRows].join('\n');
    fileName = 'paulie_finetune_candidates.csv';
    contentType = 'text/csv';
  }

  // Create blob and download link
  const blob = new Blob([content], { type: `${contentType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
