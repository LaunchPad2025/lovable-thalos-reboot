
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface PricingCtaProps {
  onContactSales: () => void;
}

const PricingCta = ({ onContactSales }: PricingCtaProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Our team can create a tailored package to meet your specific safety compliance requirements for construction, oil & gas, or utilities & energy sectors.
      </p>
      <Button 
        size="lg" 
        className="bg-primary hover:bg-primary/90"
        onClick={onContactSales}
      >
        <Calendar className="mr-2 h-4 w-4" />
        Schedule a Setup Call
      </Button>
    </div>
  );
};

export default PricingCta;
