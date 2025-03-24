
import { 
  FileType, 
  Calendar, 
  Globe, 
  AlertTriangle,
  Bookmark
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RegulationProps } from "./types";

interface RegulationSummaryCardsProps {
  regulation: RegulationProps;
  violationsCount: number;
}

const RegulationSummaryCards = ({ regulation, violationsCount }: RegulationSummaryCardsProps) => {
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
            <p className="mt-2 text-xl font-medium">{violationsCount}</p>
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
    </div>
  );
};

export default RegulationSummaryCards;
