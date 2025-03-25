
import React, { useState } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, Plus, Search, Download, Share, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Document {
  id: string;
  title: string;
  type: string;
  category: string;
  size: string;
  date: string;
  color: string;
  icon: React.ReactNode;
}

const Documents = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [viewType, setViewType] = useState('grid');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  const documents: Document[] = [
    {
      id: '1',
      title: 'OSHA Compliance Guidelines.pdf',
      type: 'pdf',
      category: 'Guidelines',
      size: '2.4 MB',
      date: '2023-06-10',
      color: '#f87171',
      icon: <FileText className="h-5 w-5 text-red-400" />
    },
    {
      id: '2',
      title: 'Emergency Response Plan.docx',
      type: 'docx',
      category: 'Plans',
      size: '1.8 MB',
      date: '2023-06-15',
      color: '#60a5fa',
      icon: <FileText className="h-5 w-5 text-blue-400" />
    },
    {
      id: '3',
      title: 'Chemical Inventory List.xlsx',
      type: 'xlsx',
      category: 'Inventory',
      size: '1.2 MB',
      date: '2023-06-20',
      color: '#4ade80',
      icon: <FileText className="h-5 w-5 text-green-400" />
    },
    {
      id: '4',
      title: 'Safety Training Certificate.zip',
      type: 'zip',
      category: 'Training',
      size: '8.7 MB',
      date: '2023-06-05',
      color: '#fbbf24',
      icon: <FileText className="h-5 w-5 text-yellow-400" />
    },
    {
      id: '5',
      title: 'Incident Report Form.pdf',
      type: 'pdf',
      category: 'Forms',
      size: '3.1 MB',
      date: '2023-07-01',
      color: '#f87171',
      icon: <FileText className="h-5 w-5 text-red-400" />
    },
    {
      id: '6',
      title: 'Safety Audit Results.xlsx',
      type: 'xlsx',
      category: 'Audits',
      size: '2.1 MB',
      date: '2023-05-25',
      color: '#4ade80',
      icon: <FileText className="h-5 w-5 text-green-400" />
    }
  ];

  const recentlyViewed = [
    { id: '1', title: 'OSHA Compliance Guidelines.pdf', date: '2023-06-10', color: '#f87171' },
    { id: '2', title: 'Emergency Response Plan.docx', date: '2023-06-15', color: '#60a5fa' },
    { id: '3', title: 'Chemical Inventory List.xlsx', date: '2023-06-20', color: '#4ade80' }
  ];

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
  };

  const handleCloseDocumentView = () => {
    setSelectedDocument(null);
  };

  return (
    <PageContainer>
      <div className="flex flex-col h-full">
        {selectedDocument ? (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between border-b border-gray-800 p-4">
                <div className="flex items-center">
                  <span className="text-xl font-medium">{selectedDocument.title}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleCloseDocumentView}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 flex items-center justify-center p-10 bg-[#0f1419]">
                  <div className="text-center">
                    <div className="mx-auto mb-6 w-16 h-20 bg-white/5 border border-red-400/30 rounded flex items-center justify-center text-red-400">
                      <FileText className="h-10 w-10" />
                    </div>
                    <p className="text-gray-400 mb-6">PDF Preview - {selectedDocument.title}</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download to View
                    </Button>
                  </div>
                </div>
                <div className="w-80 border-l border-gray-800 overflow-y-auto">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="font-medium mb-4">Document Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-400 w-28">Created</span>
                        <span>{selectedDocument.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-400 w-28">Owner</span>
                        <span>Admin</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-400 w-28">Category</span>
                        <span className="px-2 py-0.5 bg-gray-800 rounded text-xs">
                          {selectedDocument.category}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-400 w-28">Last modified</span>
                        <span>{selectedDocument.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="font-medium mb-4">Related Items</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded-md">
                        <div className="text-xs text-blue-400 mb-1">Risk</div>
                        <div className="text-sm">Workplace Risk Assessment - Q2 2023</div>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-md">
                        <div className="text-xs text-red-400 mb-1">Task</div>
                        <div className="text-sm">Update safety signage to OSHA standards</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="w-full text-gray-300 border-gray-700">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <PageTitle 
              title="Documents" 
              subtitle="Manage safety documentation and regulatory compliance files"
              action={
                <Button className="bg-thalos-blue hover:bg-blue-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              }
            />

            <div className="flex items-center justify-between mt-6 mb-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search documents..." 
                  className="pl-10 pr-4 py-2 w-full bg-[#0f1419] border border-gray-800 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Button variant="outline" className="text-gray-300 border-gray-700">
                    All Categories
                  </Button>
                </div>
                <div className="flex border border-gray-800 rounded-md overflow-hidden">
                  <button 
                    className={`px-3 py-1 ${viewType === 'grid' ? 'bg-[#1f2937] text-white' : 'bg-[#0f1419] text-gray-400'}`}
                    onClick={() => setViewType('grid')}
                  >
                    Grid
                  </button>
                  <button 
                    className={`px-3 py-1 ${viewType === 'list' ? 'bg-[#1f2937] text-white' : 'bg-[#0f1419] text-gray-400'}`}
                    onClick={() => setViewType('list')}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Recent Documents</h3>
              
              {viewType === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map((doc) => (
                    <div 
                      key={doc.id} 
                      className="bg-[#0f1419] border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all cursor-pointer"
                      onClick={() => handleViewDocument(doc)}
                    >
                      <div className="p-4 border-b border-gray-800 flex items-center">
                        <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: `${doc.color}20` }}>
                          {doc.icon}
                        </div>
                        <div className="ml-3 flex-1 truncate">
                          <div className="text-sm font-medium truncate">{doc.title}</div>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <span>{doc.size}</span>
                            <span className="mx-1">•</span>
                            <span>{doc.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <span className="text-xs px-2 py-0.5 bg-gray-800 rounded">
                          {doc.category}
                        </span>
                        <Button variant="ghost" className="text-gray-400 hover:text-white text-xs">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#0f1419] border border-gray-800 rounded-lg overflow-hidden">
                  {documents.map((doc, index) => (
                    <div 
                      key={doc.id}
                      className={`flex items-center p-4 hover:bg-gray-800/30 cursor-pointer ${
                        index !== documents.length - 1 ? 'border-b border-gray-800' : ''
                      }`}
                      onClick={() => handleViewDocument(doc)}
                    >
                      <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: `${doc.color}20` }}>
                        {doc.icon}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="text-sm font-medium">{doc.title}</div>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <span>{doc.size}</span>
                          <span className="mx-1">•</span>
                          <span>{doc.date}</span>
                        </div>
                      </div>
                      <div className="text-xs px-2 py-0.5 bg-gray-800 rounded mx-4">
                        {doc.category}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" className="text-gray-400 hover:text-white text-xs">
                          View
                        </Button>
                        <Button variant="ghost" className="text-gray-400 hover:text-white text-xs">
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <h3 className="text-sm font-medium">Recently Viewed</h3>
              </div>
              <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-6">
                  {recentlyViewed.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center cursor-pointer"
                      onClick={() => handleViewDocument(documents.find(d => d.id === item.id)!)}
                    >
                      <div 
                        className="w-6 h-6 rounded flex items-center justify-center mr-2" 
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <FileText className="h-3 w-3" style={{ color: item.color }} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-300">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default Documents;
