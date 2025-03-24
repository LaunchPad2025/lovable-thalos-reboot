
import React from "react";
import { Filter, Globe, Calendar, FileType } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterControlsProps {
  filterType: string;
  setFilterType: (value: string) => void;
  jurisdictionFilter: string | null;
  setJurisdictionFilter: (value: string | null) => void;
  statusFilter: string | null;
  setStatusFilter: (value: string | null) => void;
  jurisdictions: string[];
  statuses: string[];
  documentTypes: string[];
}

const FilterControls = ({
  filterType,
  setFilterType,
  jurisdictionFilter,
  setJurisdictionFilter,
  statusFilter,
  setStatusFilter,
  jurisdictions,
  statuses,
  documentTypes,
}: FilterControlsProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Select value={filterType} onValueChange={setFilterType}>
        <SelectTrigger className="w-[180px]">
          <div className="flex items-center">
            <Filter size={16} className="mr-2" />
            <span>Filter by</span>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="industry">Industry</SelectItem>
          <SelectItem value="jurisdiction">Jurisdiction</SelectItem>
          <SelectItem value="status">Status</SelectItem>
          <SelectItem value="document_type">Document Type</SelectItem>
        </SelectContent>
      </Select>
      
      {filterType === 'jurisdiction' && jurisdictions.length > 0 && (
        <Select value={jurisdictionFilter || ''} onValueChange={setJurisdictionFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <div className="flex items-center">
              <Globe size={16} className="mr-2" />
              <span>Jurisdiction</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Jurisdictions</SelectItem>
            {jurisdictions.map(jurisdiction => (
              <SelectItem key={jurisdiction} value={jurisdiction}>{jurisdiction}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      
      {filterType === 'status' && statuses.length > 0 && (
        <Select value={statusFilter || ''} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>Status</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default FilterControls;
