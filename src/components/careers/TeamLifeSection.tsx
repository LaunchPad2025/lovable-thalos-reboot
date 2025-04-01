
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Coffee } from 'lucide-react';

const TeamLifeSection = () => {
  return (
    <div className="mb-16 relative z-10">
      <div className="text-center mb-12">
        <Badge className="mb-4" variant="outline">Team Life</Badge>
        <h2 className="text-3xl font-bold mb-4">Life at Thalos</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          What you can expect when you join our team
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="overflow-hidden">
          <div className="h-48 bg-blue-900 bg-opacity-50"></div>
          <CardContent className="pt-6">
            <div className="flex items-center mb-2">
              <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-bold">Learning Together</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Regular knowledge sharing sessions and book clubs to grow our expertise
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="h-48 bg-blue-900 bg-opacity-50"></div>
          <CardContent className="pt-6">
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-bold">Team Retreats</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Annual company gatherings to connect, collaborate, and celebrate our achievements
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="h-48 bg-blue-900 bg-opacity-50"></div>
          <CardContent className="pt-6">
            <div className="flex items-center mb-2">
              <Coffee className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-bold">Social Impact</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Volunteer opportunities and donation matching to support causes we care about
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamLifeSection;
