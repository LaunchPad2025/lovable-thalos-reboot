
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle } from 'lucide-react';

interface RiskAssessmentDetailsProps {
  id: string;
}

// Mock assessment data
const mockAssessment = {
  id: '1',
  title: 'Main Warehouse Annual Assessment',
  createdDate: 'Sep 14, 2023',
  department: 'Logistics',
  location: 'Building A - Warehouse',
  assessor: 'John Doe',
  assessmentDate: '9/14/2023',
  status: 'Approved',
  riskLevel: '3.5',
  riskLevelLabel: 'Low',
  notes: 'Overall, the warehouse safety conditions have improved since the last assessment. The implementation of the new cleaning schedule has reduced slip hazards significantly.',
  riskDistribution: {
    low: 1,
    medium: 1,
    high: 0,
    critical: 0
  },
  summary: {
    factors: 2,
    actions: 0,
    attachments: 0,
    highRisks: 0
  },
  findings: [
    {
      id: '1',
      category: 'General Hazards',
      score: 4,
      factors: [
        {
          id: 'factor-1',
          description: 'Some areas of the warehouse floor show minor wear and may become slippery when wet.',
          severity: 'Medium',
          likelihood: 'Possible',
          controls: 'Non-slip flooring installed, regular cleaning schedule'
        },
        {
          id: 'factor-3',
          description: 'Recent reorganization of storage has improved stability, but some high racks need additional securing.',
          severity: 'High',
          likelihood: 'Unlikely',
          controls: 'Secured shelving, hard hat policy in high-rack areas'
        }
      ]
    }
  ],
  tasks: [
    {
      id: 't1',
      title: 'Repair damaged guardrail on warehouse floor',
      priority: 'High',
      assignee: 'David Smith',
      dueDate: '12/14/2023',
      status: 'In Progress'
    },
    {
      id: 't2',
      title: 'Install additional warning signs in warehouse area',
      priority: 'Medium',
      assignee: 'Sarah Johnson',
      dueDate: '11/30/2023',
      status: 'Completed'
    },
    {
      id: 't3',
      title: 'Replace worn floor marking tape in loading zone',
      priority: 'Low',
      assignee: 'Mark Davis',
      dueDate: '12/10/2023',
      status: 'Pending'
    }
  ],
  violations: [
    {
      id: 'v1',
      title: 'Missing machine guard on band saw',
      regulation: 'OSHA 29 CFR 1910.212',
      location: 'Building A - Warehouse',
      detected: '10/14/2023',
      severity: 'High'
    },
    {
      id: 'v2',
      title: 'Blocked fire exit in east corridor',
      regulation: 'NFPA 101',
      location: 'Building A - Warehouse',
      detected: '11/02/2023',
      severity: 'Critical'
    }
  ],
  audits: [
    {
      id: 'a1',
      title: 'Quarterly Safety Inspection',
      findings: 12,
      date: '09/01/2023',
      compliance: '85%',
      status: 'Completed'
    }
  ]
};

