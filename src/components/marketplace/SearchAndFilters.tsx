'use client';

import React from 'react';
import { SearchBar, FilterDropdown, ResetButton } from '@/components/searchbar';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    category: string;
    jurisdiction: string;
    minTicketSize: string;
    currency: string;
    status: string;
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
  jurisdiction: [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'eu', label: 'European Union' },
    { value: 'sg', label: 'Singapore' }
  ],
  minTicketSize: [
    { value: '1000', label: '$1,000+' },
    { value: '5000', label: '$5,000+' },
    { value: '10000', label: '$10,000+' },
    { value: '25000', label: '$25,000+' },
    { value: '50000', label: '$50,000+' }
  ],
  currency: [
    { value: 'usd', label: 'USD' },
    { value: 'eur', label: 'EUR' },
    { value: 'gbp', label: 'GBP' },
    { value: 'sgd', label: 'SGD' }
  ],
  status: [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'closed', label: 'Closed' },
    { value: 'sold-out', label: 'Sold Out' }
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
            placeholder="Search assets..."
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
              options={filterOptions.jurisdiction}
              value={filters.jurisdiction}
              onChange={(value) => onFilterChange('jurisdiction', value)}
              placeholder="Jurisdiction"
            />
            <FilterDropdown
              options={filterOptions.minTicketSize}
              value={filters.minTicketSize}
              onChange={(value) => onFilterChange('minTicketSize', value)}
              placeholder="Min. Ticket"
            />
            <FilterDropdown
              options={filterOptions.currency}
              value={filters.currency}
              onChange={(value) => onFilterChange('currency', value)}
              placeholder="Currency"
            />
            <FilterDropdown
              options={filterOptions.status}
              value={filters.status}
              onChange={(value) => onFilterChange('status', value)}
              placeholder="Status"
            />
          </div>

          {/* Reset Button */}
          <ResetButton onClick={onReset} />
        </div>
      </div>
    </div>
  );
}