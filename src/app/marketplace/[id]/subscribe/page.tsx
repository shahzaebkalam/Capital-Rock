import SubscriptionForm from '@/components/marketplace/subscription/SubscriptionForm';
import MainLayout from '@/app/layouts/MainLayout';

interface SubscriptionPageProps {
  params: {
    id: string;
  };
}

export default function SubscriptionPage({ params }: SubscriptionPageProps) {
  return (
    <MainLayout>
      <SubscriptionForm projectId={params.id} />
    </MainLayout>
  );
}
