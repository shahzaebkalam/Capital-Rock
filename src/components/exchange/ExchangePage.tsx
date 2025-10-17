'use client';

import { useState } from 'react';
import ExchangeTable from './ExchangeTable';
import SearchAndFilters from './SearchAndFilters';
import Pagination from '@/components/ui/Pagination';
import { ViewToggle } from '@/components/searchbar';

export default function ExchangePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'holdings'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    industry: '',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleResetFilters = () => {
    setFilters({
      category: '',
      industry: '',
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-stroke">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 font-medium text-sm font-sans rounded-t-lg ${
              activeTab === 'all'
                ? 'bg-white text-black border-b-2 border-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('holdings')}
            className={`px-4 py-2 font-medium text-sm font-sans rounded-t-lg ${
              activeTab === 'holdings'
                ? 'bg-white text-black border-b-2 border-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            My Holdings
          </button>
        </nav>
      </div>

      {/* Main Content with White Background */}
      <div className="bg-white rounded-lg rounded-tl-none border border-gray-200">
        {/* Header Row */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-semibold text-black">Market</h1>
            <p className="text-gray-600 font-sans">Lorem ipsum is a dummy text for printing.</p>
          </div>
          <ViewToggle
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>
        <div className="p-4 border-b border-gray-200">
          <SearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>
        
        <div className="p-4">
          <ExchangeTable 
            activeTab={activeTab}
            searchTerm={searchQuery}
            categoryFilter={filters.category}
            industryFilter={filters.industry}
            viewMode={viewMode}
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
  );
}
