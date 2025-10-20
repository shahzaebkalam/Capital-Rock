'use client';

import React from 'react';
import { SearchBar, FilterDropdown, ResetButton } from '@/components/searchbar';

interface Filters {
  approval: string;
  status: string;
  type: string;
}

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onReset: () => void;
}

const filterOptions = {
  approval: [
    { value: 'all', label: 'Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' },
  ],
  status: [
    { value: 'all', label: 'Status' },
    { value: 'live', label: 'Live' },
    { value: 'closed', label: 'Closed' },
  ],
  type: [
    { value: 'all', label: 'Type' },
    { value: 'equity', label: 'Equity' },
    { value: 'bond', label: 'Bond' },
    { value: 'real-estate', label: 'Real Estate' },
  ],
};

export default function SearchAndFilters({ searchQuery, onSearchChange, filters, onFilterChange, onReset }: Props) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-2">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1 min-w-0">
          <SearchBar value={searchQuery} onChange={onSearchChange} placeholder="Search..." className="w-full" />
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <FilterDropdown options={filterOptions.approval} value={filters.approval} onChange={(v) => onFilterChange('approval', v)} placeholder="Approval" />
            <FilterDropdown options={filterOptions.status} value={filters.status} onChange={(v) => onFilterChange('status', v)} placeholder="Status" />
            <FilterDropdown options={filterOptions.type} value={filters.type} onChange={(v) => onFilterChange('type', v)} placeholder="Type" />
          </div>
          <ResetButton onClick={onReset} />
        </div>
      </div>
    </div>
  );
}



