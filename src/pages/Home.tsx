
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Thalos</h1>
                <p className="text-xl text-gray-300 mb-10">
                    AI-powered workplace safety platform to detect violations,
                    automate compliance, and streamline task management.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-md text-lg">
                        <Link to="/demo">
                            Try Demo <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="border-blue-700/50 text-white hover:bg-blue-900/30 px-8 py-6 rounded-md text-lg">
                        <a href="https://cal.com/annieeser/30min" target="_blank" rel="noopener noreferrer">
                            Get Started
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
