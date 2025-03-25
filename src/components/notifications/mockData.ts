
import { Notification } from './types';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New safety violation detected',
    description: 'A new safety violation was detected in Workshop A.',
    date: '2023-11-12T10:30:00',
    type: 'violations',
    read: false
  },
  {
    id: '2',
    title: 'Task assigned to you',
    description: 'John Doe assigned a new task to you.',
    date: '2023-11-10T14:45:00',
    type: 'tasks',
    read: false
  },
  {
    id: '3',
    title: 'Risk assessment completed',
    description: 'The risk assessment for Project A has been completed.',
    date: '2023-10-31T09:15:00',
    type: 'risk',
    read: true
  },
  {
    id: '4',
    title: 'Upcoming audit',
    description: 'Reminder: Safety audit scheduled for tomorrow at 10:00 AM.',
    date: '2023-10-30T16:20:00',
    type: 'audits',
    read: true
  },
  {
    id: '5',
    title: 'Document updated',
    description: 'Safety protocol document has been updated.',
    date: '2023-10-30T11:05:00',
    type: 'document',
    read: true
  },
  {
    id: '6',
    title: 'Training certification expiring',
    description: 'Your safety certification will expire in 30 days.',
    date: '2023-10-28T08:30:00',
    type: 'other',
    read: true
  },
  {
    id: '7',
    title: 'New compliance regulation',
    description: 'New safety regulation has been published that affects your worksite.',
    date: '2023-10-27T13:45:00',
    type: 'other',
    read: true
  }
];
