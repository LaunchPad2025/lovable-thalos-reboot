
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegulationHeader from "./RegulationHeader";
import RegulationSummaryCards from "./RegulationSummaryCards";
import RegulationMetadata from "./RegulationMetadata";
import ViolationsTable from "./ViolationsTable";
import { RegulationProps } from "./types";

interface RegulationDetailsProps {
  regulation: RegulationProps;
  violations: any[]; // Simplified for this example
}

const RegulationDetails = ({ regulation, violations = [] }: RegulationDetailsProps) => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <Card className="md:col-span-7">
      <RegulationHeader regulation={regulation} />
      
      <CardContent>
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="violations">
              Related Violations ({violations?.length || 0})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <div className="space-y-6">
              <RegulationSummaryCards 
                regulation={regulation} 
                violationsCount={violations?.length || 0} 
              />
              
              <RegulationMetadata regulation={regulation} />
            </div>
          </TabsContent>
          
          <TabsContent value="violations">
            <ViolationsTable violations={violations} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RegulationDetails;
