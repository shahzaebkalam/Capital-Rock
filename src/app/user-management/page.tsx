"use client";

import MainLayout from '@/app/layouts/MainLayout';
import { useMemo, useState } from 'react';
import SearchAndFilters from '@/components/user-management/SearchAndFilters';
import UserManagementTable from '@/components/user-management/UserManagementTable';
import Pagination from '@/components/ui/Pagination';

type TabKey = 'investors' | 'issuers' | 'admins';

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('investors');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ dateJoined: 'all', investmentRange: 'all', country: 'all', kyc: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFilterChange = (key: 'dateJoined' | 'investmentRange' | 'country' | 'kyc', value: string) => {
    setFilters((p) => ({ ...p, [key]: value }));
    setCurrentPage(1);
  };
  const handleReset = () => { setFilters({ dateJoined: 'all', investmentRange: 'all', country: 'all', kyc: 'all' }); setSearchQuery(''); setCurrentPage(1); };

  const tabs: { key: TabKey; label: string }[] = useMemo(() => (
    [
      { key: 'investors', label: 'Investors' },
      { key: 'issuers', label: 'Issuers' },
      { key: 'admins', label: 'Admins' },
    ]
  ), []);

  return (
    <MainLayout>
      <div>
        {/* Tabs (match /distributions) */}
        <div className="border-b border-stroke">
          <nav className="flex">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => { setActiveTab(t.key); setCurrentPage(1); }}
                className={`px-4 py-2 font-medium text-sm font-sans rounded-t-lg ${
                  activeTab === t.key
                    ? 'bg-white text-black border-b-2 border-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content with White Background */}
        <div className="bg-white rounded-lg rounded-tl-none border border-gray-200">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border-b border-gray-200">
            <div>
              <h1 className="text-2xl font-semibold text-black">User Management</h1>
            </div>
            <div className="flex items-center gap-4">
              <SearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
              />
            </div>
          </div>

          <div className="p-4">
            <UserManagementTable activeTab={activeTab} searchQuery={searchQuery} filters={filters} currentPage={currentPage} onTotalPagesChange={setTotalPages} />
            {totalPages > 0 && (
              <div className="flex justify-center pt-4">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}



