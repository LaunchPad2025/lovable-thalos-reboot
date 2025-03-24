
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import TasksList, { Task } from '@/components/tasks/TasksList';
import TaskDetails from '@/components/tasks/TaskDetails';
import PageTitle from '@/components/ui/PageTitle';

// Mock data
const mockTasks: Task[] = [
  {
    id: 'T-5678',
    title: 'Conduct safety training for new employees',
    description: 'Schedule and conduct comprehensive safety training for the 5 new employees who started this month. Cover all required OSHA topics and company-specific procedures.',
    dueDate: 'Oct 28, 2023',
    status: 'open',
    assignee: 'John Doe',
    priority: 'high'
  },
  {
    id: 'T-5679',
    title: 'Inspect fire extinguishers',
    description: 'Perform monthly inspection of all fire extinguishers in Buildings A and B. Check pressure gauges, ensure pins and seals are intact, and verify proper placement.',
    dueDate: 'Oct 20, 2023',
    status: 'in-progress',
    assignee: 'Sarah Johnson',
    priority: 'medium'
  },
  {
    id: 'T-5680',
    title: 'Update emergency evacuation plan',
    description: 'Review and update the emergency evacuation plan to reflect recent building renovations. Create new evacuation route maps and distribute to all departments.',
    dueDate: 'Oct 31, 2023',
    status: 'open',
    assignee: 'Mike Williams',
    priority: 'high'
  },
  {
    id: 'T-5681',
    title: 'Order new PPE supplies',
    description: 'Restock inventory of safety gloves, hard hats, and safety glasses. Check with department heads for any specific requirements.',
    dueDate: 'Oct 15, 2023',
    status: 'completed',
    assignee: 'Lisa Martinez',
    priority: 'medium'
  },
  {
    id: 'T-5682',
    title: 'Fix broken railing in stairwell',
    description: 'Repair the loose handrail in the east stairwell between floors 2 and 3. This has been identified as a high-priority safety hazard.',
    dueDate: 'Oct 12, 2023',
    status: 'overdue',
    assignee: 'David Taylor',
    priority: 'high'
  },
  {
    id: 'T-5683',
    title: 'Schedule annual safety audit',
    description: 'Coordinate with external safety consultants to schedule the annual comprehensive safety audit. Prepare necessary documentation and notify department heads.',
    dueDate: 'Nov 15, 2023',
    status: 'open',
    assignee: 'John Doe',
    priority: 'low'
  }
];

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  
  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };
  
  const handleAddNewTask = () => {
    console.log('Add new task');
    // In a real app, this would open a modal or navigate to a new task form
  };
  
  const handleStatusChange = (newStatus: Task['status']) => {
    if (!selectedTask) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id ? { ...task, status: newStatus } : task
    );
    
    setTasks(updatedTasks);
    setSelectedTask({ ...selectedTask, status: newStatus });
  };
  
  return (
    <PageContainer>
      <PageTitle 
        title="Tasks"
        subtitle="Manage and track safety tasks"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
        <TasksList 
          tasks={tasks} 
          onTaskSelect={handleTaskSelect} 
          selectedTaskId={selectedTask?.id}
          onAddNewTask={handleAddNewTask}
        />
        <TaskDetails 
          task={selectedTask}
          onStatusChange={handleStatusChange}
        />
      </div>
    </PageContainer>
  );
};

export default Tasks;
