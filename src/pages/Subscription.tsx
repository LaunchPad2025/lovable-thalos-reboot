
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PlanSelector from '@/components/subscription/PlanSelector';
import PageTitle from '@/components/ui/PageTitle';

const Subscription = () => {
  return (
    <PageContainer>
      <PageTitle 
        title="Subscription"
        subtitle="Manage your Thalos subscription"
      />
      
      <PlanSelector />
    </PageContainer>
  );
};

export default Subscription;
