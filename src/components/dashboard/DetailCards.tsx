
import React from 'react';
import PriorityTasks from './PriorityTasks';
import RecentDocuments from './RecentDocuments';

const DetailCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PriorityTasks />
      <RecentDocuments />
    </div>
  );
};

export default DetailCards;
