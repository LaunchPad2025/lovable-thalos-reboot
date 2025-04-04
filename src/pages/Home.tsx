
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Home() {
    const handleSubscribe = () => {
        // Direct link to pro monthly plan
        window.location.href = "https://thalostech.replit.app/api/subscribe?planId=pro_monthly";
    };
    
    return (
        <div className="flex flex-col justify-center items-center min-h-[200px] gap-4 px-4 py-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg w-full sm:w-auto">
                <Link to="/demo" className="text-white no-underline">Try Interactive Demo</Link>
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-2 rounded-md w-full sm:w-auto">
                    <a href="https://thalostech.replit.app/api/auth" className="no-underline">
                        Log In
                    </a>
                </Button>
                
                <Button 
                    onClick={handleSubscribe}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md w-full sm:w-auto"
                >
                    Sign Up
                </Button>
            </div>
        </div>
    );
}

export default Home;
