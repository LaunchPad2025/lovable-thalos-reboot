
import React from 'react';
import { 
  AlertTriangle, 
  CheckSquare, 
  FileQuestion, 
  BarChart2,
  Database,
  Smartphone
} from 'lucide-react';
import GuideCard from './GuideCard';

const CoreFeaturesGuides = () => {
  return (
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
  );
};

export default CoreFeaturesGuides;
