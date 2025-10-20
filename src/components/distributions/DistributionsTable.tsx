'use client';

import React, { useMemo, useState } from 'react';
import NoDataFound from '@/components/ui/NoDataFound';
import { MoreVerticalIcon, OceanAssetIcon, SolarAssetIcon } from '@/lib/icons';

interface Distribution {
  id: number;
  assetName: string;
  amount: string;
  distributionDate: string;
  status: 'Scheduled' | 'Pending' | 'Completed';
  iconType: 'ocean' | 'solar';
}

const upcomingData: Distribution[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  assetName: i % 2 === 0 ? 'Alpha Growth Fund' : 'Gamma Ventures',
  amount: '$10,000',
  distributionDate: '02 Feb 2025',
  status: i % 2 === 0 ? 'Scheduled' : 'Pending',
  iconType: i % 2 === 0 ? 'ocean' : 'solar',
}));

const historyData: Distribution[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  assetName: i % 2 === 0 ? 'Alpha Growth Fund' : 'Gamma Ventures',
  amount: '$10,000',
  distributionDate: '15 Jan 2025',
  status: 'Completed',
  iconType: i % 2 === 0 ? 'ocean' : 'solar',
}));

interface Props {
  activeTab: 'upcoming' | 'history';
  searchQuery: string;
  filters: { dateRange: string; filterA: string; filterB: string };
  currentPage: number;
  onTotalPagesChange?: (n: number) => void;
}

export default function DistributionsTable({ activeTab, searchQuery, filters, currentPage, onTotalPagesChange }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const data = activeTab === 'upcoming' ? upcomingData : historyData;

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return data.filter((r) => {
      const matchesSearch = !q || r.assetName.toLowerCase().includes(q);
      const matchesDateRange = filters.dateRange === 'all' || !filters.dateRange;
      const matchesFilterA = filters.filterA === 'all' || !filters.filterA;
      const matchesFilterB = filters.filterB === 'all' || !filters.filterB;
      return matchesSearch && matchesDateRange && matchesFilterA && matchesFilterB;
    });
  }, [data, searchQuery, filters]);

  const itemsPerPage = 10;
  const totalPages = filtered.length === 0 ? 0 : Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageRows = filtered.slice(start, start + itemsPerPage);

  React.useEffect(() => {
    if (onTotalPagesChange) {
      onTotalPagesChange(totalPages);
    }
  }, [totalPages, onTotalPagesChange]);

  const allSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));
  const someSelected = pageRows.some((r) => selected.has(r.id));

  const toggleAll = (checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) pageRows.forEach((r) => next.add(r.id));
      else pageRows.forEach((r) => next.delete(r.id));
      return next;
    });
  };

  const toggleOne = (id: number) => setSelected((p) => { 
    const n = new Set(p); 
    if (n.has(id)) {
      n.delete(id);
    } else {
      n.add(id);
    }
    return n; 
  });

  if (pageRows.length === 0) {
    return <NoDataFound title="No distributions found" description="Try adjusting your search or filter criteria." />;
  }

  const StatusBadge = ({ status }: { status: Distribution['status'] }) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    const statusClasses = {
      'Scheduled': 'bg-success-100 text-success-600 border border-success-300',
      'Pending': 'bg-warning-100 text-warning-600 border border-warning-300',
      'Completed': 'bg-gray-100 text-gray-600 border border-gray-300',
    };
    
    return (
      <span className={`${baseClasses} ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  const getProjectIcon = (iconType: 'ocean' | 'solar') => {
    const iconClass = 'w-6 h-6 text-white';
    return iconType === 'ocean' ? (
      <OceanAssetIcon className={iconClass} />
    ) : (
      <SolarAssetIcon className={iconClass} />
    );
  };

  const getIconBackgroundColor = (iconType: 'ocean' | 'solar') => {
    return iconType === 'ocean' ? 'bg-blue-500' : 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg border border-stroke overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="w-12 px-3 py-3">
                <input 
                  type="checkbox" 
                  className="rounded border-stroke" 
                  checked={allSelected} 
                  ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }} 
                  onChange={(e) => toggleAll(e.target.checked)} 
                />
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Asset Name</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Distribution Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke">
            {pageRows.map((row) => (
              <tr key={row.id} className="hover:bg-background-light">
                <td className="w-12 px-3 py-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-stroke" 
                    checked={selected.has(row.id)} 
                    onChange={() => toggleOne(row.id)} 
                  />
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${getIconBackgroundColor(row.iconType)} rounded-full flex items-center justify-center`}>
                      {getProjectIcon(row.iconType)}
                    </div>
                    {row.assetName}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.amount}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.distributionDate}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVerticalIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
