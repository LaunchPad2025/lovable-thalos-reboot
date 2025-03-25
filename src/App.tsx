
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { ThemeProvider } from "@/providers/ThemeProvider";

// Pages
import Dashboard from "./pages/Dashboard";
import Violations from "./pages/Violations";
import Tasks from "./pages/Tasks";
import Chatbot from "./pages/Chatbot";
import Subscription from "./pages/Subscription";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Regulations from "./pages/Regulations";
import Models from "./pages/Models";
import Legal from "./pages/Legal";
import SidebarExamples from "./pages/SidebarExamples";
import RiskAssessment from "./pages/RiskAssessment";
import Documents from "./pages/Documents";
import Notifications from "./pages/Notifications";
import Training from "./pages/Training";
import Audits from "./pages/audits";
import Admin from "./pages/Admin";

// Layout
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

const queryClient = new QueryClient();

// Onboarding check wrapper
const OnboardingCheck = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  // If user is logged in but hasn't completed onboarding, redirect to onboarding
  if (user && user.user_metadata && user.user_metadata.onboarded === false) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/onboarding" element={<Onboarding />} />

                {/* Protected routes with layout */}
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/*"
                    element={
                      <OnboardingCheck>
                        <div className="flex h-screen w-full overflow-hidden bg-background">
                          <Sidebar />
                          <div className="flex-1 flex flex-col overflow-hidden">
                            <Navbar />
                            <Routes>
                              <Route path="/" element={<Navigate to="/dashboard" replace />} />
                              <Route path="/dashboard" element={<Dashboard />} />
                              <Route path="/violations" element={<Violations />} />
                              <Route path="/violations/:id" element={<Violations />} />
                              <Route path="/tasks" element={<Tasks />} />
                              <Route path="/tasks/:id" element={<Tasks />} />
                              <Route path="/risk-assessment" element={<RiskAssessment />} />
                              <Route path="/risk-assessment/:id" element={<RiskAssessment />} />
                              <Route path="/documents" element={<Documents />} />
                              <Route path="/notifications" element={<Notifications />} />
                              <Route path="/chatbot" element={<Chatbot />} />
                              <Route path="/subscription" element={<Subscription />} />
                              <Route path="/settings" element={<Settings />} />
                              <Route path="/regulations" element={<Regulations />} />
                              <Route path="/regulations/:id" element={<Regulations />} />
                              <Route path="/models" element={<Models />} />
                              <Route path="/sidebar-examples" element={<SidebarExamples />} />
                              <Route path="/audits" element={<Audits />} />
                              <Route path="/reports" element={<ComingSoon />} />
                              <Route path="/training" element={<Training />} />
                              <Route path="/admin" element={<Admin />} />
                              <Route path="/help" element={<ComingSoon />} />
                              <Route path="/coming-soon" element={<ComingSoon />} />
                              <Route path="/legal" element={<Legal />} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </div>
                        </div>
                      </OnboardingCheck>
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
