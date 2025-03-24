
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegulationsTable from "./RegulationsTable";
import { RegulationProps } from "./types";

interface IndustryTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  industries: string[];
  filteredRegulations: RegulationProps[];
  isLoading: boolean;
}

const IndustryTabs = ({ 
  activeTab, 
  setActiveTab, 
  industries, 
  filteredRegulations, 
  isLoading 
}: IndustryTabsProps) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4 flex flex-wrap">
        <TabsTrigger value="all">All</TabsTrigger>
        {industries.map((industry) => (
          <TabsTrigger key={industry} value={industry}>
            {industry}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={activeTab}>
        <RegulationsTable 
          regulations={filteredRegulations} 
          isLoading={isLoading} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default IndustryTabs;
