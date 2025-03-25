
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ViolationData {
  id: string;
  violation?: {
    violation: string;
    location?: string;
    severity?: string;
    status?: string;
    detected_at?: string;
    image_url?: string;
  };
}

interface ViolationsTableProps {
  violations: ViolationData[];
  onSelectViolation?: (id: string) => void;
}

const ViolationsTable = ({ violations, onSelectViolation }: ViolationsTableProps) => {
  const navigate = useNavigate();

  const handleRowClick = (violationId: string) => {
    if (onSelectViolation) {
      onSelectViolation(violationId);
    } else {
      navigate(`/violations/${violationId}`);
    }
  };

  // Helper function to get severity badge color
  const getSeverityColor = (severity?: string) => {
    switch(severity?.toLowerCase()) {
      case 'critical': return "bg-red-700 text-white border-red-800";
      case 'high': return "bg-orange-600 text-white border-orange-700";
      case 'medium': return "bg-yellow-600 text-white border-yellow-700";
      case 'low': return "bg-blue-600 text-white border-blue-700";
      default: return "bg-gray-600 text-white border-gray-700";
    }
  };

  // Helper function to get status badge color
  const getStatusColor = (status?: string) => {
    switch(status?.toLowerCase()) {
      case 'open': return "bg-red-700/40 text-red-200 border-red-800";
      case 'in-progress': return "bg-blue-700/40 text-blue-200 border-blue-800";
      case 'resolved': return "bg-green-700/40 text-green-200 border-green-800";
      default: return "bg-gray-700/40 text-gray-200 border-gray-800";
    }
  };

  return (
    <>
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
            {violations.map((item: ViolationData) => (
              <TableRow 
                key={item.id} 
                className="cursor-pointer hover:bg-[#1a1f29]"
                onClick={() => handleRowClick(item.id)}
              >
                <TableCell className="font-medium">
                  {item.violation?.violation || "Untitled violation"}
                </TableCell>
                <TableCell>{item.violation?.location || "Unknown"}</TableCell>
                <TableCell>
                  <Badge className={getSeverityColor(item.violation?.severity)}>
                    {item.violation?.severity || "Unknown"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.violation?.status)}>
                    {item.violation?.status || "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {item.violation?.detected_at 
                    ? new Date(item.violation.detected_at).toLocaleDateString() 
                    : "Unknown"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-10 text-muted-foreground bg-[#0d1117] rounded-md border border-gray-800">
          No violations associated with this regulation.
        </div>
      )}
    </>
  );
};

export default ViolationsTable;
