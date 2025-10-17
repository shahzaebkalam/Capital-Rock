'use client';

import React from 'react';
import { SearchBar, FilterDropdown, ResetButton } from '@/components/searchbar';

interface Filters {
  dateRange: string;
  country: string;
  payment: string;
  kyc: string;
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
  country: [
    { value: 'all', label: 'Country' },
    { value: 'US', label: 'USA' },
    { value: 'DE', label: 'DE' },
    { value: 'UK', label: 'UK' },
    { value: 'SG', label: 'SG' },
    { value: 'UAE', label: 'UAE' },
    { value: 'PK', label: 'PK' },
  ],
  payment: [
    { value: 'all', label: 'Payment Method' },
    { value: 'SEPA', label: 'SEPA' },
    { value: 'USDC', label: 'USDC' },
  ],
  kyc: [
    { value: 'all', label: 'KYC Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
  ],
};

export default function SearchAndFilters({ searchQuery, onSearchChange, filters, onFilterChange, onReset }: Props) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1 min-w-0">
          <SearchBar value={searchQuery} onChange={onSearchChange} placeholder="Search investors..." className="w-full" />
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <FilterDropdown options={filterOptions.dateRange} value={filters.dateRange} onChange={(v) => onFilterChange('dateRange', v)} placeholder="Date Range" />
            <FilterDropdown options={filterOptions.country} value={filters.country} onChange={(v) => onFilterChange('country', v)} placeholder="Country" />
            <FilterDropdown options={filterOptions.payment} value={filters.payment} onChange={(v) => onFilterChange('payment', v)} placeholder="Payment Method" />
            <FilterDropdown options={filterOptions.kyc} value={filters.kyc} onChange={(v) => onFilterChange('kyc', v)} placeholder="KYC Status" />
          </div>
          <ResetButton onClick={onReset} />
        </div>
      </div>
    </div>
  );
}


