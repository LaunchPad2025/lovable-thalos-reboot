
export interface TrainingStatus {
  completed: number;
  upcoming: number;
  overdue: number;
  expiring: number;
}

export interface UpcomingTraining {
  id: number;
  title: string;
  duration: string;
  daysLeft: number;
  startDate: string;
}

export interface CompletedTraining {
  id: number;
  title: string;
  completedDate: string;
  certificateExpires: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  compliance: number;
  nextDue?: string;
  completed?: boolean;
  courseId: string;
}

export interface TeamCompliance {
  overallCompliance: number;
  teamMembers: TeamMember[];
}

export interface Course {
  id: string;
  title: string;
  required: boolean;
  duration: string;
  description: string;
  dueDate?: string;
  completed?: boolean;
}

export interface CourseCategory {
  id: string;
  name: string;
  courses: Course[];
}
