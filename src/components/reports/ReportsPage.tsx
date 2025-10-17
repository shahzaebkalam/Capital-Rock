'use client';

import React, { useState } from 'react';
import { SearchBar, FilterDropdown, ResetButton } from '@/components/searchbar';
import PerformanceReport from './PerformanceReport';
import RegulatoryReports from './RegulatoryReports';
import ExportTools from '../dashboard-ui/ExportTools';

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filterOptions = {
    dateRange: [
      { value: 'last-7-days', label: 'Last 7 days' },
      { value: 'last-30-days', label: 'Last 30 days' },
      { value: 'last-3-months', label: 'Last 3 months' },
      { value: 'last-year', label: 'Last year' }
    ],
    type: [
      { value: 'performance', label: 'Performance' },
      { value: 'regulatory', label: 'Regulatory' },
      { value: 'export', label: 'Export' }
    ],
    status: [
      { value: 'completed', label: 'Completed' },
      { value: 'pending', label: 'Pending' },
      { value: 'failed', label: 'Failed' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">Reports</h1>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1 min-w-0">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search reports..."
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

      {/* Reports Sections */}
      <div className="space-y-6">
        <PerformanceReport />
        <RegulatoryReports />
        <ExportTools stepNumber={3} />
      </div>
    </div>
  );
}
