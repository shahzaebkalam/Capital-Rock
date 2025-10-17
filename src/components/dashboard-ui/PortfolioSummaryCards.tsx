'use client';

import React from 'react';
import { TrendingUpIcon, TrendingDownIcon } from '@/lib/icons';

interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const SummaryCard = ({ title, value, change, isPositive }: SummaryCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 min-h-[120px] sm:min-h-[140px]">
      {/* Top section with avatar and title */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="#B58833"/>
            <path d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z" fill="#B58833"/>
          </svg>
        </div>
        <h3 className="text-sm font-medium text-black truncate">{title}</h3>
      </div>
      
      {/* Bottom section with value and trend */}
      <div className="flex items-end justify-between">
        <p className="text-lg font-semibold text-gray-900 truncate">{value}</p>
        {change && (
          <div className={`flex items-center gap-1 sm:gap-2 ${isPositive ? 'text-green-600' : 'text-red-600'} flex-shrink-0`}>
            {isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
            <span className="text-xs font-medium">{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export type PortfolioSummaryItem = {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
};

interface PortfolioSummaryCardsProps {
  title?: string;
  items?: PortfolioSummaryItem[];
}

export default function PortfolioSummaryCards({ title = 'Portfolio Summary Card', items }: PortfolioSummaryCardsProps) {
  const defaultItems: PortfolioSummaryItem[] = [
    {
      title: 'Portfolio Value',
      value: '$300.00',
      change: '+10%',
      isPositive: true,
    },
    {
      title: 'IRR',
      value: '$300.00',
      change: '-2%',
      isPositive: false,
    },
    {
      title: 'ROI',
      value: '$30.00',
      change: '+10%',
      isPositive: true,
    },
    {
      title: 'Active Investments',
      value: '$250.00',
      change: '+10%',
      isPositive: true,
    },
    {
      title: 'Risk Score',
      value: '80.00%',
      change: '-2%',
      isPositive: false,
    },
  ];

  const data = items ?? defaultItems;
  const xlCols = (data.length >= 5) ? 'xl:grid-cols-5' : 'xl:grid-cols-4';

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 border border-stroke">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">{title}</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${xlCols} gap-4 sm:gap-6`}>
        {data.map((item, index) => (
          <SummaryCard
            key={index}
            title={item.title}
            value={item.value}
            change={item.change ?? ''}
            isPositive={item.isPositive ?? true}
          />
        ))}
      </div>
    </div>
  );
}
