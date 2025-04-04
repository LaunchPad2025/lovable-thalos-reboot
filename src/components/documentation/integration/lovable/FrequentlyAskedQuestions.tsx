
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FrequentlyAskedQuestions = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Frequently Asked Questions</h3>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-gray-100">How do I upgrade a user's subscription plan?</AccordionTrigger>
          <AccordionContent className="text-gray-300">
            To upgrade a subscription, direct users to their dashboard where they can select 
            a new plan. Alternatively, you can use the API endpoint 
            <code className="bg-gray-800 px-1 mx-1 rounded text-xs">POST /api/subscriptions/change-plan</code> 
            with the user's ID and new plan information.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-gray-100">What happens if a user's payment fails?</AccordionTrigger>
          <AccordionContent className="text-gray-300">
            If a payment fails, Stripe will automatically attempt to rebill the customer 
            according to its retry schedule. You'll receive webhook notifications for these 
            events that you can use to notify the user or take other actions.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-gray-100">Can users cancel their subscription at any time?</AccordionTrigger>
          <AccordionContent className="text-gray-300">
            Yes, users can cancel their subscription at any time through their dashboard. 
            When canceled, the subscription remains active until the end of the current billing period,
            after which it will be automatically deactivated.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-gray-100">Has the API format changed recently?</AccordionTrigger>
          <AccordionContent className="text-gray-300">
            Yes, we've simplified our API format. The direct subscription endpoint now accepts a streamlined 
            JSON payload with <code className="bg-gray-800 px-1 mx-1 rounded text-xs">email</code>, 
            <code className="bg-gray-800 px-1 mx-1 rounded text-xs">name</code>, 
            <code className="bg-gray-800 px-1 mx-1 rounded text-xs">plan</code>, and 
            <code className="bg-gray-800 px-1 mx-1 rounded text-xs">interval</code> fields instead 
            of the previously more detailed format.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-gray-100">How does the new subscription flow work?</AccordionTrigger>
          <AccordionContent className="text-gray-300">
            When a user clicks the subscription button, they are redirected to our Replit subscription endpoint.
            Our backend will check for an existing account (or create one), generate a Stripe Checkout session,
            and redirect the user to Stripe for payment. After successful payment, the user's environment is
            provisioned and they are automatically logged in and redirected to the dashboard.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-gray-100">What are the correct planId values to use?</AccordionTrigger>
          <AccordionContent className="text-gray-300">
            The planId parameter must be one of:
            <ul className="list-disc ml-6 mt-2">
              <li><code className="bg-gray-800 px-1 mx-1 rounded text-xs">basic_monthly</code> - Basic plan, monthly billing</li>
              <li><code className="bg-gray-800 px-1 mx-1 rounded text-xs">basic_annual</code> - Basic plan, annual billing</li>
              <li><code className="bg-gray-800 px-1 mx-1 rounded text-xs">pro_monthly</code> - Pro plan, monthly billing</li>
              <li><code className="bg-gray-800 px-1 mx-1 rounded text-xs">pro_annual</code> - Pro plan, annual billing</li>
              <li><code className="bg-gray-800 px-1 mx-1 rounded text-xs">premium_monthly</code> - Premium plan, monthly billing</li>
              <li><code className="bg-gray-800 px-1 mx-1 rounded text-xs">premium_annual</code> - Premium plan, annual billing</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FrequentlyAskedQuestions;
