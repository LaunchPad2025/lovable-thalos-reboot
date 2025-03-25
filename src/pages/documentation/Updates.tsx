
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
          {/* July 2025 Updates */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-2xl font-bold">July 2025</h2>
              <Separator className="flex-1" />
            </div>
            
            <div className="space-y-8">
              <UpdateItem 
                date="July 15, 2025"
                title="Enhanced AI Violation Detection"
                type="feature"
                description="We've improved our AI violation detection models with better accuracy and support for more PPE types and safety scenarios."
                bulletPoints={[
                  "15% improvement in detection accuracy for construction PPE",
                  "Added support for specialized healthcare PPE detection",
                  "Improved low-light detection capabilities",
                  "Reduced false positives by 23%"
                ]}
              />
              
              <UpdateItem 
                date="July 8, 2025"
                title="Task Management Improvements"
                type="improvement"
                description="We've enhanced the task management system with new filtering options and bulk actions."
                bulletPoints={[
                  "Added bulk task assignment and status updates",
                  "New filtering options by location and department",
                  "Task templates for common remediation actions",
                  "Improved performance for organizations with many tasks"
                ]}
              />
              
              <UpdateItem 
                date="July 3, 2025"
                title="Bug Fixes and Stability Improvements"
                type="bug"
                description="This release addresses several bug fixes and stability improvements."
                bulletPoints={[
                  "Fixed an issue with report generation timing out for large datasets",
                  "Resolved notification delivery delays for some users",
                  "Fixed mobile view layout issues on task detail screens",
                  "Addressed rare data synchronization issues in offline mode"
                ]}
              />
            </div>
          </div>
          
          {/* June 2025 Updates */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-2xl font-bold">June 2025</h2>
              <Separator className="flex-1" />
            </div>
            
            <div className="space-y-8">
              <UpdateItem 
                date="June 22, 2025"
                title="Introducing Paulie: Your AI Safety Assistant"
                type="feature"
                description="We're excited to introduce Paulie, our AI-powered safety assistant that helps you navigate regulations and compliance requirements."
                bulletPoints={[
                  "Ask questions about safety regulations and get instant answers",
                  "Receive step-by-step guidance for remediation actions",
                  "Access industry-specific compliance information",
                  "Available in chat interface and throughout the platform"
                ]}
              />
              
              <UpdateItem 
                date="June 15, 2025"
                title="New Risk Assessment Templates"
                type="feature"
                description="We've added new industry-specific risk assessment templates to help you identify and mitigate hazards more effectively."
                bulletPoints={[
                  "Construction-specific templates for different project types",
                  "Manufacturing templates for various equipment and processes",
                  "Healthcare-specific templates for infection control and patient safety",
                  "Customizable scoring and prioritization options"
                ]}
              />
              
              <UpdateItem 
                date="June 5, 2025"
                title="Performance Optimizations"
                type="improvement"
                description="We've made significant performance improvements across the platform."
                bulletPoints={[
                  "50% faster image processing for violation detection",
                  "Improved dashboard loading times for large organizations",
                  "Optimized database queries for better report generation",
                  "Reduced memory usage on mobile devices"
                ]}
              />
            </div>
          </div>
          
          {/* May 2025 Updates */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-2xl font-bold">May 2025</h2>
              <Separator className="flex-1" />
            </div>
            
            <div className="space-y-8">
              <UpdateItem 
                date="May 28, 2025"
                title="New Analytics Dashboard"
                type="feature"
                description="We've completely redesigned our analytics dashboard to provide more actionable insights into your safety program."
                bulletPoints={[
                  "Customizable dashboard with drag-and-drop widgets",
                  "New trend analysis tools for violations and incidents",
                  "Comparative reports across sites and time periods",
                  "Export capabilities for regulatory submissions"
                ]}
              />
              
              <UpdateItem 
                date="May 15, 2025"
                title="Mobile App Beta"
                type="feature"
                description="We're launching the beta version of our mobile app for iOS and Android."
                bulletPoints={[
                  "Capture violations and submit reports from the field",
                  "Offline mode for remote worksites",
                  "Task management on the go",
                  "Push notifications for critical alerts"
                ]}
              />
              
              <UpdateItem 
                date="May 7, 2025"
                title="Documentation Improvements"
                type="improvement"
                description="We've expanded our documentation and help resources."
                bulletPoints={[
                  "New getting started guides for different roles",
                  "Expanded API documentation with code examples",
                  "Video tutorials for common tasks",
                  "Updated knowledge base with searchable content"
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
