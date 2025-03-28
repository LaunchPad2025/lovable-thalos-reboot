
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatsCards = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard 
        title="Compliance Score" 
        value="87%" 
        change="+5% from last month" 
        changePositive={true}
        description="Your compliance score is good. Keep up the good work!"
        icon={<CheckCircle className="h-5 w-5 text-green-500" />}
        onClick={() => navigate('/regulations')}
      />
      
      <StatsCard 
        title="Upcoming Tasks" 
        value="3" 
        change="2 due soon" 
        changePositive={false}
        description="View all tasks"
        isLink={true}
        icon={<Clock className="h-5 w-5 text-yellow-500" />}
        onClick={() => navigate('/tasks')}
      />
      
      <StatsCard 
        title="Recent Incidents" 
        value="2" 
        change="This month" 
        changePositive={false}
        changeColor="text-red-400"
        description="View incident reports"
        isLink={true}
        icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
        onClick={() => navigate('/violations')}
      />
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changePositive?: boolean;
  changeColor?: string;
  description: string;
  isLink?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  changePositive = false,
  changeColor,
  description, 
  isLink = false,
  icon, 
  onClick 
}) => {
  return (
    <Card className="bg-[#0d1117] border-gray-800 p-6">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          {icon}
          {title}
        </h3>
      </div>
      
      <div className="mt-4">
        <div className="flex items-end space-x-2">
          <span className="text-3xl font-semibold text-white">{value}</span>
          <span className={changeColor || (changePositive ? "text-green-400" : "text-yellow-400")}>{change}</span>
        </div>
        
        {isLink ? (
          <button 
            onClick={onClick}
            className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
          >
            {description}
          </button>
        ) : (
          <p className="mt-2 text-gray-400 text-sm">{description}</p>
        )}
      </div>
    </Card>
  );
};

export default StatsCards;
