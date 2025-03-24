
import React, { useState } from 'react';
import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/ui/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Shield, Scale, AlertTriangle, Clock } from 'lucide-react';

const Legal = () => {
  const [activeTab, setActiveTab] = useState("terms");
  
  return (
    <PageContainer>
      <PageTitle
        title="Legal Documents"
        subtitle="Review our terms of service, privacy policy, and other legal documents."
      />
      
      <div className="mt-6">
        <Tabs
          defaultValue="terms"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-6">
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="dpa">DPA</TabsTrigger>
            <TabsTrigger value="acceptable-use">Acceptable Use</TabsTrigger>
            <TabsTrigger value="sla">SLA</TabsTrigger>
          </TabsList>
          
          <Card className="border-gray-200">
            <CardContent className="pt-6">
              <TabsContent value="terms" className="mt-0">
                <div className="prose prose-sm max-w-none">
                  <h2 className="text-xl font-bold flex items-center"><FileText className="mr-2" /> Terms of Service</h2>
                  <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  
                  <h3 className="text-lg font-semibold mt-6">1. Introduction</h3>
                  <p>These Terms of Service ("Terms") govern your access to and use of Thalos ("Service"), an enterprise workplace safety platform provided by Steel Toe Technologies ("Company", "we", "our", or "us").</p>
                  
                  <h3 className="text-lg font-semibold mt-6">2. Accepting these Terms</h3>
                  <p>By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">3. Changes to these Terms</h3>
                  <p>We may modify these Terms at any time. If we do so, we'll let you know either by posting the modified Terms on the Site or through other communications. It's important that you review the Terms whenever we modify them because if you continue to use the Service after we have posted modified Terms on the Site, you are indicating to us that you agree to be bound by the modified Terms.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">4. Using the Service</h3>
                  <p>Thalos is a workplace safety platform designed to help organizations manage safety compliance, analyze documents, and identify potential safety violations using AI technology.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">5. Privacy</h3>
                  <p>Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection, use, and disclosure of your personal information.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">6. Security</h3>
                  <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">7. Your Responsibilities</h3>
                  <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">8. Termination</h3>
                  <p>We may terminate or suspend your access to all or part of the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">9. Limitation of Liability</h3>
                  <p>In no event shall Steel Toe Technologies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">10. Contact Us</h3>
                  <p>If you have any questions about these Terms, please contact us.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-0">
                <div className="prose prose-sm max-w-none">
                  <h2 className="text-xl font-bold flex items-center"><Shield className="mr-2" /> Privacy Policy</h2>
                  <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  
                  <h3 className="text-lg font-semibold mt-6">1. Introduction</h3>
                  <p>Steel Toe Technologies ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Steel Toe Technologies when you use our Thalos platform ("Service").</p>
                  
                  <h3 className="text-lg font-semibold mt-6">2. Information We Collect</h3>
                  <p>We collect information that you provide directly to us, such as when you create an account, submit documents for analysis, or communicate with us. This may include your name, email address, password, company information, and any other information you choose to provide.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">3. How We Use Your Information</h3>
                  <p>We use the information we collect to provide, maintain, and improve our Service, to process your requests, to send you technical notices and support messages, to communicate with you about products, services, offers, and events, and for other legitimate business purposes.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">4. Sharing of Information</h3>
                  <p>We may share your information with third-party vendors and service providers who perform services on our behalf, such as cloud storage providers, payment processors, and analytics services. We may also share information if required by law or if we believe that such action is necessary to comply with the law or legal process.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">5. Data Security</h3>
                  <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. However, no security system is impenetrable, and we cannot guarantee the security of our systems.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">6. Your Rights</h3>
                  <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your personal information, or to object to or restrict certain processing of your personal information.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">7. Changes to this Privacy Policy</h3>
                  <p>We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">8. Contact Us</h3>
                  <p>If you have any questions about this Privacy Policy, please contact us.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="dpa" className="mt-0">
                <div className="prose prose-sm max-w-none">
                  <h2 className="text-xl font-bold flex items-center"><FileText className="mr-2" /> Data Processing Agreement (DPA)</h2>
                  <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  
                  <h3 className="text-lg font-semibold mt-6">1. Introduction</h3>
                  <p>This Data Processing Agreement ("DPA") forms part of the Terms of Service between you ("Data Controller") and Steel Toe Technologies ("Data Processor") regarding the processing of personal data in connection with the Thalos service.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">2. Definitions</h3>
                  <p>"Personal Data," "Processing," "Data Controller," "Data Processor," and "Data Subject" shall have the meanings given to them in applicable data protection laws.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">3. Processing of Personal Data</h3>
                  <p>The Data Processor shall process Personal Data only on documented instructions from the Data Controller, unless required to do so by law. The Data Processor shall ensure that persons authorized to process the Personal Data have committed themselves to confidentiality.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">4. Security Measures</h3>
                  <p>The Data Processor shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including the ability to ensure the ongoing confidentiality, integrity, availability, and resilience of processing systems and services.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">5. Sub-processors</h3>
                  <p>The Data Processor shall not engage another processor without prior authorization of the Data Controller. Where the Data Processor engages another processor, it shall impose the same data protection obligations as set out in this DPA.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">6. Data Subject Rights</h3>
                  <p>The Data Processor shall assist the Data Controller in responding to requests from Data Subjects exercising their rights under applicable data protection laws.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">7. Data Breach Notification</h3>
                  <p>The Data Processor shall notify the Data Controller without undue delay after becoming aware of a personal data breach and shall assist the Data Controller in ensuring compliance with its obligations regarding the security of personal data.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">8. Return or Deletion of Data</h3>
                  <p>At the choice of the Data Controller, the Data Processor shall delete or return all the Personal Data to the Data Controller after the end of the provision of services relating to processing, and delete existing copies unless storage is required by law.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="acceptable-use" className="mt-0">
                <div className="prose prose-sm max-w-none">
                  <h2 className="text-xl font-bold flex items-center"><AlertTriangle className="mr-2" /> Acceptable Use Policy</h2>
                  <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  
                  <h3 className="text-lg font-semibold mt-6">1. Introduction</h3>
                  <p>This Acceptable Use Policy ("Policy") outlines the acceptable use of the Thalos service provided by Steel Toe Technologies. By using our Service, you agree to comply with this Policy.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">2. Prohibited Activities</h3>
                  <p>You agree not to use the Service to:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe the intellectual property rights of others</li>
                    <li>Transmit any material that is harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
                    <li>Distribute malware or engage in any other malicious computer activity</li>
                    <li>Interfere with or disrupt the integrity or performance of the Service</li>
                    <li>Attempt to gain unauthorized access to the Service or its related systems or networks</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-6">3. Content Guidelines</h3>
                  <p>You are solely responsible for all documents, data, and information that you upload, post, or otherwise make available via the Service. You agree that you will not upload content that:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Contains sensitive personal data without proper authorization</li>
                    <li>Infringes any third party's intellectual property rights</li>
                    <li>Violates any party's confidentiality or privacy rights</li>
                    <li>Contains any unlawful, harmful, threatening, or otherwise objectionable material</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-6">4. System Integrity</h3>
                  <p>You agree not to:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Attempt to probe, scan, or test the vulnerability of the Service</li>
                    <li>Breach or otherwise circumvent any security or authentication measures</li>
                    <li>Access, tamper with, or use non-public areas of the Service</li>
                    <li>Interfere with any user's access to the Service</li>
                    <li>Overload, flood, spam, or mail-bomb the Service</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-6">5. Enforcement</h3>
                  <p>We reserve the right to investigate and take appropriate legal action against anyone who, in our sole discretion, violates this Policy, including removing prohibited content, suspending or terminating the account of such violators, and reporting to law enforcement authorities.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">6. Modifications</h3>
                  <p>We may revise this Policy from time to time. The most current version will always be posted on our website. By continuing to access or use the Service after revisions become effective, you agree to be bound by the revised Policy.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="sla" className="mt-0">
                <div className="prose prose-sm max-w-none">
                  <h2 className="text-xl font-bold flex items-center"><Clock className="mr-2" /> Service Level Agreement (SLA)</h2>
                  <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  
                  <h3 className="text-lg font-semibold mt-6">1. Service Commitment</h3>
                  <p>Steel Toe Technologies ("we" or "us") is committed to providing a highly available and reliable service for Thalos ("Service"). This Service Level Agreement ("SLA") describes our service level commitments to you.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">2. Service Availability</h3>
                  <p>We will use commercially reasonable efforts to make the Service available with a Monthly Uptime Percentage of at least 99.9% during any monthly billing cycle ("Service Commitment").</p>
                  
                  <h3 className="text-lg font-semibold mt-6">3. Definitions</h3>
                  <p>"Monthly Uptime Percentage" means the total number of minutes in a month, minus the number of minutes of Downtime experienced in a month, divided by the total number of minutes in a month.</p>
                  <p>"Downtime" means the number of minutes during which the Service is unavailable. Downtime does not include unavailability that results from (a) scheduled maintenance, (b) force majeure events, (c) failures of your internet connectivity or your equipment, (d) your failure to comply with the Terms of Service, or (e) any suspension or termination of your right to use the Service in accordance with the Terms of Service.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">4. Service Credits</h3>
                  <p>If we do not meet the Service Commitment, you will be eligible to receive a Service Credit as described below:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Monthly Uptime Percentage less than 99.9% but equal to or greater than 99.0%: 10% of monthly fee as Service Credit</li>
                    <li>Monthly Uptime Percentage less than 99.0% but equal to or greater than 95.0%: 25% of monthly fee as Service Credit</li>
                    <li>Monthly Uptime Percentage less than 95.0%: 50% of monthly fee as Service Credit</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-6">5. Credit Request and Payment Procedures</h3>
                  <p>To receive a Service Credit, you must submit a claim by sending an email to our support team. To be eligible, the credit request must be received by us within 30 calendar days after the incident occurred and must include your account information and the dates and times of the unavailability of the Service.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">6. Limitations</h3>
                  <p>Service Credits are your sole and exclusive remedy for any failure by us to meet the Service Commitment. Service Credits will be applied only against future payments otherwise due from you for the Service and will not entitle you to any refund or other payment. Service Credits may not be transferred or applied to any other account.</p>
                  
                  <h3 className="text-lg font-semibold mt-6">7. Modifications</h3>
                  <p>We reserve the right to modify this SLA at any time, provided that we will provide at least 30 days' advance notice of any material changes to this SLA by posting a notice on our website.</p>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Legal;
