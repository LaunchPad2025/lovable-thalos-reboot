
import React, { useMemo } from 'react';
import FeaturedGuideCard from './FeaturedGuideCard';

interface FeaturedGuidesProps {
  searchQuery?: string;
}

const FeaturedGuides = ({ searchQuery = '' }: FeaturedGuidesProps) => {
  const featuredGuides = [
    {
      title: "Complete Guide to AI Safety Compliance",
      description: "A comprehensive walkthrough of how to implement an AI-powered safety compliance program using Thalos.",
      imageUrl: "/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png",
      type: "Video Tutorial",
      updatedDate: "July 2025",
      buttonText: "Watch Tutorial"
    },
    {
      title: "ROI of Safety Technology Investment",
      description: "Research-backed analysis of the return on investment for safety technology implementation across various industries.",
      imageUrl: "/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png",
      type: "Whitepaper",
      updatedDate: "June 2025",
      buttonText: "Download Whitepaper"
    }
  ];

  const filteredGuides = useMemo(() => {
    if (!searchQuery) return featuredGuides;
    
    const query = searchQuery.toLowerCase();
    return featuredGuides.filter(guide => 
      guide.title.toLowerCase().includes(query) || 
      guide.description.toLowerCase().includes(query) ||
      guide.type.toLowerCase().includes(query)
    );
  }, [featuredGuides, searchQuery]);

  const hasResults = filteredGuides.length > 0;

  if (!hasResults && searchQuery) {
    return null; // Hide section if no results match the search
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Featured Guides</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredGuides.map((guide, index) => (
          <FeaturedGuideCard
            key={index}
            title={guide.title}
            description={guide.description}
            imageUrl={guide.imageUrl}
            type={guide.type}
            updatedDate={guide.updatedDate}
            buttonText={guide.buttonText}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedGuides;
