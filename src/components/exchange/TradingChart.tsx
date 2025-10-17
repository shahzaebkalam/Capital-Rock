'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SearchIcon, FullscreenIcon } from '@/lib/icons';
import Select from '../ui/Select';
import { init, dispose, Chart } from 'klinecharts';
import Button from '../ui/Button';
import SearchBar from '../searchbar/SearchBar';

interface TradingChartProps {
  activeTab: 'price' | 'marketcap' | 'tradingview';
  onTabChange: (tab: 'price' | 'marketcap' | 'tradingview') => void;
}

// Mock data for the chart
const generateMockData = () => {
  const data = [];
  let basePrice = 100;
  const now = Date.now();
  
  for (let i = 0; i < 100; i++) {
    const timestamp = now - (100 - i) * 60 * 1000; // 1 minute intervals
    const open = basePrice;
    const close = basePrice + (Math.random() - 0.5) * 10;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;
    const volume = Math.random() * 1000000;
    
    data.push({
      timestamp,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Number(volume.toFixed(0))
    });
    
    basePrice = close;
  }
  
  return data;
};

export default function TradingChart({ activeTab, onTabChange }: TradingChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('15m');

  const timeframeOptions = [
    { value: '1m', label: '1m' },
    { value: '5m', label: '5m' },
    { value: '15m', label: '15m' },
    { value: '1h', label: '1h' },
    { value: '4h', label: '4h' },
    { value: '1d', label: '1d' }
  ];

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      // Initialize the chart
      chartInstance.current = init(chartRef.current);
      
      // Set chart styles with proper types
      if (chartInstance.current) {
        chartInstance.current.setStyles({
          grid: {
            show: true,
            horizontal: {
              show: true,
              size: 1,
              color: '#e5e7eb'
            },
            vertical: {
              show: true,
              size: 1,
              color: '#e5e7eb'
            }
          },
          candle: {
            bar: {
              upColor: '#10b981',
              downColor: '#ef4444',
              noChangeColor: '#6b7280'
            },
            tooltip: {
              custom: (data: any) => {
                return [
                  { title: 'Open', value: data.kLineData?.open?.toFixed(2) || '' },
                  { title: 'High', value: data.kLineData?.high?.toFixed(2) || '' },
                  { title: 'Low', value: data.kLineData?.low?.toFixed(2) || '' },
                  { title: 'Close', value: data.kLineData?.close?.toFixed(2) || '' },
                  { title: 'Volume', value: data.kLineData?.volume?.toLocaleString() || '' }
                ];
              }
            }
          },
          xAxis: {
            show: true,
            axisLine: {
              show: true,
              color: '#d1d5db',
              size: 1
            },
            tickText: {
              show: true,
              color: '#6b7280',
              size: 12
            },
            tickLine: {
              show: true,
              size: 1,
              length: 3,
              color: '#d1d5db'
            }
          },
          yAxis: {
            show: true,
            axisLine: {
              show: true,
              color: '#d1d5db',
              size: 1
            },
            tickText: {
              show: true,
              color: '#6b7280',
              size: 12
            },
            tickLine: {
              show: true,
              size: 1,
              length: 3,
              color: '#d1d5db'
            }
          },
          crosshair: {
            show: true,
            horizontal: {
              show: true,
              line: {
                show: true,
                dashedValue: [4, 2],
                size: 1,
                color: '#6b7280'
              },
              text: {
                show: true,
                color: '#ffffff',
                size: 12,
                borderColor: '#6b7280',
                borderSize: 1,
                borderRadius: 2,
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 2,
                paddingBottom: 2,
                backgroundColor: '#6b7280'
              }
            },
            vertical: {
              show: true,
              line: {
                show: true,
                dashedValue: [4, 2],
                size: 1,
                color: '#6b7280'
              },
              text: {
                show: true,
                color: '#ffffff',
                size: 12,
                borderColor: '#6b7280',
                borderSize: 1,
                borderRadius: 2,
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 2,
                paddingBottom: 2,
                backgroundColor: '#6b7280'
              }
            }
          }
        });

        // Load mock data
        const mockData = generateMockData();
        chartInstance.current.applyNewData(mockData);
      }
    }

    return () => {
      if (chartInstance.current && chartRef.current) {
        dispose(chartRef.current);
        chartInstance.current = null;
      }
    };
  }, []);

  const handleTimeframeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedTimeframe(value);
    // Here you would typically fetch new data based on the timeframe
    // For now, we'll just regenerate mock data
    if (chartInstance.current) {
      const mockData = generateMockData();
      chartInstance.current.applyNewData(mockData);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-6">
      {/* Chart Header */}
      <div className="p-3 sm:p-4">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-secondary-black">OceanView to USDC Chart</h2>
            
            {/* Search Bar - Full width on mobile */}
            <SearchBar
              value={''}
              onChange={() => {}}
              placeholder="Search"
              className="w-full"
            />
            
            {/* Tabs - Horizontal scroll on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                size="sm"
                onClick={() => onTabChange('price')}
                variant={activeTab === 'price' ? 'primary' : 'secondary'}
                className="flex-shrink-0"
              >
                Price
              </Button>
              <Button
                size="sm"
                onClick={() => onTabChange('marketcap')}
                variant={activeTab === 'marketcap' ? 'primary' : 'secondary'}
                className="flex-shrink-0"
              >
                Market Cap
              </Button>
              <Button
                size="sm"
                onClick={() => onTabChange('tradingview')}
                variant={activeTab === 'tradingview' ? 'primary' : 'secondary'}
                className="flex-shrink-0"
              >
                Trading View
              </Button>
            </div>
            
            {/* Controls - Full width on mobile */}
            <div className="flex items-center justify-between gap-3">
              <div className="w-24">
                <Select
                  options={timeframeOptions}
                  value={selectedTimeframe}
                  onChange={handleTimeframeChange}
                />
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FullscreenIcon className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-start justify-between">
          {/* Left side - Title and Tabs */}
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-secondary-black">OceanView to USDC Chart</h2>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => onTabChange('price')}
                variant={activeTab === 'price' ? 'primary' : 'secondary'}
              >
                Price
              </Button>
              <Button
                size="sm"
                onClick={() => onTabChange('marketcap')}
                variant={activeTab === 'marketcap' ? 'primary' : 'secondary'}
              >
                Market Cap
              </Button>
              <Button
                size="sm"
                onClick={() => onTabChange('tradingview')}
                variant={activeTab === 'tradingview' ? 'primary' : 'secondary'}
              >
                Trading View
              </Button>
            </div>
          </div>

          {/* Right side - Search and Controls */}
          <div className="flex flex-col items-end gap-3">
            <SearchBar
              value={''}
              onChange={() => {}}
              placeholder="Search"
              className="w-60"
            />
            <div className="flex items-center gap-3">
              <div className="w-20">
                <Select
                  options={timeframeOptions}
                  value={selectedTimeframe}
                  onChange={handleTimeframeChange}
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FullscreenIcon className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative">
        <div 
          ref={chartRef} 
          className="w-full h-64 sm:h-80 md:h-96"
          style={{ minHeight: '300px' }}
        />
      </div>
    </div>
  );
}
