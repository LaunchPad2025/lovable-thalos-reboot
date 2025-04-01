
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import CareerHero from '@/components/careers/CareerHero';
import CompanyValues from '@/components/careers/CompanyValues';
import BenefitsSection from '@/components/careers/BenefitsSection';
import TeamLifeSection from '@/components/careers/TeamLifeSection';
import OpenPositionsSection from '@/components/careers/OpenPositionsSection';
import RecruitingProcessSection from '@/components/careers/RecruitingProcessSection';

const Careers = () => {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Join Our Team" 
          subtitle="Build technology that helps save lives and prevent workplace injuries"
          className="mb-12"
        />
        
        <CareerHero />
        <CompanyValues />
        <BenefitsSection />
        <TeamLifeSection />
        <OpenPositionsSection />
        <RecruitingProcessSection />
      </div>
    </PageContainer>
  );
};

export default Careers;
