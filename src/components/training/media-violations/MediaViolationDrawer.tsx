
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MediaViolationTraining } from './types';
import { CheckCircle, AlertTriangle, TagIcon } from 'lucide-react';

interface DrawerProps {
  item: MediaViolationTraining | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: 'needs_review' | 'ready' | 'approved') => Promise<boolean>;
}

const MediaViolationDrawer: React.FC<DrawerProps> = ({
  item,
  onClose,
  onUpdateStatus,
}) => {
  if (!item) return null;

  const getRiskLevelBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Critical':
        return <Badge className="bg-red-500">{riskLevel}</Badge>;
      case 'High':
        return <Badge className="bg-orange-500">{riskLevel}</Badge>;
      case 'Medium':
        return <Badge className="bg-yellow-500">{riskLevel}</Badge>;
      case 'Low':
        return <Badge className="bg-green-500">{riskLevel}</Badge>;
      default:
        return <Badge>{riskLevel}</Badge>;
    }
  };

  return (
    <Sheet open={!!item} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl flex items-center gap-2">
            {item.violation_id}
            {getRiskLevelBadge(item.risk_level)}
          </SheetTitle>
          <SheetDescription>
            Violation training data details
          </SheetDescription>
        </SheetHeader>

        <div className="py-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Industry</div>
              <div className="font-medium">{item.industry}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Category</div>
              <div className="font-medium">{item.category}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Media Type</div>
              <div className="font-medium">{item.media_type}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Violation Type</div>
              <div className="font-medium">{item.violation_type}</div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-1">Sample Caption</div>
            <div className="p-3 bg-gray-50 rounded-md">{item.sample_caption}</div>
          </div>

          {item.regulation_citation && (
            <div>
              <div className="text-sm text-gray-500 mb-1">Regulation Citation</div>
              <div className="font-medium">{item.regulation_citation}</div>
              {item.regulation_summary && (
                <div className="text-sm mt-1">{item.regulation_summary}</div>
              )}
            </div>
          )}

          <div>
            <div className="text-sm text-gray-500 mb-2">Labels</div>
            <div className="flex flex-wrap gap-2">
              {item.labels.map((label) => (
                <Badge key={label} variant="outline">
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-2">Remediation Steps</div>
            <ul className="list-disc pl-5 space-y-1">
              {item.remediation_steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-2">Tags</div>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  <TagIcon className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500 mb-2">Copilot Response Sample</div>
              <div className="p-3 bg-gray-50 rounded-md text-sm">
                {item.copilot_response_sample || "No sample response available."}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500 mb-2">Copilot Task Sample</div>
              <div className="p-3 bg-gray-50 rounded-md text-sm">
                {item.copilot_task_sample || "No sample task available."}
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="flex-col sm:flex-row gap-3 sm:justify-between mt-6">
          <div className="flex gap-3">
            {item.status !== 'approved' && (
              <Button
                onClick={() => onUpdateStatus(item.id, 'approved')}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Approve
              </Button>
            )}
            
            {item.status !== 'needs_review' && (
              <Button
                variant="outline"
                onClick={() => onUpdateStatus(item.id, 'needs_review')}
                className="flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                Mark for Review
              </Button>
            )}
          </div>
          
          <SheetClose asChild>
            <Button variant="ghost">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MediaViolationDrawer;
