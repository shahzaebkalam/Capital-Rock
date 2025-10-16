'use client';

import React, { useState } from 'react';
import SearchAndFilters from './SearchAndFilters';
import ChartsAndAnalytics from './ChartsAndAnalytics';
import CashflowTable from './CashflowTable';
import { ViewToggle } from '@/components/searchbar';

export default function CashflowsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">Cashflows</h1>
        <ViewToggle
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>

      {/* Search and Filters */}
      <SearchAndFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Charts & Analytics */}
      <ChartsAndAnalytics />

      {/* Cashflow Table */}
      <CashflowTable 
        searchTerm={searchTerm}
        viewMode={viewMode}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        onTotalPagesChange={setTotalPages}
      />
    </div>
  );
}
