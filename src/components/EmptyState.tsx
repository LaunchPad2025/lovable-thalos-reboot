import React from 'react';

const EmptyState = ({ message, actions }: { message: string; actions: React.ReactNode }) => {
    return (
        <div>
            <h2>{message}</h2>
            <div>{actions}</div>
        </div>
    );
};

export default EmptyState;
