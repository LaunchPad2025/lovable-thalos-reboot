
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";
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

// Layout
import Sidebar from "./components/layout/Sidebar";

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

                {/* Protected routes with sidebar layout */}
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/*"
                    element={
                      <OnboardingCheck>
                        <div className="flex h-screen w-full">
                          <Sidebar />
                          <div className="flex-1 overflow-hidden flex flex-col">
                            <Navbar />
                            <Routes>
                              <Route path="/" element={<Dashboard />} />
                              <Route path="/violations" element={<Violations />} />
                              <Route path="/violations/:id" element={<Violations />} />
                              <Route path="/tasks" element={<Tasks />} />
                              <Route path="/chatbot" element={<Chatbot />} />
                              <Route path="/subscription" element={<Subscription />} />
                              <Route path="/settings" element={<Settings />} />
                              <Route path="/regulations" element={<Regulations />} />
                              <Route path="/regulations/:id" element={<Regulations />} />
                              <Route path="/models" element={<Models />} />
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
