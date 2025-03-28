
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViolationsPage = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Redirect to actual violations page
    navigate('/violations');
  }, [navigate]);
  
  return <div>Redirecting...</div>;
};

export default ViolationsPage;
