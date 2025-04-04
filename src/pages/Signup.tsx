
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // For marketing website, redirect to Replit signup
            toast.success('Redirecting to signup...');
            window.location.href = "https://thalostech.replit.app/api/auth/signup";
        } catch (err) {
            console.error('Unexpected error during signup:', err);
            toast.error('An unexpected error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
            
            <form onSubmit={handleSignup} className="space-y-4">
                <div>
                    <label className="block mb-1" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                
                <div>
                    <label className="block mb-1" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                        minLength={6}
                    />
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
                
                <p className="text-center text-sm">
                    Already have an account?{' '}
                    <a href="https://thalostech.replit.app/api/auth" className="text-blue-600 hover:underline">
                        Sign In
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Signup;
