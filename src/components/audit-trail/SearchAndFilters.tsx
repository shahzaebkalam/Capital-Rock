'use client';

import React from 'react';
import { SearchBar, FilterDropdown, ResetButton } from '@/components/searchbar';

interface Filters {
  dateRange: string;
  user: string;
  actionType: string;
  asset: string;
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
  user: [
    { value: 'all', label: 'User' },
    { value: 'sarah', label: 'Sarah Lee' },
    { value: 'mark', label: 'Mark Johnson' },
    { value: 'system', label: 'System' },
  ],
  actionType: [
    { value: 'all', label: 'Action Type' },
    { value: 'deposit', label: 'Deposit' },
    { value: 'withdrawal', label: 'Withdrawal' },
    { value: 'update', label: 'Update' },
  ],
  asset: [
    { value: 'all', label: 'Asset' },
    { value: 'alpha', label: 'Alpha' },
    { value: 'beta', label: 'Beta' },
  ],
} as const;

export default function SearchAndFilters({ searchQuery, onSearchChange, filters, onFilterChange, onReset }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center bg-white py-1 px-3 rounded-md sm:gap-4 gap-2">
      <SearchBar value={searchQuery} onChange={onSearchChange} placeholder="Search..." className="w-full sm:w-64 border-0" />
      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown options={filterOptions.dateRange} value={filters.dateRange} onChange={(v) => onFilterChange('dateRange', v)} placeholder="Date Range" />
        <FilterDropdown options={filterOptions.user} value={filters.user} onChange={(v) => onFilterChange('user', v)} placeholder="User" />
        <FilterDropdown options={filterOptions.actionType} value={filters.actionType} onChange={(v) => onFilterChange('actionType', v)} placeholder="Action Type" />
        <FilterDropdown options={filterOptions.asset} value={filters.asset} onChange={(v) => onFilterChange('asset', v)} placeholder="Asset" />
        <ResetButton onClick={onReset} />
      </div>
    </div>
  );
}


