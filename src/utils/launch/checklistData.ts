
import { ChecklistItem } from './types';

/**
 * Default go-live checklist for the application
 */
export const defaultGoLiveChecklist: ChecklistItem[] = [
  {
    id: 'content-1',
    title: 'Replace placeholder content',
    description: 'Replace all placeholder content including names, sample data, and lorem ipsum text',
    category: 'content',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'content-2',
    title: 'Industry-specific content verification',
    description: 'Ensure all industry references match supported industries',
    category: 'content',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 'functionality-1',
    title: 'Link validation',
    description: 'Test all navigation links to ensure they direct to correct destinations',
    category: 'functionality',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'functionality-2',
    title: 'Form validation',
    description: 'Test all forms for proper validation and error handling',
    category: 'functionality',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'security-1',
    title: 'Authentication flow verification',
    description: 'Test login, logout, password reset, and account recovery flows',
    category: 'security',
    status: 'pending',
    priority: 'critical'
  },
  {
    id: 'security-2',
    title: 'User permissions verification',
    description: 'Confirm all role-based permissions are working correctly',
    category: 'security',
    status: 'pending',
    priority: 'critical'
  },
  {
    id: 'performance-1',
    title: 'Load testing',
    description: 'Verify application performance under expected user load',
    category: 'performance',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 'compliance-1',
    title: 'Regulation database completeness',
    description: 'Verify regulation database contains required industry standards',
    category: 'compliance',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'compliance-2',
    title: 'Legal documents verification',
    description: 'Confirm all terms of service, privacy policy, and legal documents are current',
    category: 'compliance',
    status: 'pending',
    priority: 'high'
  }
];
