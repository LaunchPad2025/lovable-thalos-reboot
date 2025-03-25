
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamOverview from "./TeamOverview";
import CourseCatalog from "./CourseCatalog";

const TrainingTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("my-training");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full justify-start bg-muted/50 rounded-md mb-4">
        <TabsTrigger value="my-training">My Training</TabsTrigger>
        <TabsTrigger value="team-overview">Team Overview</TabsTrigger>
        <TabsTrigger value="course-catalog">Course Catalog</TabsTrigger>
      </TabsList>

      <TabsContent value="my-training" className="space-y-4">
        <div className="text-center text-muted-foreground py-8">
          <p>My training dashboard will appear here, showing personal progress and upcoming requirements.</p>
          <p className="text-sm mt-2">This feature is coming soon.</p>
        </div>
      </TabsContent>

      <TabsContent value="team-overview">
        <TeamOverview />
      </TabsContent>

      <TabsContent value="course-catalog">
        <CourseCatalog />
      </TabsContent>
    </Tabs>
  );
};

export default TrainingTabs;
