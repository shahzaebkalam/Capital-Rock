import MainLayout from '@/app/layouts/MainLayout';
import PortfolioSummaryCards from '@/components/dashboard/portfolio-summary/PortfolioSummaryCards';
import AssetCards from '@/components/dashboard/asset-cards/AssetCards';
import ChartsSection from '@/components/dashboard/charts/ChartsSection';
import RecentActivityTable from '@/components/dashboard/recent-activity/RecentActivityTable';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-black mb-8">Dashboard</h1>
        
        {/* Portfolio Summary Cards */}
        <div className="mb-8">
          <PortfolioSummaryCards />
        </div>

        {/* Asset Cards */}
        <div className="mb-8">
          <AssetCards />
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <ChartsSection />
        </div>

        {/* Recent Activity Table */}
        <div className="mb-8">
          <RecentActivityTable />
        </div>
      </div>
    </MainLayout>
  );
}
