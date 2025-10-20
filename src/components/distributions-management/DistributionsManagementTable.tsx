'use client';

import React, { useMemo, useState } from 'react';
import NoDataFound from '@/components/ui/NoDataFound';
import { MoreVerticalIcon, OceanAssetIcon, SolarAssetIcon } from '@/lib/icons';

interface Row {
  id: number;
  company: string;
  dateJoined: string;
  amount: string;
  investorsPaid: string;
  status: 'Active' | 'Scheduled' | 'Completed';
}

const mockData: Row[] = Array.from({ length: 22 }).map((_, i) => ({
  id: i + 1,
  company: i % 2 === 0 ? 'Alpha Ventures' : 'Beta Capital',
  dateJoined: '02 Feb 2025',
  amount: i % 3 === 0 ? '$75,000' : '$50,000',
  investorsPaid: i % 4 === 0 ? '132/132' : '0/90',
  status: i % 5 === 0 ? 'Completed' : i % 2 === 0 ? 'Scheduled' : 'Active',
}));

interface Props {
  searchQuery: string;
  filters: { dateRange: string; amountRange: string; status: string };
  currentPage: number;
  onTotalPagesChange?: (n: number) => void;
}

export default function DistributionsManagementTable({ searchQuery, filters, currentPage, onTotalPagesChange }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const getProjectIcon = (company: string) => {
    const iconClass = 'w-6 h-6 text-white';
    return company.startsWith('Alpha') ? (
      <OceanAssetIcon className={iconClass} />
    ) : (
      <SolarAssetIcon className={iconClass} />
    );
  };

  const getIconBackgroundColor = (company: string) => {
    return company.startsWith('Alpha') ? 'bg-blue-500' : 'bg-green-500';
  };

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return mockData.filter((r) => {
      const matchesSearch = !q || r.company.toLowerCase().includes(q);
      const matchesStatus = filters.status === 'all' || r.status === (filters.status as Row['status']);
      // amount/date filters can be wired later as needed
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filters]);

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
      if (checked) pageRows.forEach((r) => next.add(r.id)); else pageRows.forEach((r) => next.delete(r.id));
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

  const StatusBadge = ({ status }: { status: Row['status'] }) => {
    const base = 'px-3 py-1 rounded-full text-xs font-medium';
    const map = {
      Active: 'bg-success-100 text-success-600 border border-success-300',
      Scheduled: 'bg-warning-100 text-warning-600 border border-warning-300',
      Completed: 'bg-gray-100 text-gray-600 border border-gray-300',
    } as const;
    return <span className={`${base} ${map[status]}`}>{status}</span>;
  };

  return (
    <div className="bg-white rounded-lg border border-stroke overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="w-12 px-3 py-3">
                <input type="checkbox" className="rounded border-stroke" checked={allSelected} ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }} onChange={(e) => toggleAll(e.target.checked)} />
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Company</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Date Joined</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Investors Paid</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke">
            {pageRows.map((row) => (
              <tr key={row.id} className="hover:bg-background-light">
                <td className="w-12 px-3 py-4">
                  <input type="checkbox" className="rounded border-stroke" checked={selected.has(row.id)} onChange={() => toggleOne(row.id)} />
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className={`p-1 ${getIconBackgroundColor(row.company)} rounded-full flex items-center justify-center`}>
                      {getProjectIcon(row.company)}
                    </div>
                    {row.company}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.dateJoined}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.amount}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.investorsPaid}</td>
                <td className="px-4 py-4"><StatusBadge status={row.status} /></td>
                <td className="px-4 py-4"><button className="text-gray-400 hover:text-gray-600"><MoreVerticalIcon className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


