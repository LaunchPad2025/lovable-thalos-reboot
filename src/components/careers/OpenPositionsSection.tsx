
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const OpenPositionsSection = () => {
  return (
    <div className="mb-16 relative z-10">
      <div className="text-center mb-12">
        <Badge className="mb-4" variant="outline">Join Us</Badge>
        <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <h3 className="text-xl font-bold mb-4">We don't have any open positions at this time</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          While we don't have any open roles currently, we're always interested in connecting with talented 
          individuals who are passionate about workplace safety and technology. Please check back later for 
          future opportunities.
        </p>
        <Button variant="outline">Submit Your Resume</Button>
      </div>
    </div>
  );
};

export default OpenPositionsSection;
