
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Home() {
    return (
        <div className="flex flex-col justify-center items-center min-h-[200px] gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg">
                <Link to="/demo" className="text-white no-underline">Try Interactive Demo</Link>
            </Button>
            
            <div className="flex gap-4 mt-4">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-2 rounded-md">
                    <a href="https://your-replit-app.replit.app/login" className="no-underline">
                        Log In
                    </a>
                </Button>
                
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
                    <a href="https://your-replit-app.replit.app/signup" className="text-white no-underline">
                        Sign Up
                    </a>
                </Button>
            </div>
        </div>
    );
}

export default Home;
