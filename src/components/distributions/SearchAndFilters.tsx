'use client';

import React from 'react';
import { SearchBar, FilterDropdown, ResetButton } from '@/components/searchbar';

interface Filters {
  dateRange: string;
  filterA: string;
  filterB: string;
}

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
  filterA: [
    { value: 'all', label: 'Filter Name' },
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ],
  filterB: [
    { value: 'all', label: 'Filter Name' },
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ],
};

export default function SearchAndFilters({ searchQuery, onSearchChange, filters, onFilterChange, onReset }: Props) {
  return (
    <div className="flex items-center gap-4">
      <SearchBar value={searchQuery} onChange={onSearchChange} placeholder="Search distributions..." className="w-64" />
      <div className="flex items-center gap-2">
        <FilterDropdown options={filterOptions.dateRange} value={filters.dateRange} onChange={(v) => onFilterChange('dateRange', v)} placeholder="Date Range" />
        <FilterDropdown options={filterOptions.filterA} value={filters.filterA} onChange={(v) => onFilterChange('filterA', v)} placeholder="Filter Name" />
        <FilterDropdown options={filterOptions.filterB} value={filters.filterB} onChange={(v) => onFilterChange('filterB', v)} placeholder="Filter Name" />
        <ResetButton onClick={onReset} />
      </div>
    </div>
  );
}
