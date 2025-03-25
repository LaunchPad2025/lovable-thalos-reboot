
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { 
  FileText, 
  BookOpen, 
  HelpCircle, 
  Mail, 
  ArrowRight,
  MessageSquare,
  BookOpenCheck,
  ListChecks,
  Shield,
  FileBarChart,
  Workflow
} from 'lucide-react';
import HelpSearch from '@/components/help-center/HelpSearch';
import HelpCard from '@/components/help-center/HelpCard';
import FaqSection from '@/components/help-center/FaqSection';
import SupportSection from '@/components/help-center/SupportSection';
import SystemStatus from '@/components/help-center/SystemStatus';

const HelpCenter = () => {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Help Center" 
          subtitle="Find answers to your questions about Thalos"
          className="mb-8"
        />
        
        <HelpSearch />
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <HelpCard
            title="Getting Started"
            description="Guides to help you set up and use Thalos"
            icon={<FileText className="h-7 w-7 text-blue-600 dark:text-blue-400" />}
            iconBgClass="bg-blue-100 dark:bg-blue-900/30"
            iconTextClass="text-blue-500"
            items={[
              { 
                icon: <ArrowRight className="h-3.5 w-3.5 mr-2 text-blue-500" />, 
                text: "Introduction to Thalos" 
              },
              { 
                icon: <ArrowRight className="h-3.5 w-3.5 mr-2 text-blue-500" />, 
                text: "Setting up your first account" 
              },
              { 
                icon: <ArrowRight className="h-3.5 w-3.5 mr-2 text-blue-500" />, 
                text: "Navigating the dashboard" 
              },
              { 
                icon: <ArrowRight className="h-3.5 w-3.5 mr-2 text-blue-500" />, 
                text: "Conducting your first safety analysis" 
              }
            ]}
            buttonText="View All Guides"
            onButtonClick={() => {}}
          />
          
          <HelpCard
            title="Documentation"
            description="Detailed documentation for all features"
            icon={<BookOpen className="h-7 w-7 text-amber-600 dark:text-amber-400" />}
            iconBgClass="bg-amber-100 dark:bg-amber-900/30"
            iconTextClass="text-amber-500"
            items={[
              { 
                icon: <BookOpenCheck className="h-3.5 w-3.5 mr-2 text-amber-500" />, 
                text: "AI-powered violation detection" 
              },
              { 
                icon: <ListChecks className="h-3.5 w-3.5 mr-2 text-amber-500" />, 
                text: "Task management system" 
              },
              { 
                icon: <Shield className="h-3.5 w-3.5 mr-2 text-amber-500" />, 
                text: "Risk assessment tools" 
              },
              { 
                icon: <FileBarChart className="h-3.5 w-3.5 mr-2 text-amber-500" />, 
                text: "Compliance reporting" 
              },
              { 
                icon: <Workflow className="h-3.5 w-3.5 mr-2 text-amber-500" />, 
                text: "Integration options" 
              }
            ]}
            buttonText="Open Documentation"
            onButtonClick={() => {}}
          />
          
          <HelpCard
            title="Contact Support"
            description="Get help from our support team"
            icon={<Mail className="h-7 w-7 text-purple-600 dark:text-purple-400" />}
            iconBgClass="bg-purple-100 dark:bg-purple-900/30"
            iconTextClass="text-purple-500"
            items={[
              { 
                icon: <MessageSquare className="h-3.5 w-3.5 mr-2 text-purple-500" />, 
                text: "Chat with Paulie AI assistant" 
              },
              { 
                icon: <Mail className="h-3.5 w-3.5 mr-2 text-purple-500" />, 
                text: "Email: contact@steeltoetech.io" 
              }
            ]}
            buttonText="Contact Us"
            onButtonClick={() => document.getElementById('support-form')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
        
        <FaqSection />
        
        <SupportSection />
        
        <SystemStatus />
      </div>
    </PageContainer>
  );
};

export default HelpCenter;
