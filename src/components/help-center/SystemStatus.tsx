
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface StatusCardProps {
  service: string;
  status: 'operational' | 'issues' | 'outage';
}

const StatusCard = ({ service, status }: StatusCardProps) => {
  const statusConfig = {
    operational: {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: 'Operational',
      color: 'text-green-500'
    },
    issues: {
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      text: 'Minor Issues',
      color: 'text-amber-500'
    },
    outage: {
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      text: 'Outage',
      color: 'text-red-500'
    }
  };

  const { icon, text, color } = statusConfig[status];

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex flex-col justify-center items-center text-center">
        <div className="mb-2">{service}</div>
        <div className={`flex items-center ${color}`}>
          {icon}
          <span className="ml-1 text-sm">{text}</span>
        </div>
      </div>
    </div>
  );
};

const SystemStatus = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="mr-4 p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold">System Status</h3>
          <p className="text-muted-foreground">All systems operational</p>
        </div>
        
        <Button variant="link" className="ml-auto">View Status Page</Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatusCard service="API Services" status="operational" />
        <StatusCard service="Web Application" status="operational" />
        <StatusCard service="Mobile App" status="operational" />
        <StatusCard service="AI Processing" status="issues" />
      </div>
    </div>
  );
};

export default SystemStatus;
