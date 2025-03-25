
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestResult {
  id: string;
  test_name: string;
  result: string;
  severity: string;
  location: string;
  timestamp: string;
  image_url?: string;
  url?: string;
}

interface ViolationResultsProps {
  results: TestResult[];
  onSave?: () => void;
}

const ViolationResults: React.FC<ViolationResultsProps> = ({ results, onSave }) => {
  return (
    <Table>
      <TableCaption>Recent Compliance Test Results</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Test</TableHead>
          <TableHead>Result</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result) => {
          // Use a fallback if image_url is undefined
          const imageUrl = result.image_url || result.url || '';

          return (
            <TableRow key={result.id}>
              <TableCell>
                <Avatar>
                  {imageUrl ? (
                    <AvatarImage src={imageUrl} alt={result.test_name} />
                  ) : (
                    <AvatarFallback>{result.test_name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
              </TableCell>
              <TableCell>{result.test_name}</TableCell>
              <TableCell>{result.result}</TableCell>
              <TableCell>
                <Badge className={result.severity === 'high' ? 'bg-red-500' : result.severity === 'medium' ? 'bg-yellow-500 text-black' : 'bg-green-500'}>
                  {result.severity}
                </Badge>
              </TableCell>
              <TableCell>{result.location}</TableCell>
              <TableCell>{result.timestamp}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ViolationResults;
