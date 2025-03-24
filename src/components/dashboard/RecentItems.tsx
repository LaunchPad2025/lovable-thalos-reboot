
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

interface RecentItem {
  id: string;
  title: string;
  date: string;
  status: 'open' | 'in-progress' | 'resolved' | 'pending' | 'completed' | 'overdue';
  type: 'task' | 'violation';
}

interface RecentItemsProps {
  title: string;
  items: RecentItem[];
  viewAllLink: string;
  emptyMessage?: string;
}

const RecentItems = ({ title, items, viewAllLink, emptyMessage = 'No recent items' }: RecentItemsProps) => {
  return (
    <div className="thalos-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <Link to={viewAllLink} className="text-sm text-thalos-blue hover:text-blue-700 flex items-center">
          View all <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
      
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div>
                <Link 
                  to={`/${item.type === 'task' ? 'tasks' : 'violations'}/${item.id}`}
                  className="font-medium text-gray-900 hover:text-thalos-blue"
                >
                  {item.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
              </div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-4 text-center text-gray-500">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

export default RecentItems;
