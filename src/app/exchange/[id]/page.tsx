import AssetTradingPage from '@/components/exchange/AssetTradingPage';
import MainLayout from '@/app/layouts/MainLayout';

interface AssetPageProps {
  params: {
    id: string;
  };
}

export default function AssetPage({ params }: AssetPageProps) {
  return (
    <MainLayout>
      <AssetTradingPage assetId={params.id} />
    </MainLayout>
  );
}
