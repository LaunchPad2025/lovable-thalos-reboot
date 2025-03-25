
import React, { useMemo } from 'react';
import GuideCard from './GuideCard';
import { Code, BookOpen, FileText, Video, PenTool } from 'lucide-react';

interface GettingStartedGuidesProps {
  searchQuery?: string;
}

const GettingStartedGuides = ({ searchQuery = '' }: GettingStartedGuidesProps) => {
  const guides = [
    {
      title: "Setting Up Your Thalos Account",
      description: "Learn how to create and configure your Thalos account for optimal use.",
      icon: <FileText className="h-4 w-4" />,
      level: "Beginner" as const,
      time: "5 min read",
      author: "Thalos Team"
    },
    {
      title: "Installation Guide for Thalos Platform",
      description: "Step-by-step instructions for installing Thalos in your environment.",
      icon: <Code className="h-4 w-4" />,
      level: "Beginner" as const,
      time: "10 min read",
      author: "Thalos Team"
    },
    {
      title: "Understanding the Dashboard",
      description: "A comprehensive tour of the Thalos dashboard and its features.",
      icon: <BookOpen className="h-4 w-4" />,
      level: "Beginner" as const,
      time: "8 min read",
      author: "Thalos Team"
    },
    {
      title: "Quick Start Video Tutorial",
      description: "Watch our video guide to get up and running with Thalos in minutes.",
      icon: <Video className="h-4 w-4" />,
      level: "Beginner" as const,
      time: "12 min video",
      author: "Thalos Team"
    },
    {
      title: "Configuring Your First Safety Model",
      description: "Learn how to set up and configure your first AI safety model in Thalos.",
      icon: <PenTool className="h-4 w-4" />,
      level: "Intermediate" as const,
      time: "15 min read",
      author: "Thalos Team"
    }
  ];

  const filteredGuides = useMemo(() => {
    if (!searchQuery) return guides;
    
    const query = searchQuery.toLowerCase();
    return guides.filter(guide => 
      guide.title.toLowerCase().includes(query) || 
      guide.description.toLowerCase().includes(query) ||
      guide.level.toLowerCase().includes(query) ||
      guide.author.toLowerCase().includes(query)
    );
  }, [guides, searchQuery]);

  const hasResults = filteredGuides.length > 0;

  if (!hasResults && searchQuery) {
    return null; // Hide section if no results match the search
  }
  
  return (
    <div className="space-y-4">
      {filteredGuides.map((guide, index) => (
        <GuideCard
          key={index}
          title={guide.title}
          description={guide.description}
          icon={guide.icon}
          level={guide.level}
          time={guide.time}
          author={guide.author}
        />
      ))}
    </div>
  );
};

export default GettingStartedGuides;
