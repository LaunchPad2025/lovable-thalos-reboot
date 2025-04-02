
import React from 'react';

export const getFeatureInfo = (section: string, selectedItem: any = null) => {
  // Default info if nothing is selected
  let defaultInfo = {
    title: 'Thalos Safety Platform Demo',
    description: 'Interactive demonstration of safety compliance management features',
    features: [
      'AI-powered safety violation detection',
      'Task management for compliance issues',
      'Comprehensive safety reports',
      'Document management system',
    ],
    content: (
      <div>
        <p className="mb-4">
          Welcome to the Thalos Safety Platform demo. This interactive demonstration showcases the key features of our safety compliance management system.
        </p>
        <p className="mb-4">
          Navigate through the different sections using the sidebar to explore how Thalos can help your organization manage safety compliance effectively.
        </p>
        <p>
          This is a simulated environment with mock data for demonstration purposes.
        </p>
      </div>
    ),
  };

  // Return specific info based on section
  switch (section) {
    case 'dashboard':
      return {
        title: 'Safety Dashboard',
        description: 'Get a comprehensive overview of safety metrics and compliance status',
        features: [
          'Real-time compliance scoring',
          'Safety violation tracking',
          'Priority task management',
          'Performance trend analysis',
        ],
        content: (
          <div>
            <p className="mb-4">
              The Dashboard provides an overview of your organization's safety compliance status, including:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Compliance scores and trends</li>
              <li>Priority tasks that need attention</li>
              <li>Recent safety violations and incidents</li>
              <li>Quick access to key features</li>
            </ul>
            <p>
              Use this centralized view to monitor your organization's safety performance at a glance and quickly identify areas that need attention.
            </p>
          </div>
        ),
      };

    case 'tasks':
      return {
        title: 'Task Management',
        description: 'Organize and track safety compliance tasks efficiently',
        features: [
          'Task prioritization and assignment',
          'Due date tracking',
          'Status updates and history',
          'Violation-linked remediation',
        ],
        content: (
          <div>
            <p className="mb-4">
              The Tasks section helps you manage and track safety compliance tasks, including:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Creating and assigning remediation tasks</li>
              <li>Tracking task status and due dates</li>
              <li>Prioritizing tasks based on severity</li>
              <li>Viewing task history and completion rates</li>
            </ul>
            <p>
              Effective task management ensures that identified safety violations are addressed promptly and systematically.
            </p>
          </div>
        ),
      };

    case 'reports':
      return {
        title: 'Safety Reports',
        description: 'Generate and analyze comprehensive safety compliance reports',
        features: [
          'Customizable report generation',
          'Compliance trend analysis',
          'Violation pattern detection',
          'Exportable reports for stakeholders',
        ],
        content: (
          <div>
            <p className="mb-4">
              The Reports section provides comprehensive analytics and insights about your safety program:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Compliance score reports showing trends over time</li>
              <li>Violation analysis by type, severity, and regulation</li>
              <li>Task management metrics and completion rates</li>
              <li>Media analysis performance statistics</li>
              <li>Customizable report filters and export options</li>
            </ul>
            <p className="mb-4">
              Use these reports to identify patterns, demonstrate compliance to stakeholders, and make data-driven decisions to improve your safety program.
            </p>
            <p>
              Reports can be exported in various formats for sharing with management, regulators, or other stakeholders.
            </p>
          </div>
        ),
      };

    case 'violations':
      return {
        title: 'Safety Violations',
        description: 'Track and manage detected safety violations',
        features: [
          'AI-powered violation detection',
          'Severity classification',
          'Regulatory reference lookup',
          'Remediation task creation',
        ],
        content: (
          <div>
            <p className="mb-4">
              The Violations section allows you to:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>View detected safety violations from AI analysis</li>
              <li>Understand violation severity and applicable regulations</li>
              <li>Track remediation status for each violation</li>
              <li>Create tasks to address identified issues</li>
              <li>View historical violation data and trends</li>
            </ul>
            <p>
              Proactively identifying and addressing safety violations helps prevent incidents and maintain compliance with safety regulations.
            </p>
          </div>
        ),
      };

    case 'documents':
      return {
        title: 'Safety Documents',
        description: 'Store and manage all safety-related documentation',
        features: [
          'Centralized document repository',
          'Version control tracking',
          'Role-based access controls',
          'Integration with compliance workflows',
        ],
        content: (
          <div>
            <p className="mb-4">
              The Documents section helps you organize and manage all safety-related documentation:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Store safety protocols, procedures, and training materials</li>
              <li>Track document versions and update history</li>
              <li>Control access based on user roles and permissions</li>
              <li>Link documents to relevant tasks and violations</li>
            </ul>
            <p>
              Centralizing your safety documentation ensures that your team always has access to the most current safety information and protocols.
            </p>
          </div>
        ),
      };

    case 'audits':
      return {
        title: 'Safety Audits',
        description: 'Schedule and track safety compliance audits',
        features: [
          'Audit scheduling and planning',
          'Customizable audit templates',
          'Finding tracking and verification',
          'Historical audit records',
        ],
        content: (
          <div>
            <p className="mb-4">
              The Audits section helps you plan, conduct, and track safety audits:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Schedule regular safety audits</li>
              <li>Use customizable templates for different audit types</li>
              <li>Track audit findings and corrective actions</li>
              <li>Generate audit reports for management and regulators</li>
            </ul>
            <p>
              Regular safety audits are essential for maintaining compliance and identifying potential safety issues before they lead to incidents.
            </p>
          </div>
        ),
      };

    case 'copilot':
      return {
        title: 'Safety Copilot "Paulie"',
        description: 'Your AI-powered safety assistant',
        features: [
          'Instant safety regulation guidance',
          'PPE recommendations',
          'Safety procedure explanations',
          'Hazard identification assistance',
        ],
        content: (
          <div>
            <p className="mb-4">
              Paulie is your AI safety assistant that provides immediate guidance on workplace safety:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Get answers about safety regulations and compliance requirements</li>
              <li>Receive recommendations for proper PPE in different scenarios</li>
              <li>Learn about safety procedures for specific environments</li>
              <li>Access hazard identification and mitigation guidance</li>
              <li>Get real-time support for safety decision-making</li>
            </ul>
            <p>
              Using advanced AI technology, Paulie helps your team make informed safety decisions and maintain compliance with industry regulations.
            </p>
          </div>
        ),
      };

    // Add more sections as needed

    default:
      return defaultInfo;
  }
};
