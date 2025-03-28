
import React from 'react';
import { useAuthStatus } from '@/hooks/useAuthStatus';

const WelcomeSection = () => {
  const { user } = useAuthStatus();
  
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const displayName = userName.includes(' ') ? userName.split(' ')[0] : userName;
  
  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-2">Welcome back, {displayName}!</h2>
      <p className="text-gray-400">Here's an overview of your safety compliance status and tasks</p>
    </div>
  );
};

export default WelcomeSection;
