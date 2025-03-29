import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import MockDataAlert from '@/components/ui/MockDataAlert';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, FolderPlus } from 'lucide-react';
import DocumentCard from '@/components/documents/DocumentCard';
import { mockDocuments } from '@/components/documents/mockData';

const Documents = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <MockDataAlert featureName="Documents" />
        
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
            <Button size="sm" className="bg-thalos-blue hover:bg-blue-600">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default Documents;
