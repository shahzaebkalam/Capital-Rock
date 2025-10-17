'use client';

import React from 'react';
import { SearchBar, FilterDropdown, ResetButton } from '@/components/searchbar';

interface Filters {
  dateRange: string;
  filterA: string;
  filterB: string;
  status: string;
}

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: Filters;
  onFilterChange: (filterType: keyof Filters, value: string) => void;
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
    { value: 'type-private', label: 'Private Equity' },
    { value: 'type-vc', label: 'VC Fund' },
  ],
  filterB: [
    { value: 'all', label: 'Filter Name' },
    { value: 'jur-us', label: 'United States' },
    { value: 'jur-eu', label: 'European Union' },
  ],
  status: [
    { value: 'all', label: 'Status' },
    { value: 'live', label: 'Live' },
    { value: 'closed', label: 'Closed' },
  ],
};

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  onReset,
}: SearchAndFiltersProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1 min-w-0">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search assets..."
            className="w-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <FilterDropdown
              options={filterOptions.dateRange}
              value={filters.dateRange}
              onChange={(value) => onFilterChange('dateRange', value)}
              placeholder="Date Range"
            />
            <FilterDropdown
              options={filterOptions.filterA}
              value={filters.filterA}
              onChange={(value) => onFilterChange('filterA', value)}
              placeholder="Filter Name"
            />
            <FilterDropdown
              options={filterOptions.filterB}
              value={filters.filterB}
              onChange={(value) => onFilterChange('filterB', value)}
              placeholder="Filter Name"
            />
            <FilterDropdown
              options={filterOptions.status}
              value={filters.status}
              onChange={(value) => onFilterChange('status', value)}
              placeholder="Status"
            />
          </div>

          <ResetButton onClick={onReset} />
        </div>
      </div>
    </div>
  );
}


