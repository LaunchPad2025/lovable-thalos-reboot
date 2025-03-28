
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Redirect to the Index page
        navigate('/');
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <p>Redirecting to home page...</p>
        </div>
    );
}

export default Home;
