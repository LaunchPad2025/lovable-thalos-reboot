import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckSquare, FileText, ClipboardList, ArrowRight, Shield, Bell } from 'lucide-react';
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
  
  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };
  
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
        {activeSection === 'dashboard' && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Safety Overview</h2>
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
            <h2 className="text-2xl font-bold mb-6">Violations</h2>
            <Card className="bg-[#1a1f29] border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Active Violations</CardTitle>
                <CardDescription className="text-gray-400">Your team's active safety violations</CardDescription>
              </CardHeader>
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
            <h2 className="text-2xl font-bold mb-6">Tasks</h2>
            <Card className="bg-[#1a1f29] border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Assigned Tasks</CardTitle>
                <CardDescription className="text-gray-400">Your team's safety tasks</CardDescription>
              </CardHeader>
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
            <h2 className="text-2xl font-bold mb-6">Documents</h2>
            <Card className="bg-[#1a1f29] border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Safety Documents</CardTitle>
                <CardDescription className="text-gray-400">Your safety documentation library</CardDescription>
              </CardHeader>
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
            <h2 className="text-2xl font-bold mb-6">Audits</h2>
            <Card className="bg-[#1a1f29] border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Safety Audits</CardTitle>
                <CardDescription className="text-gray-400">Your compliance audit schedule</CardDescription>
              </CardHeader>
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
      </main>
    </div>
  );
};

export default DemoDashboard;
