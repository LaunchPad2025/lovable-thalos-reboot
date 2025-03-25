
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import TasksList from '@/components/tasks/TasksList';
import TaskDetails from '@/components/tasks/TaskDetails';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { useTaskDetails } from '@/hooks/useTaskDetails';
import { TaskCreation } from '@/components/tasks/TaskCreation';
import { formatTasksForList } from '@/utils/taskFormatters';
import { Task } from '@/types/models';
import NewTaskModal from '@/components/tasks/NewTaskModal';

const Tasks = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const violationId = searchParams.get('violation');
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(!!searchParams.get('newTask'));
  
  // Filter states
  const [worksiteFilter, setWorksiteFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  
  // Fetch all tasks
  const { tasks, isLoading, isError, refetch, updateTaskStatus } = useTasks();
  
  // Fetch single task details if an ID is provided
  const { taskDetails, isLoading: isLoadingDetails } = useTaskDetails(id);

  // Format tasks for display in the list
  const formattedTasks = formatTasksForList(tasks);

  useEffect(() => {
    if (id && taskDetails) {
      setSelectedTask(taskDetails);
    } else if (!id) {
      setSelectedTask(null);
    }
  }, [id, taskDetails]);

  // Filter tasks based on search and filter criteria
  const filteredTasks = formattedTasks?.filter(task => {
    const matchesSearch = 
      searchTerm === '' || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesWorksite = worksiteFilter === 'all' || task.worksite_id === worksiteFilter;
    const matchesAssignee = assigneeFilter === 'all' || task.assignee_id === assigneeFilter;
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesWorksite && matchesAssignee && matchesStatus && matchesPriority;
  });

  const closeNewTaskModal = () => {
    setIsNewTaskModalOpen(false);
    searchParams.delete('newTask');
    setSearchParams(searchParams);
  };

  const handleCreateTask = (newTask: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    // Task creation logic handled inside TaskCreation component
    closeNewTaskModal();
  };

  if (isError) {
    return (
      <PageContainer>
        <div className="p-6 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Failed to load tasks</h2>
          <p className="mb-4">There was an error loading the tasks. Please try again later.</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer className="bg-[#0C1117] text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Tasks</h1>
          <p className="text-gray-400">Manage and track your safety compliance tasks</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsNewTaskModalOpen(true)}
        >
          Create Task
        </Button>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search tasks..."
          className="bg-[#1a1f29] border-gray-700 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Filters Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-medium text-gray-400">Filters</h2>
          <Button 
            variant="link" 
            className="text-blue-500 text-sm p-0 h-auto"
            onClick={() => {
              setWorksiteFilter('all');
              setAssigneeFilter('all');
              setStatusFilter('all');
              setPriorityFilter('all');
            }}
          >
            Reset
          </Button>
        </div>
        <p className="text-xs text-gray-500 mb-3">Filter tasks by different criteria</p>
        
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Worksite</label>
            <div className="relative">
              <select
                className="w-full bg-[#1a1f29] border border-gray-700 rounded-md p-2 pr-8 text-white appearance-none"
                value={worksiteFilter}
                onChange={(e) => setWorksiteFilter(e.target.value)}
              >
                <option value="all">All Worksites</option>
                <option value="north">North Production Facility</option>
                <option value="south">South Warehouse</option>
                <option value="main">Main Office</option>
                <option value="west">West Distribution Center</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-400 mb-1">Assignee</label>
            <div className="relative">
              <select
                className="w-full bg-[#1a1f29] border border-gray-700 rounded-md p-2 pr-8 text-white appearance-none"
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilter(e.target.value)}
              >
                <option value="all">All Assignees</option>
                <option value="john">John Smith</option>
                <option value="sarah">Sarah Johnson</option>
                <option value="michael">Michael Chen</option>
                <option value="lisa">Lisa Rodriguez</option>
                <option value="david">David Wilson</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-400 mb-1">Status</label>
            <div className="relative">
              <select
                className="w-full bg-[#1a1f29] border border-gray-700 rounded-md p-2 pr-8 text-white appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-400 mb-1">Priority</label>
            <div className="relative">
              <select
                className="w-full bg-[#1a1f29] border border-gray-700 rounded-md p-2 pr-8 text-white appearance-none"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Task List Title */}
      <div className="mb-4">
        <h2 className="text-sm font-medium text-gray-400">Task List</h2>
      </div>
      
      {/* Task Tabs and Content */}
      <div className="h-[calc(100vh-24rem)]">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <TasksList 
            tasks={filteredTasks || []} 
            onTaskSelect={(task) => navigate(`/tasks/${task.id}`)}
            selectedTaskId={selectedTask?.id}
            onAddNewTask={() => setIsNewTaskModalOpen(true)}
          />
        )}
      </div>
      
      {/* New Task Modal */}
      <NewTaskModal 
        isOpen={isNewTaskModalOpen} 
        onClose={closeNewTaskModal}
        onSubmit={handleCreateTask}
        violationId={violationId || undefined}
      />
    </PageContainer>
  );
};

export default Tasks;
