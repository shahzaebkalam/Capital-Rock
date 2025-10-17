'use client';

import React, { useMemo, useState } from 'react';
import NoDataFound from '@/components/ui/NoDataFound';
import { MoreVerticalIcon } from '@/lib/icons';

interface Row {
  id: number;
  txId: string;
  investor: string;
  asset: string;
  amount: string;
  method: 'SEPA' | 'USDC';
  date: string;
  status: 'Completed' | 'Pending';
}

const mock: Row[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  txId: `TX-${23490 + i}`,
  investor: ['Alex Mercer','Maya Patel','Ethan Clark','Zara Khan','Aisha Robinson','Liam Johnson','Nina Torres','Noah Davis','Oliver Smith','Ethan Garcia'][i],
  asset: ['Alpha Fund','Beta REIT','Alpha Fund','Beta REIT','Beta REIT','Alpha Fund','Beta REIT','Alpha Fund','Alpha Fund','Alpha Fund'][i],
  amount: '$10,000',
  method: i % 3 === 0 ? 'USDC' : 'SEPA',
  date: '02 Feb 2025',
  status: i % 4 < 2 ? 'Completed' : 'Pending',
}));

interface Props {
  searchQuery: string;
  filters: { dateRange: string; method: string; status: string };
  currentPage: number;
  onTotalPagesChange?: (n: number) => void;
}

export default function TransactionsTable({ searchQuery, filters, currentPage, onTotalPagesChange }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return mock.filter((r) => {
      const matchesSearch = !q || r.txId.toLowerCase().includes(q) || r.investor.toLowerCase().includes(q) || r.asset.toLowerCase().includes(q);
      const matchesMethod = filters.method === 'all' || r.method === (filters.method as any);
      const matchesStatus = filters.status === 'all' || r.status.toLowerCase() === filters.status.toLowerCase();
      return matchesSearch && matchesMethod && matchesStatus;
    });
  }, [searchQuery, filters]);

  const itemsPerPage = 10;
  const totalPages = filtered.length === 0 ? 0 : Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageRows = filtered.slice(start, start + itemsPerPage);

  React.useEffect(() => { onTotalPagesChange && onTotalPagesChange(totalPages); }, [totalPages, onTotalPagesChange]);

  const allSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));
  const someSelected = pageRows.some((r) => selected.has(r.id));
  const toggleAll = (checked: boolean) => setSelected((prev) => { const n = new Set(prev); pageRows.forEach((r) => checked ? n.add(r.id) : n.delete(r.id)); return n; });
  const toggleOne = (id: number) => setSelected((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  if (pageRows.length === 0) return <NoDataFound title="No transactions found" description="Try adjusting your search or filter criteria." />;

  const StatusBadge = ({ status }: { status: Row['status'] }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status === 'Completed' ? 'bg-success-100 text-success-600 border-success-300' : 'bg-warning-100 text-warning-600 border-warning-300'}`}>{status}</span>
  );

  return (
    <div className="bg-white rounded-lg border border-stroke overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="w-12 px-3 py-3"><input type="checkbox" className="rounded border-stroke" checked={allSelected} ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }} onChange={(e) => toggleAll(e.target.checked)} /></th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Tx ID</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Investor</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Asset</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Method</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke">
            {pageRows.map((row) => (
              <tr key={row.id} className="hover:bg-background-light">
                <td className="w-12 px-3 py-4"><input type="checkbox" className="rounded border-stroke" checked={selected.has(row.id)} onChange={() => toggleOne(row.id)} /></td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.txId}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.investor}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.asset}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.amount}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.method}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.date}</td>
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



