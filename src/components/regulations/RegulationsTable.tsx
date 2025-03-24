
import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import useMobile from "@/hooks/useMobile";
import { RegulationProps } from "./types";

interface RegulationsTableProps {
  regulations: RegulationProps[];
  isLoading: boolean;
}

const RegulationsTable = ({ regulations, isLoading }: RegulationsTableProps) => {
  const navigate = useNavigate();
  const isMobile = useMobile();

  const getStatusBadge = (status: string | null) => {
    if (!status) return null;
    
    const colors = {
      active: "bg-green-100 text-green-800",
      archived: "bg-gray-100 text-gray-800",
      superseded: "bg-amber-100 text-amber-800"
    };
    
    const color = colors[status as keyof typeof colors] || "bg-blue-100 text-blue-800";
    
    return (
      <Badge className={color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading regulations...</div>;
  }

  if (regulations.length === 0) {
    return <div className="text-center py-4">No regulations found</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          {!isMobile && <TableHead>Type</TableHead>}
          <TableHead>Industry</TableHead>
          {!isMobile && <TableHead>Jurisdiction</TableHead>}
          {!isMobile && <TableHead>Version</TableHead>}
          <TableHead>Status</TableHead>
          <TableHead>Effective Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {regulations.map((regulation) => (
          <TableRow 
            key={regulation.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => navigate(`/regulations/${regulation.id}`)}
          >
            <TableCell className="font-medium">{regulation.title}</TableCell>
            {!isMobile && <TableCell>{regulation.document_type}</TableCell>}
            <TableCell>{regulation.industry || "N/A"}</TableCell>
            {!isMobile && <TableCell>{regulation.jurisdiction || "N/A"}</TableCell>}
            {!isMobile && <TableCell>{regulation.version || "N/A"}</TableCell>}
            <TableCell>
              {getStatusBadge(regulation.status)}
            </TableCell>
            <TableCell>
              {formatDate(regulation.effective_date)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RegulationsTable;
