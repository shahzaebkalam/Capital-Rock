"use client";

import MainLayout from '@/app/layouts/MainLayout';
import { useState } from 'react';
import { SearchBar, FilterDropdown, ResetButton } from '@/components/searchbar';
import ROISummary from '@/components/dashboard-ui/ROISummary';
import ExportTools from '@/components/dashboard-ui/ExportTools';

export default function ReportsAnalyticsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    dateRange: 'all',
    type: 'all',
    status: 'all',
  });

  const filterOptions = {
    dateRange: [
      { value: 'all', label: 'Data Range' },
      { value: 'last-7-days', label: 'Last 7 days' },
      { value: 'last-30-days', label: 'Last 30 days' },
      { value: 'last-3-months', label: 'Last 3 months' },
      { value: 'last-year', label: 'Last year' }
    ],
    type: [
      { value: 'all', label: 'Type' },
      { value: 'performance', label: 'Performance' },
      { value: 'regulatory', label: 'Regulatory' },
      { value: 'export', label: 'Export' }
    ],
    status: [
      { value: 'all', label: 'Status' },
      { value: 'completed', label: 'Completed' },
      { value: 'pending', label: 'Pending' },
      { value: 'failed', label: 'Failed' }
    ]
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      dateRange: 'all',
      type: 'all',
      status: 'all',
    });
    setSearchTerm('');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold text-black">Reports</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 lg:justify-end">
              {/* Search Bar */}
              <div className="flex-1 min-w-[220px] lg:max-w-md">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search reports..."
                  className="w-full"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <FilterDropdown
                  options={filterOptions.dateRange}
                  value={filters.dateRange}
                  onChange={(value) => handleFilterChange('dateRange', value)}
                  placeholder="Data Range"
                />
                <FilterDropdown
                  options={filterOptions.type}
                  value={filters.type}
                  onChange={(value) => handleFilterChange('type', value)}
                  placeholder="Type"
                />
                <FilterDropdown
                  options={filterOptions.status}
                  value={filters.status}
                  onChange={(value) => handleFilterChange('status', value)}
                  placeholder="Status"
                />
              </div>

              {/* Reset Button */}
              <ResetButton onClick={handleReset} />
            </div>
          </div>
        </div>

        {/* Reports Sections */}
        <div className="space-y-6">
          <ROISummary />
          <ExportTools />
        </div>
      </div>
    </MainLayout>
  );
}
