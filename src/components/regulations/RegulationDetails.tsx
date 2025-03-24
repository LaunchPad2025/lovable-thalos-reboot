
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileType, Calendar, Info, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RegulationDetailsProps {
  regulation: {
    id: string;
    title: string;
    description: string | null;
    industry: string | null;
    document_type: string;
    file_path: string | null;
    file_type: string | null;
    version: string | null;
    effective_date: string | null;
    created_at: string;
  };
  violations: any[]; // Simplified for this example
}

const RegulationDetails = ({ regulation, violations = [] }: RegulationDetailsProps) => {
  const [activeTab, setActiveTab] = useState("details");

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="md:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>{regulation.title}</CardTitle>
          <CardDescription>
            {regulation.document_type} {regulation.version ? `v${regulation.version}` : ""} 
            {regulation.industry ? ` • ${regulation.industry}` : ""}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {regulation.file_path && (
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Download
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Info className="mr-2 h-4 w-4" />
                Quick View
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{regulation.title}</DialogTitle>
                <DialogDescription>
                  {regulation.document_type} {regulation.version ? `v${regulation.version}` : ""}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold">Document Type</h4>
                    <p className="text-sm text-muted-foreground">{regulation.document_type}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Industry</h4>
                    <p className="text-sm text-muted-foreground">{regulation.industry || "N/A"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Version</h4>
                    <p className="text-sm text-muted-foreground">{regulation.version || "N/A"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Effective Date</h4>
                    <p className="text-sm text-muted-foreground">{formatDate(regulation.effective_date)}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold">Description</h4>
                  <p className="text-sm text-muted-foreground mt-1">{regulation.description || "No description provided."}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
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
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <FileType className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Document Type</h3>
                  </div>
                  <p className="mt-2 text-xl font-medium">{regulation.document_type}</p>
                </div>
                
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Effective Date</h3>
                  </div>
                  <p className="mt-2 text-xl font-medium">{formatDate(regulation.effective_date)}</p>
                </div>
                
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Related Violations</h3>
                  </div>
                  <p className="mt-2 text-xl font-medium">{violations?.length || 0}</p>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-semibold">Description</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {regulation.description || "No description provided."}
                </p>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-semibold">Metadata</h3>
                <div className="mt-2 grid gap-2 text-sm">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Industry:</span>
                    <span>{regulation.industry || "N/A"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Version:</span>
                    <span>{regulation.version || "N/A"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{formatDate(regulation.created_at)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">File Type:</span>
                    <span>{regulation.file_type || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="violations">
            {violations?.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Violation</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Detected</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {violations.map((violation: any) => (
                    <TableRow key={violation.id} className="cursor-pointer">
                      <TableCell className="font-medium">
                        {violation.violation?.violation || "Untitled violation"}
                      </TableCell>
                      <TableCell>{violation.violation?.location || "Unknown"}</TableCell>
                      <TableCell>{violation.violation?.severity || "Unknown"}</TableCell>
                      <TableCell>{violation.violation?.status || "Pending"}</TableCell>
                      <TableCell>
                        {violation.violation?.detected_at 
                          ? new Date(violation.violation.detected_at).toLocaleDateString() 
                          : "Unknown"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No violations associated with this regulation.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RegulationDetails;
