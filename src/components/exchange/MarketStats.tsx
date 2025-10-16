'use client';

import React, { useState } from 'react';
import Select from '../ui/Select';
import { StarIcon, OceanAssetIcon, SolarAssetIcon, TrendingDownIcon, InfoIcon, TrendingUpIcon } from '@/lib/icons';
import { getProjectById } from '@/data/mockProjects';

interface MarketStatsProps {
  assetId: string;
}

export default function MarketStats({ assetId }: MarketStatsProps) {
  const [timeframe, setTimeframe] = useState('24H');

  // Get asset data based on ID
  const assetData = getProjectById(assetId);

  // Handle case where asset is not found
  if (!assetData) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Asset Not Found</h1>
          <p className="text-gray-600 mt-2">The asset you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Create icon based on iconType
  const getAssetIcon = () => {
    const iconClass = "w-8 h-8 text-white";
    if (assetData.iconType === 'ocean') {
      return <OceanAssetIcon className={iconClass} />;
    } else if (assetData.iconType === 'solar') {
      return <SolarAssetIcon className={iconClass} />;
    }
    return <OceanAssetIcon className={iconClass} />;
  };

  // Get background color based on iconType
  const getIconBackgroundColor = () => {
    if (assetData.iconType === 'ocean') {
      return 'bg-blue-500';
    } else if (assetData.iconType === 'solar') {
      return 'bg-green-500';
    }
    return 'bg-blue-500';
  };

  const timeframeOptions = [
    { value: '1H', label: '1H' },
    { value: '24H', label: '24H' },
    { value: '7D', label: '7D' },
    { value: '30D', label: '30D' }
  ];

  const summaryData = [
    {
      title: 'Market Cap',
      value: '$300.00',
      change: '+10%',
      changeType: 'positive' as const,
      showChange: true
    },
    {
      title: 'Fully Diluted',
      value: '$300.00',
      change: '+10%',
      changeType: 'positive' as const,
      showChange: true
    },
    {
      title: '24H Volume',
      value: '$300.00',
      change: '-2%',
      changeType: 'negative' as const,
      showChange: true
    },
    {
      title: 'Circulation Supply',
      value: '210000000',
      change: null,
      changeType: null,
      showChange: false,
      showInfo: true
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      {/* Header - Market Stats and Star on left, Asset info on right */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">Market Stats</h1>
          <button className="p-1 hover:bg-gray-100 rounded">
            <StarIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${getIconBackgroundColor()} rounded-full flex items-center justify-center`}>
            {getAssetIcon()}
          </div>
          <span className="text-xl font-semibold text-gray-900">{assetData.name}</span>
        </div>
      </div>

      {/* Price and Timeframe Section */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-gray-900">$3.45</span>
          <span className="text-sm font-medium text-green-600">▲12.4%</span>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-2">{assetData.name} Price(USD)</p>
          <div className="w-20">
            <Select
              options={timeframeOptions}
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Rank and Watchlist */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Rank #1</span>
          <span className="text-sm text-gray-600">On 2012394 Watchlist</span>
        </div>
      </div>

      {/* High/Low Price */}
      <div className="mb-6">
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-700">↓↑ High / Low Price</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Low: $3.2017</span>
          <div className="flex-1 mx-4">
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div className="absolute left-0 top-0 h-2 bg-primary rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <span className="text-sm text-gray-600">High: $3.6131</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryData.map((item, index) => (
        <div key={index} className="bg-white flex flex-col justify-between rounded-lg border border-gray-200 p-4">
          {/* Top row: Title and change indicator */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{item.title}</h3>
            {item.showChange && item.change && (
              <div className={`flex items-center gap-1 pr-1 text-sm ${
                item.changeType === 'positive' ? 'text-success-600' : 'text-error-600'
              }`}>
                {item.changeType === 'positive' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                <span>{item.change}</span>
              </div>
            )}
            {item.showInfo && !item.showChange && (
              <InfoIcon />
            )}
          </div>
          {/* Bottom row: Main value */}
          <div>
            <span className="text-2xl font-semibold text-secondary-black">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
