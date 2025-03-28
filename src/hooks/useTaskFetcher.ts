
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const useTaskFetcher = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const { data, error } = await supabase
                .from('tasks')
                .select('*');

            if (error) {
                setError(error.message);
            } else {
                setTasks(data);
            }
        };

        fetchTasks();
    }, []);

    return { tasks, error };
};

export default useTaskFetcher;
