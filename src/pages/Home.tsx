
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, Loader2, ArrowRight, Activity } from 'lucide-react';
import { useState } from 'react';
import useMobile from '@/hooks/useMobile';
import { useToast } from '@/hooks/use-toast';
import { safeLog } from '@/utils/environmentUtils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import EndpointStatus from '@/components/debug/EndpointStatus';
import { runEndpointVerification } from '@/utils/endpointVerification';

function Home() {
    const [loading, setLoading] = useState(false);
    const [showEndpointStatus, setShowEndpointStatus] = useState(false);
    const isMobile = useMobile();
    const { toast } = useToast();
    
    const handleStartFree = () => {
        setLoading(true);
        toast({
            title: "Opening signup page",
            description: "You're being redirected to our signup page...",
            duration: 3000,
        });
        safeLog("User clicked start free button");
        
        try {
            window.location.href = "https://thalostech.replit.app/";
            setLoading(false);
        } catch (err) {
            setLoading(false);
            toast({
                title: "Error",
                description: "Failed to open signup page. Please try again.",
                variant: "destructive",
                duration: 5000,
            });
            safeLog("Signup redirect error:", err);
        }
    };
    
    const handleTalkToSales = () => {
        safeLog("User clicked talk to sales button");
        window.open("https://cal.com/annieeser/30min", "_blank", "noopener");
    };
    
    const handleVerifyEndpoints = async () => {
        await runEndpointVerification();
        setShowEndpointStatus(true);
    };
    
    return (
        <div className="flex flex-col justify-center items-center min-h-[300px] gap-6 px-4 py-12 md:py-24 bg-gradient-to-b from-blue-50 to-white dark:from-[#0D1424] dark:to-[#090D13]">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-2">
                AI-Powered Safety Compliance
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6 max-w-2xl">
                Start with 15 free AI-powered safety analyses — no credit card required.
            </p>
            
            <Button 
                onClick={handleStartFree}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md 
                           text-lg font-medium w-full sm:w-auto transition-all 
                           duration-200 shadow-md hover:shadow-lg"
                size="lg"
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Opening...
                    </>
                ) : (
                    <>
                        Start Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                )}
            </Button>
            
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 mt-2 w-full sm:w-auto max-w-md`}>
                <Button 
                    variant="outline" 
                    className="border-blue-600/50 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 px-4 py-2 
                               rounded-md w-full transition-all duration-200 
                               flex items-center justify-center"
                    onClick={() => window.location.href = "https://thalostech.replit.app/api/auth"}
                >
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                </Button>
                
                <Button 
                    onClick={handleTalkToSales}
                    variant="outline"
                    className="border-blue-600/50 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 px-4 py-2 
                               rounded-md w-full transition-all duration-200 
                               flex items-center justify-center"
                >
                    Talk to Sales
                </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs sm:text-sm text-gray-500 mt-8">
                <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>OSHA Compliant</span>
                </div>
                <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <span>24/7 Support</span>
                </div>
                <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure Data</span>
                </div>
            </div>
            
            {/* Endpoint Verification Button for admins/developers */}
            <Button 
                variant="ghost" 
                size="sm" 
                className="absolute bottom-2 right-2 text-xs opacity-70 hover:opacity-100 flex items-center"
                onClick={handleVerifyEndpoints}
            >
                <Activity className="h-3 w-3 mr-1" />
                Verify Endpoints
            </Button>
            
            <Dialog open={showEndpointStatus} onOpenChange={setShowEndpointStatus}>
                <DialogContent className="sm:max-w-3xl">
                    <EndpointStatus onClose={() => setShowEndpointStatus(false)} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Home;
