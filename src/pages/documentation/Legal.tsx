
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

const Legal = () => {
  const [lastUpdated] = useState('July 15, 2025');

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <PageTitle 
          title="Legal & Privacy" 
          subtitle="Important information about your rights and our obligations"
          className="mb-8"
        />
        
        <div className="text-center mb-8">
          <Badge variant="outline">Last Updated: {lastUpdated}</Badge>
        </div>
        
        <Tabs defaultValue="terms">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
            <TabsTrigger value="dpa">Data Processing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="terms" className="space-y-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h2>Terms of Service</h2>
              
              <p>Welcome to Thalos, provided by Thalos Technologies Inc. ("Thalos," "we," "us," or "our"). By accessing or using our services, you agree to be bound by these Terms of Service ("Terms").</p>
              
              <h3>1. Acceptance of Terms</h3>
              <p>By accessing or using Thalos, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our services.</p>
              
              <h3>2. Description of Services</h3>
              <p>Thalos is an AI-powered workplace safety compliance platform that includes violation detection, task management, risk assessment, and compliance reporting tools designed to help organizations manage workplace safety.</p>
              
              <h3>3. Account Registration</h3>
              <p>To use Thalos, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account and to update your information as necessary.</p>
              
              <h3>4. License and Restrictions</h3>
              <p>Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and use Thalos for your internal business purposes. You may not:</p>
              <ul>
                <li>Copy, modify, or create derivative works of Thalos</li>
                <li>Reverse engineer, decompile, or attempt to discover the source code of Thalos</li>
                <li>Use Thalos for any illegal purpose or in violation of any applicable laws</li>
                <li>Access Thalos through automated means without our prior written consent</li>
                <li>Sell, resell, license, sublicense, or transfer your access to Thalos</li>
              </ul>
              
              <h3>5. Data and Privacy</h3>
              <p>Our collection and use of your data is governed by our Privacy Policy. By using Thalos, you consent to our collection, use, and processing of your data as described in the Privacy Policy.</p>
              
              <h3>6. Intellectual Property</h3>
              <p>Thalos and all related intellectual property rights are owned by Thalos Technologies Inc. or its licensors. Nothing in these Terms grants you any rights to our intellectual property except for the limited license described above.</p>
              
              <h3>7. Confidentiality</h3>
              <p>You agree to keep confidential any non-public information about Thalos that we disclose to you. You will not use or disclose this information except as necessary to use Thalos as permitted under these Terms.</p>
              
              <h3>8. Fees and Payment</h3>
              <p>The fees for using Thalos are set forth on our pricing page or in a separate order form. You agree to pay all fees associated with your use of Thalos. All fees are non-refundable unless expressly stated otherwise.</p>
              
              <h3>9. Term and Termination</h3>
              <p>These Terms will remain in effect until terminated. We may suspend or terminate your access to Thalos at any time for any reason without notice. You may terminate these Terms by discontinuing use of Thalos and canceling your account.</p>
              
              <h3>10. Disclaimer of Warranties</h3>
              <p>Thalos is provided "as is" and "as available" without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
              
              <h3>11. Limitation of Liability</h3>
              <p>To the maximum extent permitted by law, Thalos Technologies Inc. will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of Thalos.</p>
              
              <h3>12. Indemnification</h3>
              <p>You agree to indemnify and hold harmless Thalos Technologies Inc. and its officers, directors, employees, and agents from any claims, damages, liabilities, costs, and expenses arising out of or related to your use of Thalos or violation of these Terms.</p>
              
              <h3>13. Governing Law</h3>
              <p>These Terms will be governed by and construed in accordance with the laws of the Commonwealth of Massachusetts, without regard to its conflict of laws principles.</p>
              
              <h3>14. Changes to Terms</h3>
              <p>We may update these Terms from time to time. If we make material changes, we will notify you through Thalos or by other means. Your continued use of Thalos after the changes are effective constitutes your acceptance of the revised Terms.</p>
              
              <h3>15. Contact Information</h3>
              <p>If you have any questions about these Terms, please contact us at legal@thalostech.io.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h2>Privacy Policy</h2>
              
              <p>Thalos Technologies Inc. ("Thalos," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Thalos platform.</p>
              
              <h3>1. Information We Collect</h3>
              <p>We collect the following types of information:</p>
              <ul>
                <li><strong>Account Information:</strong> When you register for Thalos, we collect your name, email address, company name, and other information necessary to create and maintain your account.</li>
                <li><strong>Usage Information:</strong> We collect information about how you use Thalos, including log data, device information, and analytics data.</li>
                <li><strong>Content:</strong> We collect the content you upload to Thalos, such as images, videos, documents, and other files related to workplace safety.</li>
                <li><strong>Communications:</strong> If you contact us directly, we may collect information about your communication and our response.</li>
              </ul>
              
              <h3>2. How We Use Your Information</h3>
              <p>We use your information for the following purposes:</p>
              <ul>
                <li>To provide, maintain, and improve Thalos</li>
                <li>To process your transactions and manage your account</li>
                <li>To send you technical notices, updates, security alerts, and administrative messages</li>
                <li>To respond to your comments, questions, and customer service requests</li>
                <li>To develop new products and services</li>
                <li>To monitor and analyze usage patterns and trends</li>
                <li>To protect the safety and security of Thalos and our users</li>
                <li>To comply with legal obligations</li>
              </ul>
              
              <h3>3. How We Share Your Information</h3>
              <p>We may share your information in the following circumstances:</p>
              <ul>
                <li><strong>With Service Providers:</strong> We may share your information with third-party vendors who provide services on our behalf, such as hosting, data analysis, payment processing, and customer service.</li>
                <li><strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to valid requests from public authorities.</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><strong>With Your Consent:</strong> We may share your information with third parties when you have given us your consent to do so.</li>
              </ul>
              
              <h3>4. Data Security</h3>
              <p>We implement appropriate technical and organizational measures to protect your information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
              
              <h3>5. Data Retention</h3>
              <p>We retain your information for as long as necessary to provide you with Thalos and to comply with our legal obligations. When we no longer need to use your information, we will securely delete or anonymize it.</p>
              
              <h3>6. Your Rights</h3>
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul>
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate or incomplete information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to the processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>To exercise these rights, please contact us at privacy@thalostech.io.</p>
              
              <h3>7. Children's Privacy</h3>
              <p>Thalos is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children.</p>
              
              <h3>8. International Data Transfers</h3>
              <p>Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have different data protection laws. We will take appropriate safeguards to ensure that your information remains protected.</p>
              
              <h3>9. Changes to This Privacy Policy</h3>
              <p>We may update this Privacy Policy from time to time. If we make material changes, we will notify you through Thalos or by other means. Your continued use of Thalos after the changes are effective constitutes your acceptance of the revised Privacy Policy.</p>
              
              <h3>10. Contact Information</h3>
              <p>If you have any questions about this Privacy Policy, please contact us at privacy@thalostech.io.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="cookies" className="space-y-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h2>Cookie Policy</h2>
              
              <p>This Cookie Policy explains how Thalos Technologies Inc. ("Thalos," "we," "us," or "our") uses cookies and similar technologies on the Thalos platform.</p>
              
              <h3>1. What Are Cookies</h3>
              <p>Cookies are small text files that are stored on your browser or device when you visit a website. Cookies allow websites to recognize your browser or device and remember certain information about your visit.</p>
              
              <h3>2. Types of Cookies We Use</h3>
              <p>We use the following types of cookies:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> These cookies are necessary for Thalos to function properly. They enable core functionality such as security, network management, and account access.</li>
                <li><strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with Thalos by collecting information about which pages are visited most often and if users encounter any errors.</li>
                <li><strong>Functionality Cookies:</strong> These cookies allow Thalos to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.</li>
                <li><strong>Analytics Cookies:</strong> These cookies collect information about how visitors use Thalos, including which pages are visited most often and how users navigate through the site.</li>
              </ul>
              
              <h3>3. Third-Party Cookies</h3>
              <p>We may allow third-party service providers to place cookies on your device when you use Thalos. These cookies are used to provide additional functionality, analyze usage, and assist with marketing efforts.</p>
              
              <h3>4. How to Manage Cookies</h3>
              <p>Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "options" or "preferences" menu of your browser. You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you disable cookies, some features of Thalos may not function properly.</p>
              
              <h3>5. Changes to This Cookie Policy</h3>
              <p>We may update this Cookie Policy from time to time. If we make material changes, we will notify you through Thalos or by other means. Your continued use of Thalos after the changes are effective constitutes your acceptance of the revised Cookie Policy.</p>
              
              <h3>6. Contact Information</h3>
              <p>If you have any questions about this Cookie Policy, please contact us at privacy@thalostech.io.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="dpa" className="space-y-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h2>Data Processing Agreement</h2>
              
              <p>This Data Processing Agreement ("DPA") forms part of the Terms of Service between Thalos Technologies Inc. ("Processor") and the customer ("Controller") for the use of the Thalos platform.</p>
              
              <h3>1. Definitions</h3>
              <p>The terms "Controller," "Processor," "Data Subject," "Personal Data," "Processing," "Appropriate Technical and Organizational Measures," and "Supervisory Authority" shall have the meanings given to them in applicable data protection laws, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).</p>
              
              <h3>2. Processing of Personal Data</h3>
              <p>The Processor shall process Personal Data only on documented instructions from the Controller, including with regard to transfers of Personal Data to a third country or an international organization, unless required to do so by law; in such a case, the Processor shall inform the Controller of that legal requirement before processing, unless that law prohibits such information on important grounds of public interest.</p>
              
              <h3>3. Confidentiality</h3>
              <p>The Processor shall ensure that persons authorized to process the Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality.</p>
              
              <h3>4. Security</h3>
              <p>The Processor shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:</p>
              <ul>
                <li>The pseudonymization and encryption of Personal Data;</li>
                <li>The ability to ensure the ongoing confidentiality, integrity, availability, and resilience of processing systems and services;</li>
                <li>The ability to restore the availability and access to Personal Data in a timely manner in the event of a physical or technical incident;</li>
                <li>A process for regularly testing, assessing, and evaluating the effectiveness of technical and organizational measures for ensuring the security of the processing.</li>
              </ul>
              
              <h3>5. Sub-processors</h3>
              <p>The Processor shall not engage another processor without prior specific or general written authorization of the Controller. In the case of general written authorization, the Processor shall inform the Controller of any intended changes concerning the addition or replacement of other processors, thereby giving the Controller the opportunity to object to such changes.</p>
              
              <h3>6. Data Subject Rights</h3>
              <p>The Processor shall assist the Controller by appropriate technical and organizational measures, insofar as this is possible, for the fulfillment of the Controller's obligation to respond to requests for exercising the Data Subject's rights under applicable data protection laws.</p>
              
              <h3>7. Data Breach Notification</h3>
              <p>The Processor shall notify the Controller without undue delay after becoming aware of a Personal Data breach.</p>
              
              <h3>8. Data Protection Impact Assessment</h3>
              <p>The Processor shall assist the Controller in ensuring compliance with the obligations pursuant to Articles 32 to 36 of the GDPR, taking into account the nature of processing and the information available to the Processor.</p>
              
              <h3>9. Return or Deletion of Data</h3>
              <p>At the choice of the Controller, the Processor shall delete or return all the Personal Data to the Controller after the end of the provision of services relating to processing, and delete existing copies unless law requires storage of the Personal Data.</p>
              
              <h3>10. Audit Rights</h3>
              <p>The Processor shall make available to the Controller all information necessary to demonstrate compliance with the obligations laid down in this DPA and allow for and contribute to audits, including inspections, conducted by the Controller or another auditor mandated by the Controller.</p>
              
              <h3>11. Data Transfers</h3>
              <p>The Processor shall not transfer Personal Data to a third country or an international organization unless provided for in the Controller's instructions or required by law. If such a transfer is required, the Processor shall ensure that appropriate safeguards are in place.</p>
              
              <h3>12. Changes to This DPA</h3>
              <p>We may update this DPA from time to time. If we make material changes, we will notify you through Thalos or by other means. Your continued use of Thalos after the changes are effective constitutes your acceptance of the revised DPA.</p>
              
              <h3>13. Contact Information</h3>
              <p>If you have any questions about this DPA, please contact us at legal@thalostech.io.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Legal;
