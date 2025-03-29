
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, CheckSquare, FileQuestion, BarChart2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <PageTitle 
          title="Thalos Features" 
          subtitle="Comprehensive safety compliance management powered by AI"
          className="mb-8"
        />

        <Tabs defaultValue="violation-detection">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
            <TabsTrigger value="violation-detection">Violation Detection</TabsTrigger>
            <TabsTrigger value="task-management">Task Management</TabsTrigger>
            <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
            <TabsTrigger value="reports">Analytics & Reports</TabsTrigger>
            <TabsTrigger value="copilot">Paulie Copilot</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Access</TabsTrigger>
          </TabsList>

          <TabsContent value="violation-detection" className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="mt-1 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <AlertTriangle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Violation Detection</h3>
                <p className="text-muted-foreground mb-4">
                  Our computer vision models identify safety violations in images and video feeds with industry-leading accuracy. 
                  The system can detect PPE compliance, unsafe behaviors, hazardous conditions, and more.
                </p>
                
                <h4 className="font-medium mb-2">Key Capabilities:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                  <li>Real-time violation detection in images and video</li>
                  <li>Support for multiple industries including construction, manufacturing, and healthcare</li>
                  <li>Customizable detection parameters based on your specific requirements</li>
                  <li>High-accuracy models trained on industry-specific safety scenarios</li>
                  <li>Automatic task creation for violation remediation</li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/violations')}
                  className="mt-2"
                >
                  Explore Violation Detection
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="task-management" className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="mt-1 p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Intelligent Task Management</h3>
                <p className="text-muted-foreground mb-4">
                  Track and manage compliance tasks with ease. Our task management system helps you prioritize, 
                  assign, and track remediation efforts to ensure safety compliance across your organization.
                </p>
                
                <h4 className="font-medium mb-2">Key Capabilities:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                  <li>Automatic task creation from detected violations</li>
                  <li>Task prioritization based on risk level and compliance deadlines</li>
                  <li>Assignment tracking with notification system</li>
                  <li>Progress monitoring and reporting</li>
                  <li>Integration with risk assessment and compliance reporting</li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/tasks')}
                  className="mt-2"
                >
                  Explore Task Management
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="risk-assessment" className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="mt-1 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <FileQuestion className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Risk Assessment</h3>
                <p className="text-muted-foreground mb-4">
                  Identify and mitigate workplace hazards before they lead to incidents. Our risk assessment
                  tools help you evaluate potential risks and implement effective control measures.
                </p>
                
                <h4 className="font-medium mb-2">Key Capabilities:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                  <li>Customizable risk assessment templates by industry</li>
                  <li>AI-assisted hazard identification</li>
                  <li>Risk scoring and prioritization</li>
                  <li>Control measure recommendations</li>
                  <li>Audit trail for compliance documentation</li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/risk-assessment')}
                  className="mt-2"
                >
                  Explore Risk Assessment
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="mt-1 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Analytics & Reporting</h3>
                <p className="text-muted-foreground mb-4">
                  Gain insights into your safety performance with comprehensive analytics and reporting.
                  Track key metrics, identify trends, and demonstrate compliance to stakeholders.
                </p>
                
                <h4 className="font-medium mb-2">Key Capabilities:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                  <li>Customizable dashboards with key safety metrics</li>
                  <li>Trend analysis for violations and incidents</li>
                  <li>Compliance status reporting</li>
                  <li>Export capabilities for regulatory submissions</li>
                  <li>Automated report generation and distribution</li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/reports')}
                  className="mt-2"
                >
                  Explore Analytics & Reports
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="copilot" className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="mt-1 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <MessageSquare className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Paulie: Your AI Safety Assistant</h3>
                <p className="text-muted-foreground mb-4">
                  Get instant answers to your safety and compliance questions with Paulie, our AI-powered
                  safety assistant. Paulie provides guidance on regulations, best practices, and more.
                </p>
                
                <h4 className="font-medium mb-2">Key Capabilities:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                  <li>Instant answers to safety and compliance questions</li>
                  <li>Industry-specific regulatory guidance</li>
                  <li>Step-by-step remediation instructions</li>
                  <li>Contextual recommendations based on your specific workplace</li>
                  <li>Continuous learning from the latest safety standards</li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/chatbot')}
                  className="mt-2"
                >
                  Chat with Paulie
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mobile" className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="mt-1 p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Mobile Access</h3>
                <p className="text-muted-foreground mb-4">
                  Access Thalos from anywhere with our responsive mobile interface. Perform inspections,
                  document violations, and manage tasks directly from your mobile device.
                </p>
                
                <h4 className="font-medium mb-2">Key Capabilities:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                  <li>Fully responsive design for all devices</li>
                  <li>Offline capabilities for field work</li>
                  <li>Camera integration for violation documentation</li>
                  <li>On-site task management</li>
                  <li>Push notifications for critical alerts</li>
                </ul>
                
                <div className="mt-4 text-muted-foreground italic">
                  <p>Note: Mobile application coming soon.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Features;
