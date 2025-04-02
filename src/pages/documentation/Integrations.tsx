
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthIntegrationTab from '@/components/integrations/AuthIntegrationTab';
import PaymentIntegrationTab from '@/components/integrations/PaymentIntegrationTab';

const Integrations = () => {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <PageTitle 
          title="Lovable Integrations" 
          subtitle="Integration tools for connecting Thalos with Lovable services"
          className="mb-8"
        />

        <Tabs defaultValue="authentication" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="payment">Payment Processing</TabsTrigger>
          </TabsList>

          <TabsContent value="authentication" className="space-y-6">
            <AuthIntegrationTab />
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <PaymentIntegrationTab />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Integrations;
