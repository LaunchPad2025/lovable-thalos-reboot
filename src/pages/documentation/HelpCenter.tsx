import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  FileText, 
  Video, 
  BookOpen, 
  HelpCircle, 
  Mail, 
  ArrowRight,
  MessageSquare,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HelpCenter = () => {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Help Center" 
          subtitle="Find answers to your questions about Thalos"
          className="mb-8"
        />
        
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">How can we help you?</h2>
          <div className="flex items-center max-w-xl mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Search for help topics..." 
                className="pl-10"
              />
            </div>
            <Button className="ml-4">Search</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader className="pb-3">
              <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Guides to help you set up and use Thalos</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Guides</Button>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader className="pb-3">
              <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Video className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Step-by-step video guides for Thalos features</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Watch Tutorials</Button>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader className="pb-3">
              <div className="mx-auto bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 text-amber-600 dark:text-amber-400" />
              </div>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Detailed documentation for all features</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Open Documentation</Button>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader className="pb-3">
              <div className="mx-auto bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Mail className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Contact Us</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to common questions about Thalos</p>
          </div>
          
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Accordion type="single" collapsible className="w-full">
                <FaqItem
                  question="What is Thalos?"
                  answer="Thalos is an AI-powered safety compliance platform that helps organizations identify, track, and remediate workplace safety issues. Our solution combines computer vision, task management, and analytics to create a comprehensive safety management system."
                />
                
                <FaqItem
                  question="Who is Thalos designed for?"
                  answer="Thalos is designed for safety managers, compliance officers, and operations leaders in industries with significant safety requirements, such as construction, manufacturing, healthcare, and logistics. Organizations of all sizes can benefit from our scalable platform."
                />
                
                <FaqItem
                  question="How does Thalos help with safety compliance?"
                  answer="Thalos helps with safety compliance by automatically detecting safety violations in images and video, creating and tracking remediation tasks, providing risk assessment tools, and generating compliance reports. The platform keeps all your safety data in one place and provides insights to improve your safety program."
                />
                
                <FaqItem
                  question="Is Thalos available in my country?"
                  answer="Thalos is available globally, with primary support in North America, Europe, Australia, and parts of Asia. Our platform complies with regional data privacy regulations, including GDPR in Europe. Contact us for specific availability information for your region."
                />
                
                <FaqItem
                  question="How can I get started with Thalos?"
                  answer="You can get started with Thalos by requesting a demo through our website or contacting our sales team. We'll set up a personalized demonstration and help you determine the right plan for your organization. Once you've subscribed, our onboarding team will guide you through the setup process."
                />
              </Accordion>
            </TabsContent>
            
            <TabsContent value="account">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Account FAQ section coming soon.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="features">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Features FAQ section coming soon.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="billing">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Billing FAQ section coming soon.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="technical">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Technical FAQ section coming soon.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                  <MessageSquare className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <CardTitle className="mb-2">Chat with Paulie</CardTitle>
                  <CardDescription>
                    Get instant answers to your questions from our AI safety assistant
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Available 24/7</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Answers about safety regulations and procedures</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Platform usage guidance</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-yellow-600 hover:bg-yellow-700">
                Chat with Paulie <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <HelpCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="mb-2">Contact Human Support</CardTitle>
                  <CardDescription>
                    Get personalized assistance from our support team
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Badge className="mr-2" variant="outline">Standard</Badge>
                  <span>Email support with 24-hour response time</span>
                </div>
                <div className="flex items-center">
                  <Badge className="mr-2" variant="outline">Professional</Badge>
                  <span>Email and chat support with 8-hour response time</span>
                </div>
                <div className="flex items-center">
                  <Badge className="mr-2" variant="outline">Enterprise</Badge>
                  <span>Priority support with dedicated account manager</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-6">
                Submit Support Ticket <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="mr-4 p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">System Status</h3>
              <p className="text-muted-foreground">All systems operational</p>
            </div>
            
            <Button variant="link" className="ml-auto">View Status Page</Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatusCard service="API Services" status="operational" />
            <StatusCard service="Web Application" status="operational" />
            <StatusCard service="Mobile App" status="operational" />
            <StatusCard service="AI Processing" status="issues" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

const FaqItem = ({ question, answer }: { question: string; answer: string }) => (
  <AccordionItem value={question.replace(/\s+/g, '-').toLowerCase()}>
    <AccordionTrigger className="text-left font-medium">{question}</AccordionTrigger>
    <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
  </AccordionItem>
);

const StatusCard = ({ service, status }: { service: string; status: 'operational' | 'issues' | 'outage' }) => {
  const statusConfig = {
    operational: {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: 'Operational',
      color: 'text-green-500'
    },
    issues: {
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      text: 'Minor Issues',
      color: 'text-amber-500'
    },
    outage: {
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      text: 'Outage',
      color: 'text-red-500'
    }
  };

  const { icon, text, color } = statusConfig[status];

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex flex-col justify-center items-center text-center">
        <div className="mb-2">{service}</div>
        <div className={`flex items-center ${color}`}>
          {icon}
          <span className="ml-1 text-sm">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
