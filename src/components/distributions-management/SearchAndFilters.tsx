'use client';

import React from 'react';
import { SearchBar, FilterDropdown, ResetButton } from '@/components/searchbar';

interface Filters {
  dateRange: string;
  amountRange: string;
  status: string;
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
  amountRange: [
    { value: 'all', label: 'Amount Range' },
    { value: 'lt10k', label: '< $10k' },
    { value: '10k50k', label: '$10k - $50k' },
    { value: 'gt50k', label: '> $50k' },
  ],
  status: [
    { value: 'all', label: 'Status' },
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Completed', label: 'Completed' },
  ],
};

export default function SearchAndFilters({ searchQuery, onSearchChange, filters, onFilterChange, onReset }: Props) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center bg-white py-1 px-3 rounded-md sm:gap-4">
      <SearchBar value={searchQuery} onChange={onSearchChange} placeholder="Search companies..." className="w-full sm:w-64 border-0" />
      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown options={filterOptions.dateRange} value={filters.dateRange} onChange={(v) => onFilterChange('dateRange', v)} placeholder="Date Range" />
        <FilterDropdown options={filterOptions.amountRange} value={filters.amountRange} onChange={(v) => onFilterChange('amountRange', v)} placeholder="Amount Range" />
        <FilterDropdown options={filterOptions.status} value={filters.status} onChange={(v) => onFilterChange('status', v)} placeholder="Status" />
        <ResetButton onClick={onReset} />
      </div>
    </div>
  );
}


