
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DemoDashboard = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Redirect to demo page
    navigate('/demo');
  }, [navigate]);
  
  return <div className="flex items-center justify-center h-screen bg-black text-white">Redirecting to demo...</div>;
};

export default DemoDashboard;
