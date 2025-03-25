
import { TrainingCourse, TeamMember } from "./types";

export const trainingCourses: TrainingCourse[] = [
  {
    id: "1",
    title: "Fall Protection Awareness",
    description: "Learn about fall protection systems and proper use.",
    duration: "60 minutes",
    timeRemaining: "Due in 7 days",
    status: "upcoming",
    category: "Safety",
    required: true
  },
  {
    id: "2",
    title: "Chemical Handling Procedures",
    description: "Safety protocols for chemical handling and distribution.",
    duration: "90 minutes",
    timeRemaining: "Due in 14 days",
    status: "upcoming",
    category: "Hazardous Materials",
    required: true
  },
  {
    id: "3",
    title: "Confined Space Entry",
    description: "Safety protocols for confined space entry and monitoring.",
    duration: "120 minutes",
    timeRemaining: "Due in 21 days",
    status: "upcoming",
    category: "Safety"
  },
  {
    id: "4",
    title: "Fire Safety Fundamentals",
    description: "Basic fire safety, prevention, and emergency procedures.",
    duration: "75 minutes",
    status: "completed",
    completedOn: "Feb 26, 2024", 
    certificateExpires: "Mar 26, 2025",
    category: "Emergency",
    required: true
  },
  {
    id: "5",
    title: "Electrical Safety",
    description: "Working safely with electrical systems and equipment.",
    duration: "90 minutes",
    status: "completed",
    completedOn: "Jan 25, 2024",
    certificateExpires: "Mar 24, 2025",
    category: "Safety",
    required: true
  },
  {
    id: "6", 
    title: "Confined Space Entry",
    description: "Safety protocols for confined space entry and monitoring.",
    duration: "120 minutes",
    timeRemaining: "Due Apr 11, 2024",
    status: "in_progress",
    category: "Safety"
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Foreman",
    compliance: 94,
    courseId: "1015",
    nextDue: "Mar 31"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Safety Officer",
    compliance: 100,
    courseId: "1018",
    status: "Completed"
  },
  {
    id: "3",
    name: "Mike Chan",
    role: "Equipment Operator",
    compliance: 75,
    courseId: "912",
    nextDue: "Mar 30"
  },
  {
    id: "4",
    name: "Lisa Rodriguez",
    role: "Site Engineer",
    compliance: 65,
    courseId: "947",
    nextDue: "Apr 7"
  }
];

export const trainingStatistics = {
  completed: 2,
  upcoming: 3,
  overdue: 0,
  expiring: 2,
  teamCompliance: 87
};
