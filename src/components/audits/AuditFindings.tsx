
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { AuditFinding } from './types';
import { mockAuditFindings } from './mockData';

const AuditFindings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const filteredFindings = mockAuditFindings.filter(finding => {
    if (activeTab === 'all') return true;
    return finding.status === activeTab.toLowerCase().replace('-', '_');
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-500">Low</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-red-500">Open</Badge>;
      case 'in_progress':
        return <Badge className="bg-amber-500 whitespace-nowrap">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-blue-500">Resolved</Badge>;
      case 'verified':
        return <Badge className="bg-green-500">Verified</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Audit Findings</h2>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#0f1419] border-b border-gray-800">
          <TabsTrigger value="all">All Findings</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFindings.length > 0 ? (
              filteredFindings.map((finding) => (
                <TableRow key={finding.id}>
                  <TableCell className="font-medium">{finding.id}</TableCell>
                  <TableCell>{finding.description}</TableCell>
                  <TableCell>{finding.location}</TableCell>
                  <TableCell>{getSeverityBadge(finding.severity)}</TableCell>
                  <TableCell>{finding.assignee}</TableCell>
                  <TableCell>{format(new Date(finding.dueDate), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{getStatusBadge(finding.status)}</TableCell>
                  <TableCell>...</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                  No findings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AuditFindings;
