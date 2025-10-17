'use client';

import React from 'react';
import { SearchBar, FilterDropdown, ResetButton } from '@/components/searchbar';

interface Filters { dateRange: string; method: string; status: string; }

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onReset: () => void;
}

const filterOptions = {
  dateRange: [
    { value: 'all', label: 'Date Range' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
  ],
  method: [
    { value: 'all', label: 'Method' },
    { value: 'SEPA', label: 'SEPA' },
    { value: 'USDC', label: 'USDC' },
  ],
  status: [
    { value: 'all', label: 'Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
  ],
};

export default function SearchAndFilters({ searchQuery, onSearchChange, filters, onFilterChange, onReset }: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
      <div className="flex-1 min-w-0">
        <SearchBar value={searchQuery} onChange={onSearchChange} placeholder="Search transactions..." className="w-full" />
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown options={filterOptions.dateRange} value={filters.dateRange} onChange={(v) => onFilterChange('dateRange', v)} placeholder="Date Range" />
          <FilterDropdown options={filterOptions.method} value={filters.method} onChange={(v) => onFilterChange('method', v)} placeholder="Method" />
          <FilterDropdown options={filterOptions.status} value={filters.status} onChange={(v) => onFilterChange('status', v)} placeholder="Status" />
        </div>
        <ResetButton onClick={onReset} />
      </div>
    </div>
  );
}



