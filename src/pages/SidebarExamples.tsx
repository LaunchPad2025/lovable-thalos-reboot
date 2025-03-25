
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/ui/PageTitle";
import BasicSidebarExample from "@/components/examples/sidebar/BasicSidebarExample";
import CollapsibleSidebarExample from "@/components/examples/sidebar/CollapsibleSidebarExample";
import FloatingSidebarExample from "@/components/examples/sidebar/FloatingSidebarExample";
import GroupedSidebarExample from "@/components/examples/sidebar/GroupedSidebarExample";
import NestedSidebarExample from "@/components/examples/sidebar/NestedSidebarExample";

const SidebarExamples = () => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <PageContainer>
      <PageTitle
        title="Sidebar Examples"
        subtitle="Examples of different sidebar configurations and usage patterns"
      />

      <div className="mt-6">
        <Tabs
          defaultValue="basic"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="collapsible">Collapsible</TabsTrigger>
            <TabsTrigger value="floating">Floating</TabsTrigger>
            <TabsTrigger value="grouped">Grouped</TabsTrigger>
            <TabsTrigger value="nested">Nested</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Sidebar</CardTitle>
                <CardDescription>
                  A simple sidebar with a menu and basic navigation items
                </CardDescription>
              </CardHeader>
              <CardContent className="border rounded-md p-0 h-[500px] overflow-hidden">
                <BasicSidebarExample />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="collapsible" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Collapsible Sidebar</CardTitle>
                <CardDescription>
                  A sidebar that can be collapsed to icons only or expanded to show full text
                </CardDescription>
              </CardHeader>
              <CardContent className="border rounded-md p-0 h-[500px] overflow-hidden">
                <CollapsibleSidebarExample />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="floating" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Floating Sidebar</CardTitle>
                <CardDescription>
                  A floating sidebar with a shadow and rounded corners
                </CardDescription>
              </CardHeader>
              <CardContent className="border rounded-md p-0 h-[500px] overflow-hidden">
                <FloatingSidebarExample />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="grouped" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Grouped Sidebar</CardTitle>
                <CardDescription>
                  A sidebar with grouped navigation items and section headers
                </CardDescription>
              </CardHeader>
              <CardContent className="border rounded-md p-0 h-[500px] overflow-hidden">
                <GroupedSidebarExample />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="nested" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Nested Sidebar</CardTitle>
                <CardDescription>
                  A sidebar with nested navigation items and expandable sections
                </CardDescription>
              </CardHeader>
              <CardContent className="border rounded-md p-0 h-[500px] overflow-hidden">
                <NestedSidebarExample />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default SidebarExamples;
