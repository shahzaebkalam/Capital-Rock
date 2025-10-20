'use client';

import React, { useMemo, useState } from 'react';
import NoDataFound from '@/components/ui/NoDataFound';
import { MoreVerticalIcon, OceanAssetIcon, SolarAssetIcon } from '@/lib/icons';

interface Row {
  id: number;
  asset: string;
  issuer: string;
  type: string;
  totalRaised: string;
  status: 'Live' | 'Closed';
  investors: 'Approved' | 'Pending';
  startDate: string;
  endDate: string;
}

const mock: Row[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  asset: ['Alpha Growth Fund','Beta REIT','Delta Bond','Alpha Growth Fund','Beta REIT','Delta Bond','Alpha Growth Fund','Beta REIT','Delta Bond','Alpha Growth Fund'][i],
  issuer: ['Alpha Ventures','Beta Capital','Delta Finance','Alpha Ventures','Beta Capital','Delta Finance','Alpha Ventures','Beta Capital','Delta Finance','Alpha Ventures'][i],
  type: ['Equity','Real Estate','Bond','Equity','Real Estate','Bond','Equity','Real Estate','Bond','Equity'][i],
  totalRaised: '$1,200,000',
  status: i % 3 === 0 ? 'Closed' : 'Live',
  investors: 'Approved',
  startDate: 'Jan 01, 2025',
  endDate: 'Apr 01, 2025',
}));

interface Props {
  searchQuery: string;
  filters: { approval: string; status: string; type: string };
  currentPage: number;
  onTotalPagesChange?: (n: number) => void;
}

export default function AssetManagementTable({ searchQuery, filters, currentPage, onTotalPagesChange }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const isSolarType = (name: string) => /reit|solar|energy|green/i.test(name);
  const getProjectIcon = (iconType: 'ocean' | 'solar') => {
    if (iconType === 'ocean') {
      return <OceanAssetIcon />;
    } else if (iconType === 'solar') {
      return <SolarAssetIcon />;
    }
    return <OceanAssetIcon />;
  };
  const getIconBackgroundColor = (iconType: 'ocean' | 'solar') => {
    if (iconType === 'ocean') {
      return 'bg-blue-500';
    } else if (iconType === 'solar') {
      return 'bg-green-500';
    }
    return 'bg-blue-500';
  };

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return mock.filter((r) => {
      const matchesSearch = !q || r.asset.toLowerCase().includes(q) || r.issuer.toLowerCase().includes(q) || r.type.toLowerCase().includes(q);
      const matchesApproval = filters.approval === 'all' || (filters.approval === 'approved' && r.investors === 'Approved') || (filters.approval === 'pending' && r.investors === 'Pending');
      const matchesStatus = filters.status === 'all' || r.status.toLowerCase() === filters.status;
      const matchesType = filters.type === 'all' || r.type.toLowerCase().replace(' ', '-') === filters.type;
      return matchesSearch && matchesApproval && matchesStatus && matchesType;
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
    return <NoDataFound title="No assets found" description="Try adjusting your search or filter criteria." />;
  }

  const StatusBadge = ({ status }: { status: Row['status'] }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status === 'Live' ? 'bg-success-100 text-success-600 border-success-300' : 'bg-error-100 text-error-600 border-error-300'}`}>{status}</span>
  );

  return (
    <div className="bg-white rounded-lg border border-stroke overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="w-12 px-3 py-3"><input type="checkbox" className="rounded border-stroke" checked={allSelected} ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }} onChange={(e) => toggleAll(e.target.checked)} /></th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Asset Name</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Issuer</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Type</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Total Raised</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Investors</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Start Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">End Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke">
            {pageRows.map((row) => (
              <tr key={row.id} className="hover:bg-background-light">
                <td className="w-12 px-3 py-4"><input type="checkbox" className="rounded border-stroke" checked={selected.has(row.id)} onChange={() => toggleOne(row.id)} /></td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <div className={`p-1 rounded-full flex items-center justify-center ${getIconBackgroundColor(isSolarType(row.asset) ? 'solar' : 'ocean')}`}>
                      {getProjectIcon(isSolarType(row.asset) ? 'solar' : 'ocean')}
                    </div>
                    {row.asset}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.issuer}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.type}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.totalRaised}</td>
                <td className="px-4 py-4"><StatusBadge status={row.status} /></td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.investors}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.startDate}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.endDate}</td>
                <td className="px-4 py-4"><button className="text-gray-400 hover:text-gray-600"><MoreVerticalIcon className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



