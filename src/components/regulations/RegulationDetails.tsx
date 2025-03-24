
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  FileType, 
  Calendar, 
  Info, 
  AlertTriangle, 
  Globe, 
  Bookmark, 
  Tag, 
  ExternalLink, 
  Users, 
  Building 
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
    // New fields
    jurisdiction: string | null;
    authority: string | null;
    keywords: string[] | null;
    source_url: string | null;
    status: string | null;
    category: string | null;
    applicable_to: string[] | null;
    last_reviewed_date: string | null;
  };
  violations: any[]; // Simplified for this example
}

const RegulationDetails = ({ regulation, violations = [] }: RegulationDetailsProps) => {
  const [activeTab, setActiveTab] = useState("details");

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'superseded': return 'bg-amber-100 text-amber-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="md:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>{regulation.title}</CardTitle>
          <CardDescription>
            {regulation.document_type} {regulation.version ? `v${regulation.version}` : ""} 
            {regulation.industry ? ` • ${regulation.industry}` : ""}
            {regulation.jurisdiction ? ` • ${regulation.jurisdiction}` : ""}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {regulation.file_path && (
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Download
            </Button>
          )}
          {regulation.source_url && (
            <Button variant="outline" asChild>
              <a href={regulation.source_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Source
              </a>
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
                  {regulation.status && (
                    <Badge className={`ml-2 ${getStatusColor(regulation.status)}`}>
                      {regulation.status}
                    </Badge>
                  )}
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
                  {regulation.jurisdiction && (
                    <div>
                      <h4 className="text-sm font-semibold">Jurisdiction</h4>
                      <p className="text-sm text-muted-foreground">{regulation.jurisdiction}</p>
                    </div>
                  )}
                  {regulation.authority && (
                    <div>
                      <h4 className="text-sm font-semibold">Authority</h4>
                      <p className="text-sm text-muted-foreground">{regulation.authority}</p>
                    </div>
                  )}
                  {regulation.category && (
                    <div>
                      <h4 className="text-sm font-semibold">Category</h4>
                      <p className="text-sm text-muted-foreground">{regulation.category}</p>
                    </div>
                  )}
                  {regulation.last_reviewed_date && (
                    <div>
                      <h4 className="text-sm font-semibold">Last Reviewed</h4>
                      <p className="text-sm text-muted-foreground">{formatDate(regulation.last_reviewed_date)}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold">Description</h4>
                  <p className="text-sm text-muted-foreground mt-1">{regulation.description || "No description provided."}</p>
                </div>

                {regulation.keywords && regulation.keywords.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold">Keywords</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {regulation.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline">{keyword}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {regulation.applicable_to && regulation.applicable_to.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold">Applicable To</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {regulation.applicable_to.map((item, index) => (
                        <Badge key={index} variant="secondary">{item}</Badge>
                      ))}
                    </div>
                  </div>
                )}
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
                
                {regulation.jurisdiction ? (
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-sm font-semibold">Jurisdiction</h3>
                    </div>
                    <p className="mt-2 text-xl font-medium">{regulation.jurisdiction}</p>
                  </div>
                ) : (
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-sm font-semibold">Related Violations</h3>
                    </div>
                    <p className="mt-2 text-xl font-medium">{violations?.length || 0}</p>
                  </div>
                )}
              </div>
              
              {regulation.status && (
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Bookmark className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Status</h3>
                  </div>
                  <div className="mt-2">
                    <Badge className={getStatusColor(regulation.status)}>
                      {regulation.status.charAt(0).toUpperCase() + regulation.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              )}
              
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-semibold">Description</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {regulation.description || "No description provided."}
                </p>
              </div>
              
              {regulation.keywords && regulation.keywords.length > 0 && (
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Keywords</h3>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {regulation.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline">{keyword}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {regulation.applicable_to && regulation.applicable_to.length > 0 && (
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Applicable To</h3>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {regulation.applicable_to.map((item, index) => (
                      <Badge key={index} variant="secondary">{item}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-semibold">Metadata</h3>
                <div className="mt-2 grid gap-2 text-sm">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Industry:</span>
                    <span>{regulation.industry || "N/A"}</span>
                  </div>
                  {regulation.authority && (
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Authority:</span>
                      <span>{regulation.authority}</span>
                    </div>
                  )}
                  {regulation.category && (
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{regulation.category}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Version:</span>
                    <span>{regulation.version || "N/A"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{formatDate(regulation.created_at)}</span>
                  </div>
                  {regulation.last_reviewed_date && (
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Last Reviewed:</span>
                      <span>{formatDate(regulation.last_reviewed_date)}</span>
                    </div>
                  )}
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
