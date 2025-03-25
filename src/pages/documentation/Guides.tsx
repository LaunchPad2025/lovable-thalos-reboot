
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import GuideTabs from '@/components/documentation/guides/GuideTabs';
import FeaturedGuides from '@/components/documentation/guides/FeaturedGuides';
import IndustryGuides from '@/components/documentation/guides/IndustryGuides';

const Guides = () => {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Guides & Resources" 
          subtitle="Step-by-step guides to help you get the most out of Thalos"
          className="mb-12"
        />

        <GuideTabs />
        
        <FeaturedGuides />
        
        <IndustryGuides />
      </div>
    </PageContainer>
  );
};

export default Guides;
