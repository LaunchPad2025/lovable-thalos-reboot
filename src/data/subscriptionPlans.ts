
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
    description: 'For teams getting started with safety management',
    pricing: {
      monthly: 199,
      annual: 2029.80, // 15% discount on annual
    },
    stripe_price_id: {
      monthly: 'price_1R4YqoGCrRkrgEFrxnYFNfd8',
      annual: 'price_1R4YsZGCrRkrgEFruQgqFdUi',
    },
    features: [
      { text: '50 safety analyses per month', included: true },
      { text: 'Full access to Paulie AI assistant', included: true },
      { text: 'Comprehensive violation detection', included: true },
      { text: 'Task tracking and management', included: true },
      { text: 'Dashboard with analytics', included: true },
      { text: 'Remediation plan generation', included: true },
      { text: 'Access to all regulation information', included: true },
      { text: 'Multi-modal analysis (image, text, audio)', included: false },
      { text: 'Enhanced detection with AI insights', included: false },
      { text: 'Advanced reporting capabilities', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'For growing businesses with advanced safety needs',
    pricing: {
      monthly: 350,
      annual: 3570.00, // 15% discount on annual
    },
    stripe_price_id: {
      monthly: 'price_1R4Yv1GCrRkrgEFr3bBkqIy1',
      annual: 'price_1R4Yv1GCrRkrgEFrTMkY8gMF',
    },
    features: [
      { text: '100 safety analyses per month', included: true },
      { text: 'All Basic plan features', included: true },
      { text: 'Multi-modal analysis (image, text, audio)', included: true },
      { text: 'Enhanced detection with AI insights', included: true },
      { text: 'Advanced reporting capabilities', included: true },
      { text: 'Risk level assessment', included: true },
      { text: 'Priority support', included: false },
      { text: 'Custom industry profiles', included: false },
      { text: 'Advanced analytics dashboard', included: false },
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For organizations requiring comprehensive safety solutions',
    pricing: {
      monthly: 750,
      annual: 7650.00, // 15% discount on annual
    },
    stripe_price_id: {
      monthly: 'price_1R4YwjGCrRkrgEFrOCo5qMhv',
      annual: 'price_1R4Yw3GCrRkrgEFrredMrTtQ',
    },
    features: [
      { text: '250 safety analyses per month', included: true },
      { text: 'All Pro plan features', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom industry profiles', included: true },
      { text: 'Advanced analytics dashboard', included: true },
      { text: 'Comprehensive audit trails', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    pricing: {
      monthly: 0, // Custom pricing
      annual: 0, // Custom pricing
    },
    stripe_price_id: {
      monthly: '',
      annual: '',
    },
    features: [
      { text: 'Custom integration', included: true },
      { text: 'Multiple user accounts', included: true },
      { text: 'Custom reporting', included: true },
      { text: 'All Premium plan features', included: true },
      { text: 'Custom deployment options', included: true },
      { text: 'Dedicated account manager', included: true },
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
