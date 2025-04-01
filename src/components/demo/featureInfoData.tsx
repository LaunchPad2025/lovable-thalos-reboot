
import React from 'react';

export const getFeatureInfo = (section: string, selectedItem: any = null) => {
  // Default info if nothing is selected
  let defaultInfo = {
    title: 'Thalos Safety Platform Demo',
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

    // Add more sections as needed

    default:
      return defaultInfo;
  }
};
