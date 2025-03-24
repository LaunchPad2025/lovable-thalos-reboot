
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'gray';
}

const StatsCard = ({ 
  title, 
  value, 
  change, 
  trend = 'neutral', 
  icon: Icon,
  color = 'blue'
}: StatsCardProps) => {
  
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600';
      case 'red':
        return 'bg-red-50 text-red-600';
      case 'green':
        return 'bg-green-50 text-green-600';
      case 'yellow':
        return 'bg-yellow-50 text-yellow-600';
      case 'gray':
        return 'bg-gray-50 text-gray-600';
      default:
        return 'bg-blue-50 text-blue-600';
    }
  };
  
  const getTrendClasses = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  
  return (
    <div className="thalos-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          
          {change && (
            <p className={cn("mt-1 text-sm", getTrendClasses())}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {change}
            </p>
          )}
        </div>
        
        {Icon && (
          <div className={cn("p-3 rounded-full", getColorClasses())}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
