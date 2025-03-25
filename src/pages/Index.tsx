
import React from 'react';
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

  return (
    <div className="min-h-screen bg-[#0C1117] text-white">
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
