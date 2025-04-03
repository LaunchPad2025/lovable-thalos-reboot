
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthIntegrationDoc from '@/components/documentation/integration/AuthIntegrationDoc';
import PaymentIntegrationDoc from '@/components/documentation/integration/PaymentIntegrationDoc';
import LovableIntegrationDoc from '@/components/documentation/integration/LovableIntegrationDoc';

const Integration = () => {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <PageTitle 
          title="Thalos - Lovable Integration" 
          subtitle="Technical documentation for integrating Thalos with Lovable services"
          className="mb-8"
        />

        <Tabs defaultValue="lovable" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="lovable">Lovable Integration</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="payment">Payment Processing</TabsTrigger>
          </TabsList>

          <TabsContent value="lovable" className="space-y-6">
            <LovableIntegrationDoc />
          </TabsContent>

          <TabsContent value="authentication" className="space-y-6">
            <AuthIntegrationDoc />
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <PaymentIntegrationDoc />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Integration;
