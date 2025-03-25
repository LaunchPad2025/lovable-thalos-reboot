
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TeamOverview from './TeamOverview';
import CourseCatalog from './CourseCatalog';

const TrainingTabs = () => {
  return (
    <div>
      <Tabs defaultValue="my-training" className="space-y-4">
        <TabsList className="bg-[#0f1419] border-b border-gray-800">
          <TabsTrigger value="my-training">My Training</TabsTrigger>
          <TabsTrigger value="team-overview">Team Overview</TabsTrigger>
          <TabsTrigger value="course-catalog">Course Catalog</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-training" className="space-y-4">
          <p className="text-sm text-muted-foreground">
            View your assigned and completed training courses.
          </p>
        </TabsContent>
        
        <TabsContent value="team-overview" className="space-y-4">
          <TeamOverview />
        </TabsContent>
        
        <TabsContent value="course-catalog" className="space-y-4">
          <CourseCatalog />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingTabs;
