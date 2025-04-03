
import React from 'react';
import { Code } from "@/components/ui/code";

const WebhookNotifications = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Webhook Notifications</h3>
      <p className="mb-2 text-gray-300">
        We'll send webhook events to your endpoint for subscription events:
      </p>
      <div className="bg-[#1a1f29] p-4 rounded-md">
        <div className="text-sm text-gray-300 overflow-x-auto">
          <p><strong>URL:</strong> <Code>https://api.lovable.ai/webhooks/thalos</Code></p>
          <p><strong>Events:</strong> checkout.session.completed, customer.subscription.updated, customer.subscription.deleted</p>
          <p><strong>Format:</strong> {`{event: string, userId: number, plan: string, data: object}`}</p>
        </div>
      </div>
    </div>
  );
};

export default WebhookNotifications;
