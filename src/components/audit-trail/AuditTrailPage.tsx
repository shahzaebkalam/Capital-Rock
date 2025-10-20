'use client';

import { useMemo, useState } from 'react';
import Pagination from '@/components/ui/Pagination';
import SearchAndFilters from './SearchAndFilters';
import AuditTrailTable, { AuditRow } from './AuditTrailTable';

const MOCK_ROWS: AuditRow[] = Array.from({ length: 26 }).map((_, i) => ({
  id: i + 1,
  dateTime: '01 Feb 2025 | 05:10:20 am',
  user: i % 3 === 0 ? 'Sarah Lee' : i % 3 === 1 ? 'Mark Johnson' : 'System',
  action: i % 2 === 0 ? '$75,000' : '$50,000',
  details:
    i % 2 === 0
      ? 'Investor #1456 Investor #1456 Investor #1456 Investor #1456'
      : 'Gamma Ventures Gamma Ventures Gamma Ventures',
}));

export default function AuditTrailPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ dateRange: 'all', user: 'all', actionType: 'all', asset: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((p) => ({ ...p, [key]: value }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({ dateRange: 'all', user: 'all', actionType: 'all', asset: 'all' });
    setSearch('');
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return MOCK_ROWS.filter((r) =>
      (!q || r.user.toLowerCase().includes(q) || r.details.toLowerCase().includes(q) || r.action.toLowerCase().includes(q))
    );
  }, [search]);

  const itemsPerPage = 10;
  const total = filtered.length;
  const pages = total === 0 ? 0 : Math.ceil(total / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageRows = filtered.slice(start, start + itemsPerPage);

  useMemo(() => setTotalPages(pages), [pages]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-black">Audit Trail</h1>
        <SearchAndFilters
          searchQuery={search}
          onSearchChange={setSearch}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-stroke overflow-hidden">
        <h2 className="px-4 pt-4 pb-2 text-sm font-semibold text-secondary-black">Full log of all admin and system activities</h2>
        <AuditTrailTable rows={pageRows} />
        {totalPages > 0 && (
          <div className="flex justify-center p-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  );
}


