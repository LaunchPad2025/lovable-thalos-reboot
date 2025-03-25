
export type TrainingStatus = 'completed' | 'in_progress' | 'upcoming' | 'overdue';

export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  dueDate?: string;
  status: TrainingStatus;
  category: string;
  timeRemaining?: string;
  completed?: boolean;
  completedOn?: string;
  certificateExpires?: string;
  required?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  compliance: number;
  courseId: string;
  nextDue?: string;
  status?: 'Completed' | 'In Progress' | 'Overdue';
}
