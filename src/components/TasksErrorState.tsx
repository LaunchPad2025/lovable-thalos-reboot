
import React from 'react';
import { AlertCircle, RefreshCw, WifiOff, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { isReplitUrl } from '@/utils/urlValidation';

interface TasksErrorStateProps {
    error: string | null;
    onRetry?: () => void;
    apiUrl?: string;
}

const TasksErrorState: React.FC<TasksErrorStateProps> = ({ error, onRetry, apiUrl }) => {
    if (!error) return null;

    const isNetworkError = error.toLowerCase().includes('network') || 
                           error.toLowerCase().includes('connection') || 
                           error.toLowerCase().includes('timeout') ||
                           error.toLowerCase().includes('failed to fetch');

    const isPermissionError = error.toLowerCase().includes('permission') || 
                              error.toLowerCase().includes('unauthorized') ||
                              error.toLowerCase().includes('rls');
                              
    const isReplitService = apiUrl ? isReplitUrl(apiUrl) : false;
    const showReplitMessage = isReplitService && isNetworkError;

    return (
        <Card className="border-red-800/30 bg-red-950/10">
            <CardHeader>
                <CardTitle className="flex items-center text-red-400">
                    {isNetworkError ? (
                        <>
                            <WifiOff className="h-5 w-5 mr-2" />
                            Connection Error
                        </>
                    ) : isPermissionError ? (
                        <>
                            <Shield className="h-5 w-5 mr-2" />
                            Permission Error
                        </>
                    ) : (
                        <>
                            <AlertCircle className="h-5 w-5 mr-2" />
                            Error Loading Tasks
                        </>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-300 mb-4">{error}</p>
                
                {isNetworkError && (
                    <div className="bg-blue-900/20 p-4 rounded-md text-sm text-gray-300">
                        <p className="font-medium mb-2">Troubleshooting:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            {showReplitMessage && <li>Replit services might be waking up from idle state (can take 15-30 seconds)</li>}
                            <li>There could be temporary network issues</li>
                            <li>Try refreshing the page or try again later</li>
                            {showReplitMessage && <li>Replit services are sometimes slower during high traffic periods</li>}
                        </ul>
                    </div>
                )}
                
                {isPermissionError && (
                    <div className="bg-blue-900/20 p-4 rounded-md text-sm text-gray-300">
                        <p className="font-medium mb-2">Information:</p>
                        <p>Please ensure the appropriate Row-Level Security (RLS) policies are 
                        configured in Supabase for the tasks table.</p>
                    </div>
                )}
            </CardContent>
            {onRetry && (
                <CardFooter>
                    <Button 
                        variant="outline" 
                        onClick={onRetry}
                        className="flex items-center"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default TasksErrorState;
