'use client';

import React from 'react';
import { SearchBar, FilterDropdown, ResetButton } from '@/components/searchbar';

interface Filters {
  dateJoined: string;
  investmentRange: string;
  country: string;
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
  dateJoined: [
    { value: 'all', label: 'Date Joined' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
  ],
  investmentRange: [
    { value: 'all', label: 'Investment Range' },
    { value: '<10k', label: '< $10k' },
    { value: '10k-100k', label: '$10k - $100k' },
    { value: '>100k', label: '> $100k' },
  ],
  country: [
    { value: 'all', label: 'Country' },
    { value: 'USA', label: 'USA' },
    { value: 'PK', label: 'PK' },
    { value: 'DE', label: 'DE' },
    { value: 'SG', label: 'SG' },
    { value: 'UAE', label: 'UAE' },
    { value: 'UK', label: 'UK' },
  ],
  kyc: [
    { value: 'all', label: 'KYC Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
  ],
};

export default function SearchAndFilters({ searchQuery, onSearchChange, filters, onFilterChange, onReset }: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <div className="flex-1 min-w-0">
        <SearchBar value={searchQuery} onChange={onSearchChange} placeholder="Search users..." className="w-full" />
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown options={filterOptions.dateJoined} value={filters.dateJoined} onChange={(v) => onFilterChange('dateJoined', v)} placeholder="Date Joined" />
          <FilterDropdown options={filterOptions.investmentRange} value={filters.investmentRange} onChange={(v) => onFilterChange('investmentRange', v)} placeholder="Investment Range" />
          <FilterDropdown options={filterOptions.country} value={filters.country} onChange={(v) => onFilterChange('country', v)} placeholder="Country" />
          <FilterDropdown options={filterOptions.kyc} value={filters.kyc} onChange={(v) => onFilterChange('kyc', v)} placeholder="KYC Status" />
        </div>
        <ResetButton onClick={onReset} />
      </div>
    </div>
  );
}



