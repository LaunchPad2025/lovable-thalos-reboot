
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface PricingCtaProps {
  onContactSales: () => void;
}

const PricingCta = ({ onContactSales }: PricingCtaProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Start with 15 free AI-powered safety analyses. Our team can also create a tailored package to meet your specific safety compliance requirements.
      </p>
      <Button 
        size="lg" 
        className="bg-primary hover:bg-primary/90"
        onClick={onContactSales}
      >
        Start Free
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default PricingCta;
