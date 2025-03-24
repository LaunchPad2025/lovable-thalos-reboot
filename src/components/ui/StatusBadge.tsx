
import { cn } from '@/lib/utils';

type StatusType = 'open' | 'in-progress' | 'resolved' | 'pending' | 'completed' | 'overdue' | 'cancelled' | 'medium' | 'high' | 'low';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const getStatusClasses = (status: StatusType) => {
  switch (status) {
    case 'open':
      return 'bg-red-900/30 text-red-400';
    case 'high':
      return 'bg-red-900/30 text-red-400';
    case 'in-progress':
      return 'bg-amber-900/30 text-amber-400';
    case 'resolved':
    case 'completed':
      return 'bg-green-900/30 text-green-400';
    case 'low':
      return 'bg-green-900/30 text-green-400';
    case 'pending':
      return 'bg-blue-900/30 text-blue-400';
    case 'medium':
      return 'bg-blue-900/30 text-blue-400';
    case 'overdue':
      return 'bg-orange-900/30 text-orange-400';
    case 'cancelled':
      return 'bg-gray-800 text-gray-400';
    default:
      return 'bg-gray-800 text-gray-400';
  }
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusText = status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  
  return (
    <span className={cn(
      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
      getStatusClasses(status),
      className
    )}>
      {statusText}
    </span>
  );
};

export default StatusBadge;
