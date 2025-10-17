'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartCardProps {
  title?: string;
  labels: string[];
  values: number[];
  colors?: string[];
  buttonText?: string;
}

export default function PieChartCard({
  title = 'Pie Chart',
  labels,
  values,
  colors = [
    'rgba(212, 175, 55, 0.8)',
    'rgba(181, 136, 51, 0.8)',
    'rgba(210, 180, 140, 0.8)'
  ],
  buttonText = 'View Details',
}: PieChartCardProps) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderColor: '#FFFFFF',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button className="text-sm font-semibold underline text-primary hover:text-primary-dark transition-colors">
          {buttonText}
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-64 h-64">
          <Pie
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              elements: { arc: { borderWidth: 2, borderColor: '#FFFFFF' } },
            }}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="flex gap-6">
          {labels.map((label, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full border border-white"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm text-gray-600 font-medium">{label}: {values[index]}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


