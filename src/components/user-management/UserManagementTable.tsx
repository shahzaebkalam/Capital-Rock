'use client';

import React, { useMemo, useState } from 'react';
import NoDataFound from '@/components/ui/NoDataFound';
import { MoreVerticalIcon } from '@/lib/icons';
import Avatar from '@/components/ui/Avatar';

type TabKey = 'investors' | 'issuers' | 'admins';

interface BaseRow {
  id: number;
  name: string;
  email: string;
  country: string;
  dateJoined: string;
}

interface InvestorRow extends BaseRow {
  invested: string;
  wallet: string;
  kyc: 'Active' | 'Pending';
}

interface IssuerRow extends BaseRow {
  totalRaised: string;
  wallet: string;
  kyc: 'Active' | 'Pending';
}

interface AdminRow extends BaseRow {
  role: 'Owner' | 'Manager' | 'Viewer';
  status: 'Active' | 'Invited';
}

const genNames = ['Alex Mercer','Maya Patel','Zain Malik','Liam Johnson','Ella Thompson','Noah Brown','Aisha Khan','Sophia Lee','Ethan Garcia','Chloe Davis'];
const genCountry = ['USA','PK','DE','SG','UAE','UK','DE','SG','UAE','UK'];

const investorsMock: InvestorRow[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: genNames[i],
  email: 'john@email.com',
  country: genCountry[i],
  invested: '$10,000',
  wallet: '0xA1B...F9C',
  dateJoined: '02 Feb 2025',
  kyc: 'Active',
}));

const issuersMock: IssuerRow[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: ['Alpha Ventures','Beta Capital','Delta Finance','Alpha Ventures','Beta Capital','Delta Finance','Alpha Ventures','Beta Capital','Delta Finance','Alpha Ventures'][i],
  email: 'ops@issuer.com',
  country: genCountry[i],
  totalRaised: '$1,200,000',
  wallet: '0x9C3...AA1',
  dateJoined: '02 Feb 2025',
  kyc: i % 4 === 0 ? 'Pending' : 'Active',
}));

const adminsMock: AdminRow[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: genNames[i],
  email: 'admin@email.com',
  country: genCountry[i],
  role: (['Owner','Manager','Viewer'] as const)[i % 3],
  status: i % 3 === 0 ? 'Invited' : 'Active',
  dateJoined: '02 Feb 2025',
}));

interface Props {
  activeTab: TabKey;
  searchQuery: string;
  filters: { dateJoined: string; investmentRange: string; country: string; kyc: string };
  currentPage: number;
  onTotalPagesChange?: (n: number) => void;
}

export default function UserManagementTable({ activeTab, searchQuery, filters, currentPage, onTotalPagesChange }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const source = activeTab === 'investors' ? investorsMock : activeTab === 'issuers' ? issuersMock : adminsMock;

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return source.filter((r: any) => {
      const matchesSearch = !q || r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || (r.wallet?.toLowerCase?.().includes(q));
      const matchesCountry = filters.country === 'all' || r.country === filters.country;
      const matchesKyc = filters.kyc === 'all' || r.kyc === (filters.kyc as any) || activeTab === 'admins';
      return matchesSearch && matchesCountry && matchesKyc;
    });
  }, [source, searchQuery, filters, activeTab]);

  const itemsPerPage = 10;
  const totalPages = filtered.length === 0 ? 0 : Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageRows = filtered.slice(start, start + itemsPerPage);

  React.useEffect(() => { onTotalPagesChange && onTotalPagesChange(totalPages); }, [totalPages, onTotalPagesChange]);

  const allSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));
  const someSelected = pageRows.some((r) => selected.has(r.id));
  const toggleAll = (checked: boolean) => setSelected((prev) => { const n = new Set(prev); pageRows.forEach((r) => checked ? n.add(r.id) : n.delete(r.id)); return n; });
  const toggleOne = (id: number) => setSelected((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  if (pageRows.length === 0) return <NoDataFound title="No records found" description="Try adjusting your search or filter criteria." />;

  const Badge = ({ status }: { status: 'Active' | 'Pending' | 'Invited' }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status === 'Active' ? 'bg-success-100 text-success-600 border-success-300' : status === 'Pending' ? 'bg-warning-100 text-warning-600 border-warning-300' : 'bg-info-100 text-info-600 border-info-300'}`}>{status}</span>
  );

  return (
    <div className="bg-white rounded-lg border border-stroke overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            {activeTab === 'investors' && (
              <tr>
                <th className="w-12 px-3 py-3"><input type="checkbox" className="rounded border-stroke" checked={allSelected} ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }} onChange={(e) => toggleAll(e.target.checked)} /></th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Investor Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Email</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Country</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Total Invested</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Wallet</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Date Joined</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">KYC Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Action</th>
              </tr>
            )}
            {activeTab === 'issuers' && (
              <tr>
                <th className="w-12 px-3 py-3"><input type="checkbox" className="rounded border-stroke" checked={allSelected} ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }} onChange={(e) => toggleAll(e.target.checked)} /></th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Issuer</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Email</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Country</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Total Raised</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Wallet</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Date Joined</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">KYC Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Action</th>
              </tr>
            )}
            {activeTab === 'admins' && (
              <tr>
                <th className="w-12 px-3 py-3"><input type="checkbox" className="rounded border-stroke" checked={allSelected} ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }} onChange={(e) => toggleAll(e.target.checked)} /></th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Admin Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Email</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Country</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Role</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Date Joined</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Action</th>
              </tr>
            )}
          </thead>

          <tbody className="divide-y divide-stroke">
            {pageRows.map((row: any) => (
              <tr key={row.id} className="hover:bg-background-light">
                <td className="w-12 px-3 py-4"><input type="checkbox" className="rounded border-stroke" checked={selected.has(row.id)} onChange={() => toggleOne(row.id)} /></td>
                <td className="px-4 py-4 flex items-center gap-2 text-sm text-gray-900">
                  <Avatar src='/avatar.jpg' fallback={row.name.charAt(0)} size="sm" />
                  {row.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.email}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.country}</td>

                {activeTab === 'investors' && (
                  <>
                    <td className="px-4 py-4 text-sm text-gray-900">{row.invested}</td>
                    <td className="px-4 py-4 text-sm text-primary underline">{row.wallet}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{row.dateJoined}</td>
                    <td className="px-4 py-4"><Badge status={row.kyc} /></td>
                    <td className="px-4 py-4"><button className="text-gray-400 hover:text-gray-600"><MoreVerticalIcon className="w-4 h-4" /></button></td>
                  </>
                )}

                {activeTab === 'issuers' && (
                  <>
                    <td className="px-4 py-4 text-sm text-gray-900">{row.totalRaised}</td>
                    <td className="px-4 py-4 text-sm text-primary underline">{row.wallet}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{row.dateJoined}</td>
                    <td className="px-4 py-4"><Badge status={row.kyc} /></td>
                    <td className="px-4 py-4"><button className="text-gray-400 hover:text-gray-600"><MoreVerticalIcon className="w-4 h-4" /></button></td>
                  </>
                )}

                {activeTab === 'admins' && (
                  <>
                    <td className="px-4 py-4 text-sm text-gray-900">{row.role}</td>
                    <td className="px-4 py-4"><Badge status={row.status} /></td>
                    <td className="px-4 py-4 text-sm text-gray-900">{row.dateJoined}</td>
                    <td className="px-4 py-4"><button className="text-gray-400 hover:text-gray-600"><MoreVerticalIcon className="w-4 h-4" /></button></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



