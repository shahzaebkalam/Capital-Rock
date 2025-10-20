'use client';

import React from 'react';
import { InfoIcon, TrendingDownIcon, TrendingUpIcon } from '@/lib/icons';

export default function PortfolioSummary() {
  const summaryData = [
    {
      title: 'Total Holdings',
      value: '$300.00',
      change: '+10%',
      changeType: 'positive' as const,
      showChange: true
    },
    {
      title: 'Total Assets',
      value: '5',
      change: null,
      changeType: null,
      showChange: false
    },
    {
      title: 'Average ROI',
      value: '$53.10',
      change: '+16%',
      changeType: 'positive' as const,
      showChange: true
    },
    {
      title: 'Total Dividends Received',
      value: '$99.90',
      change: null,
      changeType: null,
      showChange: false,
      showInfo: true
    }
  ];

  return (
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
  );
}

