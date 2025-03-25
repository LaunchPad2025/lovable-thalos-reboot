
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Users, Target, Lightbulb, Timer, Award, Globe, Code } from 'lucide-react';

const AboutUs = () => {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="About Steel Toe Technologies" 
          subtitle="Creating safer workplaces through innovation and technology"
          className="mb-12"
        />
        
        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <Badge className="mb-4" variant="outline">Our Mission</Badge>
            <h2 className="text-3xl font-bold mb-6">Making safety accessible, manageable, and effortless</h2>
            <p className="text-muted-foreground mb-6">
              "To revolutionize workplace safety across high-risk industries through
              intelligent automation, real-time compliance insights, and AI-
              powered risk prevention — building a safer, smarter world of work."
            </p>
            <p className="text-muted-foreground mb-6">
              Through our flagship product, Thalos, we're empowering safety professionals with the tools they need
              to identify risks, prevent incidents, and maintain compliance with increasingly complex regulations.
            </p>
            <Button>Learn About Thalos</Button>
          </div>
          
          <div className="bg-[url('/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png')] bg-cover bg-center h-80 rounded-lg"></div>
        </div>
        
        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">Our Values</Badge>
            <h2 className="text-3xl font-bold mb-4">What drives us every day</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our core values shape everything we do, from product development to customer interactions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 h-full">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p className="text-muted-foreground">
                We prioritize worker safety above all else, guiding every feature we develop and every decision we make.
              </p>
            </Card>
            
            <Card className="p-6 h-full">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 mb-4">
                <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We constantly push the boundaries of what's possible in safety technology, leveraging AI and data science.
              </p>
            </Card>
            
            <Card className="p-6 h-full">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 mb-4">
                <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Impact</h3>
              <p className="text-muted-foreground">
                We measure our success by the tangible improvements in safety outcomes for our customers.
              </p>
            </Card>
            
            <Card className="p-6 h-full">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-4">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p className="text-muted-foreground">
                We work closely with our customers, treating them as partners in creating safer workplaces.
              </p>
            </Card>
          </div>
        </div>
        
        {/* Story Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">Our Story</Badge>
            <h2 className="text-3xl font-bold mb-4">From vision to reality</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              How we're transforming safety management through technology
            </p>
          </div>
          
          <div className="space-y-8">
            <StoryMilestone 
              year="2025"
              title="The Beginning"
              description="Steel Toe Technologies was founded by a team of safety professionals and AI experts who recognized the need for innovation in workplace safety management."
              icon={<Timer className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
            />
            
            <StoryMilestone 
              year="2026"
              title="Prototype Development"
              description="Our team developed the first prototype of Thalos, focusing on AI-powered violation detection for construction sites."
              icon={<Code className="h-6 w-6 text-green-600 dark:text-green-400" />}
            />
            
            <StoryMilestone 
              year="2027"
              title="Product Launch"
              description="We officially launched Thalos with our core features, serving customers in construction and manufacturing industries."
              icon={<Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
            />
            
            <StoryMilestone 
              year="2028"
              title="Growth & Expansion"
              description="Thalos expanded to new industries including healthcare and logistics, with enhanced AI capabilities and comprehensive compliance tools."
              icon={<Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
              isLast={true}
            />
          </div>
        </div>
        
        {/* Team Section - Hidden for now */}
        
        {/* Contact Section */}
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get in touch with us</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Want to learn more about Steel Toe Technologies and how Thalos can transform your safety program?
            Our team is ready to answer your questions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="w-full sm:w-auto">Contact Sales</Button>
            <Button variant="outline" className="w-full sm:w-auto">Schedule a Demo</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

interface StoryMilestoneProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

const StoryMilestone = ({ year, title, description, icon, isLast = false }: StoryMilestoneProps) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-6">
      <div className="p-3 rounded-full bg-muted">
        {icon}
      </div>
      {!isLast && <div className="h-full w-px bg-border mt-4"></div>}
    </div>
    <div>
      <div className="font-bold text-blue-600 dark:text-blue-400 mb-2">{year}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default AboutUs;
