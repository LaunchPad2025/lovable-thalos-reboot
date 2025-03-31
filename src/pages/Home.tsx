
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Home() {
    return (
        <div className="flex justify-center items-center min-h-[200px]">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg">
                <Link to="/demo" className="text-white no-underline">Try Interactive Demo</Link>
            </Button>
        </div>
    );
}

export default Home;
