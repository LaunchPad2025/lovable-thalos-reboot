
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import MockDataAlert from '@/components/ui/MockDataAlert';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, FolderPlus, FileText } from 'lucide-react';
import DocumentCard from '@/components/documents/DocumentCard';
import { mockDocuments } from '@/components/documents/mockData';
import EmptyStateMessage from '@/components/EmptyStateMessage';
import { useAuthStatus } from '@/hooks/useAuthStatus';

const Documents = () => {
  const { isAuthenticated, isDemoMode } = useAuthStatus();
  const [documents, setDocuments] = useState([]);
  
  // If authenticated, use real data from documents state
  // If in demo mode, use mock data
  const displayDocuments = isAuthenticated ? documents : mockDocuments;
  
  const handleUploadDocument = () => {
    // This would typically open a modal or form to upload a document
    console.log('Upload document clicked');
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {isDemoMode && <MockDataAlert featureName="Documents" />}
        
        <h1 className="text-2xl font-bold">Documents</h1>
        <p className="text-muted-foreground">
          Manage and organize your safety documentation in one place.
        </p>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="pl-8 bg-background w-full"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button 
              size="sm" 
              className="bg-thalos-blue hover:bg-blue-600"
              onClick={handleUploadDocument}
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button variant="outline" size="sm">
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-[#0f1419] border-b border-gray-800">
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="safety">Safety Protocols</TabsTrigger>
            <TabsTrigger value="training">Training Materials</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
        </Tabs>

        {isAuthenticated && displayDocuments.length === 0 ? (
          <EmptyStateMessage
            title="No Documents Found"
            description="Upload your first document to get started. You can add safety protocols, training materials, reports, and more."
            icon={<FileText className="h-8 w-8 text-gray-400" />}
            actionLabel="Upload Document"
            onAction={handleUploadDocument}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default Documents;
