
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Violation } from '@/types/models';

interface NewViolationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Violation, "id" | "created_at">) => Promise<void>;
}

const NewViolationModal: React.FC<NewViolationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [violation, setViolation] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  // Fix: Use the correct type for severity
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [regulation, setRegulation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        violation: violation,
        description,
        location,
        severity,
        regulation,
        detected_at: new Date().toISOString(),
        organization_id: '00000000-0000-0000-0000-000000000000',
      });
      
      // Reset form
      setViolation('');
      setDescription('');
      setLocation('');
      setSeverity('medium');
      setRegulation('');
      
      onClose();
    } catch (error) {
      console.error('Error submitting violation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-[#0f1419] border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Report New Violation</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="violation" className="text-gray-300">Violation Type</Label>
            <Input
              id="violation"
              value={violation}
              onChange={(e) => setViolation(e.target.value)}
              placeholder="e.g. Missing guardrail"
              className="bg-[#1a1f29] border-gray-700 text-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about the violation"
              className="bg-[#1a1f29] border-gray-700 text-white min-h-[100px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-300">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Building A, Floor 3"
                className="bg-[#1a1f29] border-gray-700 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="severity" className="text-gray-300">Severity</Label>
              <Select 
                value={severity} 
                onValueChange={(value: 'low' | 'medium' | 'high' | 'critical') => setSeverity(value)}
              >
                <SelectTrigger className="bg-[#1a1f29] border-gray-700 text-white">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f29] border-gray-700 text-white">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="regulation" className="text-gray-300">Related Regulation</Label>
            <Input
              id="regulation"
              value={regulation}
              onChange={(e) => setRegulation(e.target.value)}
              placeholder="e.g. OSHA 1926.501"
              className="bg-[#1a1f29] border-gray-700 text-white"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-thalos-blue hover:bg-blue-600">
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewViolationModal;
