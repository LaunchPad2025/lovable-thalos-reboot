
// Use the formatPrice function instead of imported utility

export interface PlanData {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing: {
    monthly: number;
    annual: number;
  };
  popular?: boolean;
  stripe_price_id: {
    monthly: string;
    annual: string;
  };
  trial_period_days: number;
  max_users: number;
}

export const plans: PlanData[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'For small teams getting started with safety management',
    features: [
      'Up to 10 users',
      'Basic incident reporting',
      'Standard compliance checklists',
      'Email support',
      'Basic analytics'
    ],
    pricing: {
      monthly: 99,
      annual: 1069
    },
    stripe_price_id: {
      monthly: 'price_basic_monthly',  // Replace with actual Stripe price ID
      annual: 'price_basic_annual'     // Replace with actual Stripe price ID
    },
    trial_period_days: 14,
    max_users: 10
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'For growing businesses with advanced safety needs',
    features: [
      'Up to 50 users',
      'Advanced incident reporting',
      'Custom compliance checklists',
      'Priority email & phone support',
      'Advanced analytics',
      'Custom workflows'
    ],
    pricing: {
      monthly: 149,
      annual: 1609
    },
    popular: true,
    stripe_price_id: {
      monthly: 'price_pro_monthly',    // Replace with actual Stripe price ID
      annual: 'price_pro_annual'       // Replace with actual Stripe price ID
    },
    trial_period_days: 14,
    max_users: 50
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations with complex compliance requirements',
    features: [
      'Unlimited users',
      'Enterprise incident reporting',
      'Custom compliance & auditing',
      'Dedicated support team',
      'Advanced analytics & reporting',
      'Custom workflows & integrations',
      'AI safety assistant'
    ],
    pricing: {
      monthly: 350,
      annual: 3780
    },
    stripe_price_id: {
      monthly: 'price_enterprise_monthly',  // Replace with actual Stripe price ID
      annual: 'price_enterprise_annual'     // Replace with actual Stripe price ID
    },
    trial_period_days: 14,
    max_users: Infinity
  }
];

// Helper function to format price with currency symbol
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(price);
};
