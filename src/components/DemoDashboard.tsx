import React, { useState } from 'react';

const DemoDashboard = () => {
    // Example demo data structure
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Demo Task 1', status: 'Pending' },
        { id: 2, title: 'Demo Task 2', status: 'Completed' },
    ]);

    const [violations, setViolations] = useState([
        { id: 1, description: 'Demo Violation 1', severity: 'High' },
    ]);

    const [documents, setDocuments] = useState([
        { id: 1, name: 'Demo Document 1', type: 'PDF' },
    ]);

    return (
        <div>
            <h1>Demo Dashboard</h1>
            <section>
                <h2>Tasks</h2>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>{task.title} - {task.status}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Violations</h2>
                <ul>
                    {violations.map(violation => (
                        <li key={violation.id}>{violation.description} - {violation.severity}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Documents</h2>
                <ul>
                    {documents.map(doc => (
                        <li key={doc.id}>{doc.name} - {doc.type}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default DemoDashboard;
