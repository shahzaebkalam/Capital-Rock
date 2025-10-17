"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { MoreVerticalIcon, OceanAssetIcon, SolarAssetIcon } from "@/lib/icons";
import NoDataFound from "@/components/ui/NoDataFound";

interface MyAssetsTableProps {
  searchQuery: string;
  filters: {
    dateRange: string;
    filterA: string;
    filterB: string;
    status: string;
  };
  currentPage: number;
  onTotalPagesChange?: (total: number) => void;
}

interface Row {
  id: number;
  name: string;
  type: string;
  totalRaised: string;
  goal: string;
  status: "Live" | "Closed";
  investors: number;
  startDate: string;
  endDate: string;
}

const rows: Row[] = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  name: i % 2 === 0 ? "Alpha Growth Fund" : "Beta Real Estate",
  type: i % 2 === 0 ? "Private Equity" : "Tokenized RE",
  totalRaised: "$1,200,000",
  goal: "$2M",
  status: i % 3 === 1 ? "Closed" : "Live",
  investors: 145,
  startDate: "Jan 01, 2025",
  endDate: "Apr 01, 2025",
}));

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium border";
  const statusClasses = {
    Live: "bg-success-100 text-success-600 border border-success-300",
    Closed: "bg-error-100 text-error-600 border border-error-300",
  };

  return (
    <span
      className={`${baseClasses} ${
        statusClasses[status as keyof typeof statusClasses]
      }`}
    >
      {status}
    </span>
  );
};

export default function MyAssetsTable({
  searchQuery,
  filters,
  currentPage,
  onTotalPagesChange,
}: MyAssetsTableProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return rows.filter((r) => {
      const matchesSearch = !q || r.name.toLowerCase().includes(q);
      const matchesStatus =
        !filters.status ||
        filters.status === "all" ||
        r.status.toLowerCase() === filters.status.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filters]);

  const itemsPerPage = 10;
  const totalPages = filtered.length === 0 ? 0 : Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  React.useEffect(() => {
    onTotalPagesChange && onTotalPagesChange(totalPages);
  }, [totalPages, onTotalPagesChange]);

  const allSelected =
    paginated.length > 0 && paginated.every((r) => selected.has(r.id));
  const someSelected = paginated.some((r) => selected.has(r.id));

  const toggleAll = (checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) {
        paginated.forEach((r) => next.add(r.id));
      } else {
        paginated.forEach((r) => next.delete(r.id));
      }
      return next;
    });
  };

  const toggleOne = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (paginated.length === 0) {
    return <NoDataFound title="No assets found" description="Try adjusting your search or filter criteria." />;
  }

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
                  ref={(input) => {
                    if (input)
                      input.indeterminate = someSelected && !allSelected;
                  }}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">
                Asset Name
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">
                Type
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">
                Total Raised
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">
                Goal
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">
                Investors
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">
                Start Date
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">
                End Date
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke">
            {paginated.map((row, idx) => (
              <tr key={row.id} className="hover:bg-background-light">
                <td className="w-12 px-3 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-stroke"
                    checked={selected.has(row.id)}
                    onChange={() => toggleOne(row.id)}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1 rounded-full ${
                        idx % 2 === 0 ? "bg-blue-500" : "bg-green-500"
                      } flex items-center justify-center`}
                    >
                      {idx % 2 === 0 ? <OceanAssetIcon /> : <SolarAssetIcon />}
                    </div>
                    <Link
                      href=""
                      className="text-sm font-medium text-gray-900 hover:text-primary truncate"
                    >
                      {row.name}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.type}</td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {row.totalRaised}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.goal}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {row.investors}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {row.startDate}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {row.endDate}
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
