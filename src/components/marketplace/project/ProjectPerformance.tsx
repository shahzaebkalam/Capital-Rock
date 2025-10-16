'use client';

import React, { useState } from 'react';
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
} from 'chart.js';

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
  
  const roiData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'ROI',
        data: [0, 1.8, 2.1, 3.8],
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
  
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-black font-sans">Performance Snapshot</h2>
      
      <div className="space-y-4">
        <div className="flex flex-col w-full justify-between gap-4 border border-stroke rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-black font-sans">ROI</h3>
          <div className="flex gap-1">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 text-sm font-medium rounded font-sans ${
                  selectedPeriod === period
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        
        {/* Chart Area */}
        <div className="h-64">
          <Line
            data={roiData}
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
        
        {/* Additional metrics */}
        <div className="flex flex-col w-full justify-between gap-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-secondary-black text-base font-sans">Average Holding Period:</span>
            <span className="ml-2 font-medium text-gray-800 font-sans">8 Months</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-secondary-black text-base font-sans">Historical yield:</span>
            <span className="ml-2 font-medium text-gray-800 font-sans">+12.1%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
