"use client";

import MainLayout from '@/app/layouts/MainLayout';
import { useState } from 'react';
import SearchAndFilters from '@/components/investors-list/SearchAndFilters';
import InvestorsTable from '@/components/investors-list/InvestorsTable';
import Pagination from '@/components/ui/Pagination';

export default function InvestorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ dateRange: 'all', country: 'all', payment: 'all', kyc: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFilterChange = (key: 'dateRange' | 'country' | 'payment' | 'kyc', value: string) => {
    setFilters((p) => ({ ...p, [key]: value }));
    setCurrentPage(1);
  };
  const handleReset = () => { setFilters({ dateRange: 'all', country: 'all', payment: 'all', kyc: 'all' }); setSearchQuery(''); setCurrentPage(1); };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-black">Investors List</h1>
        <SearchAndFilters searchQuery={searchQuery} onSearchChange={setSearchQuery} filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Investors</h2>
          <InvestorsTable searchQuery={searchQuery} filters={filters} currentPage={currentPage} onTotalPagesChange={setTotalPages} />
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


