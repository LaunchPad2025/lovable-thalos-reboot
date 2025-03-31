
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckSquare, FileText, ClipboardList, ArrowRight, Shield, Bell, Info } from 'lucide-react';
import { mockTasks } from '@/hooks/tasks/mockTasks';
import { mockDocuments } from '@/components/documents/mockData';

// Mock violation data
const mockViolations = [
  { id: 1, description: 'Missing guardrail on platform', severity: 'High', location: 'Building A, Floor 3', date: '2023-12-05' },
  { id: 2, description: 'Improper chemical storage', severity: 'Critical', location: 'Laboratory', date: '2023-12-10' },
  { id: 3, description: 'Blocked emergency exit', severity: 'High', location: 'Warehouse', date: '2023-12-08' },
  { id: 4, description: 'Exposed electrical wiring', severity: 'Medium', location: 'Office Area', date: '2023-12-12' },
  { id: 5, description: 'Inadequate ventilation', severity: 'Low', location: 'Break Room', date: '2023-12-01' }
];

// Mock audit data
const mockAudits = [
  { id: 1, title: 'Monthly Safety Inspection', status: 'Completed', date: '2023-11-15', score: '92%' },
  { id: 2, title: 'OSHA Compliance Review', status: 'Scheduled', date: '2023-12-20', score: 'Pending' },
  { id: 3, title: 'Fire Safety Audit', status: 'In Progress', date: '2023-12-12', score: 'In Progress' },
  { id: 4, title: 'Equipment Safety Check', status: 'Completed', date: '2023-10-30', score: '88%' }
];

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical': return 'text-red-500 bg-red-500/10';
    case 'high': return 'text-orange-500 bg-orange-500/10';
    case 'medium': return 'text-amber-500 bg-amber-500/10';
    case 'low': return 'text-green-500 bg-green-500/10';
    default: return 'text-blue-500 bg-blue-500/10';
  }
};

const DemoDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showFeatureInfo, setShowFeatureInfo] = useState(false);
  
  const handleNavigation = (section: string) => {
    setActiveSection(section);
    setSelectedItem(null);
    setShowFeatureInfo(false);
  };
  
  const handleItemSelect = (item: any, section: string) => {
    setSelectedItem(item);
    setShowFeatureInfo(true);
  };
  
  const getFeatureInfo = () => {
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
  
  const featureInfo = getFeatureInfo();
  
  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      <header className="bg-[#131820] border-b border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-blue-500 mr-2" />
            <h1 className="text-xl font-bold">Safety Compliance Demo</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Bell className="h-5 w-5 mr-1" />
              <span className="sr-only sm:not-sr-only">Notifications</span>
            </Button>
            <Button variant="default" size="sm" onClick={() => navigate('/')}>
              Exit Demo
            </Button>
          </div>
        </div>
      </header>
      
      <aside className="w-64 h-[calc(100vh-64px)] bg-[#131820] border-r border-gray-800 fixed left-0 top-16">
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeSection === 'dashboard' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'}`}
                onClick={() => handleNavigation('dashboard')}
              >
                <CheckSquare className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeSection === 'violations' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'}`}
                onClick={() => handleNavigation('violations')}
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                Violations
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeSection === 'tasks' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'}`}
                onClick={() => handleNavigation('tasks')}
              >
                <CheckSquare className="mr-2 h-5 w-5" />
                Tasks
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeSection === 'documents' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'}`}
                onClick={() => handleNavigation('documents')}
              >
                <FileText className="mr-2 h-5 w-5" />
                Documents
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${activeSection === 'audits' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'}`}
                onClick={() => handleNavigation('audits')}
              >
                <ClipboardList className="mr-2 h-5 w-5" />
                Audits
              </Button>
            </li>
          </ul>
        </nav>
      </aside>
      
      <main className="ml-64 p-6">
        {showFeatureInfo && selectedItem ? (
          <div className="mb-8">
            <Button 
              variant="outline" 
              className="mb-4" 
              onClick={() => setShowFeatureInfo(false)}
            >
              <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
              Back to List
            </Button>
            {featureInfo.content}
          </div>
        ) : (
          <>
            {activeSection === 'dashboard' && (
              <>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Safety Overview</h2>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center" 
                      onClick={() => setShowFeatureInfo(true)}
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
                
                <Card className="bg-blue-900/20 border border-blue-900/30 mb-8">
                  <CardContent className="p-4 flex items-center">
                    <div className="mr-4 bg-blue-500/20 p-2 rounded-full">
                      <Shield className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">This is a demo environment</h4>
                      <p className="text-sm text-gray-400">You're viewing simulated data for demonstration purposes</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            
            {activeSection === 'violations' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Violations</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center" 
                    onClick={() => setShowFeatureInfo(true)}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    About This Feature
                  </Button>
                </div>
                <Card className="bg-[#1a1f29] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Active Violations</CardTitle>
                    <CardDescription className="text-gray-400">Your team's active safety violations</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-800">
                      {mockViolations.map(violation => (
                        <div 
                          key={violation.id} 
                          className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer"
                          onClick={() => handleItemSelect(violation, 'violations')}
                        >
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
                
                <Card className="bg-blue-900/20 border border-blue-900/30 mt-8">
                  <CardContent className="p-4 flex items-center">
                    <div className="mr-4 bg-blue-500/20 p-2 rounded-full">
                      <Shield className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Demo Mode</h4>
                      <p className="text-sm text-gray-400">This is simulated violation data</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeSection === 'tasks' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Tasks</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center" 
                    onClick={() => setShowFeatureInfo(true)}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    About This Feature
                  </Button>
                </div>
                <Card className="bg-[#1a1f29] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Assigned Tasks</CardTitle>
                    <CardDescription className="text-gray-400">Your team's safety tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-800">
                      {Array.isArray(mockTasks) && mockTasks.slice(0, 5).map(task => (
                        <div 
                          key={task.id} 
                          className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer"
                          onClick={() => handleItemSelect(task, 'tasks')}
                        >
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
                
                <Card className="bg-blue-900/20 border border-blue-900/30 mt-8">
                  <CardContent className="p-4 flex items-center">
                    <div className="mr-4 bg-blue-500/20 p-2 rounded-full">
                      <Shield className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Demo Mode</h4>
                      <p className="text-sm text-gray-400">This is simulated task data</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeSection === 'documents' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Documents</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center" 
                    onClick={() => setShowFeatureInfo(true)}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    About This Feature
                  </Button>
                </div>
                <Card className="bg-[#1a1f29] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Safety Documents</CardTitle>
                    <CardDescription className="text-gray-400">Your safety documentation library</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-800">
                      {mockDocuments.slice(0, 5).map(doc => (
                        <div 
                          key={doc.id} 
                          className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer"
                          onClick={() => handleItemSelect(doc, 'documents')}
                        >
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
                
                <Card className="bg-blue-900/20 border border-blue-900/30 mt-8">
                  <CardContent className="p-4 flex items-center">
                    <div className="mr-4 bg-blue-500/20 p-2 rounded-full">
                      <Shield className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Demo Mode</h4>
                      <p className="text-sm text-gray-400">This is simulated document data</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeSection === 'audits' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Audits</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center" 
                    onClick={() => setShowFeatureInfo(true)}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    About This Feature
                  </Button>
                </div>
                <Card className="bg-[#1a1f29] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Safety Audits</CardTitle>
                    <CardDescription className="text-gray-400">Your compliance audit schedule</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-800">
                      {mockAudits.map(audit => (
                        <div 
                          key={audit.id} 
                          className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer"
                          onClick={() => handleItemSelect(audit, 'audits')}
                        >
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
                
                <Card className="bg-blue-900/20 border border-blue-900/30 mt-8">
                  <CardContent className="p-4 flex items-center">
                    <div className="mr-4 bg-blue-500/20 p-2 rounded-full">
                      <Shield className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Demo Mode</h4>
                      <p className="text-sm text-gray-400">This is simulated audit data</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
        
        {!showFeatureInfo && (
          <Card className="bg-blue-500/10 border border-blue-500/20 mt-8">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Info className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{featureInfo.title}</h3>
                <p className="text-gray-300 mb-6">{featureInfo.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                  {featureInfo.features.map((feature, index) => (
                    <Card key={index} className="bg-[#1a1f29] border-gray-800">
                      <CardContent className="p-4 flex items-start">
                        <div className="mr-3 bg-blue-500/20 p-1 rounded-full mt-0.5">
                          <CheckSquare className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="text-sm text-gray-200">{feature}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {activeSection !== 'dashboard' && (
                  <p className="text-blue-400 mt-6 italic">Click on any item in the list to see details</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default DemoDashboard;
