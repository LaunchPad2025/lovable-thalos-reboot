
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ViolationsTableProps {
  violations: any[];
}

const ViolationsTable = ({ violations }: ViolationsTableProps) => {
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
    </>
  );
};

export default ViolationsTable;
