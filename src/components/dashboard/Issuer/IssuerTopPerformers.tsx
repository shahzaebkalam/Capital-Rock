'use client';

import React from 'react';
import { RWAIcon, TrendingUpIcon } from '@/lib/icons';

interface PerformerCardProps {
  title: string;
  value: string;
  change: string;
}

const PerformerCard = ({ title, value, change }: PerformerCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
          <RWAIcon className=" text-[#B58833]" />
        </div>
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUpIcon />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default function IssuerTopPerformers() {
  const data = [
    { title: 'RWA Asset A', value: '$32,000', change: '+10%' },
    { title: 'RWA Asset C', value: '$12,000', change: '+10%' },
    { title: 'RWA Asset D', value: '$12,000', change: '+10%' },
    { title: 'RWA Asset B', value: '$20,000', change: '+10%' },
  ];

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 border border-stroke">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Top Performing Asset & Charts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <PerformerCard key={index} title={item.title} value={item.value} change={item.change} />
        ))}
      </div>
    </div>
  );
}


