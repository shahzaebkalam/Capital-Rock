'use client';

import React from 'react';
import { OceanAssetIcon, SolarAssetIcon } from '@/lib/icons';

export interface ROISummaryData {
  id: number;
  assetName: string;
  totalRaised: string;
  totalDistributed: string;
  roi: string;
  iconType: 'ocean' | 'solar';
}

interface ROISummaryProps {
  title?: string;
  data?: ROISummaryData[];
  className?: string;
}

const defaultData: ROISummaryData[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  assetName: i % 2 === 0 ? 'OceanView' : 'GreenSolar',
  totalRaised: '$10,000',
  totalDistributed: '$10,000',
  roi: '20%',
  iconType: i % 2 === 0 ? 'ocean' : 'solar',
}));

export default function ROISummary({
  title = 'ROI Summary',
  data = defaultData,
  className = '',
}: ROISummaryProps) {
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
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Asset Name</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Total Raised</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">Total Distributed</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-900">ROI %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${getIconBackgroundColor(row.iconType)} rounded-full flex items-center justify-center`}>
                      {getProjectIcon(row.iconType)}
                    </div>
                    {row.assetName}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.totalRaised}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.totalDistributed}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{row.roi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
