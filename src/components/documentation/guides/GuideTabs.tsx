
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GettingStartedGuides from './GettingStartedGuides';
import CoreFeaturesGuides from './CoreFeaturesGuides';

interface GuideTabsProps {
  searchQuery?: string;
}

const GuideTabs = ({ searchQuery = '' }: GuideTabsProps) => {
  return (
    <Tabs defaultValue="getting-started">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
        <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
        <TabsTrigger value="features">Core Features</TabsTrigger>
        <TabsTrigger value="admin">Administration</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
      </TabsList>
      
      <TabsContent value="getting-started" className="space-y-8">
        <GettingStartedGuides searchQuery={searchQuery} />
      </TabsContent>
      
      <TabsContent value="features" className="space-y-8">
        <CoreFeaturesGuides searchQuery={searchQuery} />
      </TabsContent>
      
      <TabsContent value="admin">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Administration guides coming soon.</p>
        </div>
      </TabsContent>
      
      <TabsContent value="integrations">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Integration guides coming soon.</p>
        </div>
      </TabsContent>
      
      <TabsContent value="best-practices">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Best practices guides coming soon.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default GuideTabs;
