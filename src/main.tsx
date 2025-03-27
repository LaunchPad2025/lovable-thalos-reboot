
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'
import MobileAppLayout from './components/layout/MobileAppLayout.tsx'

// Capacitor-specific imports
import { Capacitor } from '@capacitor/core';

// Initialize mobile platform if necessary
const initMobile = () => {
  if (Capacitor.isPluginAvailable('SplashScreen')) {
    // We could initialize plugins here
    console.log('Running in Capacitor mobile environment');
  }
};

// Init mobile if applicable
initMobile();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MobileAppLayout>
      <App />
    </MobileAppLayout>
  </StrictMode>
);
