
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, Upload, CheckCircle2, AlertTriangle, HardHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link, useNavigate } from 'react-router-dom';

const DemoDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [chatMessages, setChatMessages] = useState([
        {
            role: 'assistant',
            content: "Hi there! I'm Paulie, your AI safety assistant. How can I help with workplace safety today?"
        }
    ]);
    const [messageInput, setMessageInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [analysisResults, setAnalysisResults] = useState(null);

    // Demo data
    const [tasks] = useState([
        { id: 1, title: 'Inspect scaffolding on Building A', status: 'Pending', priority: 'High', due: '2023-10-15' },
        { id: 2, title: 'Update emergency evacuation plan', status: 'Completed', priority: 'Medium', due: '2023-10-10' },
        { id: 3, title: 'Order replacement safety harnesses', status: 'In Progress', priority: 'High', due: '2023-10-18' },
    ]);

    const [violations] = useState([
        { id: 1, description: 'Missing hardhats in construction zone', severity: 'High', location: 'Building A, Floor 3' },
        { id: 2, description: 'Improper ladder placement near electrical panel', severity: 'Critical', location: 'Maintenance Area' },
    ]);

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;
        
        // Add user message
        setChatMessages([...chatMessages, {
            role: 'user',
            content: messageInput
        }]);
        
        setIsLoading(true);
        
        // Simulate AI response delay
        setTimeout(() => {
            const botResponse = {
                role: 'assistant',
                content: getAIResponse(messageInput)
            };
            
            setChatMessages(prev => [...prev, botResponse]);
            setIsLoading(false);
            setMessageInput('');
        }, 1000);
    };
    
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setUploadedFile(file);
            
            // Create a URL for the file preview
            const fileUrl = URL.createObjectURL(file);
            
            // Store the file data
            setUploadedFile({
                file,
                preview: fileUrl,
                name: file.name,
                type: file.type,
                size: (file.size / 1024).toFixed(2) + ' KB'
            });
        }
    };
    
    const handleAnalyzeFile = () => {
        if (!uploadedFile) return;
        
        setIsLoading(true);
        
        // Simulate analysis delay
        setTimeout(() => {
            setAnalysisComplete(true);
            setIsLoading(false);
            
            // Mock analysis results
            setAnalysisResults({
                violations: [
                    {
                        type: 'Missing Personal Protective Equipment',
                        severity: 'High',
                        regulation: 'OSHA 29 CFR 1926.100',
                        description: 'Worker(s) detected without proper head protection in designated hardhat area',
                        confidence: '94%'
                    }
                ],
                recommendations: [
                    'Ensure all workers wear appropriate hardhats in construction zones',
                    'Install additional signage to remind workers of PPE requirements',
                    'Schedule safety training refresher for all site personnel'
                ]
            });
        }, 2000);
    };
    
    const resetAnalysis = () => {
        setUploadedFile(null);
        setAnalysisComplete(false);
        setAnalysisResults(null);
    };

    // Simple AI response logic
    const getAIResponse = (message) => {
        message = message.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi')) {
            return "Hello! How can I help you with workplace safety today?";
        } else if (message.includes('hardhat') || message.includes('helmet')) {
            return "Hard hats are required in all construction areas. OSHA regulation 29 CFR 1926.100 mandates that employers must provide head protection equipment when workers are in areas where there is a possible danger of head injury.";
        } else if (message.includes('fall') || message.includes('height') || message.includes('edge')) {
            return "Fall protection is required when working at heights of 6 feet or more in construction (OSHA 29 CFR 1926.501). This includes guardrails, safety nets, or personal fall arrest systems.";
        } else if (message.includes('ppe') || message.includes('equipment')) {
            return "Personal Protective Equipment (PPE) requirements vary by job site. Common PPE includes hard hats, safety glasses, high-visibility clothing, gloves, and steel-toed boots. All PPE should meet ANSI standards.";
        } else if (message.includes('violation') || message.includes('report')) {
            return "To report a safety violation, document the issue with photos, note the location and time, and report it to your supervisor or safety officer. You can also submit violations through our system's 'Report Violation' feature.";
        } else {
            return "I'm here to help with safety questions and concerns. Could you provide more details about your safety inquiry?";
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <HardHat className="h-6 w-6 text-blue-500" />
                        <h1 className="text-xl font-bold">Thalos Safety Platform <span className="text-sm text-blue-500 ml-2">DEMO</span></h1>
                    </div>
                    <div className="flex space-x-4">
                        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Exit Demo
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                            Start Free Trial
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto p-4 pt-8">
                <div className="mb-8 bg-blue-900/20 p-4 border border-blue-800/30 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">🚀 Demo Environment</h2>
                    <p className="text-gray-300">
                        This is a demonstration of the Thalos Safety Platform with simulated data. 
                        Explore the dashboard, AI assistant, and violation detection features without creating an account.
                    </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                    <TabsList className="grid grid-cols-3 mb-8">
                        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                        <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
                        <TabsTrigger value="violation-detection">Violation Detection</TabsTrigger>
                    </TabsList>

                    {/* Dashboard Tab */}
                    <TabsContent value="dashboard" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Open Tasks</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-blue-500">3</div>
                                    <p className="text-gray-400 text-sm">2 high priority</p>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Safety Violations</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-red-500">2</div>
                                    <p className="text-gray-400 text-sm">1 critical severity</p>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Compliance Score</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-yellow-500">78%</div>
                                    <p className="text-gray-400 text-sm">+5% this month</p>
                                </CardContent>
                            </Card>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle>Priority Tasks</CardTitle>
                                    <CardDescription>Tasks requiring immediate attention</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {tasks.map(task => (
                                            <div key={task.id} className="p-3 bg-gray-700/50 rounded-lg border border-gray-700 flex justify-between">
                                                <div>
                                                    <h4 className="font-medium">{task.title}</h4>
                                                    <p className="text-sm text-gray-400">Due: {task.due}</p>
                                                </div>
                                                <div className={`px-2 py-1 rounded text-xs ${
                                                    task.priority === 'High' ? 'bg-red-900/50 text-red-300' : 
                                                    task.priority === 'Medium' ? 'bg-yellow-900/50 text-yellow-300' : 
                                                    'bg-green-900/50 text-green-300'
                                                }`}>
                                                    {task.priority}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle>Safety Violations</CardTitle>
                                    <CardDescription>Recently detected issues</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {violations.map(violation => (
                                            <div key={violation.id} className="p-3 bg-gray-700/50 rounded-lg border border-gray-700">
                                                <div className="flex justify-between mb-2">
                                                    <h4 className="font-medium">{violation.description}</h4>
                                                    <div className={`px-2 py-1 rounded text-xs ${
                                                        violation.severity === 'Critical' ? 'bg-red-900/50 text-red-300' : 
                                                        violation.severity === 'High' ? 'bg-orange-900/50 text-orange-300' : 
                                                        violation.severity === 'Medium' ? 'bg-yellow-900/50 text-yellow-300' : 
                                                        'bg-green-900/50 text-green-300'
                                                    }`}>
                                                        {violation.severity}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-400">{violation.location}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* AI Assistant Tab */}
                    <TabsContent value="ai-assistant">
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                                        <HardHat className="h-5 w-5 text-yellow-900" />
                                    </div>
                                    <div>
                                        <CardTitle>Paulie - AI Safety Assistant</CardTitle>
                                        <CardDescription>Ask questions about workplace safety and regulations</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80 mb-4 overflow-y-auto p-4 bg-gray-900 rounded-lg border border-gray-700">
                                    {chatMessages.map((msg, i) => (
                                        <div 
                                            key={i} 
                                            className={`mb-4 ${msg.role === 'assistant' ? 'flex' : 'flex justify-end'}`}
                                        >
                                            {msg.role === 'assistant' && (
                                                <div className="w-8 h-8 rounded-full bg-yellow-500 flex-shrink-0 mr-2"></div>
                                            )}
                                            <div 
                                                className={`p-3 rounded-lg max-w-[80%] ${
                                                    msg.role === 'assistant' 
                                                        ? 'bg-gray-800 text-white' 
                                                        : 'bg-blue-600 text-white ml-auto'
                                                }`}
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {isLoading && (
                                        <div className="flex mb-4">
                                            <div className="w-8 h-8 rounded-full bg-yellow-500 flex-shrink-0 mr-2"></div>
                                            <div className="p-3 rounded-lg bg-gray-800">
                                                <div className="flex space-x-2">
                                                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-150"></div>
                                                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-300"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex space-x-2">
                                    <Textarea 
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Ask about safety regulations, PPE requirements, or violation remediation..."
                                        className="flex-1 bg-gray-700 border-gray-600"
                                        disabled={isLoading}
                                        rows={3}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage();
                                            }
                                        }}
                                    />
                                    <Button 
                                        onClick={handleSendMessage}
                                        disabled={!messageInput.trim() || isLoading}
                                        className="bg-blue-600 hover:bg-blue-700 self-end"
                                    >
                                        Send
                                    </Button>
                                </div>
                                
                                <div className="mt-4 text-sm text-gray-400">
                                    <p>Try asking about:</p>
                                    <ul className="list-disc pl-5 mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <li>"What PPE is required for working with chemicals?"</li>
                                        <li>"What are OSHA requirements for fall protection?"</li>
                                        <li>"How do I report a safety violation?"</li>
                                        <li>"When are hardhats required on a worksite?"</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Violation Detection Tab */}
                    <TabsContent value="violation-detection">
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle>Safety Violation Detection</CardTitle>
                                <CardDescription>
                                    Upload an image to detect potential safety violations using AI
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {!analysisComplete ? (
                                    <div className="space-y-6">
                                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                                            {!uploadedFile ? (
                                                <>
                                                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                                                    <h3 className="text-lg font-medium mb-2">Upload Construction Site Image</h3>
                                                    <p className="text-gray-400 mb-4">
                                                        Upload a photo of a construction site to detect safety violations
                                                    </p>
                                                    <Button
                                                        onClick={() => document.getElementById('file-upload').click()}
                                                        className="bg-blue-600 hover:bg-blue-700"
                                                    >
                                                        Select Image
                                                    </Button>
                                                    <Input
                                                        id="file-upload"
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                    <p className="mt-4 text-sm text-gray-500">
                                                        Supported formats: JPEG, PNG, WebP
                                                    </p>
                                                </>
                                            ) : (
                                                <div className="space-y-4">
                                                    <img
                                                        src={uploadedFile.preview}
                                                        alt="Preview"
                                                        className="max-h-64 mx-auto rounded-lg"
                                                    />
                                                    <div className="text-sm text-gray-400">
                                                        <p>{uploadedFile.name} ({uploadedFile.size})</p>
                                                    </div>
                                                    <div className="flex space-x-4 justify-center">
                                                        <Button 
                                                            variant="outline" 
                                                            onClick={resetAnalysis}
                                                            disabled={isLoading}
                                                        >
                                                            Replace
                                                        </Button>
                                                        <Button 
                                                            className="bg-blue-600 hover:bg-blue-700"
                                                            onClick={handleAnalyzeFile}
                                                            disabled={isLoading}
                                                        >
                                                            {isLoading ? 'Analyzing...' : 'Analyze for Violations'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Demo helper text */}
                                        <div className="text-center p-3 bg-blue-900/30 rounded-lg">
                                            <p className="text-sm text-gray-300">
                                                This is a demo environment. Any image you upload will return simulated safety violation results.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="flex space-x-6">
                                            <div className="flex-shrink-0 w-1/3">
                                                <img
                                                    src={uploadedFile.preview}
                                                    alt="Analyzed image"
                                                    className="w-full rounded-lg border border-gray-700"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="mb-4 p-3 bg-red-900/30 border border-red-800/50 rounded-lg flex items-start">
                                                    <AlertTriangle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <h3 className="font-semibold text-red-400">Safety Violations Detected</h3>
                                                        <p className="text-sm text-gray-300">
                                                            Our AI has detected potential safety violations in this image
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    {analysisResults.violations.map((violation, i) => (
                                                        <div key={i} className="p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                                                            <div className="flex justify-between">
                                                                <h4 className="font-medium">{violation.type}</h4>
                                                                <span className="text-xs bg-red-900/70 text-red-300 px-2 py-1 rounded">
                                                                    {violation.severity} Severity
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-300 mt-1">
                                                                {violation.description}
                                                            </p>
                                                            <div className="mt-2 flex justify-between text-xs text-gray-400">
                                                                <span>Regulation: {violation.regulation}</span>
                                                                <span>Confidence: {violation.confidence}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-700">
                                            <h3 className="font-semibold mb-2 flex items-center">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                                                Recommended Actions
                                            </h3>
                                            <ul className="space-y-2">
                                                {analysisResults.recommendations.map((rec, i) => (
                                                    <li key={i} className="flex items-baseline">
                                                        <span className="text-blue-400 mr-2">•</span>
                                                        <span>{rec}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div className="flex justify-center space-x-4">
                                            <Button 
                                                variant="outline" 
                                                onClick={resetAnalysis}
                                            >
                                                Analyze Another Image
                                            </Button>
                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                                Create Safety Task
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default DemoDashboard;
