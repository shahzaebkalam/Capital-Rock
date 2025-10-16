'use client';

import React, { useState, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function ChartsAndAnalytics() {
  const [activeTimeframe, setActiveTimeframe] = useState<'W' | 'M' | 'Q' | 'Y'>('W');

  // Dynamic data based on timeframe
  const chartData = useMemo(() => {
    const dataMap = {
      W: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [500, 800, 1200, 1500, 2000, 2500, 3000],
      },
      M: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [2000, 3500, 4200, 5800],
      },
      Q: {
        labels: ['Month 1', 'Month 2', 'Month 3'],
        data: [8000, 12000, 15000],
      },
      Y: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [25000, 35000, 45000, 60000],
      },
    };

    return dataMap[activeTimeframe];
  }, [activeTimeframe]);

  // Bar chart data for cashflow timeline
  const barChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Cashflow',
        data: chartData.data,
        backgroundColor: 'rgba(212, 175, 55, 0.8)', // Golden color with transparency
        borderColor: '#D4AF37',
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(212, 175, 55, 1)',
        hoverBorderColor: '#B8860B',
        hoverBorderWidth: 3,
      },
    ],
  };


  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
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
        displayColors: false,
        callbacks: {
          title: function(context: any) {
            return `${context[0].label}`;
          },
          label: function(context: any) {
            const value = context.parsed.y;
            if (value >= 1000) {
              return `Cashflow: $${(value / 1000).toFixed(1)}k`;
            }
            return `Cashflow: $${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#F3F4F6',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
          callback: function(value: any) {
            if (value >= 1000) {
              return '$' + (value / 1000) + 'k';
            }
            return '$' + value;
          },
        },
      },
    },
  };


  // Pie chart data for distribution
  const pieChartData = {
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

  const pieChartOptions = {
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
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Charts & Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cashflow Timeline */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-semibold text-secondary-black">Cashflow Timeline</h3>
            <div className="flex items-center gap-2">
              {/* Timeframe Toggle */}
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
          </div>
          <div className="h-64">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Distribution % */}
        <div>
          <h3 className="text-md font-semibold text-secondary-black mb-4">Distribution %</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex justify-center">
            <div className="flex gap-6">
              {pieChartData.labels.map((label, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full border border-white" 
                    style={{ backgroundColor: pieChartData.datasets[0].backgroundColor[index] }}
                  />
                  <span className="text-sm text-gray-600 font-medium">{label}: {pieChartData.datasets[0].data[index]}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
