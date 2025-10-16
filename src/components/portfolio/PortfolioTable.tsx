'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CaretDownIcon, CaretUpIcon, OceanAssetIcon, SolarAssetIcon, TableArrowIcon } from '@/lib/icons';
import NoDataFound from '@/components/ui/NoDataFound';

interface PortfolioAsset {
  id: number;
  name: string;
  iconType: 'ocean' | 'solar';
  issuer: string;
  quantity: number;
  currentValue: number;
  roi: number;
  nextPayout: string;
  status: 'Active' | 'Pending' | 'Closed';
}

// Mock data for portfolio assets
const mockPortfolioAssets: PortfolioAsset[] = [
  {
    id: 1,
    name: 'OceanView Apartments',
    iconType: 'ocean',
    issuer: 'PrimeRealty Group',
    quantity: 12.4,
    currentValue: 3.45,
    roi: 10,
    nextPayout: '12 Oct 2025',
    status: 'Active'
  },
  {
    id: 2,
    name: 'GreenSolar Energy Fund',
    iconType: 'solar',
    issuer: 'Ecoinvest Ltd',
    quantity: 15.8,
    currentValue: 2.99,
    roi: 5,
    nextPayout: '12 Oct 2025',
    status: 'Active'
  },
  {
    id: 3,
    name: 'OceanView Apartments',
    iconType: 'ocean',
    issuer: 'PrimeRealty Group',
    quantity: -9.3,
    currentValue: 4.75,
    roi: 10,
    nextPayout: '12 Oct 2025',
    status: 'Active'
  },
  {
    id: 4,
    name: 'GreenSolar Energy Fund',
    iconType: 'solar',
    issuer: 'Ecoinvest Ltd',
    quantity: 15.8,
    currentValue: 2.99,
    roi: 5,
    nextPayout: '12 Oct 2025',
    status: 'Active'
  },
  {
    id: 5,
    name: 'OceanView Apartments',
    iconType: 'ocean',
    issuer: 'PrimeRealty Group',
    quantity: 9.3,
    currentValue: 4.75,
    roi: 10,
    nextPayout: '12 Oct 2025',
    status: 'Active'
  },
  {
    id: 6,
    name: 'GreenSolar Energy Fund',
    iconType: 'solar',
    issuer: 'Ecoinvest Ltd',
    quantity: 15.8,
    currentValue: 2.99,
    roi: 5,
    nextPayout: '12 Oct 2025',
    status: 'Active'
  },
  {
    id: 7,
    name: 'OceanView Apartments',
    iconType: 'ocean',
    issuer: 'PrimeRealty Group',
    quantity: 9.3,
    currentValue: 4.75,
    roi: 10,
    nextPayout: '12 Oct 2025',
    status: 'Active'
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
  const statusClasses = {
    'Active': 'bg-success-100 text-success-600 border border-success-300',
    'Pending': 'bg-warning-100 text-warning-600 border border-warning-300',
    'Closed': 'bg-gray-100 text-gray-600 border border-gray-300',
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status as keyof typeof statusClasses]}`}>
      {status}
    </span>
  );
};

export default function PortfolioTable() {
  const [selectedAssets, setSelectedAssets] = useState<Set<number>>(new Set());
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSelectAll = (select: boolean) => {
    if (select) {
      setSelectedAssets(new Set(mockPortfolioAssets.map(asset => asset.id)));
    } else {
      setSelectedAssets(new Set());
    }
  };

  const handleSelectAsset = (assetId: number) => {
    setSelectedAssets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(assetId)) {
        newSet.delete(assetId);
      } else {
        newSet.add(assetId);
      }
      return newSet;
    });
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getProjectIcon = (iconType: 'ocean' | 'solar') => {
    const iconClass = "w-6 h-6 text-white";
    if (iconType === 'ocean') {
      return <OceanAssetIcon className={iconClass} />;
    } else if (iconType === 'solar') {
      return <SolarAssetIcon className={iconClass} />;
    }
    return <OceanAssetIcon className={iconClass} />;
  };

  const getIconBackgroundColor = (iconType: 'ocean' | 'solar') => {
    if (iconType === 'ocean') {
      return 'bg-blue-500';
    } else if (iconType === 'solar') {
      return 'bg-green-500';
    }
    return 'bg-blue-500';
  };

  const allSelected = mockPortfolioAssets.length > 0 && mockPortfolioAssets.every(asset => selectedAssets.has(asset.id));
  const someSelected = mockPortfolioAssets.some(asset => selectedAssets.has(asset.id));

  if (mockPortfolioAssets.length === 0) {
    return <NoDataFound title="No assets found" description="You don't have any assets in your portfolio yet." />;
  }

  return (
    <div className="bg-white rounded-lg border border-stroke overflow-hidden">
      <div className="px-6 py-4 border-b border-stroke">
        <h2 className="text-lg font-semibold text-secondary-black">Asset Holdings</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="w-12 px-2 py-3 text-left">
                <input 
                  type="checkbox" 
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected && !allSelected;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-stroke" 
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-black tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 hover:text-secondary-black"
                >
                  Asset Name
                  {sortField === 'name' && (
                    sortDirection === 'asc' ? <TableArrowIcon /> : <TableArrowIcon />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-black tracking-wider">
                Issuer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-black tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-black tracking-wider">
                Current Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-black tracking-wider">
                ROI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-black tracking-wider">
                Next Payout
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-black tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockPortfolioAssets.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-50">
                <td className="w-12 px-2 py-4">
                  <input 
                    type="checkbox" 
                    checked={selectedAssets.has(asset.id)}
                    onChange={() => handleSelectAsset(asset.id)}
                    className="rounded border-stroke" 
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${getIconBackgroundColor(asset.iconType)} rounded-full flex items-center justify-center`}>
                      {getProjectIcon(asset.iconType)}
                    </div>
                    <Link href={`/marketplace/${asset.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                      {asset.name}
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {asset.issuer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`flex items-center gap-1 ${asset.quantity >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                    {asset.quantity >= 0 ? (
                      <CaretUpIcon className="w-3 h-3" />
                    ) : (
                      <CaretDownIcon className="w-3 h-3" />
                    )}
                    {Math.abs(asset.quantity).toFixed(1)}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${asset.currentValue.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {asset.roi}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {asset.nextPayout}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={asset.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

