
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DemoDashboard = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Redirect to demo page
    navigate('/demo');
  }, [navigate]);
  
  return <div>Redirecting...</div>;
};

export default DemoDashboard;
