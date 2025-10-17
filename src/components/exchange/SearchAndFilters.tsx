'use client';

import React from 'react';
import { SearchBar, FilterDropdown, ResetButton } from '@/components/searchbar';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    category: string;
    industry: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
  onReset: () => void;
}

const filterOptions = {
  category: [
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'renewable-energy', label: 'Renewable Energy' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'commodities', label: 'Commodities' }
  ],
  industry: [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'solar', label: 'Solar' },
    { value: 'wind', label: 'Wind' },
    { value: 'hydro', label: 'Hydro' }
  ]
};

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  onReset
}: SearchAndFiltersProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 min-w-0">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search"
            className="w-full"
          />
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterDropdown
              options={filterOptions.category}
              value={filters.category}
              onChange={(value) => onFilterChange('category', value)}
              placeholder="Category"
            />
            <FilterDropdown
              options={filterOptions.industry}
              value={filters.industry}
              onChange={(value) => onFilterChange('industry', value)}
              placeholder="Industry"
            />
          </div>

          {/* Reset Button */}
          <ResetButton onClick={onReset} />
        </div>
      </div>
    </div>
  );
}