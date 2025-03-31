
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSeverityColor } from './mockData';

export const getFeatureInfo = (activeSection: string, selectedItem: any) => {
  switch (activeSection) {
    case 'violations':
      return {
        title: "Safety Violation Details",
        description: "Review and analyze safety violations detected in your workplace.",
        features: [
          "View severity level and impact assessment",
          "Track violation status and resolution progress",
          "Assign tasks to team members for remediation",
          "View location information and affected areas",
          "Access historical violation data and trends"
        ],
        content: selectedItem ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Violation: {selectedItem.description}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Severity</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className={`text-sm px-2 py-1 rounded-full ${getSeverityColor(selectedItem.severity)}`}>
                    {selectedItem.severity}
                  </span>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedItem.location}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Date Reported</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedItem.date}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-sm px-2 py-1 rounded-full bg-amber-500/10 text-amber-500">
                    Open
                  </span>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4">
              <Button className="mr-2">Assign Task</Button>
              <Button variant="outline">Mark as Resolved</Button>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center">
            <p className="text-gray-400">Select a violation from the list to view details</p>
          </div>
        )
      };
    case 'tasks':
      return {
        title: "Task Management",
        description: "Assign, track, and manage safety-related tasks across your organization.",
        features: [
          "Create and assign tasks to team members",
          "Track task status and completion progress",
          "Set priority levels and due dates",
          "Link tasks to violations and audit findings",
          "Receive notifications for overdue tasks"
        ],
        content: selectedItem ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Task: {selectedItem.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    selectedItem.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                    selectedItem.status === 'in-progress' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-amber-500/10 text-amber-500'
                  }`}>
                    {selectedItem.status === 'in-progress' ? 'In Progress' : 
                     selectedItem.status === 'completed' ? 'Completed' : 'Pending'}
                  </span>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Assignee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedItem.assignee_id || 'Unassigned'}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Due Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedItem.due_date?.slice(0, 10) || 'No date set'}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Priority</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-sm px-2 py-1 rounded-full bg-blue-500/10 text-blue-500">
                    Medium
                  </span>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4">
              <Button className="mr-2">Update Status</Button>
              <Button variant="outline">Re-assign Task</Button>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center">
            <p className="text-gray-400">Select a task from the list to view details</p>
          </div>
        )
      };
    case 'documents':
      return {
        title: "Safety Documentation",
        description: "Manage, store, and access all your safety-related documents in one place.",
        features: [
          "Upload and categorize safety documents",
          "Maintain version control of critical documentation",
          "Schedule document reviews and updates",
          "Search and filter documentation library",
          "Share documents with team members"
        ],
        content: selectedItem ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Document: {selectedItem.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedItem.type}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">File Format</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-sm px-2 py-1 rounded-full bg-blue-500/10 text-blue-500">
                    {selectedItem.fileType.toUpperCase()}
                  </span>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Last Updated</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedItem.lastModified}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedItem.size || '1.2 MB'}</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4">
              <Button className="mr-2">View Document</Button>
              <Button variant="outline">Download</Button>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center">
            <p className="text-gray-400">Select a document from the list to view details</p>
          </div>
        )
      };
    case 'audits':
      return {
        title: "Safety Audits & Inspections",
        description: "Schedule, conduct, and track safety audits across your organization.",
        features: [
          "Create custom audit templates by industry",
          "Schedule recurring audits for compliance",
          "Track findings and corrective actions",
          "Generate audit reports for stakeholders",
          "Monitor compliance scores and trends"
        ],
        content: selectedItem ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Audit: {selectedItem.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    selectedItem.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                    selectedItem.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-amber-500/10 text-amber-500'
                  }`}>
                    {selectedItem.status}
                  </span>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedItem.date}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedItem.score}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1f29] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal">Findings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedItem.findings || '3 findings'}</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4">
              <Button className="mr-2">View Report</Button>
              <Button variant="outline">Create Tasks</Button>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center">
            <p className="text-gray-400">Select an audit from the list to view details</p>
          </div>
        )
      };
    default:
      return {
        title: "Safety Compliance Dashboard",
        description: "Your central hub for monitoring safety performance across your organization.",
        features: [
          "Real-time safety compliance metrics",
          "Critical violation alerts and notifications",
          "Task completion and assignment tracking",
          "Upcoming audit schedule visibility",
          "Document and training status overview"
        ],
        content: (
          <div className="p-4 text-center">
            <p className="text-gray-400">This dashboard provides an overview of your safety compliance status</p>
            <p className="text-gray-400 mt-2">Select a specific section from the sidebar to explore its features</p>
          </div>
        )
      };
  }
};
