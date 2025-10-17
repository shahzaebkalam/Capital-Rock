'use client';

import React, { useMemo, useState } from 'react';
import PieChartCard from '@/components/dashboard-ui/PieChartCard';
import AreaChartCard from '@/components/dashboard-ui/AreaChartCard';

const pieLabels = ['Asset 1', 'Asset 2', 'Asset 3'];
const pieValues = [50, 35, 15];

const timeframes = ['W', 'M', 'Q', 'Y'];

type Series = { labels: string[]; data: number[]; highlightLabel: string };

const CASHFLOW_SERIES: Record<string, Series> = {
  W: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [0, 1.8, 1.4, 1.4, 2.2, 2.2, 4.0],
    highlightLabel: 'Sat',
  },
  M: {
    labels: ['W1', 'W2', 'W3', 'W4'],
    data: [0.5, 1.2, 2.2, 3.1],
    highlightLabel: 'W3',
  },
  Q: {
    labels: ['Jan', 'Feb', 'Mar'],
    data: [0.8, 2.2, 2.3],
    highlightLabel: 'Feb',
  },
  Y: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    data: [0.6, 1.5, 2.1, 3.6],
    highlightLabel: 'Q3',
  },
};

export default function ChartsSection() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('W');

  const activeSeries: Series = useMemo(
    () => CASHFLOW_SERIES[selectedTimeframe] ?? CASHFLOW_SERIES.W,
    [selectedTimeframe]
  );

  const selectedIndex = useMemo(() => activeSeries.labels.indexOf(activeSeries.highlightLabel), [activeSeries]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PieChartCard title="Asset Allocation %" labels={pieLabels} values={pieValues} />

      <AreaChartCard
        title="Cashflow Over Time"
        labels={activeSeries.labels}
        values={activeSeries.data}
        highlightLabel={activeSeries.highlightLabel}
        yMax={4}
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
