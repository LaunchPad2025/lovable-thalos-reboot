
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, ExternalLink, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RegulationProps } from "./types";

interface RegulationHeaderProps {
  regulation: RegulationProps;
}

const RegulationHeader = ({ regulation }: RegulationHeaderProps) => {
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
  );
};

export default RegulationHeader;
