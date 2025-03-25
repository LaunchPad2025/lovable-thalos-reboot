
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  AlertTriangle, 
  CheckSquare, 
  FileQuestion, 
  BarChart2,
  Shield, 
  Users,
  Database,
  ArrowRight,
  Smartphone
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Guides = () => {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Guides & Resources" 
          subtitle="Step-by-step guides to help you get the most out of Thalos"
          className="mb-12"
        />

        <Tabs defaultValue="getting-started">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="features">Core Features</TabsTrigger>
            <TabsTrigger value="admin">Administration</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="getting-started" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GuideCard
                icon={<Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                title="Setting Up Your Thalos Account"
                description="Learn how to create and configure your Thalos account for your organization."
                category="Basics"
                difficulty="Beginner"
                timeToComplete="10 min"
                updatedDate="July 2025"
              />
              
              <GuideCard
                icon={<Users className="h-6 w-6 text-green-600 dark:text-green-400" />}
                title="Inviting Team Members"
                description="How to add users to your organization and manage their permissions."
                category="Basics"
                difficulty="Beginner"
                timeToComplete="5 min"
                updatedDate="July 2025"
              />
              
              <GuideCard
                icon={<AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
                title="Your First Violation Analysis"
                description="Step-by-step guide to analyzing your first safety violation with AI."
                category="Basics"
                difficulty="Beginner"
                timeToComplete="15 min"
                updatedDate="June 2025"
              />
              
              <GuideCard
                icon={<CheckSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
                title="Creating and Assigning Tasks"
                description="Learn how to create, assign, and track safety remediation tasks."
                category="Basics"
                difficulty="Beginner"
                timeToComplete="10 min"
                updatedDate="June 2025"
              />
              
              <GuideCard
                icon={<FileQuestion className="h-6 w-6 text-red-600 dark:text-red-400" />}
                title="Conducting a Risk Assessment"
                description="How to use templates to perform comprehensive risk assessments."
                category="Basics"
                difficulty="Intermediate"
                timeToComplete="20 min"
                updatedDate="May 2025"
              />
              
              <GuideCard
                icon={<BarChart2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
                title="Accessing Reports and Analytics"
                description="Guide to viewing and interpreting safety analytics and reports."
                category="Basics"
                difficulty="Beginner"
                timeToComplete="10 min"
                updatedDate="May 2025"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GuideCard
                icon={<AlertTriangle className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                title="Advanced Violation Detection"
                description="Master the AI-powered violation detection system for various safety scenarios."
                category="Features"
                difficulty="Intermediate"
                timeToComplete="25 min"
                updatedDate="July 2025"
              />
              
              <GuideCard
                icon={<CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />}
                title="Task Management Best Practices"
                description="Learn advanced task management techniques for safety remediation."
                category="Features"
                difficulty="Intermediate"
                timeToComplete="20 min"
                updatedDate="June 2025"
              />
              
              <GuideCard
                icon={<FileQuestion className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
                title="Creating Custom Risk Assessment Templates"
                description="How to design risk assessment templates tailored to your industry."
                category="Features"
                difficulty="Advanced"
                timeToComplete="30 min"
                updatedDate="June 2025"
              />
              
              <GuideCard
                icon={<BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
                title="Customizing Analytics Dashboards"
                description="Build personalized dashboards to track your most important safety metrics."
                category="Features"
                difficulty="Intermediate"
                timeToComplete="20 min"
                updatedDate="May 2025"
                new={true}
              />
              
              <GuideCard
                icon={<Database className="h-6 w-6 text-red-600 dark:text-red-400" />}
                title="Document Management System"
                description="How to upload, organize, and share safety documentation."
                category="Features"
                difficulty="Beginner"
                timeToComplete="15 min"
                updatedDate="May 2025"
              />
              
              <GuideCard
                icon={<Smartphone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
                title="Mobile App Usage Guide"
                description="Get the most out of the Thalos mobile application for on-site safety management."
                category="Features"
                difficulty="Beginner"
                timeToComplete="15 min"
                updatedDate="July 2025"
                new={true}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="admin">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Administration guides coming soon.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Integration guides coming soon.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="best-practices">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Best practices guides coming soon.</p>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Featured Guides */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Featured Guides</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="h-48 bg-[url('/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png')] bg-cover bg-center"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">Video Tutorial</Badge>
                  <span className="text-sm text-muted-foreground">Updated July 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Complete Guide to AI Safety Compliance</h3>
                <p className="text-muted-foreground mb-4">
                  A comprehensive walkthrough of how to implement an AI-powered safety compliance
                  program using Thalos.
                </p>
                <Button className="w-full">Watch Tutorial</Button>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="h-48 bg-[url('/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png')] bg-cover bg-center"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">Whitepaper</Badge>
                  <span className="text-sm text-muted-foreground">Updated June 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">ROI of Safety Technology Investment</h3>
                <p className="text-muted-foreground mb-4">
                  Research-backed analysis of the return on investment for safety technology
                  implementation across various industries.
                </p>
                <Button className="w-full">Download Whitepaper</Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Industry Guides */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Industry-Specific Guides</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <IndustryGuideCard 
              title="Construction"
              description="Safety compliance guides specific to construction sites"
              imageUrl="/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png"
            />
            
            <IndustryGuideCard 
              title="Manufacturing"
              description="Guides for factory and production environment safety"
              imageUrl="/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png"
            />
            
            <IndustryGuideCard 
              title="Healthcare"
              description="Safety protocols for medical facilities and staff"
              imageUrl="/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png"
            />
            
            <IndustryGuideCard 
              title="Logistics"
              description="Safety guides for warehousing and transportation"
              imageUrl="/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png"
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

interface GuideCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToComplete: string;
  updatedDate: string;
  new?: boolean;
}

const GuideCard = ({ 
  icon, 
  title, 
  description, 
  category, 
  difficulty, 
  timeToComplete, 
  updatedDate,
  new: isNew = false
}: GuideCardProps) => {
  const difficultyColor = 
    difficulty === 'Beginner' ? 'text-green-500' :
    difficulty === 'Intermediate' ? 'text-amber-500' : 'text-red-500';

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="p-2 bg-muted rounded-full">
            {icon}
          </div>
          {isNew && (
            <Badge className="ml-auto" variant="success">New</Badge>
          )}
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted p-2 rounded-md text-center">
            <span className="block text-muted-foreground">Category</span>
            <span>{category}</span>
          </div>
          <div className="bg-muted p-2 rounded-md text-center">
            <span className="block text-muted-foreground">Difficulty</span>
            <span className={difficultyColor}>{difficulty}</span>
          </div>
          <div className="bg-muted p-2 rounded-md text-center">
            <span className="block text-muted-foreground">Time</span>
            <span>{timeToComplete}</span>
          </div>
          <div className="bg-muted p-2 rounded-md text-center">
            <span className="block text-muted-foreground">Updated</span>
            <span>{updatedDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          View Guide <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

interface IndustryGuideCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const IndustryGuideCard = ({ title, description, imageUrl }: IndustryGuideCardProps) => (
  <Card className="overflow-hidden">
    <div className="h-36 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
    <CardHeader className="pb-2">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button variant="ghost" className="w-full justify-between">
        Explore Guides <ArrowRight className="h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
);

export default Guides;
