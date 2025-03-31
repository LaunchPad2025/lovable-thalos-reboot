
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowRight, CheckSquare, Info, Shield } from 'lucide-react';
import DemoCard from '../DemoCard';

// Mock data imports
import { mockViolations, getSeverityColor } from '../mockData';
import { mockTasks } from '@/hooks/tasks/mockTasks';
import { mockDocuments } from '@/components/documents/mockData';
import { mockAudits } from '../mockData';

interface DashboardSectionProps {
  onShowFeatureInfo: () => void;
}

const DashboardSection = ({ onShowFeatureInfo }: DashboardSectionProps) => {
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Safety Overview</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center" 
            onClick={onShowFeatureInfo}
          >
            <Info className="h-4 w-4 mr-2" />
            About This Feature
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-[#1a1f29] border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">Open Violations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">12</div>
              <p className="text-sm text-red-400 mt-1">+2 since last week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1a1f29] border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">Tasks In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">8</div>
              <p className="text-sm text-green-400 mt-1">-3 since last week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1a1f29] border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">Compliance Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">87%</div>
              <p className="text-sm text-green-400 mt-1">+5% since last month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1a1f29] border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">Next Audit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">Dec 20</div>
              <p className="text-sm text-gray-400 mt-1">OSHA Compliance Review</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue="violations">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <TabsList className="bg-[#1a1f29]">
              <TabsTrigger value="violations">Violations</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="audits">Audits</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="violations" className="mt-0">
            <Card className="bg-[#1a1f29] border-gray-800">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-800">
                  {mockViolations.map(violation => (
                    <div key={violation.id} className="p-4 hover:bg-gray-800/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{violation.description}</h4>
                          <p className="text-sm text-gray-400 mt-1">{violation.location} • {violation.date}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(violation.severity)}`}>
                          {violation.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-0">
            <Card className="bg-[#1a1f29] border-gray-800">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-800">
                  {Array.isArray(mockTasks) && mockTasks.slice(0, 5).map(task => (
                    <div key={task.id} className="p-4 hover:bg-gray-800/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-gray-400 mt-1">Assigned to: {task.assignee_id || 'Unassigned'} • Due: {task.due_date?.slice(0, 10) || 'No date'}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                          task.status === 'in-progress' ? 'bg-blue-500/10 text-blue-500' :
                          'bg-amber-500/10 text-amber-500'
                        }`}>
                          {task.status === 'in-progress' ? 'In Progress' : 
                           task.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <Card className="bg-[#1a1f29] border-gray-800">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-800">
                  {mockDocuments.slice(0, 5).map(doc => (
                    <div key={doc.id} className="p-4 hover:bg-gray-800/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{doc.title}</h4>
                          <p className="text-sm text-gray-400 mt-1">Type: {doc.type} • Updated: {doc.lastModified}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-500`}>
                          {doc.fileType.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="audits" className="mt-0">
            <Card className="bg-[#1a1f29] border-gray-800">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-800">
                  {mockAudits.map(audit => (
                    <div key={audit.id} className="p-4 hover:bg-gray-800/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{audit.title}</h4>
                          <p className="text-sm text-gray-400 mt-1">Date: {audit.date} • Score: {audit.score}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          audit.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                          audit.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                          'bg-amber-500/10 text-amber-500'
                        }`}>
                          {audit.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <DemoCard message="You're viewing simulated data for demonstration purposes" />
    </>
  );
};

export default DashboardSection;
