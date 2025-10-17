'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CaretDownIcon, CaretUpIcon, OceanAssetIcon, SolarAssetIcon, TableArrowIcon } from '@/lib/icons';
import { Line } from 'react-chartjs-2';
import NoDataFound from '@/components/ui/NoDataFound';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ExchangeTableProps {
  activeTab: 'all' | 'holdings';
  searchTerm: string;
  categoryFilter: string;
  industryFilter: string;
  viewMode: 'grid' | 'list';
  currentPage: number;
  onTotalPagesChange?: (totalPages: number) => void;
}

interface ExchangeAsset {
  id: number;
  name: string;
  iconType: 'ocean' | 'solar';
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  marketCap: number;
  circulatingSupply: number;
  chartData: number[];
}

// Mock data for exchange assets
const mockExchangeAssets: ExchangeAsset[] = [
  {
    id: 1,
    name: 'OceanView Apartments',
    iconType: 'ocean',
    price: 3.45,
    change24h: 12.4,
    volume24h: 45672890,
    high24h: 3.67,
    low24h: 3.12,
    marketCap: 125000000,
    circulatingSupply: 36231884,
    chartData: [3.2, 3.3, 3.4, 3.35, 3.45, 3.42, 3.45]
  },
  {
    id: 2,
    name: 'GreenSolar Energy Fund',
    iconType: 'solar',
    price: 2.99,
    change24h: -9.3,
    volume24h: 32145678,
    high24h: 3.15,
    low24h: 2.89,
    marketCap: 89000000,
    circulatingSupply: 29765886,
    chartData: [3.1, 3.0, 2.95, 2.98, 2.99, 2.97, 2.99]
  },
  {
    id: 3,
    name: 'OceanView Apartments',
    iconType: 'ocean',
    price: 4.75,
    change24h: 8.7,
    volume24h: 67890123,
    high24h: 4.89,
    low24h: 4.45,
    marketCap: 156000000,
    circulatingSupply: 32842105,
    chartData: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.75]
  },
  {
    id: 4,
    name: 'GreenSolar Energy Fund',
    iconType: 'solar',
    price: 1.89,
    change24h: -5.2,
    volume24h: 23456789,
    high24h: 2.01,
    low24h: 1.85,
    marketCap: 67000000,
    circulatingSupply: 35449735,
    chartData: [1.95, 1.92, 1.90, 1.88, 1.89, 1.87, 1.89]
  },
  {
    id: 5,
    name: 'OceanView Apartments',
    iconType: 'ocean',
    price: 5.23,
    change24h: 15.8,
    volume24h: 78901234,
    high24h: 5.45,
    low24h: 4.98,
    marketCap: 189000000,
    circulatingSupply: 36137667,
    chartData: [4.5, 4.7, 4.9, 5.0, 5.1, 5.2, 5.23]
  }
];

