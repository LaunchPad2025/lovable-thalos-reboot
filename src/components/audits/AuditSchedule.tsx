
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
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { mockScheduledAudits } from './mockData';

const AuditSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('upcoming');
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const filteredAudits = mockScheduledAudits.filter(audit => {
    if (activeTab === 'all') return true;
    return audit.status === activeTab;
  });

  const getReadinessProgress = (readiness: number) => {
    const color = readiness >= 90 ? 'bg-green-500' : readiness >= 70 ? 'bg-amber-500' : 'bg-red-500';
    return (
      <div className="flex items-center gap-2">
        <Progress value={readiness} className="h-2 w-20" indicatorClassName={color} />
        <span>{readiness}%</span>
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getUpcomingAuditsSection = () => {
    return (
      <div className="space-y-2">
        {mockScheduledAudits.filter(a => a.status === 'scheduled').slice(0, 4).map((audit, index) => (
          <div key={audit.id} className="border border-gray-800 rounded-md p-3 bg-gray-900/50">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="bg-gray-800 rounded-md w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{audit.name}</p>
                  <p className="text-xs text-gray-400">{audit.date} • {audit.time}</p>
                </div>
              </div>
              <div className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded-md">
                -{Math.floor(Math.random() * 90 + 10)} days
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <div>
                <span className="uppercase font-semibold">{audit.type}</span>
              </div>
              <div className="px-2 py-1 bg-gray-800 rounded-md">
                {audit.assignee}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 space-y-4">
        <h2 className="text-xl font-semibold">Audit Schedule</h2>
        
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-[#0f1419] border-b border-gray-800">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="all">All Audits</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Audit Name</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Readiness</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAudits.length > 0 ? (
                filteredAudits.map((audit) => (
                  <TableRow key={audit.id}>
                    <TableCell className="font-medium">{audit.name}</TableCell>
                    <TableCell>
                      {format(new Date(audit.date), 'MMM d, yyyy')}
                      <br />
                      <span className="text-muted-foreground text-sm">{audit.time}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {audit.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{audit.location}</TableCell>
                    <TableCell>{audit.assignee}</TableCell>
                    <TableCell>{getReadinessProgress(audit.readiness)}</TableCell>
                    <TableCell>{getStatusBadge(audit.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    No audits found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="w-full md:w-72 space-y-6">
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Calendar</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border-none"
          />
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-3">Upcoming Audits</h3>
          {getUpcomingAuditsSection()}
        </div>
      </div>
    </div>
  );
};

export default AuditSchedule;
