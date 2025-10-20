'use client';

import React, { useMemo, useState } from 'react';
import NoDataFound from '@/components/ui/NoDataFound';
import { MoreVerticalIcon } from '@/lib/icons';
import Avatar from '../ui/Avatar';

interface Investor {
  id: number;
  name: string;
  email: string;
  country: string;
  amount: string;
  payment: string;
  date: string;
  kyc: 'Active' | 'Pending';
}

const mock: Investor[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: ['Alex Mercer','Maya Patel','Zain Malik','Liam Johnson','Ella Thompson','Noah Brown','Aisha Khan','Sophia Lee','Ethan Garcia','Chloe Davis'][i],
  email: 'john@email.com',
  country: ['USA','PK','DE','SG','UAE','UK','DE','SG','UAE','UK'][i],
  amount: '$10,000',
  payment: i % 3 === 0 ? 'SEPA' : 'USDC',
  date: '02 Feb 2025',
  kyc: 'Active',
}));

interface Props {
  searchQuery: string;
  filters: { dateRange: string; country: string; payment: string; kyc: string };
  currentPage: number;
  onTotalPagesChange?: (n: number) => void;
}

export default function InvestorsTable({ searchQuery, filters, currentPage, onTotalPagesChange }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return mock.filter((r) => {
      const matchesSearch = !q || r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
      const matchesCountry = filters.country === 'all' || !filters.country || r.country === filters.country;
      const matchesPayment = filters.payment === 'all' || !filters.payment || r.payment === filters.payment;
      const matchesKyc = filters.kyc === 'all' || !filters.kyc || r.kyc === filters.kyc;
      return matchesSearch && matchesCountry && matchesPayment && matchesKyc;
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
    return <NoDataFound title="No investors found" description="Try adjusting your search or filter criteria." />;
  }

  const Badge = ({ status }: { status: Investor['kyc'] }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status === 'Active' ? 'bg-success-100 text-success-600 border-success-300' : 'bg-warning-100 text-warning-600 border-warning-300'}`}>{status}</span>
  );

  return (
    <div className="bg-white rounded-lg border border-stroke overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="w-12 px-3 py-3"><input type="checkbox" className="rounded border-stroke" checked={allSelected} ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }} onChange={(e) => toggleAll(e.target.checked)} /></th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Investor Name</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Email</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Country</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Amount Invested</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Payment Method</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">KYC Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke">
            {pageRows.map((row) => (
              <tr key={row.id} className="hover:bg-background-light">
                <td className="w-12 px-3 py-4"><input type="checkbox" className="rounded border-stroke" checked={selected.has(row.id)} onChange={() => toggleOne(row.id)} /></td>
                <td className="px-4 py-4 flex items-center gap-2 text-sm text-gray-900">
                  <Avatar 
                    src='/avatar.jpg'
                    fallback={row.name.charAt(0)}
                    size="sm"
                  />
                  {row.name}
                  </td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.email}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.country}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.amount}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.payment}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.date}</td>
                <td className="px-4 py-4"><Badge status={row.kyc} /></td>
                <td className="px-4 py-4"><button className="text-gray-400 hover:text-gray-600"><MoreVerticalIcon className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


