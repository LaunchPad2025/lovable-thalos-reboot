
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, TaskFormData } from '@/components/tasks/schemas/taskFormSchema';
import { useAuth } from '@/context/AuthContext';
import { Task } from '@/types/models';
import { useTaskViolation } from '@/hooks/useTaskViolation';

interface UseTaskFormProps {
  violationId?: string;
  onSubmit: (data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => void;
}

export function useTaskForm({ violationId, onSubmit }: UseTaskFormProps) {
  const [selectedViolationId, setSelectedViolationId] = useState<string | undefined>(violationId);
  const { user } = useAuth();
  const { data: violationDetails } = useTaskViolation(violationId);

  const { control, handleSubmit, reset, setValue, formState, watch } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      assignee_id: '',
      priority: 'medium',
      status: 'open',
      violation_id: violationId,
    },
  });

  useEffect(() => {
    if (violationId) {
      setValue('violation_id', violationId);
      setSelectedViolationId(violationId);

      // If we have violation details, pre-populate the form with relevant information
      if (violationDetails) {
        // Create a title based on the violation
        setValue('title', `Remediate: ${violationDetails.violation}`);
        
        // Create a detailed description with remediation steps
        const remediationSteps = generateRemediationSteps(violationDetails);
        setValue('description', remediationSteps);
        
        // Set priority based on violation severity
        if (violationDetails.severity === 'critical' || violationDetails.severity === 'high') {
          setValue('priority', 'high');
        } else if (violationDetails.severity === 'medium') {
          setValue('priority', 'medium');
        } else {
          setValue('priority', 'low');
        }
      }
    }
  }, [violationId, violationDetails, setValue]);

  // Helper function to generate detailed remediation steps based on violation type
  const generateRemediationSteps = (violation: any) => {
    const baseText = `This task was automatically generated based on the detected violation: "${violation.violation}".

Follow these remediation steps:

1. Assess the situation - Review the violation details and understand the safety hazard involved.
2. Document the current state - Take photos and notes about the current condition.
3. Plan corrective actions - Determine what needs to be fixed and how.
4. Implement safety measures - Make the necessary changes to address the violation.
5. Verify compliance - Ensure the issue has been properly resolved.
6. Document the resolution - Take photos and notes after remediation.
7. Follow up - Schedule a follow-up inspection to ensure the issue doesn't recur.

Additional guidance:`;

    // Add specific guidance based on the type of violation
    if (violation.violation.toLowerCase().includes('ppe') || violation.violation.toLowerCase().includes('protective equipment')) {
      return `${baseText}

- Check all PPE inventory and condition
- Ensure proper PPE signage is clearly visible
- Verify all staff have been trained on proper PPE usage
- Replace any damaged or missing equipment immediately
- Document compliance with OSHA Standard 1910.132`;
    } 
    else if (violation.violation.toLowerCase().includes('fire') || violation.violation.toLowerCase().includes('evacuation')) {
      return `${baseText}

- Ensure all fire exits are clearly marked and unobstructed
- Verify fire extinguishers are properly mounted and inspected
- Check that evacuation plans are posted in visible locations
- Conduct a fire drill to test the evacuation procedure
- Document compliance with NFPA 101 Life Safety Code`;
    }
    else if (violation.violation.toLowerCase().includes('chemical') || violation.violation.toLowerCase().includes('hazardous')) {
      return `${baseText}

- Verify all chemicals are properly labeled and stored
- Ensure Safety Data Sheets (SDS) are up-to-date and accessible
- Check that proper containment measures are in place
- Verify staff are trained on chemical handling procedures
- Document compliance with OSHA Hazard Communication Standard`;
    }
    else if (violation.violation.toLowerCase().includes('electrical') || violation.violation.toLowerCase().includes('wiring')) {
      return `${baseText}

- Disconnect power to affected area before inspection
- Fix any exposed wiring with proper insulation
- Ensure all electrical panels are properly labeled
- Check that GFCI protection is installed where required
- Document compliance with NEC (National Electrical Code)`;
    }
    
    // Default guidance for other violations
    return `${baseText}

- Consult relevant safety standards and regulations
- Engage safety specialists if needed
- Document all steps taken to address the violation
- Consider additional training for staff to prevent recurrence`;
  };

  const handleFormSubmit = async (data: TaskFormData) => {
    if (!user) {
      return; // Handle unauthenticated state
    }
    
    // Convert the data to the right format for Task
    const taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'> = {
      title: data.title,
      description: data.description,
      due_date: data.due_date.toISOString(),
      assignee_id: data.assignee_id,
      priority: data.priority,
      status: data.status,
      violation_id: data.violation_id,
      // Required fields for DB
      created_by: user.id,
      organization_id: '00000000-0000-0000-0000-000000000000', // Placeholder, should come from user's context
    };
    
    await onSubmit(taskData);
    reset();
  };

  return {
    control,
    formState,
    handleSubmit,
    handleFormSubmit,
    selectedViolationId,
    setSelectedViolationId,
  };
}
