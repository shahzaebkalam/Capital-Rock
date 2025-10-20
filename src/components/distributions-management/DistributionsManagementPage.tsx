'use client';

import { useState } from 'react';
import DistributionsManagementTable from '@/components/distributions-management/DistributionsManagementTable';
import DistributionsChart from '@/components/distributions-management/DistributionsChart';
import Pagination from '@/components/ui/Pagination';
import SearchAndFilters from './SearchAndFilters';

export default function DistributionsManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    dateRange: 'all',
    amountRange: 'all',
    status: 'all',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ dateRange: 'all', amountRange: 'all', status: 'all' });
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold text-black">Distributions Management</h1>
          <SearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>
      <div className="bg-white rounded-lg border border-stroke">

        <div className="p-4">
            <h1 className='mb-5 text-base font-semibold font-sans'>All Distributions</h1>
          <DistributionsManagementTable
            searchQuery={searchQuery}
            filters={filters}
            currentPage={currentPage}
            onTotalPagesChange={setTotalPages}
          />
          {totalPages > 0 && (
            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      <DistributionsChart />
    </div>
  );
}


