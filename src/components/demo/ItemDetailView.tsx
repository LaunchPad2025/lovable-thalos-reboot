
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ItemDetailViewProps {
  content: React.ReactNode;
  onBack: () => void;
}

const ItemDetailView = ({ content, onBack }: ItemDetailViewProps) => {
  return (
    <div className="mb-8">
      <Button 
        variant="outline" 
        className="mb-4" 
        onClick={onBack}
      >
        <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
        Back to List
      </Button>
      {content}
    </div>
  );
};

export default ItemDetailView;
