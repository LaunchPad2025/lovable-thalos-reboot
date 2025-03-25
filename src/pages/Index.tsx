
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatPopup from '@/components/chatbot/ChatPopup';
import LandingNavbar from '@/components/landing/LandingNavbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import PaulieSection from '@/components/landing/PaulieSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Add debug logging
  useEffect(() => {
    console.log("Index page mounted");
    setIsLoaded(true);
    
    // Force a re-render after a short delay to ensure styles are applied
    const timer = setTimeout(() => {
      console.log("Forcing re-render of Index page");
      setIsLoaded(state => !state);
      setIsLoaded(state => !state);
    }, 300);
    
    return () => {
      console.log("Index page unmounted");
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0C1117] text-white overflow-x-hidden">
      {/* Debug info */}
      <div className="fixed top-0 right-0 bg-black/70 text-white text-xs p-1 z-50">
        Landing page loaded: {isLoaded ? 'Yes' : 'Loading...'}
      </div>
      
      {/* Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Paulie Section */}
      <PaulieSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />

      {/* Chat popup */}
      <ChatPopup />
    </div>
  );
};

export default Index;
