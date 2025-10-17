'use client';

import React, { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
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
  Plugin,
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
      labels: ['2022', '2023', '2024', '2025'],
      data: [0.8, 1.4, 2.2, 3.4],
      highlightLabel: '2024',
    },
  };

  const activeSeries: Series = useMemo(
    () => ROI_SERIES[selectedPeriod] ?? ROI_SERIES.Q,
    [selectedPeriod]
  );

  const roiData = useMemo(
    () => ({
      labels: activeSeries.labels,
      datasets: [
        {
          label: 'ROI',
          data: activeSeries.data,
          borderColor: '#B58833',
          backgroundColor: (context: any) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(181, 136, 51, 0.8)');
            gradient.addColorStop(1, 'rgba(181, 136, 51, 0.1)');
            return gradient;
          },
          borderWidth: 3,
          fill: true,
          tension: 0.1,
          pointBackgroundColor: (ctx: any) => (
            ctx.dataIndex === activeSeries.labels.indexOf(activeSeries.highlightLabel) ? '#FFFFFF' : '#B58833'
          ),
          pointBorderColor: (ctx: any) => '#B58833',
          pointBorderWidth: (ctx: any) => (
            ctx.dataIndex === activeSeries.labels.indexOf(activeSeries.highlightLabel) ? 2 : 0
          ),
          pointRadius: (ctx: any) => (
            ctx.dataIndex === activeSeries.labels.indexOf(activeSeries.highlightLabel) ? 5 : 0
          ),
          pointHoverRadius: (ctx: any) => (
            ctx.dataIndex === activeSeries.labels.indexOf(activeSeries.highlightLabel) ? 7 : 0
          ),
        },
      ],
    }),
    [activeSeries]
  );

  const highlightedIndex = useMemo(
    () => activeSeries.labels.indexOf(activeSeries.highlightLabel),
    [activeSeries]
  );

  const verticalGuidePlugin: Plugin<'line'> = useMemo(() => ({
    id: 'roiVerticalGuide',
    afterDatasetsDraw(chart) {
      const { ctx, chartArea, scales } = chart;
      const xScale = scales.x as any;
      const x = xScale.getPixelForValue(highlightedIndex);
      ctx.save();
      ctx.strokeStyle = '#B58833';
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, chartArea.top);
      ctx.lineTo(x, chartArea.bottom);
      ctx.stroke();
      ctx.restore();
    },
  }), [highlightedIndex]);
  
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
