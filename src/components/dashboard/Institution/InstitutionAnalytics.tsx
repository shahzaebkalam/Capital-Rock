'use client';

import React, { useMemo, useState } from 'react';
import PieChartCard from '@/components/dashboard-ui/PieChartCard';
import AreaChartCard from '@/components/dashboard-ui/AreaChartCard';
import BarChartCard from '@/components/dashboard-ui/BarChartCard';

const timeframes = ['W', 'M', 'Q', 'Y'];

export default function InstitutionAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('W');

  const activeSeries = useMemo(() => {
    switch (selectedTimeframe) {
      case 'M':
        return { labels: ['W1', 'W2', 'W3', 'W4'], data: [5, 12, 15, 22], highlightLabel: 'W3' };
      case 'Q':
        return { labels: ['Jan', 'Feb', 'Mar'], data: [8, 13, 19], highlightLabel: 'Feb' };
      case 'Y':
        return { labels: ['Q1', 'Q2', 'Q3', 'Q4'], data: [12, 18, 25, 35], highlightLabel: 'Q3' };
      default:
        return { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: [0, 12, 14, 14, 18, 18, 24], highlightLabel: 'Sat' };
    }
  }, [selectedTimeframe]);

  const userGrowthSeries = useMemo(() => {
    switch (selectedTimeframe) {
      case 'M':
        return { labels: ['W1', 'W2', 'W3', 'W4'], data: [8, 15, 22, 28], highlightLabel: 'W3' };
      case 'Q':
        return { labels: ['Jan', 'Feb', 'Mar'], data: [12, 18, 25], highlightLabel: 'Feb' };
      case 'Y':
        return { labels: ['Q1', 'Q2', 'Q3', 'Q4'], data: [15, 22, 30, 35], highlightLabel: 'Q3' };
      default:
        return { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: [2, 8, 12, 15, 18, 22, 28], highlightLabel: 'Sat' };
    }
  }, [selectedTimeframe]);

  const barChartData = useMemo(() => {
    switch (selectedTimeframe) {
      case 'M':
        return { labels: ['Asset A', 'Asset B', 'Asset C', 'Asset D', 'Asset E', 'Asset F'], values: [18, 15, 12, 10, 8, 6] };
      case 'Q':
        return { labels: ['Asset A', 'Asset B', 'Asset C', 'Asset D', 'Asset E', 'Asset F'], values: [20, 16, 14, 12, 9, 7] };
      case 'Y':
        return { labels: ['Asset A', 'Asset B', 'Asset C', 'Asset D', 'Asset E', 'Asset F'], values: [22, 18, 16, 14, 11, 9] };
      default:
        return { labels: ['Asset A', 'Asset B', 'Asset C', 'Asset D', 'Asset E', 'Asset F'], values: [16, 14, 12, 10, 8, 6] };
    }
  }, [selectedTimeframe]);

  const pieLabels = ['Real Estate', 'Bonds', 'Equity'];
  const pieValues = [50, 35, 16];
  const pieColors = [
    'rgba(181, 136, 51, 0.8)',
    'rgba(212, 175, 55, 0.8)',
    'rgba(210, 180, 140, 0.8)',
  ];

  const barColors = Array(6).fill('rgba(181, 136, 51, 0.8)');

  return (
    <div className="grid grid-cols-1 bg-white lg:grid-cols-2 gap-6">
      <PieChartCard 
        title="Asset Distribution" 
        labels={pieLabels} 
        values={pieValues} 
        colors={pieColors}
      />

      <AreaChartCard
        title="Monthly Investment Volume"
        labels={activeSeries.labels}
        values={activeSeries.data}
        highlightLabel={activeSeries.highlightLabel}
        yMax={35}
        yFormatter={(v) => `${v}k`}
        headerRight={(
          <div className="flex gap-3">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`text-sm font-semibold ${selectedTimeframe === timeframe ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        )}
      />

      <BarChartCard
        title="Top Performing Assets"
        labels={barChartData.labels}
        values={barChartData.values}
        colors={barColors}
        yMax={20}
        yFormatter={(v) => `${v}%`}
        headerRight={(
          <div className="flex gap-3">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`text-sm font-semibold ${selectedTimeframe === timeframe ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        )}
      />

      <AreaChartCard
        title="User Growth"
        labels={userGrowthSeries.labels}
        values={userGrowthSeries.data}
        highlightLabel={userGrowthSeries.highlightLabel}
        yMax={35}
        yFormatter={(v) => `${v}k`}
        headerRight={(
          <div className="flex gap-3">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`text-sm font-semibold ${selectedTimeframe === timeframe ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        )}
      />
    </div>
  );
}
