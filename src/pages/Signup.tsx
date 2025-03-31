
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const Signup = () => {
    const navigate = useNavigate();

    const handleSignup = async (email: string, password: string) => {
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            console.error('Signup error:', error.message);
        } else {
            // Redirect to dashboard or empty state
            navigate('/dashboard');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            {/* Signup form */}
            <button onClick={() => handleSignup('test@example.com', 'password123')}>
                Sign Up
            </button>
        </div>
    );
};

export default Signup;
