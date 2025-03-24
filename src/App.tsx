
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

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
import Regulations from "./pages/Regulations";
import Models from "./pages/Models";

// Layout
import Sidebar from "./components/layout/Sidebar";

const queryClient = new QueryClient();

const App = () => {
  const [userRole] = useState<'admin' | 'user'>('admin');

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public route */}
              <Route path="/auth" element={<Auth />} />

              {/* Protected routes with sidebar layout */}
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/*"
                  element={
                    <div className="flex h-screen w-full">
                      <Sidebar userRole={userRole} />
                      <div className="flex-1 overflow-hidden">
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
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </div>
                    </div>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
