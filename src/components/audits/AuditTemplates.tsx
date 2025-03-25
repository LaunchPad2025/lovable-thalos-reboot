
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Edit, FolderOpen, Plus } from 'lucide-react';
import { mockAuditTemplates } from './mockData';

const AuditTemplates: React.FC = () => {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'regulatory':
        return <Badge className="bg-purple-500">Regulatory</Badge>;
      case 'safety':
        return <Badge className="bg-red-500">Safety</Badge>;
      case 'environmental':
        return <Badge className="bg-green-500">Environmental</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Audit Templates</h2>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Create Template
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAuditTemplates.map((template) => (
          <Card key={template.id} className="border border-gray-800">
            <CardContent className="p-4">
              <div className="mb-2 flex justify-between">
                <div>
                  <h3 className="font-medium text-base">{template.name}</h3>
                </div>
                <div>
                  {getTypeBadge(template.type)}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {template.description}
              </p>
              
              <div className="flex justify-between text-sm text-muted-foreground mb-3">
                <div>{template.sections} sections</div>
                <div>{template.items} items</div>
              </div>
              
              <div className="flex justify-center space-x-3">
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <FolderOpen className="h-4 w-4 mr-1" />
                  Use
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AuditTemplates;
