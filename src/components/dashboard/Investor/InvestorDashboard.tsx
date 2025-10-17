'use client';

import PortfolioSummaryCards from '@/components/dashboard-ui/PortfolioSummaryCards';
import AssetCards from '@/components/dashboard-ui/AssetCards';
import ChartsSection from '@/components/dashboard/Investor/ChartsSection';
import RecentActivityTable from '@/components/dashboard/Investor/RecentActivityTable';

export default function InvestorDashboard() {
  return (
    <>
      <div className="mb-8">
        <PortfolioSummaryCards
          title="Portfolio Summary Card"
          items={[
            { title: 'Portfolio Value', value: '$300.00', change: '+10%', isPositive: true },
            { title: 'IRR', value: '$300.00', change: '-2%', isPositive: false },
            { title: 'ROI', value: '$30.00', change: '+10%', isPositive: true },
            { title: 'Active Investments', value: '$250.00', change: '+10%', isPositive: true },
            { title: 'Risk Score', value: '80.00%', change: '-2%', isPositive: false },
          ]}
        />
      </div>

      <div className="mb-8">
        <AssetCards
          title="Asset Cards"
          items={[
            { title: 'RWA Asset A', value: '$120.00', change: '+10%', isPositive: true },
            { title: 'RWA Asset C', value: '$120.00', change: '+10%', isPositive: true },
            { title: 'RWA Asset D', value: '$120.00', change: '+10%', isPositive: true },
            { title: 'RWA Asset B', value: '$120.00', change: '+10%', isPositive: true },
          ]}
        />
      </div>

      <div className="mb-8">
        <ChartsSection />
      </div>

      <div className="mb-8">
        <RecentActivityTable />
      </div>
    </>
  );
}


