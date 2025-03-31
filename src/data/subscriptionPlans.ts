
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
      monthly: 199,
      annual: 2149.20, // 10% discount on annual
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
      monthly: 350,
      annual: 3780.00, // 10% discount on annual
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
    id: 'premium',
    name: 'Premium',
    description: 'For medium-sized organizations requiring full compliance',
    pricing: {
      monthly: 750,
      annual: 8100.00, // 10% discount on annual
    },
    stripe_price_id: {
      monthly: 'price_1R4YwjGCrRkrgEFrOCo5qMhv',
      annual: 'price_1R4Yw3GCrRkrgEFrredMrTtQ',
    },
    features: [
      { text: 'Up to 200 users', included: true },
      { text: 'Premium incident reporting', included: true },
      { text: 'Custom compliance & auditing', included: true },
      { text: 'Dedicated support team', included: true },
      { text: 'Advanced analytics & reporting', included: true },
      { text: 'Custom workflows & integrations', included: true },
      { text: 'AI safety assistant', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    pricing: {
      monthly: 0, // Contact sales
      annual: 0, // Contact sales
    },
    stripe_price_id: {
      monthly: '',
      annual: '',
    },
    features: [
      { text: 'Unlimited users', included: true },
      { text: 'Enterprise incident reporting', included: true },
      { text: 'Custom compliance & auditing', included: true },
      { text: 'Dedicated support team', included: true },
      { text: 'Advanced analytics & reporting', included: true },
      { text: 'Custom workflows & integrations', included: true },
      { text: 'AI safety assistant', included: true },
      { text: 'On-premises deployment option', included: true },
      { text: 'Custom integrations', included: true },
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
