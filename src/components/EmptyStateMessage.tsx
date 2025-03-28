
import React from 'react';
import { FileX, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateMessageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyStateMessage: React.FC<EmptyStateMessageProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 rounded-full bg-gray-800/30 p-3">
        {icon || <FileX className="h-8 w-8 text-gray-400" />}
      </div>
      <h3 className="mb-2 text-xl font-medium">{title}</h3>
      <p className="mb-6 max-w-md text-sm text-gray-400">{description}</p>
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyStateMessage;
