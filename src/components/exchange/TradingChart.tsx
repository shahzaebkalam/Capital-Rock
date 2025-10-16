'use client';

import React from 'react';
import { SearchIcon, FullscreenIcon } from '@/lib/icons';
import Select from '../ui/Select';

interface TradingChartProps {
  activeTab: 'price' | 'marketcap' | 'tradingview';
  onTabChange: (tab: 'price' | 'marketcap' | 'tradingview') => void;
}

export default function TradingChart({ activeTab, onTabChange }: TradingChartProps) {
  const timeframeOptions = [
    { value: '1m', label: '1m' },
    { value: '5m', label: '5m' },
    { value: '15m', label: '15m' },
    { value: '1h', label: '1h' },
    { value: '4h', label: '4h' },
    { value: '1d', label: '1d' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">OceanView to USDC Chart</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Q Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="w-20">
            <Select
              options={timeframeOptions}
              value="15m"
              onChange={() => {}}
            />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded">
            <FullscreenIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Chart Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => onTabChange('price')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'price'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Price
        </button>
        <button
          onClick={() => onTabChange('marketcap')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'marketcap'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Market Cap
        </button>
        <button
          onClick={() => onTabChange('tradingview')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'tradingview'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Trading View
        </button>
      </div>

      {/* Chart Area */}
      <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-gray-500">Candlestick Chart</p>
          <p className="text-sm text-gray-400">Chart implementation would go here</p>
        </div>
      </div>
    </div>
  );
}
