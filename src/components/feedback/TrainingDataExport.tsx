
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadIcon, RefreshCw, FileJson, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';
import { exportPaulieFeedbackData, downloadTrainingData } from '@/utils/feedback/exportTrainingData';

const TrainingDataExport: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataCount, setDataCount] = useState<number | null>(null);
  const [exportedData, setExportedData] = useState<any[] | null>(null);
  
  const handleExportData = async (format: 'json' | 'csv' = 'json') => {
    setIsLoading(true);
    
    try {
      const result = await exportPaulieFeedbackData();
      
      if (result.success && result.data) {
        setDataCount(result.data.length);
        setExportedData(result.data);
        
        // Download the file in the requested format
        downloadTrainingData(result.data, format);
        
        toast.success(
          `Training data exported successfully!`, 
          { description: `${result.data.length} records exported as ${format === 'json' ? 'trainingDataset-v1.json' : 'paulie_finetune_candidates.csv'}` }
        );
      } else {
        toast.error(
          'Export failed', 
          { description: result.error || 'No data found matching the criteria' }
        );
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error(
        'Export operation failed', 
        { description: error instanceof Error ? error.message : 'Unknown error occurred' }
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fine-tuning Dataset Export</CardTitle>
        <CardDescription>
          Export thumbs-down Paulie queries with feedback notes for fine-tuning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Export criteria:</p>
              <p className="text-sm text-muted-foreground">
                • Thumbs-down responses (not helpful)
                <br />
                • With user feedback notes or flagged for review
              </p>
              {dataCount !== null && (
                <p className="text-sm font-medium mt-2">
                  {dataCount} records available for export
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Button 
                onClick={() => handleExportData('json')}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <FileJson className="h-4 w-4" />}
                Export as JSON
              </Button>
              <Button 
                onClick={() => handleExportData('csv')}
                disabled={isLoading}
                variant="outline"
                className="flex items-center gap-2"
              >
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <FileSpreadsheet className="h-4 w-4" />}
                Export as CSV
              </Button>
            </div>
          </div>
          
          {exportedData && exportedData.length > 0 && (
            <div className="rounded-md bg-muted p-4 mt-4">
              <h4 className="mb-2 text-sm font-medium">Sample Export Record</h4>
              <pre className="text-xs overflow-auto p-2 bg-gray-900 rounded">
                {JSON.stringify(exportedData[0], null, 2)}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingDataExport;
