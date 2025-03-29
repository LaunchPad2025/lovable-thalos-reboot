
import { Plan } from '@/types/models';

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PlanData {
  id: string;
  name: string;
  description: string;
  features: PlanFeature[];
  pricing: {
    monthly: number;
    annual: number;
  };
  stripe_price_id: {
    monthly: string;
    annual: string;
  };
  popular?: boolean;
}

export const plans: PlanData[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'For small teams getting started with safety management',
    pricing: {
      monthly: 99,
      annual: 1009.80,
    },
    stripe_price_id: {
      monthly: 'price_1R4YqoGCrRkrgEFrxnYFNfd8',
      annual: 'price_1R4YsZGCrRkrgEFruQgqFdUi',
    },
    features: [
      { text: 'Up to 10 users', included: true },
      { text: 'Basic incident reporting', included: true },
      { text: 'Standard compliance checklists', included: true },
      { text: 'Email support', included: true },
      { text: 'Advanced analytics', included: false },
      { text: 'Custom workflows', included: false },
      { text: 'AI safety assistant', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'For growing organizations with advanced needs',
    pricing: {
      monthly: 149,
      annual: 1519.80,
    },
    stripe_price_id: {
      monthly: 'price_1R4Yv1GCrRkrgEFr3bBkqIy1',
      annual: 'price_1R4Yv1GCrRkrgEFrTMkY8gMF',
    },
    features: [
      { text: 'Up to 50 users', included: true },
      { text: 'Advanced incident reporting', included: true },
      { text: 'Custom compliance checklists', included: true },
      { text: 'Priority email & phone support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom workflows', included: true },
      { text: 'AI safety assistant', included: false },
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations requiring full compliance',
    pricing: {
      monthly: 350,
      annual: 3570.00,
    },
    stripe_price_id: {
      monthly: 'price_1R4YwjGCrRkrgEFrOCo5qMhv',
      annual: 'price_1R4Yw3GCrRkrgEFrredMrTtQ',
    },
    features: [
      { text: 'Unlimited users', included: true },
      { text: 'Enterprise incident reporting', included: true },
      { text: 'Custom compliance & auditing', included: true },
      { text: 'Dedicated support team', included: true },
      { text: 'Advanced analytics & reporting', included: true },
      { text: 'Custom workflows & integrations', included: true },
      { text: 'AI safety assistant', included: true },
    ],
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};
