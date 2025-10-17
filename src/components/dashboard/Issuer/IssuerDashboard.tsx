'use client';

import PortfolioSummaryCards from '@/components/dashboard-ui/PortfolioSummaryCards';
import AssetCards from '@/components/dashboard-ui/AssetCards';
import RecentActivity from '@/components/dashboard-ui/RecentActivity';
import IssuerTopAssetsAndCharts from './IssuerTopAssetsAndCharts';

export default function IssuerDashboard() {
  return (
    <>
      <div className="mb-8">
        <PortfolioSummaryCards
          title="Portfolio Summary Card"
          items={[
            { title: 'Total Assets Issued', value: '12 Assets' },
            { title: 'Active Offerings', value: '4 Live' },
            { title: 'Total Raised', value: '$8,750,000', change: '+10%', isPositive: true },
            { title: 'Total Investors', value: '1,245', change: '+10%', isPositive: true },
            { title: 'Pending Approvals', value: '2 Pending', change: '-2%', isPositive: false },
          ]}
        />
      </div>

      <div className="mb-8">
        <AssetCards
          title="Top Performing Asset & Charts"
          items={[
            { title: 'RWA Asset A', value: '$32,000', change: '+10%', isPositive: true },
            { title: 'RWA Asset C', value: '$12,000', change: '+10%', isPositive: true },
            { title: 'RWA Asset D', value: '$12,000', change: '+10%', isPositive: true },
            { title: 'RWA Asset B', value: '$20,000', change: '+10%', isPositive: true },
          ]}
        />
      </div>

      <div className="mb-8">
        <IssuerTopAssetsAndCharts />
      </div>

      <div className="mb-8">
        <RecentActivity 
          title="Recent Activity Table"
          items={[
            { title: 'Investment Confirmation', desc: 'You invested $5,000 in RWA Asset A.', time: 'Today' },
            { title: 'Investment Confirmation', desc: 'You invested $5,000 in RWA Asset C.', time: 'Today' },
            { title: 'Investment Confirmation', desc: 'You invested $5,000 in RWA Asset D.', time: 'Today' },
            { title: 'Investment Confirmation', desc: 'You invested $5,000 in RWA Asset B.', time: 'Today' },
          ]}
        />
      </div>
    </>
  );
}


