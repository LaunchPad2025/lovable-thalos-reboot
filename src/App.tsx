import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import Home from './pages/Home';
import Signup from './pages/Signup';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Chatbot from './pages/Chatbot';
import ViolationsPage from './pages/ViolationsPage';
import Tasks from './pages/Tasks';
import Regulations from './pages/Regulations';
import Documents from './pages/Documents';
import Audits from './pages/Audits';
import RiskAssessment from './pages/RiskAssessment';
import Training from './pages/Training';
import Models from './pages/Models';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Subscription from './pages/Subscription';
import DocumentationRoutes from './pages/documentation/DocumentationRoutes';
import SidebarExamples from './pages/SidebarExamples';
import Demo from './pages/Demo';
import Legal from './pages/Legal';
import ComingSoon from './pages/ComingSoon';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from "@/components/ui/toaster"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import PaulieFeedback from './pages/feedback/PaulieFeedback';
import FinetuningExport from './pages/feedback/FinetuningExport';

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="app-container">
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/violations" element={<ViolationsPage />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/regulations" element={<Regulations />} />
                <Route path="/docs" element={<Documents />} />
                <Route path="/audits" element={<Audits />} />
                <Route path="/risk-assessment" element={<RiskAssessment />} />
                <Route path="/training" element={<Training />} />
                <Route path="/models" element={<Models />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/documentation/*" element={<DocumentationRoutes />} />
                <Route path="/sidebar-examples" element={<SidebarExamples />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/coming-soon" element={<ComingSoon />} />
                <Route path="/feedback" element={<PaulieFeedback />} />
                <Route path="/feedback/export" element={<FinetuningExport />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </QueryClientProvider>
          </AuthProvider>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
