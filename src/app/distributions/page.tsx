"use client";

import MainLayout from '@/app/layouts/MainLayout';
import { useState } from 'react';
import SearchAndFilters from '@/components/distributions/SearchAndFilters';
import DistributionsTable from '@/components/distributions/DistributionsTable';
import Pagination from '@/components/ui/Pagination';

export default function DistributionsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    dateRange: 'all',
    filterA: 'all',
    filterB: 'all',
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
    setFilters({
      dateRange: 'all',
      filterA: 'all',
      filterB: 'all',
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <MainLayout>
      <div>
        {/* Tabs */}
        <div className="border-b border-stroke">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 font-medium text-sm font-sans rounded-t-lg ${
                activeTab === 'upcoming'
                  ? 'bg-white text-black border-b-2 border-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 font-medium text-sm font-sans rounded-t-lg ${
                activeTab === 'history'
                  ? 'bg-white text-black border-b-2 border-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              History
            </button>
          </nav>
        </div>

        {/* Main Content with White Background */}
        <div className="bg-white rounded-lg rounded-tl-none border border-gray-200">
          {/* Header Row */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h1 className="text-2xl font-semibold text-black">Distributions</h1>
            </div>
            <div className="flex items-center gap-4">
              <SearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          </div>
          
          <div className="p-4">
            <DistributionsTable 
              activeTab={activeTab}
              searchQuery={searchQuery}
              filters={filters}
              currentPage={currentPage}
              onTotalPagesChange={setTotalPages}
            />
            {/* Pagination */}
            {totalPages > 0 && (
              <div className="flex justify-center pt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
