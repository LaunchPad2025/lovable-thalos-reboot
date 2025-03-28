
import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Loading from "./components/ui/loading";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import "./App.css";

// Lazy loaded pages
const Auth = lazy(() => import("./pages/Auth"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Violations = lazy(() => import("./pages/violations/ViolationsPage"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Regulations = lazy(() => import("./pages/Regulations"));
const Admin = lazy(() => import("./pages/Admin"));
const Settings = lazy(() => import("./pages/Settings"));
const Training = lazy(() => import("./pages/training"));
const TrainingReview = lazy(() => import("./pages/training/TrainingReview"));
const MediaViolationTraining = lazy(() => import("./pages/training/MediaViolationTraining"));
const Home = lazy(() => import("./pages/Home"));
const Subscription = lazy(() => import("./pages/Subscription"));
const Chatbot = lazy(() => import("./pages/Chatbot"));
const RiskAssessment = lazy(() => import("./pages/RiskAssessment"));
const SidebarExamples = lazy(() => import("./pages/SidebarExamples"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Documentation pages
const DocumentationRoutes = lazy(() => import("./pages/documentation/DocumentationRoutes"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Main application routes */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="violations/*" element={<Violations />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="regulations" element={<Regulations />} />
              <Route path="admin/*" element={<Admin />} />
              <Route path="settings" element={<Settings />} />
              <Route path="training" element={<Training />} />
              <Route path="training/review" element={<TrainingReview />} />
              <Route path="training/media-violations" element={<MediaViolationTraining />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="chatbot" element={<Chatbot />} />
              <Route path="risk-assessment" element={<RiskAssessment />} />
              <Route path="sidebar-examples" element={<SidebarExamples />} />
              <Route path="documentation/*" element={<DocumentationRoutes />} />
            </Route>

            {/* Auth routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            {/* Catch-all for non-existent routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <Toaster />
      <SonnerToaster position="top-right" />
    </>
  );
}

export default App;
