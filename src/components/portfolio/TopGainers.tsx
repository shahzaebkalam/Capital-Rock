'use client';

import React, { useState } from 'react';
import { CaretUpIcon, OceanAssetIcon, TrendingDownIcon, TrendingUpIcon } from '@/lib/icons';

interface TopGainer {
  id: number;
  name: string;
  price: number;
  change24h: number;
}

const mockTopGainers: TopGainer[] = [
  { id: 1, name: 'OceanView', price: 3.45, change24h: 5 },
  { id: 2, name: 'OceanView', price: 3.45, change24h: 5 },
  { id: 3, name: 'OceanView', price: 3.45, change24h: 5 },
  { id: 4, name: 'OceanView', price: 3.45, change24h: 5 }
];

const mockTopLosers: TopGainer[] = [
  { id: 1, name: 'GreenSolar', price: 2.99, change24h: -3 },
  { id: 2, name: 'GreenSolar', price: 2.99, change24h: -3 },
  { id: 3, name: 'GreenSolar', price: 2.99, change24h: -3 },
  { id: 4, name: 'GreenSolar', price: 2.99, change24h: -3 }
];

export default function TopGainers() {
  const [activeTab, setActiveTab] = useState<'gainers' | 'losers'>('gainers');

  const currentData = activeTab === 'gainers' ? mockTopGainers : mockTopLosers;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Tabs */}
      <div className="flex items-center justify-evenly border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('gainers')}
          className={`pb-2 px-1 text-lg font-semibold ${
            activeTab === 'gainers'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Top Gainers
        </button>
        <button
          onClick={() => setActiveTab('losers')}
          className={`pb-2 px-1 text-lg font-semibold ml-6 ${
            activeTab === 'losers'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Top Losers
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-xs font-medium text-secondary-black tracking-wider py-2">Img / Name</th>
              <th className="text-center text-xs font-medium text-secondary-black tracking-wider py-2">Price</th>
              <th className="text-right text-xs font-medium text-secondary-black tracking-wider py-2">24H %</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <OceanAssetIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  </div>
                </td>
                <td className="text-center py-3">
                  <span className="text-sm text-gray-900">${item.price.toFixed(2)}</span>
                </td>
                <td className="text-right py-3">
                  <div className={`flex items-center justify-end gap-1 text-sm ${
                    item.change24h >= 0 ? 'text-success-600' : 'text-error-600'
                  }`}>
                    {item.change24h >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    <span>{Math.abs(item.change24h)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

