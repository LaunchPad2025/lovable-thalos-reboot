
import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ConnectionStatusProps {
  status: 'connected' | 'connecting' | 'error';
  errorMessage?: string | null;
}

const ConnectionStatus = ({ status, errorMessage }: ConnectionStatusProps) => {
  if (status === 'connecting') {
    return (
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-400 mx-auto mb-4" />
        <p className="text-gray-400">Loading AI models...</p>
      </div>
    );
  }
  
  if (status === 'error' && errorMessage) {
    return (
      <Alert variant="destructive" className="mb-4 bg-yellow-900/30 border border-yellow-800 text-yellow-200">
        <AlertCircle className="h-4 w-4 text-yellow-500" />
        <AlertDescription>
          {errorMessage || "Model connection issue. Using fallback detection."}
        </AlertDescription>
      </Alert>
    );
  }
  
  return null;
};

export default ConnectionStatus;
