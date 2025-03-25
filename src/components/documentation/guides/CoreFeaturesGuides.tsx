
import React, { useMemo } from 'react';
import GuideCard from './GuideCard';
import { Shield, BarChart, Bell, Cog, PenTool } from 'lucide-react';

interface CoreFeaturesGuidesProps {
  searchQuery?: string;
}

const CoreFeaturesGuides = ({ searchQuery = '' }: CoreFeaturesGuidesProps) => {
  const guides = [
    {
      title: "AI Safety Compliance Monitoring",
      description: "Learn how to implement real-time safety compliance monitoring with Thalos.",
      icon: <Shield className="h-4 w-4" />,
      level: "Intermediate" as const,
      time: "15 min read",
      author: "Thalos Team"
    },
    {
      title: "Advanced Analytics and Reporting",
      description: "Discover how to generate insightful safety analytics and compliance reports.",
      icon: <BarChart className="h-4 w-4" />,
      level: "Advanced" as const,
      time: "20 min read",
      author: "Thalos Team"
    },
    {
      title: "Setting Up Alert Systems",
      description: "Configure automated alerts for safety violations and incidents.",
      icon: <Bell className="h-4 w-4" />,
      level: "Intermediate" as const,
      time: "12 min read",
      author: "Thalos Team"
    },
    {
      title: "Custom Safety Rule Configuration",
      description: "Learn to create and implement custom safety rules tailored to your industry.",
      icon: <Cog className="h-4 w-4" />,
      level: "Advanced" as const,
      time: "25 min read",
      author: "Thalos Team"
    },
    {
      title: "Safety Model Customization",
      description: "Customize AI safety models to meet your specific requirements.",
      icon: <PenTool className="h-4 w-4" />,
      level: "Advanced" as const,
      time: "30 min read",
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

export default CoreFeaturesGuides;
