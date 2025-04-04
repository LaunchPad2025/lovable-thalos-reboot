
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, Calendar, Loader2 } from 'lucide-react';
import { useState } from 'react';
import useMobile from '@/hooks/useMobile';
import { useToast } from '@/hooks/use-toast';
import { safeLog } from '@/utils/environmentUtils';

function Home() {
    const [loading, setLoading] = useState(false);
    const isMobile = useMobile();
    const { toast } = useToast();
    
    const handleScheduleCall = () => {
        setLoading(true);
        toast({
            title: "Opening scheduling page",
            description: "You're being redirected to our calendar booking system...",
            duration: 3000,
        });
        safeLog("User clicked schedule call button");
        
        try {
            window.open("https://cal.com/annieeser/30min", "_blank", "noopener");
            setLoading(false);
        } catch (err) {
            setLoading(false);
            toast({
                title: "Error",
                description: "Failed to open booking page. Please try again.",
                variant: "destructive",
                duration: 5000,
            });
            safeLog("Calendar redirect error:", err);
        }
    };
    
    return (
        <div className="flex flex-col justify-center items-center min-h-[200px] gap-4 px-4 py-8 md:py-16">
            <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md 
                           text-base md:text-lg font-medium w-full sm:w-auto transition-all 
                           duration-200 shadow-md hover:shadow-lg"
            >
                <Link 
                    to="/demo" 
                    className="text-white no-underline w-full h-full inline-flex items-center justify-center"
                >
                    Try Interactive Demo
                </Link>
            </Button>
            
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 mt-4 w-full sm:w-auto max-w-md`}>
                <Button 
                    variant="outline" 
                    className="border-blue-600/50 text-blue-600 hover:bg-blue-100 px-4 py-2 
                               rounded-md w-full transition-all duration-200 
                               flex items-center justify-center"
                >
                    <a 
                        href="https://thalostech.replit.app/api/auth" 
                        className="no-underline w-full h-full inline-flex items-center justify-center"
                        rel="noopener noreferrer"
                        onClick={() => safeLog("User clicked login button")}
                    >
                        <LogIn className="mr-2 h-4 w-4" />
                        Log In
                    </a>
                </Button>
                
                <Button 
                    onClick={handleScheduleCall}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 
                               rounded-md w-full transition-all duration-200 
                               shadow-md hover:shadow-lg flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Opening...
                        </>
                    ) : (
                        <>
                            <Calendar className="mr-2 h-4 w-4" />
                            Book a 30-Minute Setup Call
                        </>
                    )}
                </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center max-w-md px-2">
                Get personalized onboarding assistance by scheduling a 30-minute setup call with our team.
            </p>
        </div>
    );
}

export default Home;
