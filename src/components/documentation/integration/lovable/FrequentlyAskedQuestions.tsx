
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
      </Accordion>
    </div>
  );
};

export default FrequentlyAskedQuestions;
