
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, FileJson, Database, AlertTriangle, Lock } from 'lucide-react';

const ApiDocs = () => {
  const [copiedMethod, setCopiedMethod] = React.useState<string | null>(null);

  const handleCopy = (text: string, method: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMethod(method);
    setTimeout(() => setCopiedMethod(null), 2000);
  };

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="API Documentation" 
          subtitle="Integrate with Thalos using our comprehensive API"
          className="mb-8"
        />
        
        <div className="bg-card border border-border rounded-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            <div>
              <h2 className="text-2xl font-bold mb-2">Thalos API v1.0</h2>
              <p className="text-muted-foreground">
                Our RESTful API allows you to access Thalos data and functionality programmatically
              </p>
            </div>
            <div className="flex space-x-4">
              <Button>Getting Started</Button>
              <Button variant="outline">API Status</Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">API Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  <a href="#authentication" className="block py-2 px-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md">Authentication</a>
                  <a href="#violations" className="block py-2 px-3 hover:bg-muted rounded-md">Violations</a>
                  <a href="#tasks" className="block py-2 px-3 hover:bg-muted rounded-md">Tasks</a>
                  <a href="#risk-assessments" className="block py-2 px-3 hover:bg-muted rounded-md">Risk Assessments</a>
                  <a href="#reports" className="block py-2 px-3 hover:bg-muted rounded-md">Reports</a>
                  <a href="#users" className="block py-2 px-3 hover:bg-muted rounded-md">Users</a>
                  <a href="#webhooks" className="block py-2 px-3 hover:bg-muted rounded-md">Webhooks</a>
                  <a href="#pagination" className="block py-2 px-3 hover:bg-muted rounded-md">Pagination</a>
                  <a href="#errors" className="block py-2 px-3 hover:bg-muted rounded-md">Errors</a>
                </nav>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  <a href="#" className="block py-2 px-3 hover:bg-muted rounded-md">SDKs & Libraries</a>
                  <a href="#" className="block py-2 px-3 hover:bg-muted rounded-md">API Changelog</a>
                  <a href="#" className="block py-2 px-3 hover:bg-muted rounded-md">Rate Limits</a>
                  <a href="#" className="block py-2 px-3 hover:bg-muted rounded-md">Postman Collection</a>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-4">
            <div id="authentication" className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Authentication</h2>
              <p className="text-muted-foreground mb-6">
                The Thalos API uses OAuth 2.0 for authentication. You'll need to obtain an access token
                to make authenticated requests to the API endpoints.
              </p>
              
              <div className="bg-muted rounded-md p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">POST</Badge>
                    <code>/v1/auth/token</code>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleCopy('curl -X POST https://api.thalos.io/v1/auth/token \\\n-H "Content-Type: application/json" \\\n-d \'{\n  "client_id": "YOUR_CLIENT_ID",\n  "client_secret": "YOUR_CLIENT_SECRET",\n  "grant_type": "client_credentials"\n}\'', 'auth')}
                  >
                    {copiedMethod === 'auth' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm mb-2">Request an access token using your API credentials</p>
                
                <Tabs defaultValue="curl">
                  <TabsList className="mb-2">
                    <TabsTrigger value="curl">curl</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="node">Node.js</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="curl">
                    <pre className="bg-black text-white p-4 rounded-md overflow-x-auto text-sm">
{`curl -X POST https://api.thalos.io/v1/auth/token \\
-H "Content-Type: application/json" \\
-d '{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "grant_type": "client_credentials"
}'`}
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="python">
                    <pre className="bg-black text-white p-4 rounded-md overflow-x-auto text-sm">
{`import requests

url = "https://api.thalos.io/v1/auth/token"
payload = {
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "grant_type": "client_credentials"
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
data = response.json()
access_token = data["access_token"]`}
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="node">
                    <pre className="bg-black text-white p-4 rounded-md overflow-x-auto text-sm">
{`const axios = require('axios');

const getToken = async () => {
  try {
    const response = await axios.post('https://api.thalos.io/v1/auth/token', {
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET',
      grant_type: 'client_credentials'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Error obtaining token:', error);
  }
};`}
                    </pre>
                  </TabsContent>
                </Tabs>
                
                <h4 className="font-medium mt-4 mb-2">Response</h4>
                <pre className="bg-black text-white p-4 rounded-md overflow-x-auto text-sm">
{`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600
}`}
                </pre>
              </div>
              
              <h3 className="text-xl font-bold mb-4">Using the Token</h3>
              <p className="text-muted-foreground mb-4">
                Include the token in the Authorization header of your requests:
              </p>
              
              <pre className="bg-black text-white p-4 rounded-md overflow-x-auto text-sm mb-6">
{`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
              </pre>
              
              <div className="flex items-center space-x-2 p-4 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-md">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">
                  Keep your client secret secure. Never expose it in client-side code.
                </p>
              </div>
            </div>
            
            <div id="violations" className="mb-16">
              <div className="flex items-start space-x-2 mb-6">
                <FileJson className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">Violations API</h2>
                  <p className="text-muted-foreground">
                    Endpoints for managing safety violations detected by the Thalos platform.
                  </p>
                </div>
              </div>
              
              <div className="space-y-8">
                <ApiEndpoint 
                  method="GET"
                  endpoint="/v1/violations"
                  description="List all violations"
                  parameters={[
                    { name: "status", type: "string", description: "Filter by violation status (open, resolved, in_progress)" },
                    { name: "severity", type: "string", description: "Filter by severity (low, medium, high, critical)" },
                    { name: "location_id", type: "string", description: "Filter by location ID" },
                    { name: "page", type: "integer", description: "Page number for pagination" },
                    { name: "limit", type: "integer", description: "Number of results per page (default: 20, max: 100)" }
                  ]}
                  responseExample={`{
  "data": [
    {
      "id": "v-1234abcd",
      "title": "Missing Hard Hat",
      "description": "Worker detected without proper head protection",
      "severity": "high",
      "status": "open",
      "location_id": "loc-5678efgh",
      "created_at": "2025-07-15T10:30:00Z",
      "updated_at": "2025-07-15T10:30:00Z"
    },
    // More violations...
  ],
  "meta": {
    "total": 124,
    "page": 1,
    "limit": 20,
    "pages": 7
  }
}`}
                  copiedMethod={copiedMethod}
                  onCopy={handleCopy}
                />
                
                <ApiEndpoint 
                  method="POST"
                  endpoint="/v1/violations"
                  description="Create a new violation"
                  requestExample={`{
  "title": "Missing Safety Harness",
  "description": "Worker at height without safety harness",
  "severity": "critical",
  "location_id": "loc-5678efgh",
  "image_url": "https://storage.thalos.io/violations/image123.jpg"
}`}
                  responseExample={`{
  "id": "v-5678wxyz",
  "title": "Missing Safety Harness",
  "description": "Worker at height without safety harness",
  "severity": "critical",
  "status": "open",
  "location_id": "loc-5678efgh",
  "image_url": "https://storage.thalos.io/violations/image123.jpg",
  "created_at": "2025-07-16T14:20:00Z",
  "updated_at": "2025-07-16T14:20:00Z"
}`}
                  copiedMethod={copiedMethod}
                  onCopy={handleCopy}
                />
                
                <ApiEndpoint 
                  method="GET"
                  endpoint="/v1/violations/:id"
                  description="Get a specific violation by ID"
                  parameters={[
                    { name: "id", type: "string", description: "Violation ID", required: true }
                  ]}
                  responseExample={`{
  "id": "v-1234abcd",
  "title": "Missing Hard Hat",
  "description": "Worker detected without proper head protection",
  "severity": "high",
  "status": "open",
  "location_id": "loc-5678efgh",
  "created_at": "2025-07-15T10:30:00Z",
  "updated_at": "2025-07-15T10:30:00Z",
  "image_url": "https://storage.thalos.io/violations/image456.jpg",
  "detection_confidence": 0.92,
  "related_tasks": [
    {
      "id": "t-1234abcd",
      "title": "Address Missing Hard Hat Violation",
      "status": "in_progress"
    }
  ]
}`}
                  copiedMethod={copiedMethod}
                  onCopy={handleCopy}
                />
              </div>
              
              <Button variant="link" className="mt-4">View all Violations endpoints</Button>
            </div>
            
            <div className="text-center py-12 border border-dashed border-border rounded-lg">
              <Database className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Comprehensive API Documentation</h3>
              <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
                This page shows a preview of our API documentation. 
                For the complete reference including all endpoints, parameters, and examples,
                please visit our developer portal.
              </p>
              <Button>Visit Developer Portal</Button>
            </div>
            
            <div className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold mb-6">API Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-amber-500" />
                      Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Use HTTPS for all API requests</li>
                      <li>• Store API credentials securely</li>
                      <li>• Rotate client secrets regularly</li>
                      <li>• Use restricted API tokens for different services</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2 text-blue-500" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Implement proper error handling</li>
                      <li>• Use pagination for large datasets</li>
                      <li>• Cache responses when appropriate</li>
                      <li>• Use webhooks for real-time updates</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  description: string;
  parameters?: Array<{
    name: string;
    type: string;
    description: string;
    required?: boolean;
  }>;
  requestExample?: string;
  responseExample: string;
  copiedMethod: string | null;
  onCopy: (text: string, method: string) => void;
}

const ApiEndpoint = ({
  method,
  endpoint,
  description,
  parameters,
  requestExample,
  responseExample,
  copiedMethod,
  onCopy
}: ApiEndpointProps) => {
  const methodColorMap = {
    GET: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    POST: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    PUT: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    DELETE: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    PATCH: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="bg-muted p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Badge className={`mr-2 ${methodColorMap[method]}`}>{method}</Badge>
            <code className="font-mono">{endpoint}</code>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onCopy(`curl -X ${method} https://api.thalos.io${endpoint} -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`, `${method}-${endpoint}`)}
          >
            {copiedMethod === `${method}-${endpoint}` ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-sm mt-2">{description}</p>
      </div>
      
      {parameters && parameters.length > 0 && (
        <div className="p-4 border-t border-border">
          <h4 className="font-medium mb-2">Parameters</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Type</th>
                <th className="pb-2 font-medium">Description</th>
                <th className="pb-2 font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((param, index) => (
                <tr key={index} className="border-b border-border last:border-0">
                  <td className="py-2 font-mono">{param.name}</td>
                  <td className="py-2">{param.type}</td>
                  <td className="py-2">{param.description}</td>
                  <td className="py-2">{param.required ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {requestExample && (
        <div className="p-4 border-t border-border">
          <h4 className="font-medium mb-2">Request Body</h4>
          <pre className="bg-black text-white p-3 rounded-md overflow-x-auto text-sm">
            {requestExample}
          </pre>
        </div>
      )}
      
      <div className="p-4 border-t border-border">
        <h4 className="font-medium mb-2">Response</h4>
        <pre className="bg-black text-white p-3 rounded-md overflow-x-auto text-sm">
          {responseExample}
        </pre>
      </div>
    </div>
  );
};

export default ApiDocs;
