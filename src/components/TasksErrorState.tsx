
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface TasksErrorStateProps {
    error: string | null;
    onRetry?: () => void;
}

const TasksErrorState: React.FC<TasksErrorStateProps> = ({ error, onRetry }) => {
    if (!error) return null;

    const isNetworkError = error.toLowerCase().includes('network') || 
                           error.toLowerCase().includes('connection') || 
                           error.toLowerCase().includes('timeout');

    const isPermissionError = error.toLowerCase().includes('permission') || 
                              error.toLowerCase().includes('unauthorized') ||
                              error.toLowerCase().includes('rls');

    return (
        <Card className="border-red-800/30 bg-red-950/10">
            <CardHeader>
                <CardTitle className="flex items-center text-red-400">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    {isNetworkError ? "Connection Error" : 
                     isPermissionError ? "Permission Error" : "Error Loading Tasks"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-300 mb-4">{error}</p>
                
                {isNetworkError && (
                    <div className="bg-blue-900/20 p-4 rounded-md text-sm text-gray-300">
                        <p className="font-medium mb-2">Troubleshooting:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Replit services might be waking up from idle state</li>
                            <li>There could be temporary network issues</li>
                            <li>Try refreshing the page or try again later</li>
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
