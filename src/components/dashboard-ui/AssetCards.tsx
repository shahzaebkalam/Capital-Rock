'use client';

import { RWAIcon, TrendingUpIcon } from '@/lib/icons';
import React from 'react';
import { TrendingDownIcon } from '@/lib/icons';

interface AssetCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconColor: string;
}

const AssetCard = ({ title, value, change, isPositive, icon }: AssetCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      {/* Top section with icon */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
          {icon}
        </div>
      </div>
      
      {/* Bottom section with asset info and trend */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-lg font-bold text-gray-900">{value}</p>
        </div>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change && (isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />)}
          {change && <span className="text-sm font-medium">{change}</span>}
        </div>
      </div>
    </div>
  );
};

export type AssetItem = {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  iconColor?: string;
};

interface AssetCardsProps {
  title?: string;
  items?: AssetItem[];
}

export default function AssetCards({ title = 'Asset Cards', items }: AssetCardsProps) {
  const assetData: AssetItem[] = items ?? [
    {
      title: 'RWA Asset A',
      value: '$120.00',
      change: '+10%',
      isPositive: true,
      icon: <RWAIcon className=" text-purple-500" />,
      iconColor: '#8B5CF6', // Purple
    },
    {
      title: 'RWA Asset C',
      value: '$120.00',
      change: '+10%',
      isPositive: true,
      icon: <RWAIcon className=" text-blue-500" />,
      iconColor: '#3B82F6', // Blue
    },
    {
      title: 'RWA Asset D',
      value: '$120.00',
      change: '+10%',
      isPositive: true,
      icon: <RWAIcon className=" text-green-500" />,
      iconColor: '#10B981', // Green
    },
    {
      title: 'RWA Asset B',
      value: '$120.00',
      change: '+10%',
      isPositive: true,
      icon: <RWAIcon className=" text-yellow-500" />,
      iconColor: '#F59E0B', // Yellow/Amber
    },
  ];

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 border border-stroke">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {assetData.map((asset, index) => (
          <AssetCard
            key={index}
            title={asset.title}
            value={asset.value}
            change={asset.change ?? ''}
            isPositive={asset.isPositive ?? true}
            icon={asset.icon ?? <RWAIcon className=" text-purple-500" />}
            iconColor={asset.iconColor ?? '#8B5CF6'}
          />
        ))}
      </div>
    </div>
  );
}
