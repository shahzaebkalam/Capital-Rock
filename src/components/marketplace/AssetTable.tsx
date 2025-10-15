'use client';

import React, { useState, useEffect } from 'react';
import { MoreVerticalIcon, OceanAssetIcon, SolarAssetIcon } from '@/lib/icons';

interface AssetTableProps {
  currentPage: number;
  searchQuery: string;
  filters: {
    category: string;
    jurisdiction: string;
    minTicketSize: string;
    currency: string;
    status: string;
  };
  viewMode: 'grid' | 'list';
  onTotalPagesChange?: (totalPages: number) => void;
}

interface Asset {
  id: number;
  name: string;
  issuer: string;
  type: string;
  investmentDate: string;
  totalInvested: string;
  roi: string;
  nextDistribution: string;
  progress: number;
  status: 'Active' | 'Pending' | 'Closed' | 'Sold Out';
  icon: React.ReactNode;
}

const mockAssets: Asset[] = [
  {
    id: 1,
    name: 'OceanView Apartments',
    issuer: 'PrimeRealty Group',
    type: 'Real Estate',
    investmentDate: '15 Mar 2024',
    totalInvested: '$25,000',
    roi: '12.4%',
    nextDistribution: '12 Oct 2025',
    progress: 80,
    status: 'Active',
    icon: (
      <div className="p-1 rounded-full bg-blue-500 flex items-center justify-center">
        <OceanAssetIcon  />
      </div>
    )
  },
  {
    id: 2,
    name: 'GreenSolar Energy Fund',
    issuer: 'Ecoinvest Ltd',
    type: 'Renewable Energy',
    investmentDate: '05 Feb 2024',
    totalInvested: '$10,000',
    roi: '8.7%',
    nextDistribution: '20 Oct 2025',
    progress: 60,
    status: 'Active',
    icon: (
      <div className="p-1 rounded-full bg-green-500 flex items-center justify-center">
        <SolarAssetIcon  />
      </div>
    )
  },
  {
    id: 3,
    name: 'OceanView Apartments',
    issuer: 'PrimeRealty Group',
    type: 'Real Estate',
    investmentDate: '15 Mar 2024',
    totalInvested: '$25,000',
    roi: '12.4%',
    nextDistribution: '12 Oct 2025',
    progress: 80,
    status: 'Active',
    icon: (
      <div className="p-1 rounded-full bg-blue-500 flex items-center justify-center">
        <OceanAssetIcon  />
      </div>
    )
  },
  {
    id: 4,
    name: 'GreenSolar Energy Fund',
    issuer: 'Ecoinvest Ltd',
    type: 'Renewable Energy',
    investmentDate: '05 Feb 2024',
    totalInvested: '$10,000',
    roi: '8.7%',
    nextDistribution: '20 Oct 2025',
    progress: 60,
    status: 'Active',
    icon: (
      <div className="p-1 rounded-full bg-green-500 flex items-center justify-center">
        <SolarAssetIcon  />
      </div>
    )
  },
  {
    id: 5,
    name: 'OceanView Apartments',
    issuer: 'PrimeRealty Group',
    type: 'Real Estate',
    investmentDate: '15 Mar 2024',
    totalInvested: '$25,000',
    roi: '12.4%',
    nextDistribution: '12 Oct 2025',
    progress: 80,
    status: 'Active',
    icon: (
      <div className="p-1 rounded-full bg-blue-500 flex items-center justify-center">
        <OceanAssetIcon  />
      </div>
    )
  },
  {
    id: 6,
    name: 'GreenSolar Energy Fund',
    issuer: 'Ecoinvest Ltd',
    type: 'Renewable Energy',
    investmentDate: '05 Feb 2024',
    totalInvested: '$10,000',
    roi: '8.7%',
    nextDistribution: '20 Oct 2025',
    progress: 60,
    status: 'Active',
    icon: (
      <div className="p-1 rounded-full bg-green-500 flex items-center justify-center">
        <SolarAssetIcon  />
      </div>
    )
  },
  {
    id: 7,
    name: 'OceanView Apartments',
    issuer: 'PrimeRealty Group',
    type: 'Real Estate',
    investmentDate: '15 Mar 2024',
    totalInvested: '$25,000',
    roi: '12.4%',
    nextDistribution: '12 Oct 2025',
    progress: 80,
    status: 'Active',
    icon: (
      <div className="p-1 rounded-full bg-blue-500 flex items-center justify-center">
        <OceanAssetIcon  />
      </div>
    )
  },
  {
    id: 8,
    name: 'GreenSolar Energy Fund',
    issuer: 'Ecoinvest Ltd',
    type: 'Renewable Energy',
    investmentDate: '05 Feb 2024',
    totalInvested: '$10,000',
    roi: '8.7%',
    nextDistribution: '20 Oct 2025',
    progress: 60,
    status: 'Active',
    icon: (
      <div className="p-1 rounded-full bg-green-500 flex items-center justify-center">
        <SolarAssetIcon  />
      </div>
    )
  },
  {
    id: 9,
    name: 'OceanView Apartments',
    issuer: 'PrimeRealty Group',
    type: 'Real Estate',
    investmentDate: '15 Mar 2024',
    totalInvested: '$25,000',
    roi: '12.4%',
    nextDistribution: '12 Oct 2025',
    progress: 80,
    status: 'Active',
    icon: (
      <div className="p-1 rounded-full bg-blue-500 flex items-center justify-center">
        <OceanAssetIcon  />
      </div>
    )
  },
  {
    id: 10,
    name: 'GreenSolar Energy Fund',
    issuer: 'Ecoinvest Ltd',
    type: 'Renewable Energy',
    investmentDate: '05 Feb 2024',
    totalInvested: '$10,000',
    roi: '8.7%',
    nextDistribution: '20 Oct 2025',
    progress: 60,
    status: 'Active',
    icon: (
      <div className="p-1 rounded-full bg-green-500 flex items-center justify-center">
        <SolarAssetIcon  />
      </div>
    )
  },
  {
    id: 11,
    name: 'OceanView Apartments',
    issuer: 'PrimeRealty Group',
    type: 'Real Estate',
    investmentDate: '15 Mar 2024',
    totalInvested: '$25,000',
    roi: '12.4%',
    nextDistribution: '12 Oct 2025',
    progress: 80,
    status: 'Active',
    icon: (
      <div className="p-1 rounded-full bg-blue-500 flex items-center justify-center">
        <OceanAssetIcon  />
      </div>
    )
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
  const statusClasses = {
    'Active': 'bg-success-100 text-success-600 border border-success-300',
    'Pending': 'bg-warning-100 text-warning-600 border border-warning-300',
    'Closed': 'bg-gray-100 text-gray-600 border border-gray-300',
    'Sold Out': 'bg-error-100 text-error-600 border border-error-300',
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status as keyof typeof statusClasses]}`}>
      {status}
    </span>
  );
};

// Grid View Component
const AssetGrid = ({ assets, selectedAssets, onSelectAsset, onSelectAll }: {
  assets: Asset[];
  selectedAssets: Set<number>;
  onSelectAsset: (id: number) => void;
  onSelectAll: (select: boolean) => void;
}) => {
  const allSelected = assets.length > 0 && assets.every(asset => selectedAssets.has(asset.id));
  const someSelected = assets.some(asset => selectedAssets.has(asset.id));

  return (
    <div className="space-y-4">
      {/* Grid Header with Select All */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(input) => {
              if (input) input.indeterminate = someSelected && !allSelected;
            }}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="rounded border-stroke"
          />
          <span className="text-sm font-medium text-gray-700">
            {selectedAssets.size > 0 ? `${selectedAssets.size} selected` : 'Select all'}
          </span>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Card Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedAssets.has(asset.id)}
                  onChange={() => onSelectAsset(asset.id)}
                  className="rounded border-stroke"
                />
                {asset.icon}
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVerticalIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Asset Info */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">{asset.name}</h3>
              <p className="text-xs text-gray-600">{asset.issuer}</p>
              <p className="text-xs text-gray-500">{asset.type}</p>
            </div>

            {/* Investment Details */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Invested:</span>
                <span className="font-medium text-gray-900">{asset.totalInvested}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">ROI:</span>
                <span className="font-medium text-green-600">{asset.roi}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Next Dist:</span>
                <span className="font-medium text-gray-900">{asset.nextDistribution}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="text-gray-900">{asset.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${asset.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Status */}
            <div className="mt-3 flex justify-center">
              <StatusBadge status={asset.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AssetTable({ currentPage, searchQuery, filters, viewMode, onTotalPagesChange }: AssetTableProps) {
  const [selectedAssets, setSelectedAssets] = useState<Set<number>>(new Set());
  
  // Pagination settings
  const itemsPerPage = 10;

  // Filter assets based on search and filters
  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !filters.category || asset.type.toLowerCase().includes(filters.category.toLowerCase());
    const matchesStatus = !filters.status || asset.status.toLowerCase() === filters.status.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAssets = filteredAssets.slice(startIndex, endIndex);

  // Notify parent component of total pages change
  useEffect(() => {
    if (onTotalPagesChange) {
      onTotalPagesChange(totalPages);
    }
  }, [totalPages, onTotalPagesChange]);

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

  const handleSelectAll = (select: boolean) => {
    if (select) {
      // Select all assets on current page
      const currentPageAssetIds = paginatedAssets.map(asset => asset.id);
      setSelectedAssets(prev => {
        const newSet = new Set(prev);
        currentPageAssetIds.forEach(id => newSet.add(id));
        return newSet;
      });
    } else {
      // Deselect all assets on current page
      const currentPageAssetIds = paginatedAssets.map(asset => asset.id);
      setSelectedAssets(prev => {
        const newSet = new Set(prev);
        currentPageAssetIds.forEach(id => newSet.delete(id));
        return newSet;
      });
    }
  };

  // List View Component
  const AssetList = () => {
    const allSelected = paginatedAssets.length > 0 && paginatedAssets.every(asset => selectedAssets.has(asset.id));
    const someSelected = paginatedAssets.some(asset => selectedAssets.has(asset.id));

    return (
      <div className="bg-white rounded-lg border border-stroke overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
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
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Asset Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Issuer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Investment Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Total Invested</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">ROI %</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Next Distribution</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Progress</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stroke">
              {paginatedAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-background-light">
                  <td className="w-12 px-2 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedAssets.has(asset.id)}
                      onChange={() => handleSelectAsset(asset.id)}
                      className="rounded border-stroke" 
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {asset.icon}
                      <span className="ml-3 text-sm font-medium text-gray-900">{asset.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{asset.issuer}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{asset.type}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{asset.investmentDate}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{asset.totalInvested}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{asset.roi}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{asset.nextDistribution}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{asset.progress}%</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={asset.status} />
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
  };

  return (
    <>
      {viewMode === 'grid' ? (
        <AssetGrid 
          assets={paginatedAssets}
          selectedAssets={selectedAssets}
          onSelectAsset={handleSelectAsset}
          onSelectAll={handleSelectAll}
        />
      ) : (
        <AssetList />
      )}
    </>
  );
}
