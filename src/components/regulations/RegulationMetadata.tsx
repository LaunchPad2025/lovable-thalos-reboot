
import { 
  Tag,
  Users,
  Building 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RegulationProps } from "./types";

interface RegulationMetadataProps {
  regulation: RegulationProps;
}

const RegulationMetadata = ({ regulation }: RegulationMetadataProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
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
  );
};

export default RegulationMetadata;
