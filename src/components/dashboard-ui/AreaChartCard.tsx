'use client';

import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, Plugin } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export interface AreaChartCardProps {
  title?: string;
  labels: string[];
  values: number[];
  highlightLabel?: string;
  yMax?: number;
  yFormatter?: (v: number) => string;
  headerRight?: React.ReactNode;
}

export default function AreaChartCard({
  title = 'Area Chart',
  labels,
  values,
  highlightLabel,
  yMax,
  yFormatter = (v) => `$${v}k`,
  headerRight,
}: AreaChartCardProps) {
  const selectedIndex = useMemo(() => (highlightLabel ? labels.indexOf(highlightLabel) : -1), [labels, highlightLabel]);

  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: title,
        data: values,
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
        pointBackgroundColor: (ctx: any) => (ctx.dataIndex === selectedIndex ? '#FFFFFF' : '#B58833'),
        pointBorderColor: '#B58833',
        pointBorderWidth: (ctx: any) => (ctx.dataIndex === selectedIndex ? 2 : 0),
        pointRadius: (ctx: any) => (ctx.dataIndex === selectedIndex ? 5 : 0),
        pointHoverRadius: (ctx: any) => (ctx.dataIndex === selectedIndex ? 7 : 0),
      },
    ],
  }), [labels, values, selectedIndex, title]);

  const selectedIndexLinePlugin: Plugin<'line'> = useMemo(() => ({
    id: 'selectedIndexLine',
    afterDatasetsDraw(chart) {
      if (selectedIndex < 0) return;
      const { ctx, chartArea, scales } = chart;
      const xScale = scales.x as any;
      const x = xScale.getPixelForValue(selectedIndex);
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
  }), [selectedIndex]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {headerRight}
      </div>
      <div className="h-64">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: true, backgroundColor: 'rgba(0,0,0,0.8)', titleColor: '#FFFFFF', bodyColor: '#FFFFFF', callbacks: { label: (ctx: any) => yFormatter(ctx.parsed.y) } } },
            scales: {
              x: { grid: { display: true, color: 'rgba(0,0,0,0.1)' }, ticks: { color: '#666', font: { size: 12 } }, border: { display: false } },
              y: { beginAtZero: true, max: yMax, ticks: { color: '#666', font: { size: 12 }, callback: (v: any) => yFormatter(Number(v)) }, grid: { display: true, color: 'rgba(0,0,0,0.1)' }, border: { display: false } },
            },
            elements: { point: { borderWidth: 2 } },
            interaction: { mode: 'index', intersect: false },
          }}
          plugins={[selectedIndexLinePlugin]}
        />
      </div>
    </div>
  );
}


