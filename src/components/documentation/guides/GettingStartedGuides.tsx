
import React, { useMemo } from 'react';
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  CheckSquare, 
  FileQuestion, 
  BarChart2 
} from 'lucide-react';
import GuideCard from './GuideCard';

interface GettingStartedGuidesProps {
  searchQuery?: string;
}

const GettingStartedGuides = ({ searchQuery = '' }: GettingStartedGuidesProps) => {
  const guides = [
    {
      icon: <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Setting Up Your Thalos Account",
      description: "Learn how to create and configure your Thalos account for your organization.",
      category: "Basics",
      difficulty: "Beginner",
      timeToComplete: "10 min",
      updatedDate: "July 2025"
    },
    {
      icon: <Users className="h-6 w-6 text-green-600 dark:text-green-400" />,
      title: "Inviting Team Members",
      description: "How to add users to your organization and manage their permissions.",
      category: "Basics",
      difficulty: "Beginner",
      timeToComplete: "5 min",
      updatedDate: "July 2025"
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      title: "Your First Violation Analysis",
      description: "Step-by-step guide to analyzing your first safety violation with AI.",
      category: "Basics",
      difficulty: "Beginner",
      timeToComplete: "15 min",
      updatedDate: "June 2025"
    },
    {
      icon: <CheckSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: "Creating and Assigning Tasks",
      description: "Learn how to create, assign, and track safety remediation tasks.",
      category: "Basics",
      difficulty: "Beginner",
      timeToComplete: "10 min",
      updatedDate: "June 2025"
    },
    {
      icon: <FileQuestion className="h-6 w-6 text-red-600 dark:text-red-400" />,
      title: "Conducting a Risk Assessment",
      description: "How to use templates to perform comprehensive risk assessments.",
      category: "Basics",
      difficulty: "Intermediate",
      timeToComplete: "20 min",
      updatedDate: "May 2025"
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Accessing Reports and Analytics",
      description: "Guide to viewing and interpreting safety analytics and reports.",
      category: "Basics",
      difficulty: "Beginner",
      timeToComplete: "10 min",
      updatedDate: "May 2025"
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
        <p className="text-muted-foreground">No getting started guides match your search criteria.</p>
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
        />
      ))}
    </div>
  );
};

export default GettingStartedGuides;
