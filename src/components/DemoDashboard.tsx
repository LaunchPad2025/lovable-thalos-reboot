
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { 
  ArrowLeft, 
  Bell, 
  ChevronRight, 
  HardHat, 
  Home, 
  Upload, 
  FileText, 
  Calendar, 
  BarChart2, 
  CheckSquare, 
  Settings, 
  Shield,
  MessageSquare
} from 'lucide-react';

import ChatInterface from './chatbot/ChatInterface';
import ViolationUpload from './violations/ViolationUpload';
import ViolationResults from './violations/ViolationResults';
import { useViolationAnalysisContext } from './violations/ViolationAnalysisProvider';
import { ViolationAnalysisProvider } from './violations/ViolationAnalysisProvider';

const DemoHeader = () => {
  const navigate = useNavigate();
  
  return (
    <header className="border-b border-gray-800 bg-[#0d1117] text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-4 text-gray-400 hover:text-white" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-xl font-bold flex items-center">
            <Shield className="mr-2 h-5 w-5 text-blue-500" />
            Thalos <span className="ml-2 text-sm bg-yellow-600 text-white px-2 py-0.5 rounded-full">Demo Mode</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-white relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-medium">DU</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const DemoSidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  return (
    <div className="w-64 bg-gray-900 text-white h-full border-r border-gray-800">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Shield className="h-6 w-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-bold">Thalos</h2>
        </div>
        
        <nav className="space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center w-full px-3 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab('violations')} 
            className={`flex items-center w-full px-3 py-2 rounded-md ${activeTab === 'violations' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Shield className="h-5 w-5 mr-3" />
            Violations
          </button>
          
          <button 
            onClick={() => setActiveTab('chatbot')} 
            className={`flex items-center w-full px-3 py-2 rounded-md ${activeTab === 'chatbot' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <MessageSquare className="h-5 w-5 mr-3" />
            AI Assistant
          </button>
          
          <button 
            className="flex items-center w-full px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white opacity-70 cursor-not-allowed"
            disabled
          >
            <CheckSquare className="h-5 w-5 mr-3" />
            Tasks
            <span className="ml-2 text-xs bg-gray-700 px-1.5 py-0.5 rounded">Demo</span>
          </button>
          
          <button 
            className="flex items-center w-full px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white opacity-70 cursor-not-allowed"
            disabled
          >
            <FileText className="h-5 w-5 mr-3" />
            Documents
            <span className="ml-2 text-xs bg-gray-700 px-1.5 py-0.5 rounded">Demo</span>
          </button>
          
          <button 
            className="flex items-center w-full px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white opacity-70 cursor-not-allowed"
            disabled
          >
            <BarChart2 className="h-5 w-5 mr-3" />
            Reports
            <span className="ml-2 text-xs bg-gray-700 px-1.5 py-0.5 rounded">Demo</span>
          </button>
          
          <button 
            className="flex items-center w-full px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white opacity-70 cursor-not-allowed"
            disabled
          >
            <Calendar className="h-5 w-5 mr-3" />
            Training
            <span className="ml-2 text-xs bg-gray-700 px-1.5 py-0.5 rounded">Demo</span>
          </button>
          
          <button 
            className="flex items-center w-full px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white opacity-70 cursor-not-allowed"
            disabled
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
            <span className="ml-2 text-xs bg-gray-700 px-1.5 py-0.5 rounded">Demo</span>
          </button>
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-800">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() => window.open('https://cal.com/annieeser/30min', '_blank', 'noopener,noreferrer')}
        >
          Get Started
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const DemoDashboardContent = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-800/40">
        <h2 className="text-2xl font-bold mb-2">Welcome to Thalos Demo</h2>
        <p className="text-gray-300 mb-4">
          This is a demonstration of the Thalos workplace safety platform. Explore the features below to see how Thalos can help your organization.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Button 
            variant="outline" 
            className="flex items-center justify-center p-4 h-auto border-blue-700/50 bg-blue-900/20 hover:bg-blue-900/30"
            onClick={() => window.open('https://cal.com/annieeser/30min', '_blank', 'noopener,noreferrer')}
          >
            <div className="flex flex-col items-center text-center">
              <Calendar className="h-8 w-8 mb-2 text-blue-400" />
              <span className="text-lg font-medium">Schedule a Demo</span>
              <span className="text-sm text-gray-400 mt-1">Get a personalized walkthrough</span>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center p-4 h-auto border-blue-700/50 bg-blue-900/20 hover:bg-blue-900/30 cursor-not-allowed opacity-70"
            disabled
          >
            <div className="flex flex-col items-center text-center">
              <FileText className="h-8 w-8 mb-2 text-blue-400" />
              <span className="text-lg font-medium">Documentation</span>
              <span className="text-sm text-gray-400 mt-1">Demo Only - Not Interactive</span>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center p-4 h-auto border-blue-700/50 bg-blue-900/20 hover:bg-blue-900/30 cursor-not-allowed opacity-70"
            disabled
          >
            <div className="flex flex-col items-center text-center">
              <BarChart2 className="h-8 w-8 mb-2 text-blue-400" />
              <span className="text-lg font-medium">Analytics</span>
              <span className="text-sm text-gray-400 mt-1">Demo Only - Not Interactive</span>
            </div>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-blue-400 mr-2" />
            <h3 className="text-xl font-bold">Recent Violations</h3>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-900/60 rounded-lg border border-gray-700">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                  <div>
                    <p className="font-medium">
                      {i === 0 ? 'Missing guardrail on scaffold' : 
                       i === 1 ? 'Improper chemical storage' : 
                       'Blocked emergency exit'}
                    </p>
                    <p className="text-sm text-gray-400">
                      {i === 0 ? 'Construction Site A' : 
                       i === 1 ? 'Chemical Storage Room' : 
                       'Building C, Floor 2'}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  i === 0 ? 'bg-red-900/30 text-red-400' : 
                  i === 1 ? 'bg-yellow-900/30 text-yellow-400' : 
                  'bg-green-900/30 text-green-400'
                }`}>
                  {i === 0 ? 'Critical' : i === 1 ? 'High' : 'Resolved'}
                </span>
              </div>
            ))}
            <div className="pt-2 text-center">
              <span className="text-sm text-gray-400">Demo data - not interactive</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center mb-4">
            <HardHat className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="text-xl font-bold">Ask Paulie</h3>
          </div>
          <div className="bg-gray-900/60 rounded-lg border border-gray-700 p-3 mb-4">
            <p className="font-medium">Try asking Paulie about:</p>
            <ul className="text-sm text-gray-300 mt-2 space-y-1 list-disc pl-4">
              <li>"What PPE is required for welding operations?"</li>
              <li>"How to handle a chemical spill safely?"</li>
              <li>"What are OSHA requirements for fall protection?"</li>
            </ul>
          </div>
          <Button 
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
            onClick={() => document.getElementById('chatbot-tab-trigger')?.click()}
          >
            Chat with Paulie
            <MessageSquare className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Upload className="h-6 w-6 text-blue-400 mr-2" />
            <h3 className="text-xl font-bold">Safety Violation Detection</h3>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => document.getElementById('violations-tab-trigger')?.click()}
          >
            Try Detection
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <p className="text-gray-300 mb-4">
          Upload images to analyze them for potential safety violations. Our AI will detect safety issues and provide recommendations.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-gray-900/60 rounded-lg border border-gray-700 p-3 flex-1 min-w-[200px]">
            <div className="text-center py-8">
              <Upload className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Upload an image to analyze</p>
            </div>
          </div>
          <div className="bg-gray-900/60 rounded-lg border border-gray-700 p-3 flex-1 min-w-[200px]">
            <div className="text-center py-8">
              <Shield className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Get AI-powered violation detection</p>
            </div>
          </div>
          <div className="bg-gray-900/60 rounded-lg border border-gray-700 p-3 flex-1 min-w-[200px]">
            <div className="text-center py-8">
              <CheckSquare className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Receive remediation guidance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DemoDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [violationResults, setViolationResults] = useState<any>(null);

  // Handler for violation detection completion
  const handleViolationDetected = (results: any) => {
    setViolationResults(results);
    setActiveTab('violations-results');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <DemoHeader />
      
      <div className="flex flex-1">
        <DemoSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
            <TabsList className="sr-only">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger id="violations-tab-trigger" value="violations">Violations</TabsTrigger>
              <TabsTrigger id="chatbot-tab-trigger" value="chatbot">Chatbot</TabsTrigger>
              <TabsTrigger value="violations-results">Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="h-full">
              <DemoDashboardContent />
            </TabsContent>
            
            <TabsContent value="violations" className="p-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Shield className="mr-2 h-6 w-6 text-blue-500" />
                  Safety Violation Detection
                </h2>
                
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <p className="text-gray-300 mb-6">
                    Upload an image to detect potential safety violations. Our AI will analyze the image and highlight issues.
                  </p>
                  
                  <ViolationAnalysisProvider>
                    <ViolationUpload
                      onUploadComplete={handleViolationDetected}
                      userIndustry="Construction"
                      hideModelSelection={true}
                    />
                  </ViolationAnalysisProvider>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chatbot" className="p-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <HardHat className="mr-2 h-6 w-6 text-yellow-500" />
                  Ask Paulie - AI Safety Assistant
                </h2>
                
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="mb-6">
                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-900/30 text-yellow-400 text-sm mb-4">
                      <HardHat className="mr-1 h-4 w-4" />
                      <span>Demo Mode</span>
                    </div>
                    <p className="text-gray-300">
                      Ask Paulie about workplace safety regulations, hazard identification, or remediation steps. 
                      Try questions like "What PPE is required for welding?" or "How to handle chemical spills safely?"
                    </p>
                  </div>
                  
                  <div className="h-[600px] border border-gray-700 rounded-lg overflow-hidden">
                    <ChatInterface />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="violations-results" className="p-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Shield className="mr-2 h-6 w-6 text-blue-500" />
                  Violation Analysis Results
                </h2>
                
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  {violationResults ? (
                    <ViolationResults 
                      results={[
                        {
                          id: `demo-${Date.now()}`,
                          severity: violationResults.severity || 'medium',
                          image_url: violationResults.imagePreview,
                          timestamp: new Date().toISOString(),
                          detections: violationResults.detections || [],
                          description: violationResults.description || "Safety violation detected",
                          location: violationResults.location || "Construction Site",
                          regulationIds: violationResults.regulationIds || ["29 CFR 1926.100"],
                        }
                      ]} 
                      onSave={() => {
                        // In demo mode, we'll just show a message instead of saving
                        alert("This action would save the violation in a real environment. This is demo mode.");
                      }}
                    />
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-400">
                        No violation analysis results available. Please upload an image for analysis.
                      </p>
                      <Button 
                        className="mt-4 bg-blue-600 hover:bg-blue-700"
                        onClick={() => setActiveTab('violations')}
                      >
                        Go to Violation Detection
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <footer className="bg-[#0d1117] border-t border-gray-800 p-4 text-center text-gray-400 text-sm">
        <div className="container mx-auto">
          Thalos Demo Mode | <a href="/" className="text-blue-400 hover:underline">Exit Demo</a> | 
          <Button 
            variant="link" 
            className="text-blue-400 p-0 mx-1 h-auto"
            onClick={() => window.open('https://cal.com/annieeser/30min', '_blank', 'noopener,noreferrer')}
          >
            Schedule a Full Demo
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default DemoDashboard;
