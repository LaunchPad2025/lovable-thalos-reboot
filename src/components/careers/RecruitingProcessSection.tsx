
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ProcessStep from './ProcessStep';

const RecruitingProcessSection = () => {
  return (
    <div className="relative z-10">
      <div className="text-center mb-12">
        <Badge className="mb-4" variant="outline">Our Process</Badge>
        <h2 className="text-3xl font-bold mb-4">Our Recruiting Process</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          What to expect when you apply to Thalos Technologies
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProcessStep
          number="01"
          title="Application Review"
          description="Our recruiting team reviews your application and resume"
        />
        
        <ProcessStep
          number="02"
          title="Initial Interview"
          description="A 30-minute call with a recruiter to discuss your experience and interests"
        />
        
        <ProcessStep
          number="03"
          title="Technical/Skills Assessment"
          description="Role-specific assessment to evaluate your expertise"
        />
        
        <ProcessStep
          number="04"
          title="Team Interviews"
          description="Meet with future teammates and leaders to ensure mutual fit"
        />
      </div>
    </div>
  );
};

export default RecruitingProcessSection;