const RiskAssessmentDetails: React.FC<RiskAssessmentDetailsProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSection, setActiveSection] = useState('tasks');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{mockAssessment.title}</h1>
          <p className="text-gray-400">Created on {mockAssessment.createdDate}</p>
        </div>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">Approved</span>
          <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">Low Risk</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#0f1419] p-4 rounded-md border border-gray-800 flex items-center space-x-3">
          <div className="bg-[#1a1f29] p-2 rounded">
            <div className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Department</p>
            <p className="text-white">{mockAssessment.department}</p>
          </div>
        </div>
        
        <div className="bg-[#0f1419] p-4 rounded-md border border-gray-800 flex items-center space-x-3">
          <div className="bg-[#1a1f29] p-2 rounded">
            <div className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Location</p>
            <p className="text-white">{mockAssessment.location}</p>
          </div>
        </div>
        
        <div className="bg-[#0f1419] p-4 rounded-md border border-gray-800 flex items-center space-x-3">
          <div className="bg-[#1a1f29] p-2 rounded">
            <div className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Assessor</p>
            <p className="text-white">{mockAssessment.assessor}</p>
          </div>
        </div>
        
        <div className="bg-[#0f1419] p-4 rounded-md border border-gray-800 flex items-center space-x-3">
          <div className="bg-[#1a1f29] p-2 rounded">
            <div className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Assessment Date</p>
            <p className="text-white">{mockAssessment.assessmentDate}</p>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-[#0f1419] border border-gray-800 rounded-md p-0 w-full">
          <TabsTrigger 
            value="overview" 
            className={`flex-1 rounded-none py-3 ${activeTab === 'overview' ? 'bg-[#1a1f29]' : ''}`}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="findings" 
            className={`flex-1 rounded-none py-3 ${activeTab === 'findings' ? 'bg-[#1a1f29]' : ''}`}
          >
            Findings
          </TabsTrigger>
          <TabsTrigger 
            value="mitigation" 
            className={`flex-1 rounded-none py-3 ${activeTab === 'mitigation' ? 'bg-[#1a1f29]' : ''}`}
          >
            Mitigation Actions
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className={`flex-1 rounded-none py-3 ${activeTab === 'documents' ? 'bg-[#1a1f29]' : ''}`}
          >
            Documents
          </TabsTrigger>
          <TabsTrigger 
            value="related" 
            className={`flex-1 rounded-none py-3 ${activeTab === 'related' ? 'bg-[#1a1f29]' : ''}`}
          >
            Related Items
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
            <h3 className="text-white font-medium mb-4">Risk Level</h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-3xl font-bold text-white">{mockAssessment.riskLevel}</span>
              <span className="text-gray-400">Low</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          
          <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
            <h3 className="text-white font-medium mb-4">Assessment Status</h3>
            <div className="flex items-center mb-4">
              <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
              <span className="text-white font-medium">Approved</span>
            </div>
            <p className="text-gray-400 text-sm">This assessment has been reviewed and approved.</p>
          </div>
          
          <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
            <h3 className="text-white font-medium mb-4">Assessment Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1f29] p-4 rounded-md text-center">
                <div className="text-2xl font-bold text-white">{mockAssessment.summary.factors}</div>
                <div className="text-gray-400 text-sm">Risk Factors</div>
              </div>
              <div className="bg-[#1a1f29] p-4 rounded-md text-center">
                <div className="text-2xl font-bold text-white">{mockAssessment.summary.actions}</div>
                <div className="text-gray-400 text-sm">Actions</div>
              </div>
              <div className="bg-[#1a1f29] p-4 rounded-md text-center">
                <div className="text-2xl font-bold text-white">{mockAssessment.summary.attachments}</div>
                <div className="text-gray-400 text-sm">Attachments</div>
              </div>
              <div className="bg-[#1a1f29] p-4 rounded-md text-center">
                <div className="text-2xl font-bold text-white">{mockAssessment.summary.highRisks}</div>
                <div className="text-gray-400 text-sm">High Risks</div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800 md:col-span-3">
            <h3 className="text-white font-medium mb-4">Notes</h3>
            <p className="text-gray-400">{mockAssessment.notes}</p>
          </div>
          
          <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800 md:col-span-3">
            <h3 className="text-white font-medium mb-4">Risk Distribution</h3>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div>
                <div className="mb-2 text-center text-sm text-gray-400">Low</div>
                <div className="bg-green-500 h-4 rounded w-full"></div>
                <div className="text-center mt-1 text-white">{mockAssessment.riskDistribution.low}</div>
              </div>
              <div>
                <div className="mb-2 text-center text-sm text-gray-400">Medium</div>
                <div className="bg-yellow-500 h-4 rounded w-full"></div>
                <div className="text-center mt-1 text-white">{mockAssessment.riskDistribution.medium}</div>
              </div>
              <div>
                <div className="mb-2 text-center text-sm text-gray-400">High</div>
                <div className="bg-orange-500 h-4 rounded w-full"></div>
                <div className="text-center mt-1 text-white">{mockAssessment.riskDistribution.high}</div>
              </div>
              <div>
                <div className="mb-2 text-center text-sm text-gray-400">Critical</div>
                <div className="bg-red-500 h-4 rounded w-full"></div>
                <div className="text-center mt-1 text-white">{mockAssessment.riskDistribution.critical}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'findings' && (
        <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
          <h3 className="text-white font-medium mb-4">Risk Assessment Findings</h3>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <h4 className="text-white font-medium">General Hazards</h4>
                <span className="ml-2 px-2 py-0.5 text-xs rounded bg-green-500/30 text-green-300 border border-green-800">3.5</span>
              </div>
              <button className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m18 15-6-6-6 6"></path></svg>
              </button>
            </div>
            
            {mockAssessment.findings[0].factors.map((factor) => (
              <div key={factor.id} className="mb-8 border-t border-gray-800 pt-4">
                <div className="mb-1 flex items-center justify-between">
                  <div className="text-gray-300">{factor.id}</div>
                  <div className="px-2 py-0.5 rounded bg-yellow-500 text-black text-xs font-medium">Score: 4</div>
                </div>
                <p className="text-white mb-4">{factor.description}</p>
                
                <div className="mb-4">
                  <div className="text-gray-400 mb-1">Severity</div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-800 h-2 rounded-full mr-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                    <span className="text-gray-400 text-sm">{factor.severity}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-400 mb-1">Likelihood</div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-800 h-2 rounded-full mr-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <span className="text-gray-400 text-sm">{factor.likelihood}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400 mb-1">Current Controls</div>
                  <div className="text-white">{factor.controls}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'related' && (
        <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
          <h3 className="text-white font-medium mb-4">Related Items</h3>
          <p className="text-gray-400 mb-4">Tasks, violations, and audits connected to this assessment</p>
          
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <TabsList className="bg-[#1a1f29] w-full p-0">
              <TabsTrigger value="tasks" className="flex-1 text-sm">Tasks</TabsTrigger>
              <TabsTrigger value="violations" className="flex-1 text-sm">Violations</TabsTrigger>
              <TabsTrigger value="audits" className="flex-1 text-sm">Audits</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {activeSection === 'tasks' && (
            <div className="space-y-4 mt-4">
              {mockAssessment.tasks.map((task) => (
                <div key={task.id} className="bg-[#1a1f29] p-4 rounded-md border border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-white font-medium">{task.title}</h4>
                      <div className="flex items-center text-sm mt-1">
                        <span className="text-gray-400 mr-1">Priority:</span>
                        <span className={`font-medium ${task.priority === 'High' ? 'text-red-400' : task.priority === 'Medium' ? 'text-yellow-400' : 'text-blue-400'}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <span className="text-gray-400 mr-1">Assigned to:</span>
                        <span className="text-white">{task.assignee}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-gray-400 text-sm mb-1">Due: {task.dueDate}</span>
                      <span className={`px-2 py-0.5 text-xs rounded ${task.status === 'Completed' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeSection === 'violations' && (
            <div className="space-y-4 mt-4">
              {mockAssessment.violations.map((violation) => (
                <div key={violation.id} className="bg-[#1a1f29] p-4 rounded-md border border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-white font-medium">{violation.title}</h4>
                      <div className="flex items-center text-sm mt-1">
                        <span className="text-gray-400 mr-1">Regulation:</span>
                        <span className="text-white">{violation.regulation}</span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <span className="text-gray-400 mr-1">Location:</span>
                        <span className="text-white">{violation.location}</span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <span className="text-gray-400 mr-1">Detected:</span>
                        <span className="text-white">{violation.detected}</span>
                      </div>
                    </div>
                    <div>
                      <span className={`px-2 py-0.5 text-xs rounded ${violation.severity === 'Critical' ? 'bg-red-500' : 'bg-orange-500'} text-white`}>
                        {violation.severity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeSection === 'audits' && (
            <div className="space-y-4 mt-4">
              {mockAssessment.audits.map((audit) => (
                <div key={audit.id} className="bg-[#1a1f29] p-4 rounded-md border border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-medium">{audit.title}</h4>
                    <span className="px-2 py-0.5 text-xs rounded bg-green-500 text-white">
                      {audit.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-400">Findings: {audit.findings}</div>
                    <div className="text-gray-400">Date: {audit.date}</div>
                    <div className="text-gray-400">Compliance: {audit.compliance}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'mitigation' && (
        <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
          <h3 className="text-white font-medium mb-4">Mitigation Actions</h3>
          <p className="text-gray-400">Actions to address identified risks and hazards.</p>
          
          {mockAssessment.tasks.length > 0 ? (
            <div className="space-y-4 mt-6">
              {mockAssessment.tasks.map((task) => (
                <div key={task.id} className="bg-[#1a1f29] p-4 rounded-md border border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-white font-medium">{task.title}</h4>
                      <div className="flex items-center text-sm mt-1">
                        <span className="text-gray-400 mr-1">Priority:</span>
                        <span className={`font-medium ${task.priority === 'High' ? 'text-red-400' : task.priority === 'Medium' ? 'text-yellow-400' : 'text-blue-400'}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <span className="text-gray-400 mr-1">Assigned to:</span>
                        <span className="text-white">{task.assignee}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-gray-400 text-sm mb-1">Due: {task.dueDate}</span>
                      <span className={`px-2 py-0.5 text-xs rounded ${task.status === 'Completed' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500">
              No mitigation actions have been added yet.
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'documents' && (
        <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
          <h3 className="text-white font-medium mb-4">Documents & Attachments</h3>
          <p className="text-gray-400">Photos, documents, and other files related to this assessment.</p>
          
          <div className="py-10 text-center text-gray-500">
            No documents or attachments have been added yet.
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentDetails;
