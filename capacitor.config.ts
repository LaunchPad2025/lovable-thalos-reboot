
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.083105beb0244a13b1e1ab43c59229fc',
  appName: 'lovable-thalos-reboot',
  webDir: 'dist',
  server: {
    url: 'https://083105be-b024-4a13-b1e1-ab43c59229fc.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    }
  }
};

export default config;
