import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRegulations, useRegulationDetails } from "@/hooks/useRegulations";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import PageContainer from "@/components/layout/PageContainer";
import { useRegulationViolations } from "@/hooks/useViolationRegulations";
import RegulationForm from "@/components/regulations/RegulationForm";
import RegulationDetails from "@/components/regulations/RegulationDetails";

const Regulations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: regulations, isLoading: regulationsLoading } = useRegulations();
  const { data: regulationDetails } = useRegulationDetails(id);
  const { data: relatedViolations } = useRegulationViolations(id);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    if (!id) setActiveTab("all");
  }, [id]);

  const industries = regulations 
    ? [...new Set(regulations.filter(r => r.industry).map(r => r.industry))]
    : [];

  const filteredRegulations = regulations 
    ? (activeTab === "all" 
        ? regulations 
        : regulations.filter(r => r.industry === activeTab))
    : [];

  return (
    <PageContainer title="Safety Regulations">
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-7">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Regulations</CardTitle>
              <CardDescription>
                Manage all your regulatory documents in one place
              </CardDescription>
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Add Regulation</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Add New Regulation</DrawerTitle>
                  <DrawerDescription>
                    Add a new regulation, standard, or rulebook to your library
                  </DrawerDescription>
                </DrawerHeader>
                <RegulationForm />
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                {industries.map((industry) => (
                  <TabsTrigger key={industry} value={industry}>
                    {industry}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={activeTab}>
                {regulationsLoading ? (
                  <div className="text-center py-4">Loading regulations...</div>
                ) : filteredRegulations.length === 0 ? (
                  <div className="text-center py-4">No regulations found</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Effective Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRegulations.map((regulation) => (
                        <TableRow 
                          key={regulation.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => navigate(`/regulations/${regulation.id}`)}
                        >
                          <TableCell className="font-medium">{regulation.title}</TableCell>
                          <TableCell>{regulation.document_type}</TableCell>
                          <TableCell>{regulation.industry || "N/A"}</TableCell>
                          <TableCell>{regulation.version || "N/A"}</TableCell>
                          <TableCell>
                            {regulation.effective_date 
                              ? new Date(regulation.effective_date).toLocaleDateString() 
                              : "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {id && regulationDetails && (
          <RegulationDetails 
            regulation={regulationDetails} 
            violations={relatedViolations}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default Regulations;
