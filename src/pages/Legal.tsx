import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';

export default function Legal() {
  const [activeTab, setActiveTab] = useState("terms");
  
  const downloadDocument = (docName: string) => {
    // This would normally generate a PDF or download the document
    toast.info(`Downloading ${docName}...`);
  };
  
  return (
    <PageContainer>
      <PageTitle 
        title="Legal Documents"
        subtitle="Steel Toe Technologies legal documentation for Thalos platform"
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="dpa">DPA</TabsTrigger>
          <TabsTrigger value="acceptable">Acceptable Use</TabsTrigger>
          <TabsTrigger value="sla">SLA</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 gap-8">
          <Card className="border-gray-800 bg-[#161b22]">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <div>
                <CardTitle className="text-white text-xl">
                  {activeTab === "terms" && "Terms of Service"}
                  {activeTab === "privacy" && "Privacy Policy"}
                  {activeTab === "dpa" && "Data Processing Agreement"}
                  {activeTab === "acceptable" && "Acceptable Use Policy"}
                  {activeTab === "sla" && "Service Level Agreement"}
                </CardTitle>
                <CardDescription>
                  Last updated: {new Date().toLocaleDateString()}
                </CardDescription>
              </div>
              <Button 
                variant="outline"
                size="sm"
                className="border-gray-700 hover:bg-gray-800"
                onClick={() => downloadDocument(activeTab)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardHeader>
            
            <CardContent>
              <ScrollArea className="h-[60vh] w-full pr-4">
                <TabsContent value="terms" className="mt-0 space-y-4">
                  <h2 className="text-lg font-medium">TERMS OF SERVICE</h2>
                  <p className="text-sm text-gray-300">
                    Last Updated: {new Date().toLocaleDateString()}
                  </p>
                  
                  <div className="space-y-4 text-gray-300">
                    <section>
                      <h3 className="text-white font-medium mb-2">1. AGREEMENT TO TERMS</h3>
                      <p>
                        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Steel Toe Technologies, Inc. ("Company", "we", "us", or "our"), concerning your access to and use of the Thalos platform as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">2. INTELLECTUAL PROPERTY RIGHTS</h3>
                      <p>
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">3. USER REPRESENTATIONS</h3>
                      <p>
                        By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Service; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means; (4) you will not use the Site for any illegal or unauthorized purpose; and (5) your use of the Site will not violate any applicable law or regulation.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">CONTACT US</h3>
                      <p>
                        In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: support@steeltoe.com
                      </p>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="privacy" className="mt-0 space-y-4">
                  <h2 className="text-lg font-medium">PRIVACY POLICY</h2>
                  <p className="text-sm text-gray-300">
                    Last Updated: {new Date().toLocaleDateString()}
                  </p>
                  
                  <div className="space-y-4 text-gray-300">
                    <section>
                      <h3 className="text-white font-medium mb-2">1. WHAT INFORMATION DO WE COLLECT?</h3>
                      <p>
                        We collect information that you provide to us directly, information we obtain automatically when you use the Thalos platform, and information from third-party sources. This may include personal information such as your name, email address, phone number, company information, job title, and any other information you choose to provide.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">2. HOW DO WE USE YOUR INFORMATION?</h3>
                      <p>
                        We use the information we collect to provide, maintain, and improve the Thalos platform, to develop new services, to communicate with you, to process transactions, and for compliance and protection purposes, including enforcing our terms and policies.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">CONTACT US</h3>
                      <p>
                        If you have questions or comments about this privacy policy, please contact us at: privacy@steeltoe.com
                      </p>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="dpa" className="mt-0 space-y-4">
                  <h2 className="text-lg font-medium">DATA PROCESSING AGREEMENT</h2>
                  <p className="text-sm text-gray-300">
                    Last Updated: {new Date().toLocaleDateString()}
                  </p>
                  
                  <div className="space-y-4 text-gray-300">
                    <section>
                      <h3 className="text-white font-medium mb-2">1. SCOPE AND DEFINITIONS</h3>
                      <p>
                        This Data Processing Agreement ("DPA") forms part of the agreement for the provision of the Thalos platform between Steel Toe Technologies Inc. ("Processor") and the customer ("Controller") as identified in such agreement ("Principal Agreement").
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">2. PROCESSING OF CONTROLLER DATA</h3>
                      <p>
                        The Processor shall process Controller Data only on behalf of the Controller and in accordance with the Controller's documented instructions, including with regard to transfers of Controller Data to a third country or an international organization, unless required to do so by law.
                      </p>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="acceptable" className="mt-0 space-y-4">
                  <h2 className="text-lg font-medium">ACCEPTABLE USE POLICY</h2>
                  <p className="text-sm text-gray-300">
                    Last Updated: {new Date().toLocaleDateString()}
                  </p>
                  
                  <div className="space-y-4 text-gray-300">
                    <section>
                      <h3 className="text-white font-medium mb-2">1. PROHIBITED ACTIVITIES</h3>
                      <p>
                        You may not access or use the Thalos platform for any purpose other than that for which we make it available. The platform may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">2. USER GENERATED CONTRIBUTIONS</h3>
                      <p>
                        The Thalos platform may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the platform.
                      </p>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="sla" className="mt-0 space-y-4">
                  <h2 className="text-lg font-medium">SERVICE LEVEL AGREEMENT</h2>
                  <p className="text-sm text-gray-300">
                    Last Updated: {new Date().toLocaleDateString()}
                  </p>
                  
                  <div className="space-y-4 text-gray-300">
                    <section>
                      <h3 className="text-white font-medium mb-2">1. SERVICE AVAILABILITY</h3>
                      <p>
                        Steel Toe Technologies, Inc. will use commercially reasonable efforts to make the Thalos platform available with a Monthly Uptime Percentage of at least 99.9% during any monthly billing cycle ("Service Commitment").
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">2. DEFINITIONS</h3>
                      <p>
                        "Monthly Uptime Percentage" is calculated by subtracting from 100% the percentage of minutes during the month in which the Thalos platform was in the state of "Unavailable."
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">3. SERVICE CREDITS</h3>
                      <p>
                        If the Monthly Uptime Percentage drops below our Service Commitment in any monthly billing cycle, you will be eligible to receive a Service Credit according to the following schedule...
                      </p>
                    </section>
                  </div>
                </TabsContent>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </PageContainer>
  );
}
