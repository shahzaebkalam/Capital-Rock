'use client';

import PortfolioSummaryCards from '@/components/dashboard-ui/PortfolioSummaryCards';
import InstitutionAnalytics from './InstitutionAnalytics';
import RecentActivity from '@/components/dashboard-ui/RecentActivity';
import { BroadcastIcon } from '@/lib/icons';
import Button from '@/components/ui/Button';

export default function InstitutionDashboard() {
  return (
    <>
      {/* Header with buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-8">
        <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
          <Button variant="primary" className="w-full sm:w-auto justify-center bg-primary text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
              <BroadcastIcon />
              <span>Broadcast Announcement</span>
          </Button>
          <Button variant="primary" className="w-full sm:w-auto justify-center bg-primary text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
            +
            <span>Create Admin User</span>
          </Button>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="mb-8">
        <PortfolioSummaryCards
          title="Portfolio Summary Card"
          items={[
            { title: 'Total Assets', value: '245', change: '+10%', isPositive: true },
            { title: 'Active Offerings', value: '56', change: '-2%', isPositive: false },
            { title: 'Total Raised', value: '$8,750,000', change: '+10%', isPositive: true },
            { title: 'Total Investors', value: '12,430', change: '+10%', isPositive: true },
            { title: 'Verified Issuers', value: '2,320', change: '-2%', isPositive: false },
          ]}
        />
      </div>

      {/* Analytics / Graphs Section */}
      <div className="mb-8 bg-white rounded-lg p-4 sm:p-6 border border-stroke">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics / Graphs</h2>
        <InstitutionAnalytics />
      </div>

      {/* Recent Activities */}
      <div className="mb-8">
        <RecentActivity 
          title="Recent Activities"
          items={[
            { title: 'Subscription Confirmation', desc: 'John Doe invested $25,000 in Alpha Fund.', time: 'Today' },
            { title: 'Alert', desc: 'Beta Real Estate reached 80% of funding goal.', time: 'Yesterday' },
            { title: 'Update', desc: 'PPM for Delta Fund updated.', time: '10 Oct, 2025 | 02:40 AM' },
          ]}
        />
      </div>
    </>
  );
}
