
import React, { useMemo } from 'react';
import { 
  AlertTriangle, 
  CheckSquare, 
  FileQuestion, 
  BarChart2,
  Database,
  Smartphone
} from 'lucide-react';
import GuideCard from './GuideCard';

interface CoreFeaturesGuidesProps {
  searchQuery?: string;
}

const CoreFeaturesGuides = ({ searchQuery = '' }: CoreFeaturesGuidesProps) => {
  const guides = [
    {
      icon: <AlertTriangle className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Advanced Violation Detection",
      description: "Master the AI-powered violation detection system for various safety scenarios.",
      category: "Features",
      difficulty: "Intermediate",
      timeToComplete: "25 min",
      updatedDate: "July 2025"
    },
    {
      icon: <CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />,
      title: "Task Management Best Practices",
      description: "Learn advanced task management techniques for safety remediation.",
      category: "Features",
      difficulty: "Intermediate",
      timeToComplete: "20 min",
      updatedDate: "June 2025"
    },
    {
      icon: <FileQuestion className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      title: "Creating Custom Risk Assessment Templates",
      description: "How to design risk assessment templates tailored to your industry.",
      category: "Features",
      difficulty: "Advanced",
      timeToComplete: "30 min",
      updatedDate: "June 2025"
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: "Customizing Analytics Dashboards",
      description: "Build personalized dashboards to track your most important safety metrics.",
      category: "Features",
      difficulty: "Intermediate",
      timeToComplete: "20 min",
      updatedDate: "May 2025",
      new: true
    },
    {
      icon: <Database className="h-6 w-6 text-red-600 dark:text-red-400" />,
      title: "Document Management System",
      description: "How to upload, organize, and share safety documentation.",
      category: "Features",
      difficulty: "Beginner",
      timeToComplete: "15 min",
      updatedDate: "May 2025"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Mobile App Usage Guide",
      description: "Get the most out of the Thalos mobile application for on-site safety management.",
      category: "Features",
      difficulty: "Beginner",
      timeToComplete: "15 min",
      updatedDate: "July 2025",
      new: true
    }
  ];

  const filteredGuides = useMemo(() => {
    if (!searchQuery) return guides;
    
    const query = searchQuery.toLowerCase();
    return guides.filter(guide => 
      guide.title.toLowerCase().includes(query) || 
      guide.description.toLowerCase().includes(query) ||
      guide.category.toLowerCase().includes(query) ||
      guide.difficulty.toLowerCase().includes(query)
    );
  }, [guides, searchQuery]);

  const hasResults = filteredGuides.length > 0;

  if (!hasResults) {
    return (
      <div className="text-center py-8 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground">No feature guides match your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredGuides.map((guide, index) => (
        <GuideCard
          key={index}
          icon={guide.icon}
          title={guide.title}
          description={guide.description}
          category={guide.category}
          difficulty={guide.difficulty}
          timeToComplete={guide.timeToComplete}
          updatedDate={guide.updatedDate}
          new={guide.new}
        />
      ))}
    </div>
  );
};

export default CoreFeaturesGuides;
