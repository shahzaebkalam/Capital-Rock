'use client';

import React from 'react';
import Input from '@/components/ui/Input';
import CompactSelect from '@/components/ui/CompactSelect';
import Button from '@/components/ui/Button';
import { SearchIcon, ResetIcon, GridIcon, ListIcon } from '@/lib/icons';

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
    { value: '', label: 'All Categories' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'renewable-energy', label: 'Renewable Energy' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'commodities', label: 'Commodities' }
  ],
  jurisdiction: [
    { value: '', label: 'All Jurisdictions' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'eu', label: 'European Union' },
    { value: 'sg', label: 'Singapore' }
  ],
  minTicketSize: [
    { value: '', label: 'Any Amount' },
    { value: '1000', label: '$1,000+' },
    { value: '5000', label: '$5,000+' },
    { value: '10000', label: '$10,000+' },
    { value: '25000', label: '$25,000+' },
    { value: '50000', label: '$50,000+' }
  ],
  currency: [
    { value: '', label: 'All Currencies' },
    { value: 'usd', label: 'USD' },
    { value: 'eur', label: 'EUR' },
    { value: 'gbp', label: 'GBP' },
    { value: 'sgd', label: 'SGD' }
  ],
  status: [
    { value: '', label: 'All Status' },
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
      <div className="flex flex-col xl:flex-row xl:items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-transparent text-sm placeholder:text-gray-400 focus:outline-none border-none"
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3">
          <CompactSelect
            label="Category"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            options={filterOptions.category}
          />
          
          <CompactSelect
            label="Jurisdiction"
            value={filters.jurisdiction}
            onChange={(e) => onFilterChange('jurisdiction', e.target.value)}
            options={filterOptions.jurisdiction}
          />
          
          <CompactSelect
            label="Min Ticket Size"
            value={filters.minTicketSize}
            onChange={(e) => onFilterChange('minTicketSize', e.target.value)}
            options={filterOptions.minTicketSize}
          />
          
          <CompactSelect
            label="Currency"
            value={filters.currency}
            onChange={(e) => onFilterChange('currency', e.target.value)}
            options={filterOptions.currency}
          />
          
          <CompactSelect
            label="Status"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            options={filterOptions.status}
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-black hover:bg-gray-200 transition-colors"
        >
          <ResetIcon className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
