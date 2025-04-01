
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, GraduationCap, Heart } from 'lucide-react';

const CompanyValues = () => {
  return (
    <div className="mb-16 relative z-10">
      <div className="text-center mb-12">
        <Badge className="mb-4" variant="outline">Our Culture</Badge>
        <h2 className="text-3xl font-bold mb-4">What makes us different</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're building a team united by our mission and guided by our core values
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="mb-4 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle>Mission-Driven</CardTitle>
            <CardDescription>
              Every line of code we write and every feature we build has the potential to prevent injuries
              and save lives. Our work has real-world impact.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="mb-4 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle>Continuous Learning</CardTitle>
            <CardDescription>
              We're tackling complex problems at the intersection of AI, safety, and enterprise software.
              We value curiosity and provide resources for professional growth.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="mb-4 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Heart className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <CardTitle>Work-Life Balance</CardTitle>
            <CardDescription>
              We believe in sustainable growth and prioritize the wellbeing of our team.
              Flexible work arrangements help our team thrive both personally and professionally.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default CompanyValues;
