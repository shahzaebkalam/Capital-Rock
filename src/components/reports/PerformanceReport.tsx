'use client';

import React, { useMemo, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement, Plugin, ChartOptions } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { DownloadIcon, TrendingUpIcon } from '@/lib/icons';
import RiskExposureTable from './RiskExposureTable';
import PieChartCard from '../dashboard-ui/PieChartCard';
import AreaChartCard from '../dashboard-ui/AreaChartCard';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

export default function PerformanceReport() {
  const [activeTimeframe, setActiveTimeframe] = useState<'W' | 'M' | 'Q' | 'Y'>('W');

  // ROI Line chart data (by timeframe)
  type Series = { labels: string[]; data: number[]; highlightLabel: string };

  const ROI_SERIES: Record<'W' | 'M' | 'Q' | 'Y', Series> = {
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

  const activeSeries: Series = useMemo(() => ROI_SERIES[activeTimeframe], [activeTimeframe]);

  const highlightedIndex = useMemo(
    () => activeSeries.labels.indexOf(activeSeries.highlightLabel),
    [activeSeries]
  );

  const roiChartData = useMemo(
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
          pointBackgroundColor: (ctx: any) => (ctx.dataIndex === highlightedIndex ? '#FFFFFF' : '#B58833'),
          pointBorderColor: (ctx: any) => '#B58833',
          pointBorderWidth: (ctx: any) => (ctx.dataIndex === highlightedIndex ? 2 : 0),
          pointRadius: (ctx: any) => (ctx.dataIndex === highlightedIndex ? 5 : 0),
          pointHoverRadius: (ctx: any) => (ctx.dataIndex === highlightedIndex ? 7 : 0),
        },
      ],
    }),
    [activeSeries, highlightedIndex]
  );

  const verticalGuidePlugin: Plugin<'line'> = useMemo(() => ({
    id: 'reportsRoiVerticalGuide',
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

  const roiChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y}%`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#666',
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 6,
        ticks: {
          stepSize: 1,
          callback: function(value: any) {
            return `${value}%`;
          },
          color: '#666',
          font: {
            size: 12,
          },
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        borderWidth: 2,
      },
    },
    interaction: { mode: 'index', intersect: false },
  };

  // Asset allocation pie chart data
  const assetAllocationData = {
    labels: ['Asset 1', 'Asset 2', 'Asset 3'],
    datasets: [
      {
        data: [50, 35, 15],
        backgroundColor: [
          'rgba(212, 175, 55, 0.8)', // Golden
          'rgba(181, 136, 51, 0.8)', // Darker golden
          'rgba(210, 180, 140, 0.8)', // Tan
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(212, 175, 55, 1)',
          'rgba(181, 136, 51, 1)',
          'rgba(210, 180, 140, 1)',
        ],
        hoverBorderColor: '#D4AF37',
        hoverBorderWidth: 3,
      },
    ],
  };

  const assetAllocationOptions = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: 90,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#D4AF37',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: function(context: any) {
            return context[0].label;
          },
          label: function(context: any) {
            const value = context.parsed;
            return `${context.label}: ${value}%`;
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
      },
    },
  };

  const timeframes = [
    { key: 'W', label: 'W' },
    { key: 'M', label: 'M' },
    { key: 'Q', label: 'Q' },
    { key: 'Y', label: 'Y' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">1. Performance Report</h2>
        <button className="flex items-center gap-2 px-4 py-2 border border-stroke bg-white text-secondary-black rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <DownloadIcon />
          Download Report (PDF/CSV)
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-stroke rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Raised</span>
            <div className="flex items-center gap-1 text-success-600">
              <TrendingUpIcon className="w-4 h-4" />
              <span className="text-sm font-medium">2.5%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">$300000.00</div>
        </div>

        <div className="bg-white border border-stroke rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">ROI</span>
            <div className="flex items-center gap-1 text-success-600">
              <TrendingUpIcon className="w-4 h-4" />
              <span className="text-sm font-medium">10%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">$3000.00</div>
        </div>

        <div className="bg-white border border-stroke rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Active Investors</span>
            <div className="flex items-center gap-1 text-success-600">
              <TrendingUpIcon className="w-4 h-4" />
              <span className="text-sm font-medium">2%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">20</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* ROI Chart */}
        <AreaChartCard
        title="ROI"
        labels={activeSeries.labels}
        values={activeSeries.data}
        highlightLabel={activeSeries.highlightLabel}
        yMax={4}
        yFormatter={(v) => `$${v}k`}
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

        {/* Investment Trend per Asset Chart */}
        <PieChartCard title="Investment Trend per Asset" labels={assetAllocationData.labels} values={assetAllocationData.datasets[0].data} />
      </div>

      {/* Risk Exposure Table */}
      <RiskExposureTable />
    </div>
  );
}
