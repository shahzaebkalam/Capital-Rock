"use client";

import MainLayout from '@/app/layouts/MainLayout';
import { useState } from 'react';
import SearchAndFilters from '@/components/my-assets/SearchAndFilters';
import MyAssetsTable from '@/components/my-assets/MyAssetsTable';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import { useRouter } from 'next/navigation';

export default function MyAssetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    dateRange: 'all',
    filterA: 'all',
    filterB: 'all',
    status: 'all',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const handleFilterChange = (key: 'dateRange' | 'filterA' | 'filterB' | 'status', value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({ dateRange: 'all', filterA: 'all', filterB: 'all', status: 'all' });
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-black">My Assets</h1>
          <Button className="bg-primary text-white hover:bg-primary/90"
          onClick={() => router.push('/my-assets/create')}
          >Create New Asset</Button>
        </div>

        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />

        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Investors</h2>
          <MyAssetsTable 
            searchQuery={searchQuery} 
            filters={filters} 
            currentPage={currentPage}
            onTotalPagesChange={setTotalPages}
          />
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


