
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PricingFeatureProps {
  children: React.ReactNode;
}

const PricingFeature = ({ children }: PricingFeatureProps) => (
  <li className="flex items-start">
    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
    <span>{children}</span>
  </li>
);

export default PricingFeature;
