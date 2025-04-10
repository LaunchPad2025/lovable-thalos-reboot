
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { verifyEndpoints } from '@/utils/endpointVerification';

interface EndpointStatusProps {
  onClose: () => void;
}

const EndpointStatus: React.FC<EndpointStatusProps> = ({ onClose }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const runVerification = async () => {
    setIsVerifying(true);
    try {
      const endpointResults = await verifyEndpoints();
      setResults(endpointResults);
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    runVerification();
  }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Endpoint Status</CardTitle>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={runVerification}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>Refresh</>
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.length === 0 && isVerifying ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="mt-2 text-sm text-gray-500">Verifying endpoints...</p>
            </div>
          ) : (
            <>
              {results.map((result, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 py-2"
                >
                  <div className="flex items-center">
                    {result.status === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <span className="font-medium">{result.endpoint}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm ${
                      result.status === 'success' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {result.message}
                    </span>
                    <span className="text-xs text-gray-500">
                      {result.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}

              {results.every(r => r.status === 'success') ? (
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-md">
                  All endpoints are functioning correctly.
                </div>
              ) : (
                <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-md">
                  Some endpoints may have issues. Review the details above.
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EndpointStatus;
