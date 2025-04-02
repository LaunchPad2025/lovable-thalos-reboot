
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, CheckSquare, FileQuestion, BarChart2, MessageSquare, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <PageTitle 
          title="Thalos Features" 
          subtitle="Comprehensive workplace safety compliance platform powered by multiple AI models"
          className="mb-8"
        />

        <Tabs defaultValue="violation-detection">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
            <TabsTrigger value="violation-detection">Safety Checks</TabsTrigger>
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
                <h3 className="text-xl font-semibold mb-2">AI-Powered Safety Checks</h3>
                <p className="text-muted-foreground mb-4">
                  Our multi-modal detection pipeline combines multiple AI models to identify safety violations in images, video, and audio with industry-leading accuracy.
                  The system can detect PPE compliance, unsafe behaviors, hazardous conditions, and automatically match findings with OSHA standards.
                </p>
                
                <h4 className="font-medium mb-2">Key Capabilities:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                  <li>Multi-modal detection with 8 AI models: OpenAI GPT-4o, DALL-E, and Whisper; Anthropic Claude; HuggingFace BLIP and Transformers; a custom detection model; and our RoBERTa model</li>
                  <li>Support for multiple industries including construction, oil & gas, and utilities & energy</li>
                  <li>Customizable detection parameters based on your specific requirements</li>
                  <li>Automatic regulation matching with OSHA standards</li>
                  <li>AI-powered copilot summary for each analysis</li>
                  <li>Audio transcription and analysis</li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/violations')}
                  className="mt-2"
                >
                  View Demo
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
                  <li>Assignment tracking with email notification system</li>
                  <li>Worksite-specific task organization</li>
                  <li>Photo verification of remediation tasks</li>
                  <li>Integration with risk assessment and compliance reporting</li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/tasks')}
                  className="mt-2"
                >
                  View Demo
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
                  <li>Smart risk analysis with severity and likelihood ratings</li>
                  <li>HIGH/MEDIUM/LOW classification system for risk prioritization</li>
                  <li>Industry-specific risk prioritization for construction, oil & gas, and utilities sectors</li>
                  <li>Control measure recommendations</li>
                  <li>Historical incident analysis</li>
                  <li>Audit trail for compliance documentation</li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/risk-assessment')}
                  className="mt-2"
                >
                  View Demo
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
                  <li>AI Safety Checks dashboard</li>
                  <li>Trend analysis for violations and incidents</li>
                  <li>Regulation-specific compliance tracking</li>
                  <li>Export capabilities in PDF, CSV, and JSON formats</li>
                  <li>Quarterly compliance reporting</li>
                  <li>Automated report generation and distribution</li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/reports')}
                  className="mt-2"
                >
                  View Demo
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
                  <li>Access to comprehensive OSHA regulation database</li>
                  <li>Violation-specific explanations and insights</li>
                  <li>Human-readable summaries of detected violations</li>
                  <li>AI-assisted incident investigation</li>
                  <li>Contextual recommendations based on your specific workplace</li>
                </ul>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={() => navigate('/chatbot')}
                    className="mt-2"
                  >
                    View Demo
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="mt-2"
                    onClick={() => window.location.href = "https://cal.com/annieeser/30min"}
                  >
                    Book a Demo
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mobile" className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="mt-1 p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                <Smartphone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
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
                  <li>Secure login from any device</li>
                  <li>On-site violation reporting</li>
                  <li>Camera integration for violation documentation</li>
                  <li>On-site task management</li>
                  <li>Push notifications for critical alerts</li>
                </ul>
                
                <div className="mt-4 text-muted-foreground italic">
                  <p>Note: Native mobile applications coming soon (currently accessible via responsive web interface)</p>
                </div>
                
                <Button 
                  onClick={() => navigate('/documentation/pricing')}
                  className="mt-2"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Features;
