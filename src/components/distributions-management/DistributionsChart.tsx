'use client';

import LegendAreaChartCard from '@/components/dashboard-ui/LegendAreaChartCard';

export default function DistributionsChart() {
  const labels = ['31 Dec', '28 Feb', '30 Apr', '30 Jun', '31 Aug', '31 Oct', '31 Dec', '28 Feb', '30 Apr', '30 Jun'];
  const values = [500, 4200, 3000, 5200, 12000, 6000, 8200, 4500, 7000, 8600];

  return (
    <div className="bg-white rounded-lg border border-stroke p-4 sm:p-6">
      <LegendAreaChartCard
        title="Total Distributed Over Time"
        labels={labels}
        values={values}
        datasetLabel="Total Distributions"
        highlightIndex={4}
        yMax={20000}
        yStep={4500}
        yFormatter={(v) => `${Math.round(v)}`}
      />
    </div>
  );
}


