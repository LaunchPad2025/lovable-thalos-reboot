import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import TasksList from '@/components/tasks/TasksList';
import TaskDetails from '@/components/tasks/TaskDetails';
import { useTasks } from '@/hooks/useTasks';
import { useTaskDetails } from '@/hooks/useTaskDetails';
import { formatTasksForList } from '@/utils/taskFormatters';
import { Task } from '@/types/models';
import NewTaskModal from '@/components/tasks/NewTaskModal';

// Import our new components
import TasksHeader from '@/components/tasks/list/TasksHeader';
import TasksSearch from '@/components/tasks/list/TasksSearch';
import TasksFilters from '@/components/tasks/list/TasksFilters';
import TasksErrorState from '@/components/tasks/list/TasksErrorState';
import TasksListTitle from '@/components/tasks/list/TasksListTitle';

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
  const { tasks, isLoading, isError, refetch, updateTaskStatus, hasRealData, retryConnection, error } = useTasks();
  
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

  const resetFilters = () => {
    setWorksiteFilter('all');
    setAssigneeFilter('all');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  if (isError) {
    return (
      <PageContainer>
        <TasksErrorState onRetry={retryConnection} error={error} />
      </PageContainer>
    );
  }
  
  return (
    <PageContainer className="bg-[#0C1117] text-white">
      <TasksHeader onCreateTask={() => setIsNewTaskModalOpen(true)} />
      
      <TasksSearch 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
      />
      
      <TasksFilters 
        worksiteFilter={worksiteFilter}
        assigneeFilter={assigneeFilter}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onWorksiteFilterChange={setWorksiteFilter}
        onAssigneeFilterChange={setAssigneeFilter}
        onStatusFilterChange={setStatusFilter}
        onPriorityFilterChange={setPriorityFilter}
        onResetFilters={resetFilters}
      />
      
      <TasksListTitle />
      
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
