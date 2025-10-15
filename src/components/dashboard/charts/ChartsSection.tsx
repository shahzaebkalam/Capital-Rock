'use client';

import React, { useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const pieData = {
  labels: ['Asset 1', 'Asset 2', 'Asset 3'],
  datasets: [
    {
      data: [50, 35, 15],
      backgroundColor: ['#B58833', '#D2B48C', '#F0E7D6'],
      borderWidth: 0,
    },
  ],
};

const cashflowData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Cashflow',
      data: [0, 1.8, 1.4, 1.4, 2.2, 2.2, 4.0],
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

const timeframes = ['W', 'M', 'Q', 'Y'];

export default function ChartsSection() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('W');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Asset Allocation Pie Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation %</h3>
        <div className="flex items-center justify-center">
          <div className="w-64 h-64">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                rotation: 90,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <div className="flex gap-6">
            {pieData.labels.map((label, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: pieData.datasets[0].backgroundColor[index] }}
                />
                <span className="text-sm text-gray-600">{label}: {pieData.datasets[0].data[index]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cashflow Over Time Area Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Cashflow Over Time</h3>
          <div className="flex gap-1">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-1 text-sm font-medium rounded ${
                  selectedTimeframe === timeframe
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <Line
            data={cashflowData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: function(context) {
                      return `$${context.parsed.y}k`;
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
                  max: 4,
                  ticks: {
                    stepSize: 1,
                    callback: function(value) {
                      return `$${value}k`;
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
            }}
          />
        </div>
      </div>
    </div>
  );
}
