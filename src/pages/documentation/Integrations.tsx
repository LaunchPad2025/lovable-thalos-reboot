
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Link2, Database, FileText, Calendar, Clock, MessageSquare, Camera, Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Integrations = () => {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Integrations" 
          subtitle="Connect Thalos with your existing tools and systems"
          className="mb-12"
        />

        <Tabs defaultValue="available">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="available">Available Integrations</TabsTrigger>
            <TabsTrigger value="upcoming">Coming Soon</TabsTrigger>
            <TabsTrigger value="api">API Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-8">
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-4">Our API is Ready!</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                While we're still developing direct integrations, our comprehensive API is available now, 
                allowing you to build custom integrations with your existing systems.
              </p>
              <Button onClick={() => document.querySelector('[value="api"]')?.dispatchEvent(new Event('click'))}>
                View API Documentation
              </Button>
            </div>
            
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Custom Integrations</h3>
              <p className="text-muted-foreground mb-4">
                Need to connect Thalos with a specific system? Our team can build custom 
                integrations to meet your unique requirements.
              </p>
              <Button>Contact Our Integration Team</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Database Integrations */}
              <IntegrationCard 
                icon={<Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                title="Database Systems"
                description="Connect to your existing databases to import and export safety data."
                items={['SQL Server', 'Oracle', 'MySQL', 'PostgreSQL']}
                comingSoon={true}
              />
              
              {/* Document Management */}
              <IntegrationCard 
                icon={<FileText className="h-6 w-6 text-green-600 dark:text-green-400" />}
                title="Document Management"
                description="Integrate with document storage and management systems."
                items={['SharePoint', 'Google Drive', 'Dropbox', 'OneDrive']}
                comingSoon={true}
              />
              
              {/* Scheduling */}
              <IntegrationCard 
                icon={<Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
                title="Calendar & Scheduling"
                description="Sync safety audits and tasks with your calendar systems."
                items={['Google Calendar', 'Outlook Calendar', 'iCal']}
                comingSoon={true}
              />
              
              {/* Time Tracking */}
              <IntegrationCard 
                icon={<Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
                title="Time Tracking"
                description="Track time spent on safety tasks and compliance activities."
                items={['Harvest', 'Toggl', 'Clockify']}
                comingSoon={true}
              />
              
              {/* Communication */}
              <IntegrationCard 
                icon={<MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
                title="Communication"
                description="Send safety alerts and notifications through your communication channels."
                items={['Slack', 'Microsoft Teams', 'Email Systems']}
                comingSoon={true}
              />
              
              {/* Notification Systems */}
              <IntegrationCard 
                icon={<Bell className="h-6 w-6 text-red-600 dark:text-red-400" />}
                title="Notification Systems"
                description="Deliver critical safety alerts through multiple channels."
                items={['SMS', 'Email', 'Push Notifications', 'In-app Alerts']}
                comingSoon={true}
              />

              {/* IoT Devices */}
              <IntegrationCard 
                icon={<Camera className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                title="IoT & Sensors"
                description="Connect with IoT devices to monitor workplace safety in real-time."
                items={['Safety Sensors', 'CCTV Systems', 'Wearable Safety Devices', 'Environmental Monitors']}
                comingSoon={true}
              />
              
              {/* HRIS */}
              <IntegrationCard 
                icon={<Database className="h-6 w-6 text-green-600 dark:text-green-400" />}
                title="HR Information Systems"
                description="Sync employee data for training and certification tracking."
                items={['Workday', 'BambooHR', 'ADP', 'Namely']}
                comingSoon={true}
              />
              
              {/* ERP */}
              <IntegrationCard 
                icon={<Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
                title="ERP Systems"
                description="Integrate safety data with your enterprise resource planning."
                items={['SAP', 'Oracle ERP', 'Microsoft Dynamics', 'NetSuite']}
                comingSoon={true}
              />
            </div>
            
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Integration Roadmap</h3>
              <p className="text-muted-foreground mb-4">
                Our team is constantly working on new integrations to enhance the Thalos platform.
                Have a suggestion for our integration roadmap? Let us know!
              </p>
              <Button>Submit Integration Request</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Thalos API</h3>
              <p className="text-muted-foreground mb-6">
                Our comprehensive API allows you to build custom integrations with Thalos. Access safety data,
                trigger workflows, and extend the platform to meet your specific needs.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">API Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>RESTful API architecture</li>
                    <li>OAuth 2.0 authentication</li>
                    <li>Rate-limited endpoints with enterprise tier options</li>
                    <li>Comprehensive documentation and examples</li>
                    <li>Webhook support for real-time notifications</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Available Endpoints:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Violations API - Create, retrieve, and manage safety violations</li>
                    <li>Tasks API - Manage remediation tasks and assignments</li>
                    <li>Risk Assessments API - Create and retrieve risk assessment data</li>
                    <li>Users API - Manage user permissions and access</li>
                    <li>Reports API - Generate and retrieve safety reports</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <Button>API Documentation</Button>
                <Button variant="outline">API Status</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Developer Resources</CardTitle>
                  <CardDescription>Tools and documentation to help you build with Thalos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center">
                      <Link2 className="h-4 w-4 mr-2 text-blue-500" />
                      <span>API Reference Documentation</span>
                    </li>
                    <li className="flex items-center">
                      <Link2 className="h-4 w-4 mr-2 text-blue-500" />
                      <span>SDK Documentation</span>
                    </li>
                    <li className="flex items-center">
                      <Link2 className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Code Examples</span>
                    </li>
                    <li className="flex items-center">
                      <Link2 className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Integration Tutorials</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise API Access</CardTitle>
                  <CardDescription>Advanced API features for enterprise customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center">
                      <Link2 className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Higher rate limits</span>
                    </li>
                    <li className="flex items-center">
                      <Link2 className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Dedicated support</span>
                    </li>
                    <li className="flex items-center">
                      <Link2 className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Custom endpoint development</span>
                    </li>
                    <li className="flex items-center">
                      <Link2 className="h-4 w-4 mr-2 text-blue-500" />
                      <span>SLA guarantees</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

interface IntegrationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  comingSoon?: boolean;
}

const IntegrationCard = ({ icon, title, description, items, comingSoon = false }: IntegrationCardProps) => (
  <Card className={comingSoon ? "border-dashed" : ""}>
    <CardHeader>
      <div className="mb-4 p-2 w-fit rounded-full bg-muted">
        {icon}
      </div>
      <CardTitle className="flex items-center">
        {title}
        {comingSoon && (
          <span className="ml-2 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
            Coming Soon
          </span>
        )}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link2 className="h-4 w-4 mr-2 text-blue-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default Integrations;
