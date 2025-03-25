
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface AnalysisButtonsProps {
  isSubmitting: boolean;
  hasImage: boolean;
  onReset: () => void;
  hasText: boolean;
}

const AnalysisButtons = ({ isSubmitting, hasImage, onReset, hasText }: AnalysisButtonsProps) => {
  if (!hasImage && !hasText) return null;
  
  return (
    <div className="mt-4 flex space-x-4">
      {hasImage && (
        <Button
          type="button"
          variant="outline"
          className="border-gray-700 text-gray-300"
          onClick={onReset}
        >
          Cancel
        </Button>
      )}
      <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white w-full flex items-center justify-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          hasImage ? 'Analyze for Violations' : 'Analyze Text Description'
        )}
      </Button>
    </div>
  );
};

export default AnalysisButtons;
