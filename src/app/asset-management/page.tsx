"use client";

import MainLayout from '@/app/layouts/MainLayout';
import { useState } from 'react';
import SearchAndFilters from '@/components/asset-management/SearchAndFilters';
import AssetManagementTable from '@/components/asset-management/AssetManagementTable';
import Pagination from '@/components/ui/Pagination';

export default function AssetManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ approval: 'all', status: 'all', type: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFilterChange = (key: 'approval' | 'status' | 'type', value: string) => {
    setFilters((p) => ({ ...p, [key]: value }));
    setCurrentPage(1);
  };
  const handleReset = () => { setFilters({ approval: 'all', status: 'all', type: 'all' }); setSearchQuery(''); setCurrentPage(1); };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-black">Asset Management</h1>
        <SearchAndFilters searchQuery={searchQuery} onSearchChange={setSearchQuery} filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Investors</h2>
          <AssetManagementTable searchQuery={searchQuery} filters={filters} currentPage={currentPage} onTotalPagesChange={setTotalPages} />
          {totalPages > 0 && (
            <div className="flex justify-center pt-4">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}



