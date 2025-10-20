"use client";

import MainLayout from '@/app/layouts/MainLayout';
import { useMemo, useState } from 'react';
import SearchAndFilters from '@/components/transactions-payments/SearchAndFilters';
import TransactionsTable from '@/components/transactions-payments/TransactionsTable';
import PortfolioSummaryCards from '@/components/dashboard-ui/PortfolioSummaryCards';
import Pagination from '@/components/ui/Pagination';

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ dateRange: 'all', method: 'all', status: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFilterChange = (key: 'dateRange' | 'method' | 'status', value: string) => {
    setFilters((p) => ({ ...p, [key]: value }));
    setCurrentPage(1);
  };
  const handleReset = () => { setFilters({ dateRange: 'all', method: 'all', status: 'all' }); setSearchQuery(''); setCurrentPage(1); };

  const summaryItems = useMemo(() => ([
    { title: 'Total Volume (USD)', value: '$8,750,000', change: '+10%', isPositive: true },
    { title: 'Pending Transactions', value: '20', change: '-2%', isPositive: false },
    { title: 'Completed Transactions', value: '2400', change: '+10%', isPositive: true },
    { title: 'Refunds Issued', value: '30', change: '+1%', isPositive: true },
  ]), []);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col lg:flex-row lg:flex-nowrap lg:items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold text-black whitespace-nowrap flex-shrink-0">Transactions & Payments</h1>
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* Summary Cards */}
        <PortfolioSummaryCards title="Summary" items={summaryItems} />

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Investors</h2>
          <TransactionsTable
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



