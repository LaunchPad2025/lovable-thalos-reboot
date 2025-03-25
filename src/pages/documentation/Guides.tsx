
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import GuideTabs from '@/components/documentation/guides/GuideTabs';
import FeaturedGuides from '@/components/documentation/guides/FeaturedGuides';
import IndustryGuides from '@/components/documentation/guides/IndustryGuides';
import SearchBar from '@/components/documentation/guides/SearchBar';

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Guides & Resources" 
          subtitle="Step-by-step guides to help you get the most out of Thalos"
          className="mb-8"
        />

        <SearchBar onSearch={handleSearch} />
        
        <GuideTabs searchQuery={searchQuery} />
        
        <FeaturedGuides searchQuery={searchQuery} />
        
        <IndustryGuides searchQuery={searchQuery} />
      </div>
    </PageContainer>
  );
};

export default Guides;
