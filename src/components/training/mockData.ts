
// Mock data for training components

export const trainingStatus = {
  completed: 2,
  upcoming: 3,
  overdue: 0,
  expiring: 2
};

export const upcomingTrainings = [
  {
    id: 1,
    title: "Fall Protection Awareness",
    duration: "60 minutes",
    daysLeft: 7,
    startDate: "2025-04-04"
  },
  {
    id: 2,
    title: "Chemical Handling Procedures",
    duration: "90 minutes",
    daysLeft: 14,
    startDate: "2025-04-11"
  },
  {
    id: 3,
    title: "Confined Space Entry",
    duration: "120 minutes",
    daysLeft: 21,
    startDate: "2025-04-18"
  }
];

export const completedTrainings = [
  {
    id: 101,
    title: "Fire Safety Fundamentals",
    completedDate: "2025-02-25",
    certificateExpires: "2026-02-24"
  },
  {
    id: 102,
    title: "Electrical Safety",
    completedDate: "2025-01-23",
    certificateExpires: "2026-01-24"
  }
];

export const teamComplianceData = {
  overallCompliance: 87,
  teamMembers: [
    {
      id: 1,
      name: "John Smith",
      role: "Foreman",
      compliance: 100,
      nextDue: "2025-06-30",
      courseId: "FS15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Safety Officer",
      compliance: 100,
      completed: true,
      courseId: "FS18"
    },
    {
      id: 3,
      name: "Mike Chen",
      role: "Equipment Operator",
      compliance: 76,
      nextDue: "2025-04-28",
      courseId: "FS12"
    },
    {
      id: 4,
      name: "Lisa Rodriguez",
      role: "Site Engineer",
      compliance: 65,
      nextDue: "2025-05-07",
      courseId: "FS14"
    }
  ]
};

export const courseCategories = [
  {
    id: "safety",
    name: "Safety",
    courses: [
      {
        id: "fire-safety",
        title: "Fire Safety Fundamentals",
        required: true,
        duration: "45 minutes",
        description: "Basic fire safety, prevention, and emergency procedures",
        dueDate: "2025-05-15"
      },
      {
        id: "electrical-safety",
        title: "Electrical Safety",
        required: true,
        duration: "75 minutes",
        description: "Working safely with electrical systems and equipment",
        completed: true
      },
      {
        id: "confined-space",
        title: "Confined Space Entry",
        required: false,
        duration: "120 minutes",
        description: "Safety protocols for confined space entry and monitoring",
        dueDate: "2025-04-11"
      }
    ]
  },
  {
    id: "hazardous-materials",
    name: "Hazardous Materials",
    courses: [
      {
        id: "chemical-handling",
        title: "Chemical Handling Procedures",
        required: true,
        duration: "90 minutes",
        description: "Learn about handling chemicals safely and the hazardous materials schedules",
        dueDate: "2025-04-07"
      }
    ]
  },
  {
    id: "emergency",
    name: "Emergency",
    courses: [
      {
        id: "emergency-response",
        title: "Fire Safety Fundamentals",
        required: true,
        duration: "45 minutes",
        description: "Basic fire safety, prevention, and emergency procedures",
        completed: true
      }
    ]
  }
];
