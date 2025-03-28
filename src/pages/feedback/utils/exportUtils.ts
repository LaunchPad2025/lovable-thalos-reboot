
import { FeedbackItem } from '@/components/feedback/types';

export const exportToCSV = (feedbackItems: FeedbackItem[]) => {
  if (!feedbackItems.length) return;
  
  const headers = [
    'Question', 
    'Response', 
    'Helpful', 
    'Notes', 
    'Created At',
    'Keywords',
    'Regulation'
  ];
  
  const dataRows = feedbackItems.map(item => [
    `"${item.question?.replace(/"/g, '""') || ''}"`,
    `"${item.response?.replace(/"/g, '""') || ''}"`,
    item.helpful ? 'Yes' : 'No',
    `"${item.notes?.replace(/"/g, '""') || ''}"`,
    new Date(item.created_at).toLocaleString(),
    `"${(item.matched_keywords || []).join(', ')}"`,
    `"${item.matched_regulation_id || ''}"`
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
