
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ArrowDownToLine, RefreshCw } from 'lucide-react';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import DemoCard from '../DemoCard';

interface ReportsSectionProps {
  onShowFeatureInfo: () => void;
  onItemSelect: (item: any) => void;
}

// Mock data for charts
const complianceTrendData = [
  { month: 'Jan 1', compliance: 100, violations: 0 },
  { month: 'Feb 1', compliance: 100, violations: 0 },
  { month: 'Mar 1', compliance: 80, violations: 2 },
  { month: 'Apr 1', compliance: 100, violations: 0 },
];

const mediaTypeData = [
  { name: 'image', value: 40, fill: '#2563eb' },
  { name: 'enhanced_image', value: 53, fill: '#4ade80' },
  { name: 'smart_risk_analysis', value: 5, fill: '#3e76e6' },
  { name: 'enhanced_visual_analysis', value: 2, fill: '#f97316' },
];

const tasksByPriorityData = [
  { name: 'low', value: 0 },
  { name: 'medium', value: 4 },
  { name: 'high', value: 1 },
];

const ReportsSection = ({ onShowFeatureInfo }: ReportsSectionProps) => {
  const [activeTab, setActiveTab] = useState('compliance');

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Safety Reports</h2>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <ArrowDownToLine className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-transparent w-full grid grid-cols-4 p-0 h-10">
          <TabsTrigger
            value="compliance"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            Compliance
          </TabsTrigger>
          <TabsTrigger
            value="violations"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Violations
          </TabsTrigger>
          <TabsTrigger
            value="tasks"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            </svg>
            Tasks
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            Media
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Report Options */}
      <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6 mb-6">
        <h3 className="font-medium text-white mb-3">Report Options</h3>
        <p className="text-gray-400 text-sm mb-4">Customize your report by choosing filter options</p>
        
        {activeTab === 'compliance' && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Time Period:</span>
            <div className="relative inline-block w-48">
              <select 
                className="block appearance-none w-full bg-[#161b22] border border-gray-800 text-white py-2 px-3 pr-8 rounded leading-tight focus:outline-none"
              >
                <option>Last Month</option>
                <option>Last Week</option>
                <option>Last Quarter</option>
                <option>Last Year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'media' && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Media Type:</span>
            <div className="relative inline-block w-48">
              <select 
                className="block appearance-none w-full bg-[#161b22] border border-gray-800 text-white py-2 px-3 pr-8 rounded leading-tight focus:outline-none"
              >
                <option>All media</option>
                <option>Images</option>
                <option>Video</option>
                <option>Audio</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'tasks' && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Task Status:</span>
            <div className="relative inline-block w-48">
              <select 
                className="block appearance-none w-full bg-[#161b22] border border-gray-800 text-white py-2 px-3 pr-8 rounded leading-tight focus:outline-none"
              >
                <option>All statuses</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>In Progress</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'violations' && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Date Range:</span>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Pick a start date
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Pick an end date
            </Button>
          </div>
        )}
      </div>

      {/* Report Header */}
      <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6 mb-6">
        {activeTab === 'compliance' && (
          <>
            <h3 className="font-medium text-white mb-1">Compliance Score Report</h3>
            <p className="text-gray-400 text-sm mb-3">Safety compliance analysis over the selected month period</p>
            
            <div className="flex justify-between text-sm text-gray-400">
              <div>Report Period: Mar 1, 2025 - Apr 1, 2025</div>
              <div>Generated: Apr 1, 2025, 3:34 PM</div>
              <div>Data Sources: 67 items</div>
            </div>
          </>
        )}
        
        {activeTab === 'media' && (
          <>
            <h3 className="font-medium text-white mb-1">Media Analysis Report</h3>
            <p className="text-gray-400 text-sm mb-3">Analysis of media uploads and violation detection performance</p>
            
            <div className="flex justify-between text-sm text-gray-400">
              <div>Report Period: Mar 29, 2025 - Apr 1, 2025</div>
              <div>Generated: Apr 1, 2025, 3:35 PM</div>
              <div>Data Sources: 62 items</div>
            </div>
          </>
        )}
        
        {activeTab === 'tasks' && (
          <>
            <h3 className="font-medium text-white mb-1">Task Management Report</h3>
            <p className="text-gray-400 text-sm mb-3">Analysis of safety remediation tasks and their completion status</p>
            
            <div className="flex justify-between text-sm text-gray-400">
              <div>Report Period: Mar 31, 2025 - Apr 1, 2025</div>
              <div>Generated: Apr 1, 2025, 3:35 PM</div>
              <div>Data Sources: 5 items</div>
            </div>
          </>
        )}
        
        {activeTab === 'violations' && (
          <>
            <h3 className="font-medium text-white mb-1">Violation Analysis Report</h3>
            <p className="text-gray-400 text-sm mb-3">Detailed breakdown of safety violations by type, severity, and regulation</p>
            
            <div className="flex justify-between text-sm text-gray-400">
              <div>Report Period: Mar 1, 2025 - Apr 1, 2025</div>
              <div>Generated: Apr 1, 2025, 3:34 PM</div>
              <div>Data Sources: 62 items</div>
            </div>
          </>
        )}
      </div>

      {/* Report Content */}
      {activeTab === 'compliance' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
              <h3 className="font-medium text-white mb-2">Compliance Score</h3>
              <p className="text-gray-400 text-sm mb-6">Overall safety compliance percentage</p>
              
              <div className="flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-white mb-2">80%</div>
                <div className="text-gray-400 text-sm">4 of 5 tasks completed</div>
              </div>
            </div>
            
            <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
              <h3 className="font-medium text-white mb-2">Violation Severity</h3>
              <p className="text-gray-400 text-sm mb-6">Distribution by risk level</p>
              
              <div className="flex items-center justify-center h-32">
                <p className="text-gray-400">No violations detected in this period</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6 mb-6">
            <h3 className="font-medium text-white mb-2">Compliance Trend</h3>
            <p className="text-gray-400 text-sm mb-4">Score trends over time</p>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={complianceTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis domain={[0, 100]} stroke="#64748b" />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Line type="monotone" dataKey="compliance" stroke="#3b82f6" strokeWidth={2} name="Compliance Score %" />
                  <Line type="monotone" dataKey="violations" stroke="#ef4444" strokeWidth={2} name="Violations" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
      
      {activeTab === 'media' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
              <h3 className="font-medium text-white mb-2">Media Analysis</h3>
              <p className="text-gray-400 text-sm mb-6">Analysis processing statistics</p>
              
              <div className="flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-white mb-2">62</div>
                <div className="text-gray-400 text-sm">54 successful, 8 failed</div>
                <div className="text-blue-400 text-sm">87% success rate</div>
              </div>
            </div>
            
            <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
              <h3 className="font-medium text-white mb-2">Media Types</h3>
              <p className="text-gray-400 text-sm mb-6">Distribution by media format</p>
              
              <div className="flex items-center justify-center">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={mediaTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mediaTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#2563eb] rounded-full mr-1"></div>
                  <span className="text-xs text-gray-400">image: 40%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#4ade80] rounded-full mr-1"></div>
                  <span className="text-xs text-gray-400">enhanced_image: 53%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#3e76e6] rounded-full mr-1"></div>
                  <span className="text-xs text-gray-400">smart_risk_analysis: 5%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#f97316] rounded-full mr-1"></div>
                  <span className="text-xs text-gray-400">enhanced_visual_analysis: 2%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6 mb-6">
            <h3 className="font-medium text-white mb-2">Violation Detection Performance</h3>
            <p className="text-gray-400 text-sm mb-4">Detection rate across media types</p>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={complianceTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis domain={[0, 5]} stroke="#64748b" />
                  <ChartTooltip />
                  <Line type="monotone" dataKey="violations" stroke="#3b82f6" strokeWidth={2} name="Violations Detected" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
      
      {activeTab === 'tasks' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
              <h3 className="font-medium text-white mb-2">Task Summary</h3>
              <p className="text-gray-400 text-sm mb-6">Current tasks by status</p>
              
              <div className="flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-white mb-2">5</div>
                <div className="text-gray-400 text-sm">4 completed, 0 pending, 0 in progress</div>
                <div className="text-red-400 text-sm">0 tasks overdue</div>
              </div>
            </div>
            
            <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
              <h3 className="font-medium text-white mb-2">Completion Rate</h3>
              <p className="text-gray-400 text-sm mb-6">Task completion percentage</p>
              
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#1e293b" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      strokeDasharray={`${80 * 2.83} 283`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl font-bold text-white">80%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6 mb-6">
            <h3 className="font-medium text-white mb-2">Tasks by Priority</h3>
            <p className="text-gray-400 text-sm mb-4">Distribution by urgency level</p>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tasksByPriorityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis domain={[0, 5]} stroke="#64748b" />
                  <ChartTooltip />
                  <Bar dataKey="value" fill="#3b82f6" name="Tasks" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
      
      {activeTab === 'violations' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
              <h3 className="font-medium text-white mb-2">Violation Summary</h3>
              <p className="text-gray-400 text-sm mb-6">Total violations detected</p>
              
              <div className="flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-white mb-2">0</div>
                <div className="text-gray-400 text-sm">From 62 analyses</div>
              </div>
            </div>
            
            <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6">
              <h3 className="font-medium text-white mb-2">Severity Distribution</h3>
              <p className="text-gray-400 text-sm mb-6">Violations by risk level</p>
              
              <div className="flex items-center justify-center h-32">
                <p className="text-gray-400">No violations detected in this period</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-6 mb-6">
            <h3 className="font-medium text-white mb-2">Top Violated Regulations</h3>
            <p className="text-gray-400 text-sm mb-4">Most frequently violated safety regulations</p>
            
            <div className="h-72 flex items-center justify-center">
              <p className="text-gray-400">No violations detected in this period</p>
            </div>
          </div>
        </>
      )}

      <DemoCard message="You're viewing simulated data for demonstration purposes" />
    </div>
  );
};

export default ReportsSection;
