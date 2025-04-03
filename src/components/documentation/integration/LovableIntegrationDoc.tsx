
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Import refactored components
import SubscriptionLinks from './lovable/SubscriptionLinks';
import DirectApiIntegration from './lovable/DirectApiIntegration';
import ImplementationSteps from './lovable/ImplementationSteps';
import UrlParameters from './lovable/UrlParameters';
import CustomerFlow from './lovable/CustomerFlow';
import TestingInstructions from './lovable/TestingInstructions';
import DocumentationUpdates from './lovable/DocumentationUpdates';
import WebhookNotifications from './lovable/WebhookNotifications';
import PlanInformation from './lovable/PlanInformation';
import SupportSection from './lovable/SupportSection';
import IntegrationAlerts from './lovable/IntegrationAlerts';

const LovableIntegrationDoc = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Lovable Integration</CardTitle>
        <CardDescription>
          Complete integration guide for connecting Lovable with Thalos subscription services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <SubscriptionLinks />
        
        <Separator />
        
        <DirectApiIntegration />
        
        <Separator />
        
        <ImplementationSteps />
        
        <Separator />
        
        <UrlParameters />
        
        <IntegrationAlerts />
        
        <Separator />
        
        <CustomerFlow />
        
        <Separator />
        
        <TestingInstructions />
        
        <Separator />
        
        <DocumentationUpdates />
        
        <Separator />
        
        <WebhookNotifications />
        
        <Separator />
        
        <PlanInformation />
        
        <IntegrationAlerts />
        
        <Separator />
        
        <SupportSection />
      </CardContent>
    </Card>
  );
};

export default LovableIntegrationDoc;
