'use client';

import React from 'react';
import { OceanAssetIcon, SolarAssetIcon, TableArrowIcon } from '@/lib/icons';
import { Line } from 'react-chartjs-2';
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

interface TradeHistoryProps {
  activeTab: 'trademarket' | 'openorder' | 'openhistory' | 'tradehistory' | 'portfolio' | 'watchlist';
  onTabChange: (tab: 'trademarket' | 'openorder' | 'openhistory' | 'tradehistory' | 'portfolio' | 'watchlist') => void;
}

export default function TradeHistory({ activeTab, onTabChange }: TradeHistoryProps) {
  const tabs = [
    { id: 'trademarket', label: 'Trade Market' },
    { id: 'openorder', label: 'Open Order' },
    { id: 'openhistory', label: 'Open History' },
    { id: 'tradehistory', label: 'Trade History' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'watchlist', label: 'Watchlist' }
  ] as const;

  // SparklineChart component (same as ExchangeTable)
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
    };

    return (
      <div className="w-16 h-8">
        <Line data={chartData} options={options} />
      </div>
    );
  };

  const assets = [
    {
      name: 'OceanView Apartments',
      iconType: 'ocean' as const,
      price: '$3.45',
      change24h: '12.4%',
      change24hColor: 'text-success-500',
      volume24h: '$45,672,890',
      high24h: '$4.99',
      low24h: '$3.45',
      chartData: [3.2, 3.3, 3.4, 3.35, 3.45, 3.42, 3.45]
    },
    {
      name: 'GreenSolar Energy Fund',
      iconType: 'solar' as const,
      price: '$2.99',
      change24h: '15.8%',
      change24hColor: 'text-success-500',
      volume24h: '$62,345,123',
      high24h: '$2.99',
      low24h: '$2.80',
      chartData: [2.8, 2.85, 2.9, 2.88, 2.99, 2.95, 2.99]
    },
    {
      name: 'OceanView Apartments',
      iconType: 'ocean' as const,
      price: '$4.75',
      change24h: '9.3%',
      change24hColor: 'text-error-500',
      volume24h: '$50,987,654',
      high24h: '$5.50',
      low24h: '$5.20',
      chartData: [5.2, 5.1, 5.0, 4.9, 4.8, 4.75, 4.75]
    }
  ];

  const getProjectIcon = (iconType: 'ocean' | 'solar') => {
    const iconClass = "w-8 h-8 text-white";
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Tabs */}
      <div className="border-b border-stroke mb-6">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm font-sans rounded-t-lg whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white text-black border border-b-0 border-stroke'
                  : ' text-black hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-6 text-xs font-medium text-secondary-black tracking-wider">
                <div className="flex items-center gap-2">
                  Name
                  <TableArrowIcon className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th className="text-right py-3 px-6 text-xs font-medium text-secondary-black tracking-wider">Price</th>
              <th className="text-right py-3 px-6 text-xs font-medium text-secondary-black tracking-wider">24h %</th>
              <th className="text-right py-3 px-6 text-xs font-medium text-secondary-black tracking-wider">Volume (24H)</th>
              <th className="text-right py-3 px-6 text-xs font-medium text-secondary-black tracking-wider">24h High</th>
              <th className="text-right py-3 px-6 text-xs font-medium text-secondary-black tracking-wider">24h Low</th>
              <th className="text-right py-3 px-6 text-xs font-medium text-secondary-black tracking-wider">7D Chart</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.map((asset, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${getIconBackgroundColor(asset.iconType)} rounded-full flex items-center justify-center`}>
                      {getProjectIcon(asset.iconType)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{asset.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right text-sm font-medium text-gray-900">{asset.price}</td>
                <td className={`py-4 px-6 text-right text-sm font-medium ${asset.change24hColor}`}>
                  {asset.change24h.startsWith('-') ? '▼' : '▲'}{asset.change24h}
                </td>
                <td className="py-4 px-6 text-right text-sm text-gray-900">{asset.volume24h}</td>
                <td className="py-4 px-6 text-right text-sm text-gray-900">{asset.high24h}</td>
                <td className="py-4 px-6 text-right text-sm text-gray-900">{asset.low24h}</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end">
                    <SparklineChart data={asset.chartData} />
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
