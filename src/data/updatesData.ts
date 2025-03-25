
import { UpdateData } from '@/components/documentation/updates/MonthUpdates';

interface MonthlyUpdates {
  month: string;
  updates: UpdateData[];
}

export const updatesData: MonthlyUpdates[] = [
  {
    month: "May 2025",
    updates: [
      {
        date: "May 25, 2025",
        title: "New Guide System and Search Functionality",
        type: "feature",
        description: "We've launched a new comprehensive guide system and improved search capabilities to help users find resources more easily.",
        bulletPoints: [
          "Added keyword search functionality across all guides and documentation",
          "Improved guide organization with tabs for different content types",
          "Created industry-specific guide sections",
          "Enhanced guide card UI with better readability and visual cues"
        ]
      },
      {
        date: "May 18, 2025",
        title: "Dashboard Performance Improvements",
        type: "improvement",
        description: "We've made significant performance enhancements to the dashboard for faster loading and better user experience.",
        bulletPoints: [
          "Reduced dashboard loading time by 40%",
          "Optimized data fetching for stats cards and visualizations",
          "Improved responsive design for various screen sizes",
          "Enhanced dark mode compatibility"
        ]
      },
      {
        date: "May 10, 2025",
        title: "Bug Fixes and UI Refinements",
        type: "bug",
        description: "This release addresses several UI issues and improves overall stability.",
        bulletPoints: [
          "Fixed alignment issues in the GuideCard component",
          "Resolved inconsistent styling in dark mode",
          "Fixed search functionality in documentation pages",
          "Improved accessibility across the platform"
        ]
      }
    ]
  },
  {
    month: "April 2025",
    updates: [
      {
        date: "April 28, 2025",
        title: "Enhanced AI Safety Model Customization",
        type: "feature",
        description: "We've expanded our AI safety model customization options to better serve different industries and compliance requirements.",
        bulletPoints: [
          "Added industry-specific model templates for manufacturing, healthcare, and construction",
          "Introduced new customization parameters for detection sensitivity",
          "Improved model testing interface with real-time feedback",
          "Enhanced visualization of safety detection zones"
        ]
      },
      {
        date: "April 15, 2025",
        title: "Documentation and Learning Resources Expansion",
        type: "feature",
        description: "We've significantly expanded our documentation and learning resources to help users get the most out of Thalos.",
        bulletPoints: [
          "Added comprehensive getting started guides for new users",
          "Created detailed documentation for core features and advanced usage",
          "Introduced video tutorials for common workflows",
          "Added downloadable resources and templates"
        ]
      },
      {
        date: "April 5, 2025",
        title: "Risk Assessment Module Enhancements",
        type: "improvement",
        description: "Our risk assessment module has been upgraded with new features and improved usability.",
        bulletPoints: [
          "Added customizable risk assessment templates",
          "Improved risk scoring algorithms",
          "Enhanced reporting capabilities with exportable formats",
          "Integrated risk assessments with violation tracking"
        ]
      }
    ]
  },
  {
    month: "March 2025",
    updates: [
      {
        date: "March 30, 2025",
        title: "Thalos Platform Launch",
        type: "feature",
        description: "We're excited to announce the official launch of the Thalos safety compliance platform.",
        bulletPoints: [
          "Core AI safety monitoring and violation detection",
          "Task management system for violation remediation",
          "Dashboard with real-time safety metrics",
          "User management and role-based permissions"
        ]
      },
      {
        date: "March 20, 2025",
        title: "Mobile Responsive Interface",
        type: "feature",
        description: "We've ensured that Thalos works seamlessly across all devices with our responsive design.",
        bulletPoints: [
          "Fully responsive dashboard and analytics",
          "Mobile-optimized violation reporting",
          "Touch-friendly controls and interfaces",
          "Consistent experience across desktop and mobile devices"
        ]
      },
      {
        date: "March 10, 2025",
        title: "Initial Documentation Release",
        type: "improvement",
        description: "We've published our initial documentation to help users get started with Thalos.",
        bulletPoints: [
          "Installation and setup guides",
          "Admin configuration documentation",
          "API documentation for developers",
          "Frequently asked questions and troubleshooting"
        ]
      }
    ]
  }
];
