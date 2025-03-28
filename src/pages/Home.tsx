
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import HeroSection from '@/components/landing/HeroSection';
import PaulieSection from '@/components/landing/PaulieSection';
import CTASection from '@/components/landing/CTASection';
import LandingNavbar from '@/components/landing/LandingNavbar';
import Footer from '@/components/layout/Footer';

function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <LandingNavbar />
            
            <main className="flex-1">
                <HeroSection />
                <PaulieSection />
                <CTASection />
            </main>
            
            <Footer />
        </div>
    );
}

export default Home;
