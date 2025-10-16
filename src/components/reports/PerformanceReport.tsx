'use client';

import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { DownloadIcon, TrendingUpIcon } from '@/lib/icons';
import RiskExposureTable from './RiskExposureTable';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

export default function PerformanceReport() {
  const [activeTimeframe, setActiveTimeframe] = useState<'W' | 'M' | 'Q' | 'Y'>('W');

  // ROI Line chart data
  const roiChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'ROI',
        data: [2.5, 3.2, 4.1, 3.8, 4.5, 5.2, 4.9],
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
        tension: 0,
        pointBackgroundColor: '#B58833',
        pointBorderColor: '#B58833',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const roiChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
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
        backgroundColor: '#B58833',
        borderColor: '#B58833',
        borderWidth: 2,
      },
    },
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
            <span className="text-sm text-gray-600">IRR</span>
            <div className="flex items-center gap-1 text-success-600">
              <TrendingUpIcon className="w-4 h-4" />
              <span className="text-sm font-medium">25%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">$300.00</div>
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
            <span className="text-sm text-gray-600">Total Yield</span>
            <div className="flex items-center gap-1 text-success-600">
              <TrendingUpIcon className="w-4 h-4" />
              <span className="text-sm font-medium">2%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">20%</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* ROI Chart */}
        <div className="bg-white border border-stroke rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-semibold text-secondary-black">ROI</h3>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe.key}
                  onClick={() => setActiveTimeframe(timeframe.key as 'W' | 'M' | 'Q' | 'Y')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    activeTimeframe === timeframe.key
                      ? 'bg-primary text-white'
                      : 'text-secondary-black hover:text-secondary-black'
                  }`}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <Line data={roiChartData} options={roiChartOptions} />
          </div>
        </div>

        {/* Asset Allocation Chart */}
        <div className="bg-white border border-stroke rounded-lg p-4">
          <h3 className="text-md font-semibold text-secondary-black mb-4">Asset Allocation %</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <Pie data={assetAllocationData} options={assetAllocationOptions} />
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex justify-center">
            <div className="flex gap-6">
              {assetAllocationData.labels.map((label, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full border border-white" 
                    style={{ backgroundColor: assetAllocationData.datasets[0].backgroundColor[index] }}
                  />
                  <span className="text-sm text-gray-600 font-medium">{label}: {assetAllocationData.datasets[0].data[index]}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Exposure Table */}
      <RiskExposureTable />
    </div>
  );
}
