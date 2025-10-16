'use client';

import React from 'react';
import { SearchBar, FilterDropdown, ResetButton } from '@/components/searchbar';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const filterOptions = {
  dateRange: [
    { value: 'last-7-days', label: 'Last 7 days' },
    { value: 'last-30-days', label: 'Last 30 days' },
    { value: 'last-3-months', label: 'Last 3 months' },
    { value: 'last-year', label: 'Last year' }
  ],
  type: [
    { value: 'dividend', label: 'Dividend' },
    { value: 'coupon', label: 'Coupon' },
    { value: 'interest', label: 'Interest' },
    { value: 'capital-gain', label: 'Capital Gain' }
  ],
  status: [
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'cancelled', label: 'Cancelled' }
  ]
};

export default function SearchAndFilters({ 
  searchTerm, 
  onSearchChange
}: SearchAndFiltersProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 min-w-0">
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search cashflows..."
            className="w-full"
          />
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterDropdown
              options={filterOptions.dateRange}
              placeholder="Date Range"
            />
            <FilterDropdown
              options={filterOptions.type}
              placeholder="Type"
            />
            <FilterDropdown
              options={filterOptions.status}
              placeholder="Status"
            />
          </div>

          {/* Reset Button */}
          <ResetButton />
        </div>
      </div>
    </div>
  );
}
