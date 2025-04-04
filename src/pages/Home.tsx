
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Home() {
    const handleSubscribe = () => {
        // Direct link to pro monthly plan
        window.location.href = "https://thalostech.replit.app/api/subscribe?planId=pro_monthly";
    };
    
    return (
        <div className="flex flex-col justify-center items-center min-h-[200px] gap-4 px-4 py-12 md:py-16">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium w-full sm:w-auto transition-all duration-200 shadow-md hover:shadow-lg">
                <Link to="/demo" className="text-white no-underline w-full h-full inline-flex items-center justify-center">Try Interactive Demo</Link>
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto max-w-md">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-md w-full sm:w-auto transition-all duration-200">
                    <a href="https://thalostech.replit.app/api/auth" className="no-underline w-full h-full inline-flex items-center justify-center">
                        Log In
                    </a>
                </Button>
                
                <Button 
                    onClick={handleSubscribe}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md w-full sm:w-auto transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Sign Up
                </Button>
            </div>
        </div>
    );
}

export default Home;
