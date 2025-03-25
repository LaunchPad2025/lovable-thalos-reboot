
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface AuditStatusCardProps {
  title: string;
  count: number;
  description: string;
  variant: 'open' | 'in-progress' | 'resolved' | 'verified' | 'upcoming' | 'completed' | 'overdue';
}

const AuditStatusCard: React.FC<AuditStatusCardProps> = ({ 
  title, 
  count, 
  description, 
  variant 
}) => {
  const getCardStyles = () => {
    switch (variant) {
      case 'open':
      case 'overdue':
        return 'bg-red-900/20 border-red-900/30 text-red-400';
      case 'in-progress':
        return 'bg-amber-900/20 border-amber-900/30 text-amber-400';
      case 'resolved':
      case 'upcoming':
        return 'bg-blue-900/20 border-blue-900/30 text-blue-400';
      case 'verified':
      case 'completed':
        return 'bg-green-900/20 border-green-900/30 text-green-400';
      default:
        return 'bg-card/20 border-border text-card-foreground';
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'open':
      case 'overdue':
        return <AlertTriangle className="w-6 h-6" />;
      case 'in-progress':
        return <Clock className="w-6 h-6" />;
      case 'resolved':
      case 'upcoming':
        return <AlertCircle className="w-6 h-6" />;
      case 'verified':
      case 'completed':
        return <CheckCircle className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <Card className={`border ${getCardStyles()}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-3xl font-bold mt-2">{count}</p>
            <p className="text-sm mt-1 opacity-80">{description}</p>
          </div>
          <div className="mt-1">
            {getIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditStatusCard;
