'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from 'chart.js';
import { DownloadIcon, TrendingUpIcon } from '@/lib/icons';
import RiskExposureTable from '../reports/RiskExposureTable';
import PieChartCard from './PieChartCard';
import AreaChartCard from './AreaChartCard';
import BarChartCard from './BarChartCard';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

export default function PerformanceReport() {
  const [userType, setUserType] = useState<string | null>(null);
  const [activeTimeframe, setActiveTimeframe] = useState<'W' | 'M' | 'Q' | 'Y'>('W');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserType(localStorage.getItem('userType'));
    }
  }, []);

  // ROI Line chart data (by timeframe)
  type Series = { labels: string[]; data: number[]; highlightLabel: string };


  const activeSeries: Series = useMemo(() => {
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
    return ROI_SERIES[activeTimeframe];
  }, [activeTimeframe]);





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
        {userType === 'institution' ? (
          <BarChartCard
            title="Asset Performance"
            labels={[
              'Asset Name', 'Asset Name', 'Asset Name', 'Asset Name', 'Asset Name', 'Asset Name', 'Asset Name',
            ]}
            values={[13.5, 8.2, 6.8, 10.6, 15, 17, 20]}
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
        ) : (
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
        )}

        {/* Investment Trend per Asset Chart */}
        <PieChartCard title="Investment Trend per Asset" labels={assetAllocationData.labels} values={assetAllocationData.datasets[0].data} />
      </div>

      {/* Risk Exposure Table */}
      <RiskExposureTable />
    </div>
  );
}
