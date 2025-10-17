'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartCardProps {
  title?: string;
  labels: string[];
  values: number[];
  colors?: string[];
  yMax?: number;
  yFormatter?: (value: number) => string;
  headerRight?: React.ReactNode;
}

export default function BarChartCard({
  title,
  labels,
  values,
  colors = ['rgba(181, 136, 51, 0.8)'],
  yMax,
  yFormatter,
  headerRight,
}: BarChartCardProps) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.length === 1 ? Array(values.length).fill(colors[0]) : colors,
        borderColor: colors.length === 1 ? Array(values.length).fill(colors[0]) : colors,
        borderWidth: 0,
        borderRadius: 0,
        borderSkipped: false,
        categoryPercentage: 0.6,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (ctx: any) => {
            const raw = ctx.raw as number;
            return yFormatter ? yFormatter(raw) : `${raw}%`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
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
        max: yMax ?? 20,
        ticks: {
          color: '#666',
          font: {
            size: 12,
          },
          stepSize: 5,
          callback: (value: any) => (yFormatter ? yFormatter(value) : `${value}%`),
        },
        grid: {
          color: 'rgba(0,0,0,0.08)',
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    layout: {
      padding: { top: 8, right: 8, bottom: 8, left: 8 },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
        {headerRight}
      </div>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
