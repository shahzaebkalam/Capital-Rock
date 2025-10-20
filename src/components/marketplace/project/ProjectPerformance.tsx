'use client';

import React, { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import AreaChartCard from '@/components/dashboard-ui/AreaChartCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ProjectPerformance() {
  const [selectedPeriod, setSelectedPeriod] = useState('Q');

  const periods = ['W', 'M', 'Q', 'Y'];
  
  type Series = { labels: string[]; data: number[]; highlightLabel: string };


  const activeSeries: Series = useMemo(() => {
    const ROI_SERIES: Record<string, Series> = {
      W: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [0.2, 0.6, 0.9, 1.2, 1.6, 2.1, 2.4],
        highlightLabel: 'Sat',
      },
      M: {
        labels: ['W1', 'W2', 'W3', 'W4'],
        data: [0.5, 1.0, 1.6, 2.3],
        highlightLabel: 'W3',
      },
      Q: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [0, 1.8, 2.1, 3.8],
        highlightLabel: 'Q3',
      },
      Y: {
        labels: ['2021', '2022', '2023', '2024'],
        data: [0.8, 1.4, 2.2, 3.4],
        highlightLabel: '2024',
      },
    };
    return ROI_SERIES[selectedPeriod] ?? ROI_SERIES.Q;
  }, [selectedPeriod]);



  
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-black font-sans">Performance Snapshot</h2>
      
      <AreaChartCard
        title="ROI"
        labels={activeSeries.labels}
        values={activeSeries.data}
        highlightLabel={activeSeries.highlightLabel}
        yMax={4}
        yFormatter={(v) => `$${v}k`}
        headerRight={(
          <div className="flex gap-3">
            {periods.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedPeriod(timeframe)}
                className={`text-sm font-semibold ${selectedPeriod === timeframe ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
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
