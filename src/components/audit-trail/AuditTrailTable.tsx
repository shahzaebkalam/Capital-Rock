'use client';

import React from 'react';
import Image from 'next/image';
import NoDataFound from '@/components/ui/NoDataFound';

export type AuditRow = {
  id: number;
  dateTime: string;
  user: string;
  action: string;
  details: string;
};

interface Props {
  rows: AuditRow[];
}

export default function AuditTrailTable({ rows }: Props) {
  if (rows.length === 0) {
    return <NoDataFound title="No logs found" description="Try changing filters or search" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="w-12 px-3 py-3"><input type="checkbox" className="rounded border-stroke" /></th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-900">Date & Time</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-900">User</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-900">Action</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-900">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stroke">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-background-light">
              <td className="w-12 px-3 py-4"><input type="checkbox" className="rounded border-stroke" /></td>
              <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{row.dateTime}</td>
              <td className="px-4 py-4 text-sm text-gray-900">
                <div className="flex items-center gap-3">
                  <Image src="/avatar.jpg" alt="avatar" width={32} height={32} className="w-8 h-8 rounded-full" />
                  {row.user}
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">{row.action}</td>
              <td className="px-4 py-4 text-sm text-gray-900 truncate">{row.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


