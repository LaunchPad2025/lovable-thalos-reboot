
import React from 'react';
import { Code } from "@/components/ui/code";

const SupportSection = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Support</h3>
      <ul className="space-y-2 list-disc ml-6 text-gray-300">
        <li>For integration issues, contact our team at: <Code className="text-xs">contact@thalostech.io</Code></li>
        <li>Please include "Lovable Integration" in the subject line for faster routing</li>
      </ul>
    </div>
  );
};

export default SupportSection;
