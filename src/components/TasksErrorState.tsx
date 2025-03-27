import React from 'react';

const TasksErrorState: React.FC<{ error: string | null }> = ({ error }) => {
    if (!error) return null;

    return (
        <div className="error-state">
            <h2>Error Loading Tasks</h2>
            <p>{error}</p>
            <p>
                Please ensure the appropriate Row-Level Security (RLS) policies are configured in Supabase for the tasks table.
            </p>
        </div>
    );
};

export default TasksErrorState;