export default function ExchangeTable({ activeTab, searchTerm, categoryFilter, industryFilter, viewMode, currentPage, onTotalPagesChange }: ExchangeTableProps) {
  const [selectedAssets, setSelectedAssets] = useState<Set<number>>(new Set());
  const itemsPerPage = 10;

  // Filter assets based on active tab and filters
  const filteredAssets = mockExchangeAssets.filter(asset => {
    const matchesTab = activeTab === 'all' || selectedAssets.has(asset.id);
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Add more filter logic as needed
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssets = filteredAssets.slice(startIndex, startIndex + itemsPerPage);

  // Notify parent component of total pages
  React.useEffect(() => {
    if (onTotalPagesChange) {
      onTotalPagesChange(totalPages);
    }
  }, [totalPages, onTotalPagesChange]);

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

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  const formatVolume = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num.toLocaleString()}`;
  };

  const formatSupply = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  // Sparkline chart component using Chart.js
  const SparklineChart = ({ data }: { data: number[] }) => {
    const chartData = {
      labels: data.map((_, index) => index + 1),
      datasets: [
        {
          data: data,
          borderColor: '#B58833',
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.4,
          fill: false,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    };

    return (
      <div className="w-16 h-8">
        <Line data={chartData} options={options} />
      </div>
    );
  };

  if (viewMode === 'grid') {
    // Grid view implementation would go here
    if (paginatedAssets.length === 0) {
      return <NoDataFound title="No assets found" description="Try adjusting your search or filter criteria." />;
    }
    
    return (
      <div className="space-y-4">
        {/* Grid Header with Select All */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={paginatedAssets.length > 0 && paginatedAssets.every(asset => selectedAssets.has(asset.id))}
              ref={(input) => {
                if (input) input.indeterminate = paginatedAssets.some(asset => selectedAssets.has(asset.id)) && !paginatedAssets.every(asset => selectedAssets.has(asset.id));
              }}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="rounded border-stroke"
            />
            <span className="text-sm font-medium text-gray-700">
              {selectedAssets.size > 0 ? `${selectedAssets.size} selected` : 'Select all'}
            </span>
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedAssets.map((asset) => (
          <div key={asset.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Card Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedAssets.has(asset.id)}
                  onChange={() => handleSelectAsset(asset.id)}
                  className="rounded border-stroke"
                />
                <div className={`w-8 h-8 ${getIconBackgroundColor(asset.iconType)} rounded-full flex items-center justify-center`}>
                  {getProjectIcon(asset.iconType)}
                </div>
              </div>
            </div>

            {/* Asset Info */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">{asset.name}</h3>
              <p className="text-xs text-gray-600">${asset.price}</p>
            </div>

            {/* Price Details */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">24h Change:</span>
                <span className={`font-medium ${asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Volume:</span>
                <span className="font-medium text-gray-900">{formatNumber(asset.volume24h)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Market Cap:</span>
                <span className="font-medium text-gray-900">{formatNumber(asset.marketCap)}</span>
              </div>
            </div>

            {/* Chart */}
            <div className="mt-4 flex justify-center">
              <SparklineChart data={asset.chartData} />
            </div>
          </div>
        ))}
        </div>
      </div>
    );
  }

  if (paginatedAssets.length === 0) {
    return <NoDataFound title="No assets found" description="Try adjusting your search or filter criteria." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-12 px-2 py-3 text-left">
              <input 
                type="checkbox" 
                checked={paginatedAssets.length > 0 && paginatedAssets.every(asset => selectedAssets.has(asset.id))}
                ref={(input) => {
                  if (input) input.indeterminate = paginatedAssets.some(asset => selectedAssets.has(asset.id)) && !paginatedAssets.every(asset => selectedAssets.has(asset.id));
                }}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-stroke" 
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-black tracking-wider">
              #
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
              <div className="flex items-center gap-1">
                Project Name
                <TableArrowIcon />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
              24h %
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
              Volume (24H)
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
              24h High
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
              24H Low
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
              Market Cap
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
              Circulating Supply
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
              7D Chart
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedAssets.map((asset, index) => (
            <tr key={asset.id} className="hover:bg-gray-50">
              <td className="w-12 px-2 py-4">
                <input 
                  type="checkbox" 
                  checked={selectedAssets.has(asset.id)}
                  onChange={() => handleSelectAsset(asset.id)}
                  className="rounded border-stroke" 
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {startIndex + index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${getIconBackgroundColor(asset.iconType)} rounded-full flex items-center justify-center`}>
                    {getProjectIcon(asset.iconType)}
                  </div>
                  <Link href={`/exchange/${asset.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                    {asset.name}
                  </Link>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${asset.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`flex items-center gap-1 ${asset.change24h >= 0 ? 'text-success-500' : 'text-error-500'}`}>
                  {asset.change24h >= 0 ? (
                    <CaretUpIcon />
                  ) : (
                    <CaretDownIcon />
                  )}
                  {Math.abs(asset.change24h).toFixed(1)}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatVolume(asset.volume24h)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${asset.high24h.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${asset.low24h.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatNumber(asset.marketCap)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatSupply(asset.circulatingSupply)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <SparklineChart data={asset.chartData} />
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
  );
}
