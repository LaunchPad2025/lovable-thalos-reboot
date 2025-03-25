
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  onClose?: () => void;
  isLoading?: boolean;
  submitButtonText: string;
  showSubmitButton?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onClose, 
  isLoading = false, 
  submitButtonText = 'Save',
  showSubmitButton = false
}) => {
  return (
    <div className="flex justify-end pt-4">
      {onClose && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose} 
          className="mr-2 border-gray-700 text-gray-300"
        >
          Cancel
        </Button>
      )}
      {showSubmitButton && (
        <Button 
          type="submit" 
          disabled={isLoading} 
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? 'Saving...' : submitButtonText}
        </Button>
      )}
    </div>
  );
};

export default FormActions;
