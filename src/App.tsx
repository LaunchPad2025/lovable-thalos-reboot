
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import DemoDashboard from './components/DemoDashboard';

// Pages
import Dashboard from "./pages/Dashboard";
import Violations from "./pages/violations";
import Tasks from "./pages/Tasks";
import Chatbot from "./pages/Chatbot";
import Subscription from "./pages/Subscription";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Legal from "./pages/Legal";
import Regulations from "./pages/Regulations";
import Models from "./pages/Models";
import SidebarExamples from "./pages/SidebarExamples";
import RiskAssessment from "./pages/RiskAssessment";
import Documents from "./pages/Documents";
import Notifications from "./pages/Notifications";
import Training from "./pages/Training";
import Audits from "./pages/Audits";
import Admin from "./pages/Admin";
import Index from "./pages/Index";
import Industries from "./pages/Industries";
import IndustryLayout from "./components/industries/IndustryLayout";

// Documentation Pages
import { 
  Features, 
  Pricing, 
  Integration, 
  Updates, 
  HelpCenter, 
  Guides, 
  ApiDocs, 
  AboutUs, 
  Careers, 
  Contact,
  Legal as LegalDocs
} from "./pages/documentation";

// Layout
import AppLayout from "./layouts/AppLayout";

const queryClient = new QueryClient();

function App() {
  console.log("Thalos app rendering");
  const [appReady, setAppReady] = useState(false);
  
  // Ensure app is ready after a short delay
  useEffect(() => {
    console.log("Thalos app mounting");
    const timer = setTimeout(() => {
      console.log("Thalos app ready");
      setAppReady(true);
    }, 200);
    
    return () => {
      clearTimeout(timer);
      console.log("Thalos app unmounting");
    };
  }, []);
  
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/demo" element={<DemoDashboard />} />
                
                {/* Industry pages */}
                <Route path="/industries" element={<Industries />} />
                <Route path="/industries/:industry" element={<IndustryLayout />} />
                
                {/* Documentation routes */}
                <Route path="/documentation/features" element={<Features />} />
                <Route path="/documentation/pricing" element={<Pricing />} />
                <Route path="/documentation/integration" element={<Integration />} />
                <Route path="/documentation/integrations" element={<Integration />} /> {/* Redirect to singular version */}
                <Route path="/documentation/updates" element={<Updates />} />
                <Route path="/documentation/help-center" element={<HelpCenter />} />
                <Route path="/documentation/guides" element={<Guides />} />
                <Route path="/documentation/about-us" element={<AboutUs />} />
                <Route path="/documentation/careers" element={<Careers />} />
                <Route path="/documentation/contact" element={<Contact />} />
                <Route path="/documentation/legal" element={<LegalDocs />} />

                {/* Application routes - now accessible without authentication */}
                <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
                <Route path="/violations/*" element={<AppLayout><Violations /></AppLayout>} />
                <Route path="/tasks" element={<AppLayout><Tasks /></AppLayout>} />
                <Route path="/chatbot" element={<AppLayout><Chatbot /></AppLayout>} />
                <Route path="/subscription" element={<AppLayout><Subscription /></AppLayout>} />
                <Route path="/settings/*" element={<AppLayout><Settings /></AppLayout>} />
                <Route path="/regulations" element={<AppLayout><Regulations /></AppLayout>} />
                <Route path="/models" element={<AppLayout><Models /></AppLayout>} />
                <Route path="/sidebar-examples" element={<AppLayout><SidebarExamples /></AppLayout>} />
                <Route path="/risk-assessment/*" element={<AppLayout><RiskAssessment /></AppLayout>} />
                <Route path="/documents" element={<AppLayout><Documents /></AppLayout>} />
                <Route path="/notifications" element={<AppLayout><Notifications /></AppLayout>} />
                <Route path="/training/*" element={<AppLayout><Training /></AppLayout>} />
                <Route path="/audits/*" element={<AppLayout><Audits /></AppLayout>} />
                <Route path="/admin/*" element={<AppLayout><Admin /></AppLayout>} />
                <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
