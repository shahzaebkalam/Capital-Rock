'use client';

import React, { useState, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import PieChartCard from '../dashboard-ui/PieChartCard';
import BarChartCard from '../dashboard-ui/BarChartCard';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function ChartsAndAnalytics() {
  const [activeTimeframe, setActiveTimeframe] = useState<'W' | 'M' | 'Q' | 'Y'>('W');

  const barData = useMemo(() => {
    switch (activeTimeframe) {
      case 'M':
        return { labels: ['Asset A', 'Asset B', 'Asset C', 'Asset D', 'Asset E', 'Asset F'], values: [10, 8, 7, 12, 14, 16] };
      case 'Q':
        return { labels: ['Asset A', 'Asset B', 'Asset C', 'Asset D', 'Asset E', 'Asset F'], values: [12, 9, 8, 14, 16, 18] };
      case 'Y':
        return { labels: ['Asset A', 'Asset B', 'Asset C', 'Asset D', 'Asset E', 'Asset F'], values: [14, 10, 9, 15, 18, 20] };
      default:
        return { labels: ['Asset A', 'Asset B', 'Asset C', 'Asset D', 'Asset E', 'Asset F'], values: [14, 8, 7, 11, 13, 20] };
    }
  }, [activeTimeframe]);


  // Pie chart data for distribution
  const pieChartData = {
    labels: ['Asset 1', 'Asset 2', 'Asset 3'],
    datasets: [
      {
        data: [50, 35, 15],
        backgroundColor: [
          'rgba(212, 175, 55, 0.8)',
          'rgba(181, 136, 51, 0.8)',
          'rgba(210, 180, 140, 0.8)',
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2,
      },
    ],
  };


  const timeframes = [
    { key: 'W', label: 'W' },
    { key: 'M', label: 'M' },
    { key: 'Q', label: 'Q' },
    { key: 'Y', label: 'Y' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Charts & Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartCard
          title="Top Performing Assets"
          labels={barData.labels}
          values={barData.values}
          colors={[ 'rgba(181, 136, 51, 0.8)' ]}
          yMax={20}
          yFormatter={(v) => `${v}%`}
          headerRight={(
            <div className="flex gap-3">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe.key}
                  onClick={() => setActiveTimeframe(timeframe.key as 'W' | 'M' | 'Q' | 'Y')}
                  className={`text-sm font-semibold ${activeTimeframe === timeframe.key ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>
          )}
        />

        <PieChartCard title="Distribution %" labels={pieChartData.labels} values={pieChartData.datasets[0].data} />
      </div>
    </div>
  );
}
