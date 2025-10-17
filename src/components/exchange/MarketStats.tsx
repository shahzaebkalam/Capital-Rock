'use client';

import React, { useState } from 'react';
import Select from '../ui/Select';
import { StarIcon, OceanAssetIcon, SolarAssetIcon, TrendingDownIcon, InfoIcon, TrendingUpIcon, CaretUpIcon } from '@/lib/icons';
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
    if (assetData.iconType === 'ocean') {
      return <OceanAssetIcon />;
    } else if (assetData.iconType === 'solar') {
      return <SolarAssetIcon />;
    }
    return <OceanAssetIcon />;
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
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        {/* First Column */}
        <div className="space-y-4">
          {/* Row 1: Market Stats and Star */}
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-secondary-black">Market Stats</h1>
            <button className="p-1 bg-background-light border border-stroke hover:bg-gray-100 rounded">
              <StarIcon className=" text-gray-400" />
            </button>
          </div>
          
          {/* Row 2: Project Icon and Name */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${getIconBackgroundColor()} rounded-full flex items-center justify-center`}>
              {getAssetIcon()}
            </div>
            <span className="text-base font-semibold text-secondary-black">{assetData.name}</span>
          </div>
          
          {/* Row 3: Rank and Watchlist */}
          <div className="flex items-center gap-4">
            <span className="bg-background-light text-secondary-black px-3 py-1 rounded-full text-sm">Rank #1</span>
            <span className="text-sm text-gray-600">On 2012394 Watchlist</span>
          </div>
        </div>

        {/* Second Column */}
        <div className="space-y-4">
          {/* Row 1: Price Row */}
          <div className="flex flex-row-reverse items-center justify-between">
            <p className="text-xs text-gray-800">{assetData.name} Price(USD)</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-secondary-black">$3.45</span>
              <span className="text-sm flex items-center gap-1 font-medium text-success-600"><CaretUpIcon className="w-4 h-4" />12.4%</span>
            </div>
          </div>
          
          {/* Row 2: Dropdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800">↓↑ High / Low Price</span>
              <div className="w-20">
                <Select
                  options={timeframeOptions}
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                />
              </div>
            </div>
             <div className="space-y-2">
               <div className="relative h-2 bg-gray-200 rounded-full">
                 <div className="absolute left-0 top-0 h-2 bg-primary rounded-full" style={{ width: '75%' }}></div>
               </div>
               <div className="flex justify-between">
                 <span className="text-sm text-gray-600">Low: $3.2017</span>
                 <span className="text-sm text-gray-600">High: $3.6131</span>
               </div>
             </div>
          </div>
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
