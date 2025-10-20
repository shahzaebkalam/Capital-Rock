'use client';

import React, { useMemo, useState } from 'react';
import NoDataFound from '@/components/ui/NoDataFound';
import { MoreVerticalIcon } from '@/lib/icons';
import Avatar from '@/components/ui/Avatar';

type TabKey = 'investors' | 'issuers' | 'admins';

interface Row {
  id: number;
  name: string;
  type: 'Investor' | 'Issuer' | 'Admin';
  country: string;
  reviewedBy: string | '-';
  submittedOn: string;
  kycStatus: 'Verified' | 'Pending';
}

const genNames = ['John Doe','Beta Capital','Zain Malik','Beta Capital','Ella Thompson','Aisha Khan','Beta Capital','Ethan Garcia','Chloe Davis','Alex Mercer'];
const genType: Row['type'][] = ['Investor','Issuer','Investor','Issuer','Issuer','Investor','Investor','Investor','Investor','Investor'];
const genCountry = ['USA','PK','DE','SG','UAE','DE','SG','UAE','UK','USA'];

const mock: Row[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: genNames[i],
  type: genType[i],
  country: genCountry[i],
  reviewedBy: i % 3 === 0 ? 'Admin1' : '-',
  submittedOn: '02 Feb 2025',
  kycStatus: i % 4 === 0 ? 'Pending' : 'Verified',
}));

interface Props {
  activeTab: TabKey;
  searchQuery: string;
  filters: { dateJoined: string; investmentRange: string; country: string; kyc: string };
  currentPage: number;
  onTotalPagesChange?: (n: number) => void;
}

export default function KycTable({ activeTab, searchQuery, filters, currentPage, onTotalPagesChange }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const source = useMemo(() => {
    if (activeTab === 'investors') return mock.filter(m => m.type === 'Investor');
    if (activeTab === 'issuers') return mock.filter(m => m.type === 'Issuer');
    return mock.filter(m => m.type === 'Admin');
  }, [activeTab]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return source.filter((r) => {
      const matchesSearch = !q || r.name.toLowerCase().includes(q);
      const matchesCountry = filters.country === 'all' || r.country === filters.country;
      const matchesKyc = filters.kyc === 'all' || r.kycStatus.toLowerCase() === filters.kyc.toLowerCase();
      return matchesSearch && matchesCountry && matchesKyc;
    });
  }, [source, searchQuery, filters]);

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
  const toggleAll = (checked: boolean) => setSelected((prev) => { const n = new Set(prev); pageRows.forEach((r) => checked ? n.add(r.id) : n.delete(r.id)); return n; });
  const toggleOne = (id: number) => setSelected((p) => { 
    const n = new Set(p); 
    if (n.has(id)) {
      n.delete(id);
    } else {
      n.add(id);
    }
    return n; 
  });

  if (pageRows.length === 0) return <NoDataFound title="No records found" description="Try adjusting your search or filter criteria." />;

  const Badge = ({ status }: { status: Row['kycStatus'] }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status === 'Verified' ? 'bg-success-100 text-success-600 border-success-300' : 'bg-warning-100 text-warning-600 border-warning-300'}`}>{status}</span>
  );

  return (
    <div className="bg-white rounded-lg border border-stroke overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="w-12 px-3 py-3"><input type="checkbox" className="rounded border-stroke" checked={allSelected} ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }} onChange={(e) => toggleAll(e.target.checked)} /></th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">User Name</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Type</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Country</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Reviewed By</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Submitted On</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">KYC Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke">
            {pageRows.map((row) => (
              <tr key={row.id} className="hover:bg-background-light">
                <td className="w-12 px-3 py-4"><input type="checkbox" className="rounded border-stroke" checked={selected.has(row.id)} onChange={() => toggleOne(row.id)} /></td>
                <td className="px-4 py-4 flex items-center gap-2 text-sm text-gray-900">
                  <Avatar src='/avatar.jpg' fallback={row.name.charAt(0)} size="sm" />
                  {row.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.type}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.country}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.reviewedBy}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.submittedOn}</td>
                <td className="px-4 py-4"><Badge status={row.kycStatus} /></td>
                <td className="px-4 py-4"><button className="text-gray-400 hover:text-gray-600"><MoreVerticalIcon className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



