
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, MapPin, BadgeCheck, GraduationCap, Heart, Check, BookOpen, Users, Coffee } from 'lucide-react';

const Careers = () => {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Join Our Team" 
          subtitle="Build technology that helps save lives and prevent workplace injuries"
          className="mb-12"
        />
        
        {/* Hero Section */}
        <div className="relative mb-16 overflow-hidden rounded-xl border border-border z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/30 z-10"></div>
          <div className="bg-[url('/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png')] bg-cover bg-center h-96"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Make an impact with your work</h2>
            <p className="text-white/80 mb-6 max-w-2xl text-lg">
              At Steel Toe Technologies, we're building AI-powered safety solutions that help organizations
              protect their most valuable asset: their people.
            </p>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="mb-16 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">Our Culture</Badge>
            <h2 className="text-3xl font-bold mb-4">What makes us different</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're building a team united by our mission and guided by our core values
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Mission-Driven</CardTitle>
                <CardDescription>
                  Every line of code we write and every feature we build has the potential to prevent injuries
                  and save lives. Our work has real-world impact.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Continuous Learning</CardTitle>
                <CardDescription>
                  We're tackling complex problems at the intersection of AI, safety, and enterprise software.
                  We value curiosity and provide resources for professional growth.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle>Work-Life Balance</CardTitle>
                <CardDescription>
                  We believe in sustainable growth and prioritize the wellbeing of our team.
                  Flexible work arrangements help our team thrive both personally and professionally.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="mb-16 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">Benefits</Badge>
            <h2 className="text-3xl font-bold mb-4">What we offer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive benefits designed to support you and your family
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <BenefitItem
                icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
                title="Competitive Compensation"
                description="Salary packages that recognize your skills and experience"
              />
              
              <BenefitItem
                icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
                title="Health & Wellness"
                description="Comprehensive medical, dental, and vision coverage for you and your dependents"
              />
              
              <BenefitItem
                icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
                title="Retirement Planning"
                description="401(k) plan with company matching to help you save for the future"
              />
              
              <BenefitItem
                icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
                title="Generous PTO"
                description="Flexible vacation policy plus paid holidays and sick leave"
              />
            </div>
            
            <div className="space-y-4">
              <BenefitItem
                icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
                title="Remote-Friendly"
                description="Work from home options with periodic team gatherings"
              />
              
              <BenefitItem
                icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
                title="Professional Development"
                description="Learning stipend and dedicated time for skill development"
              />
              
              <BenefitItem
                icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
                title="Parental Leave"
                description="Paid leave for all new parents to bond with their children"
              />
              
              <BenefitItem
                icon={<BadgeCheck className="h-5 w-5 text-green-500" />}
                title="Company Equity"
                description="Stock options so you can share in our success"
              />
            </div>
          </div>
        </div>
        
        {/* Life at Steel Toe */}
        <div className="mb-16 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">Team Life</Badge>
            <h2 className="text-3xl font-bold mb-4">Life at Steel Toe</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What you can expect when you join our team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-[url('/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png')] bg-cover bg-center"></div>
              <CardContent className="pt-6">
                <div className="flex items-center mb-2">
                  <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-bold">Learning Together</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Regular knowledge sharing sessions and book clubs to grow our expertise
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-48 bg-[url('/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png')] bg-cover bg-center"></div>
              <CardContent className="pt-6">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-bold">Team Retreats</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Annual company gatherings to connect, collaborate, and celebrate our achievements
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-48 bg-[url('/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png')] bg-cover bg-center"></div>
              <CardContent className="pt-6">
                <div className="flex items-center mb-2">
                  <Coffee className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-bold">Social Impact</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Volunteer opportunities and donation matching to support causes we care about
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button variant="outline">See More Team Photos</Button>
          </div>
        </div>
        
        {/* Open Positions - Replaced with notice */}
        <div className="mb-16 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">Join Us</Badge>
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold mb-4">We don't have any open positions at this time</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              While we don't have any open roles currently, we're always interested in connecting with talented 
              individuals who are passionate about workplace safety and technology. Please check back later for 
              future opportunities.
            </p>
            <Button variant="outline">Submit Your Resume</Button>
          </div>
        </div>
        
        {/* Recruiting Process */}
        <div className="relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">Our Process</Badge>
            <h2 className="text-3xl font-bold mb-4">Our Recruiting Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What to expect when you apply to Steel Toe Technologies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ProcessStep
              number="01"
              title="Application Review"
              description="Our recruiting team reviews your application and resume"
            />
            
            <ProcessStep
              number="02"
              title="Initial Interview"
              description="A 30-minute call with a recruiter to discuss your experience and interests"
            />
            
            <ProcessStep
              number="03"
              title="Technical/Skills Assessment"
              description="Role-specific assessment to evaluate your expertise"
            />
            
            <ProcessStep
              number="04"
              title="Team Interviews"
              description="Meet with future teammates and leaders to ensure mutual fit"
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitItem = ({ icon, title, description }: BenefitItemProps) => (
  <div className="flex items-start p-4 bg-card border border-border rounded-lg">
    <div className="mr-3 mt-0.5">{icon}</div>
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

const ProcessStep = ({ number, title, description }: ProcessStepProps) => (
  <div className="text-center p-6 bg-card border border-border rounded-lg">
    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold mx-auto mb-4">
      {number}
    </div>
    <h3 className="font-bold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default Careers;
