import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface RegulationFormProps {
  isEditing?: boolean;
  regulationId?: string;
  onSuccess?: () => void;
  initialData?: any;
}

const RegulationForm = ({ isEditing = false, regulationId, onSuccess, initialData }: RegulationFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('All');
  const [documentType, setDocumentType] = useState('');
  const [version, setVersion] = useState('');
  const [effectiveDate, setEffectiveDate] = useState<Date | undefined>(undefined);
  const [filePath, setFilePath] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setIndustry(initialData.industry || 'All');
      setDocumentType(initialData.document_type || '');
      setVersion(initialData.version || '');
      setEffectiveDate(initialData.effective_date ? new Date(initialData.effective_date) : undefined);
      setFilePath(initialData.file_path || '');
      setFileType(initialData.file_type || '');
      setFileSize(initialData.file_size || '');
    }
  }, [initialData]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !documentType) {
      toast({
        title: "Required fields missing",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const documentData = {
        title: title,
        description: description,
        industry: industry,
        document_type: documentType, // Ensure this is provided
        version: version,
        effective_date: effectiveDate,
        file_path: filePath,
        file_type: fileType,
        file_size: fileSize,
      };
      
      if (isEditing && regulationId) {
        const { error } = await supabase
          .from('regulations')
          .update(documentData)
          .eq('id', regulationId);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('regulations')
          .insert([documentData]);
        
        if (error) throw error;
      }
      
      toast({
        title: `Regulation ${isEditing ? 'updated' : 'created'} successfully`,
        description: `The regulation "${title}" has been ${isEditing ? 'updated' : 'created'}.`,
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting regulation:', error);
      toast({
        title: 'Error',
        description: `Failed to ${isEditing ? 'update' : 'create'} regulation. Please try again.`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter regulation title"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter regulation description"
        />
      </div>
      
      <div>
        <Label htmlFor="industry">Industry</Label>
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger>
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Construction">Construction</SelectItem>
            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
            <SelectItem value="Warehousing">Warehousing</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="documentType">Document Type</Label>
        <Input
          type="text"
          id="documentType"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          placeholder="Enter document type"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="version">Version</Label>
        <Input
          type="text"
          id="version"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          placeholder="Enter version"
        />
      </div>
      
      <div>
        <Label htmlFor="effectiveDate">Effective Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !effectiveDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {effectiveDate ? format(effectiveDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={effectiveDate}
              onSelect={setEffectiveDate}
              disabled={(date) =>
                date > new Date()
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div>
        <Label htmlFor="filePath">File Path</Label>
        <Input
          type="text"
          id="filePath"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
          placeholder="Enter file path"
        />
      </div>
      
      <div>
        <Label htmlFor="fileType">File Type</Label>
        <Input
          type="text"
          id="fileType"
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          placeholder="Enter file type"
        />
      </div>
      
      <div>
        <Label htmlFor="fileSize">File Size</Label>
        <Input
          type="text"
          id="fileSize"
          value={fileSize}
          onChange={(e) => setFileSize(e.target.value)}
          placeholder="Enter file size"
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : (isEditing ? 'Update Regulation' : 'Create Regulation')}
      </Button>
    </form>
  );
};

export default RegulationForm;
