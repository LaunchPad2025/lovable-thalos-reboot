
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from '@/components/ui/badge';
import { Download, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Legal() {
  const [activeTab, setActiveTab] = useState("terms");
  const lastUpdated = new Date().toLocaleDateString();
  
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
          <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
          <TabsTrigger value="dpa">Data Processing</TabsTrigger>
          <TabsTrigger value="acceptable">Acceptable Use</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 gap-8">
          <Card className="border-gray-800 bg-[#161b22]">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <div>
                <CardTitle className="text-white text-xl">
                  {activeTab === "terms" && "Terms of Service"}
                  {activeTab === "privacy" && "Privacy Policy"}
                  {activeTab === "cookies" && "Cookie Policy"}
                  {activeTab === "dpa" && "Data Processing Agreement"}
                  {activeTab === "acceptable" && "Acceptable Use Policy"}
                </CardTitle>
                <CardDescription>
                  Last updated: {lastUpdated}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-800">
                  <Timer className="h-3 w-3 mr-1" />
                  Download Feature Coming Soon
                </Badge>
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-gray-700 hover:bg-gray-800 opacity-60"
                  onClick={() => downloadDocument(activeTab)}
                  disabled
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <ScrollArea className="h-[60vh] w-full pr-4">
                <TabsContent value="terms" className="mt-0 space-y-4">
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
                      <h3 className="text-white font-medium mb-2">4. SERVICE DESCRIPTION</h3>
                      <p>
                        Thalos is an AI-powered workplace safety compliance platform that includes violation detection, task management, risk assessment, and compliance reporting tools designed to help organizations manage workplace safety.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">CONTACT US</h3>
                      <p>
                        If you have any questions about these Terms of Service, please contact us at: legal@steeltoetech.com
                      </p>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="privacy" className="mt-0 space-y-4">
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
                      <h3 className="text-white font-medium mb-2">3. HOW WE SHARE YOUR INFORMATION</h3>
                      <p>
                        We may share your information with service providers who perform services on our behalf, when required by law, in connection with a sale or merger of our company, or with your consent.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">CONTACT US</h3>
                      <p>
                        If you have questions or comments about this privacy policy, please contact us at: privacy@steeltoetech.com
                      </p>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="cookies" className="mt-0 space-y-4">
                  <div className="space-y-4 text-gray-300">
                    <section>
                      <h3 className="text-white font-medium mb-2">1. WHAT ARE COOKIES</h3>
                      <p>
                        Cookies are small text files that are stored on your browser or device when you visit a website. Cookies allow websites to recognize your browser or device and remember certain information about your visit.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">2. TYPES OF COOKIES WE USE</h3>
                      <p>
                        We use essential cookies for basic functionality, performance cookies to analyze site usage, functionality cookies to remember your preferences, and analytics cookies to improve our services.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">3. HOW TO MANAGE COOKIES</h3>
                      <p>
                        Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "options" or "preferences" menu of your browser. You can set your browser to refuse all cookies or to indicate when a cookie is being sent.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">CONTACT US</h3>
                      <p>
                        If you have questions about our Cookie Policy, please contact us at: privacy@steeltoetech.com
                      </p>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="dpa" className="mt-0 space-y-4">
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
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">3. CONFIDENTIALITY</h3>
                      <p>
                        The Processor shall ensure that persons authorized to process the Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">CONTACT US</h3>
                      <p>
                        If you have questions about this DPA, please contact us at: legal@steeltoetech.com
                      </p>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="acceptable" className="mt-0 space-y-4">
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
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">3. CONTRIBUTION LICENSE</h3>
                      <p>
                        By posting your Contributions to any part of the Site, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, and display your Contributions in any form.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-white font-medium mb-2">CONTACT US</h3>
                      <p>
                        If you have questions about our Acceptable Use Policy, please contact us at: legal@steeltoetech.com
                      </p>
                    </section>
                  </div>
                </TabsContent>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </Tabs>
      
      <div className="text-center mt-8 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Steel Toe Technologies, Inc. All rights reserved.</p>
      </div>
    </PageContainer>
  );
}
