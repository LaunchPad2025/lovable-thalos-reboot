
import React from 'react';
import { Button } from '@/components/ui/button';

interface PricingDiscountsProps {
  onContactSales: () => void;
}

const PricingDiscounts = ({ onContactSales }: PricingDiscountsProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-8 mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Analysis Volume Discounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 border border-border rounded-lg">
          <div className="font-bold text-xl mb-2">More Analyses Needed?</div>
          <div className="text-muted-foreground mb-4">Need more than your plan's monthly analyses?</div>
          <div className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">Additional Packs Available</div>
          <div className="text-muted-foreground">Contact sales for custom volume pricing</div>
        </div>
        
        <div className="text-center p-6 border border-border rounded-lg bg-blue-50 dark:bg-blue-900/10">
          <div className="font-bold text-xl mb-2">Annual Billing</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">15%</div>
          <div className="text-muted-foreground">discount with annual billing</div>
          <div className="text-sm text-muted-foreground mt-2">Pay once and save</div>
        </div>
        
        <div className="text-center p-6 border border-border rounded-lg">
          <div className="font-bold text-xl mb-2">Multiple Sites?</div>
          <div className="text-muted-foreground mb-4">Managing safety across multiple locations?</div>
          <Button 
            variant="outline" 
            className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-500 dark:hover:bg-blue-900/20"
            onClick={onContactSales}
          >
            Get Multi-Site Discount
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingDiscounts;
