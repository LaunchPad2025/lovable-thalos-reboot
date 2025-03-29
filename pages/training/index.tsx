import { useEffect, useState } from 'react';
import { fetchPaulieQueries } from '../../lib/api'; // Assuming an API utility exists

const TrainingPage = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        const loadQueries = async () => {
            const data = await fetchPaulieQueries(); // Fetch data from paulie_queries table
            setQueries(data.map(query => ({
                ...query,
                industry: query.industry,
                regulation_code: query.regulation_code,
                keywords: query.keywords
            })));
        };

        loadQueries();
    }, []);

    return (
        <div>
            {/* ...existing UI code for Approving / Rejecting / Rewriting responses... */}
            <button onClick={() => exportData('csv')}>Export CSV</button>
            <button onClick={() => exportData('json')}>Export JSON</button>
        </div>
    );
};

const exportData = (format: 'csv' | 'json') => {
    // Logic to export reviewed data in the specified format
    // ...existing code...
};

export default TrainingPage;