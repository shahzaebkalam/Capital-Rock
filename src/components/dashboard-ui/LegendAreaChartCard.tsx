'use client';

import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, Plugin } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export interface LegendAreaChartCardProps {
  title?: string;
  labels: string[];
  values: number[];
  datasetLabel?: string;
  highlightIndex?: number;
  yMax?: number;
  yStep?: number;
  yFormatter?: (v: number) => string;
}

export default function LegendAreaChartCard({
  title = 'Area Chart',
  labels,
  values,
  datasetLabel = 'Series',
  highlightIndex = -1,
  yMax,
  yStep,
  yFormatter = (v) => `${v}`,
}: LegendAreaChartCardProps) {
  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: datasetLabel,
        data: values,
        borderColor: '#B58833',
        backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D } }) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(181, 136, 51, 0.25)');
          gradient.addColorStop(1, 'rgba(181, 136, 51, 0.02)');
          return gradient;
        },
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: (ctx: { dataIndex: number }) => (ctx.dataIndex === highlightIndex ? '#FFFFFF' : '#B58833'),
        pointBorderColor: '#B58833',
        pointBorderWidth: (ctx: { dataIndex: number }) => (ctx.dataIndex === highlightIndex ? 2 : 0),
        pointRadius: (ctx: { dataIndex: number }) => (ctx.dataIndex === highlightIndex ? 4 : 0),
        pointHoverRadius: (ctx: { dataIndex: number }) => (ctx.dataIndex === highlightIndex ? 6 : 0),
      },
    ],
  }), [labels, values, highlightIndex, datasetLabel]);

  const selectedIndexLinePlugin: Plugin<'line'> = useMemo(() => ({
    id: 'selectedIndexLineLegend',
    afterDatasetsDraw(chart) {
      if (highlightIndex < 0) return;
      const { ctx, chartArea, scales } = chart;
      const xScale = scales.x;
      const x = xScale.getPixelForValue(highlightIndex);
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
  }), [highlightIndex]);

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 border border-stroke">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="h-64">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true, position: 'top', align: 'start', labels: { usePointStyle: true, pointStyle: 'circle', color: '#111', boxWidth: 6 } },
              tooltip: { enabled: true, backgroundColor: 'rgba(0,0,0,0.8)', titleColor: '#FFFFFF', bodyColor: '#FFFFFF', callbacks: { label: (ctx: { parsed: { y: number | null } }) => yFormatter(ctx.parsed.y || 0) } },
            },
            scales: {
              x: { grid: { display: true, color: '#eeeeee' }, ticks: { color: '#666', font: { size: 12 } }, border: { display: false } },
              y: { beginAtZero: true, max: yMax, ticks: { color: '#666', font: { size: 12 }, stepSize: yStep, callback: (v: string | number) => yFormatter(Number(v)) }, grid: { display: true, color: '#eeeeee' }, border: { display: false } },
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


