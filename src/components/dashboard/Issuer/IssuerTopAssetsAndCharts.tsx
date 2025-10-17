'use client';

import React, { useMemo, useState } from 'react';
import PieChartCard from '@/components/dashboard-ui/PieChartCard';
import AreaChartCard from '@/components/dashboard-ui/AreaChartCard';

const timeframes = ['W', 'M', 'Q', 'Y'];

export default function IssuerTopAssetsAndCharts() {
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

  const pieLabels = ['Available: 50%', 'Germany: 35%', 'France: 15%'];
  const pieValues = [50, 35, 15];
  const pieColors = [
    'rgba(212, 175, 55, 0.8)',
    'rgba(181, 136, 51, 0.8)',
    'rgba(210, 180, 140, 0.8)',
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PieChartCard 
        title="Investor Demographics" 
        labels={pieLabels} 
        values={pieValues} 
        colors={pieColors}
        buttonText='By Country'
      />

      <AreaChartCard
        title="Subscriptions"
        labels={activeSeries.labels}
        values={activeSeries.data}
        highlightLabel={activeSeries.highlightLabel}
        yMax={35}
        yFormatter={(v) => `$${v}k`}
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


