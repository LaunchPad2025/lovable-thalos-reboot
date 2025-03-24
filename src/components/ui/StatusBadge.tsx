
import { cn } from '@/lib/utils';

type StatusType = 'open' | 'in-progress' | 'resolved' | 'pending' | 'completed' | 'overdue' | 'cancelled';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const getStatusClasses = (status: StatusType) => {
  switch (status) {
    case 'open':
      return 'bg-red-100 text-red-800';
    case 'in-progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'resolved':
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-blue-100 text-blue-800';
    case 'overdue':
      return 'bg-orange-100 text-orange-800';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
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
