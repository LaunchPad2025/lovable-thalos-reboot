
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Clock, 
  FileText, 
  CheckCircle,
  ArrowUpRight,
  BarChart2,
  BrainCircuit
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0f14]">
      <header className="bg-[#0d1117] border-b border-gray-800 p-6">
        <div className="container mx-auto">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 text-sm">Overview of your safety compliance status</p>
            
            <div className="flex mt-4">
              <Tabs defaultValue="personal" className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2 bg-[#161b22]">
                  <TabsTrigger value="personal" className="data-[state=active]:bg-[#1f2937]">
                    My Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="organization" className="data-[state=active]:bg-[#1f2937]">
                    Organization
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-6 space-y-6">
        {/* Free Trial Banner */}
        <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-white font-medium mb-1">Free Trial Mode</h2>
              <p className="text-gray-400 text-sm">Unlock all safety compliance features by upgrading to a paid plan</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-4 md:mt-0">
              View Plans & Upgrade
            </Button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white">Welcome back, Annie Esar!</h2>
          <p className="text-gray-400 text-sm mt-1">Here's an overview of your safety compliance status and tasks</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Compliance Score */}
          <Card className="bg-[#0d1117] border-gray-800 shadow-none text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Compliance Score</span>
              </div>
              
              <div className="mt-4">
                <h3 className="text-3xl font-bold">87%</h3>
                <p className="text-green-500 text-sm mt-1">+5% from last month</p>
              </div>
              
              <p className="text-gray-400 text-sm mt-4">
                Your compliance score is good. Keep up the good work!
              </p>
              
              <div className="w-full h-2 bg-gray-700 rounded-full mt-4">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: "87%" }}></div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="bg-[#0d1117] border-gray-800 shadow-none text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">Upcoming Tasks</span>
              </div>
              
              <div className="mt-4">
                <h3 className="text-3xl font-bold">3</h3>
                <p className="text-yellow-500 text-sm mt-1">2 due soon</p>
              </div>
              
              <div className="flex justify-start mt-10">
                <Button variant="link" className="text-blue-400 p-0 h-auto flex items-center">
                  View all tasks
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card className="bg-[#0d1117] border-gray-800 shadow-none text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="font-medium">Recent Incidents</span>
              </div>
              
              <div className="mt-4">
                <h3 className="text-3xl font-bold">2</h3>
                <p className="text-red-500 text-sm mt-1">This month</p>
              </div>
              
              <div className="flex justify-start mt-10">
                <Button variant="link" className="text-blue-400 p-0 h-auto flex items-center">
                  View incident reports
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Priority Tasks */}
          <Card className="bg-[#0d1117] border-gray-800 shadow-none text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Priority Tasks</h3>
                <div className="text-xs text-gray-400">Limited to 3 <span className="bg-blue-900 text-blue-300 px-2 py-0.5 rounded text-xs ml-1">Free</span></div>
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-gray-800 pb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-white">Update emergency evacuation plan</p>
                      <p className="text-gray-400 text-sm mt-1">Due: 12/19/2023</p>
                    </div>
                    <span className="bg-red-900 text-red-300 px-2 py-1 rounded text-xs h-fit">High</span>
                  </div>
                </div>
                
                <div className="border-b border-gray-800 pb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-white">Complete monthly safety inspection</p>
                      <p className="text-gray-400 text-sm mt-1">Due: 12/14/2023</p>
                    </div>
                    <span className="bg-yellow-900 text-yellow-300 px-2 py-1 rounded text-xs h-fit">Medium</span>
                  </div>
                </div>
                
                <div className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-white">Address hazardous materials storage violation</p>
                      <p className="text-gray-400 text-sm mt-1">Due: 12/17/2023</p>
                    </div>
                    <span className="bg-red-900 text-red-300 px-2 py-1 rounded text-xs h-fit">Critical</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card className="bg-[#0d1117] border-gray-800 shadow-none text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <h3 className="font-medium">Recent Documents</h3>
                </div>
                <div className="text-xs text-gray-400">
                  <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-xs">Pro+</span>
                </div>
              </div>
              
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm mb-4">Document management is available on Professional and Enterprise plans</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Upgrade to Pro
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Features */}
        <Card className="bg-[#0d1117] border-gray-800 shadow-none text-white">
          <CardContent className="p-6">
            <h3 className="font-medium mb-1">Recommended Features</h3>
            <p className="text-gray-400 text-sm mb-4">Upgrade to access these powerful safety compliance tools</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-blue-900 text-blue-300 px-2 py-0.5 rounded text-xs">Pro</span>
                  <span className="text-sm font-medium">Risk Assessment</span>
                </div>
                <p className="text-gray-400 text-sm">Comprehensive risk assessment tools for your entire organization</p>
              </div>
              
              <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-blue-900 text-blue-300 px-2 py-0.5 rounded text-xs">Pro</span>
                  <span className="text-sm font-medium">Advanced Analytics</span>
                </div>
                <p className="text-gray-400 text-sm">Detailed compliance analytics and reporting capabilities</p>
              </div>
              
              <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-purple-900 text-purple-300 px-2 py-0.5 rounded text-xs">Enterprise</span>
                  <span className="text-sm font-medium">AI Remediation</span>
                </div>
                <p className="text-gray-400 text-sm">Automated AI-powered compliance remediation suggestions</p>
              </div>
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Upgrade Your Plan
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
