
import React from 'react';
import { 
  AlertTriangle, 
  CheckSquare, 
  ClipboardList, 
  FileQuestion, 
  FileText,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Notification } from './types';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { id, title, description, date, type, read } = notification;

  // Get icon based on notification type
  const getIcon = () => {
    switch (type) {
      case 'violations':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'tasks':
        return <CheckSquare className="w-5 h-5 text-blue-500" />;
      case 'audits':
        return <ClipboardList className="w-5 h-5 text-yellow-500" />;
      case 'risk':
        return <FileQuestion className="w-5 h-5 text-purple-500" />;
      case 'document':
        return <FileText className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  // Format date to relative time (e.g., "2 days ago")
  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true });

  return (
    <div 
      className={cn(
        "border rounded-md p-4 transition-colors",
        read ? "bg-background" : "bg-accent/20"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className={cn("font-medium", !read && "font-semibold")}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <div className="text-xs text-muted-foreground mt-2">{formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
