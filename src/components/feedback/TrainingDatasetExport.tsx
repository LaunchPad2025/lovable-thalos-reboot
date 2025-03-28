
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import { FeedbackData } from './types';

interface TrainingDatasetExportProps {
  feedbackData: FeedbackData;
}

const TrainingDatasetExport: React.FC<TrainingDatasetExportProps> = ({ feedbackData }) => {
  const { rawData } = feedbackData;
  
  const exportTrainingDataset = () => {
    if (!rawData.length) return;
    
    const headers = [
      'question', 
      'response', 
      'thumbs_up', 
      'notes', 
      'tags',
      'checklist_matched'
    ];
    
    const dataRows = rawData.map(item => [
      `"${item.question?.replace(/"/g, '""') || ''}"`,
      `"${item.response?.replace(/"/g, '""') || ''}"`,
      item.helpful ? 'Yes' : 'No',
      `"${item.notes?.replace(/"/g, '""') || ''}"`,
      `"${item.matched_keywords?.join(', ') || ''}"`,
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
    link.setAttribute('download', `paulie-training-dataset-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Dataset</CardTitle>
        <CardDescription>
          Export your curated feedback data for model fine-tuning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Total examples: {rawData.length}</p>
              <p className="text-sm text-muted-foreground">
                Good examples: {rawData.filter(item => item.helpful).length} | 
                Improvement examples: {rawData.filter(item => !item.helpful).length}
              </p>
            </div>
            <Button 
              onClick={exportTrainingDataset}
              disabled={!rawData.length}
              className="flex items-center gap-2"
            >
              <DownloadIcon className="h-4 w-4" />
              Export Dataset
            </Button>
          </div>
          
          <div className="rounded-md bg-muted p-4">
            <h4 className="mb-2 text-sm font-medium">Dataset Structure</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="border px-2 py-1 text-left">question</th>
                    <th className="border px-2 py-1 text-left">response</th>
                    <th className="border px-2 py-1 text-left">thumbs_up</th>
                    <th className="border px-2 py-1 text-left">notes</th>
                    <th className="border px-2 py-1 text-left">tags</th>
                    <th className="border px-2 py-1 text-left">checklist_matched</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1">User query</td>
                    <td className="border px-2 py-1">Paulie's response</td>
                    <td className="border px-2 py-1">Yes/No</td>
                    <td className="border px-2 py-1">User feedback</td>
                    <td className="border px-2 py-1">Keyword tags</td>
                    <td className="border px-2 py-1">Matching regulation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingDatasetExport;
