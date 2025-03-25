
import React from 'react';

const DocumentsTab: React.FC = () => {
  return (
    <div className="bg-[#0f1419] p-6 rounded-md border border-gray-800">
      <h3 className="text-white font-medium mb-4">Documents & Attachments</h3>
      <p className="text-gray-400">Photos, documents, and other files related to this assessment.</p>
      
      <div className="py-10 text-center text-gray-500">
        No documents or attachments have been added yet.
      </div>
    </div>
  );
};

export default DocumentsTab;
