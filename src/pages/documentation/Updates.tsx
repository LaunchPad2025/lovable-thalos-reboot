
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const Updates = () => {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <PageTitle 
          title="Product Updates" 
          subtitle="Stay up to date with the latest improvements to Thalos"
          className="mb-8"
        />
        
        <div className="flex justify-between items-center mb-8">
          <div className="space-x-2">
            <Button variant="outline" size="sm">All Updates</Button>
            <Button variant="outline" size="sm">Features</Button>
            <Button variant="outline" size="sm">Improvements</Button>
            <Button variant="outline" size="sm">Bug Fixes</Button>
          </div>
          
          <Button>Subscribe to Updates</Button>
        </div>

        <div className="space-y-12">
          {/* May 2025 Updates */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-2xl font-bold">May 2025</h2>
              <Separator className="flex-1" />
            </div>
            
            <div className="space-y-8">
              <UpdateItem 
                date="May 25, 2025"
                title="New Guide System and Search Functionality"
                type="feature"
                description="We've launched a new comprehensive guide system and improved search capabilities to help users find resources more easily."
                bulletPoints={[
                  "Added keyword search functionality across all guides and documentation",
                  "Improved guide organization with tabs for different content types",
                  "Created industry-specific guide sections",
                  "Enhanced guide card UI with better readability and visual cues"
                ]}
              />
              
              <UpdateItem 
                date="May 18, 2025"
                title="Dashboard Performance Improvements"
                type="improvement"
                description="We've made significant performance enhancements to the dashboard for faster loading and better user experience."
                bulletPoints={[
                  "Reduced dashboard loading time by 40%",
                  "Optimized data fetching for stats cards and visualizations",
                  "Improved responsive design for various screen sizes",
                  "Enhanced dark mode compatibility"
                ]}
              />
              
              <UpdateItem 
                date="May 10, 2025"
                title="Bug Fixes and UI Refinements"
                type="bug"
                description="This release addresses several UI issues and improves overall stability."
                bulletPoints={[
                  "Fixed alignment issues in the GuideCard component",
                  "Resolved inconsistent styling in dark mode",
                  "Fixed search functionality in documentation pages",
                  "Improved accessibility across the platform"
                ]}
              />
            </div>
          </div>
          
          {/* April 2025 Updates */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-2xl font-bold">April 2025</h2>
              <Separator className="flex-1" />
            </div>
            
            <div className="space-y-8">
              <UpdateItem 
                date="April 28, 2025"
                title="Enhanced AI Safety Model Customization"
                type="feature"
                description="We've expanded our AI safety model customization options to better serve different industries and compliance requirements."
                bulletPoints={[
                  "Added industry-specific model templates for manufacturing, healthcare, and construction",
                  "Introduced new customization parameters for detection sensitivity",
                  "Improved model testing interface with real-time feedback",
                  "Enhanced visualization of safety detection zones"
                ]}
              />
              
              <UpdateItem 
                date="April 15, 2025"
                title="Documentation and Learning Resources Expansion"
                type="feature"
                description="We've significantly expanded our documentation and learning resources to help users get the most out of Thalos."
                bulletPoints={[
                  "Added comprehensive getting started guides for new users",
                  "Created detailed documentation for core features and advanced usage",
                  "Introduced video tutorials for common workflows",
                  "Added downloadable resources and templates"
                ]}
              />
              
              <UpdateItem 
                date="April 5, 2025"
                title="Risk Assessment Module Enhancements"
                type="improvement"
                description="Our risk assessment module has been upgraded with new features and improved usability."
                bulletPoints={[
                  "Added customizable risk assessment templates",
                  "Improved risk scoring algorithms",
                  "Enhanced reporting capabilities with exportable formats",
                  "Integrated risk assessments with violation tracking"
                ]}
              />
            </div>
          </div>
          
          {/* March 2025 Updates */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-2xl font-bold">March 2025</h2>
              <Separator className="flex-1" />
            </div>
            
            <div className="space-y-8">
              <UpdateItem 
                date="March 30, 2025"
                title="Thalos Platform Launch"
                type="feature"
                description="We're excited to announce the official launch of the Thalos safety compliance platform."
                bulletPoints={[
                  "Core AI safety monitoring and violation detection",
                  "Task management system for violation remediation",
                  "Dashboard with real-time safety metrics",
                  "User management and role-based permissions"
                ]}
              />
              
              <UpdateItem 
                date="March 20, 2025"
                title="Mobile Responsive Interface"
                type="feature"
                description="We've ensured that Thalos works seamlessly across all devices with our responsive design."
                bulletPoints={[
                  "Fully responsive dashboard and analytics",
                  "Mobile-optimized violation reporting",
                  "Touch-friendly controls and interfaces",
                  "Consistent experience across desktop and mobile devices"
                ]}
              />
              
              <UpdateItem 
                date="March 10, 2025"
                title="Initial Documentation Release"
                type="improvement"
                description="We've published our initial documentation to help users get started with Thalos."
                bulletPoints={[
                  "Installation and setup guides",
                  "Admin configuration documentation",
                  "API documentation for developers",
                  "Frequently asked questions and troubleshooting"
                ]}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button variant="outline">Load More Updates</Button>
        </div>
      </div>
    </PageContainer>
  );
};

interface UpdateItemProps {
  date: string;
  title: string;
  type: 'feature' | 'improvement' | 'bug';
  description: string;
  bulletPoints: string[];
}

const UpdateItem = ({ date, title, type, description, bulletPoints }: UpdateItemProps) => {
  const badgeVariant = 
    type === 'feature' ? 'success' :
    type === 'improvement' ? 'info' : 'warning';
  
  const badgeText = 
    type === 'feature' ? 'New Feature' :
    type === 'improvement' ? 'Improvement' : 'Bug Fix';

  return (
    <div className="border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center space-x-3 mt-2 sm:mt-0">
          <Badge variant={badgeVariant}>{badgeText}</Badge>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <ul className="space-y-2">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Updates;
