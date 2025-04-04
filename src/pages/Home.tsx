
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink, LogIn, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import useMobile from '@/hooks/useMobile';
import { useToast } from '@/hooks/use-toast';

function Home() {
    const [loading, setLoading] = useState(false);
    const isMobile = useMobile();
    const { toast } = useToast();
    
    const handleSubscribe = () => {
        setLoading(true);
        toast({
          title: "Redirecting to signup",
          description: "Please wait while we connect to the subscription service...",
        });
        // Direct link to pro monthly plan
        window.location.href = "https://thalostech.replit.app/api/subscribe?planId=pro_monthly";
    };
    
    return (
        <div className="flex flex-col justify-center items-center min-h-[200px] gap-4 px-4 py-8 md:py-16">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-base md:text-lg font-medium w-full sm:w-auto transition-all duration-200 shadow-md hover:shadow-lg">
                <Link to="/demo" className="text-white no-underline w-full h-full inline-flex items-center justify-center">
                    Try Interactive Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
            
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 mt-4 w-full sm:w-auto max-w-md`}>
                <Button 
                    variant="outline" 
                    className="border-blue-600 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md w-full transition-all duration-200 flex items-center justify-center"
                >
                    <a 
                        href="https://thalostech.replit.app/api/auth" 
                        className="no-underline w-full h-full inline-flex items-center justify-center"
                        rel="noopener noreferrer"
                    >
                        <LogIn className="mr-2 h-4 w-4" />
                        Log In
                    </a>
                </Button>
                
                <Button 
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {loading ? 'Connecting...' : 'Sign Up'}
                </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center max-w-md px-2">
                Our subscription service is hosted on Replit. First connection may take a few seconds if the service is idle.
            </p>
        </div>
    );
}

export default Home;
