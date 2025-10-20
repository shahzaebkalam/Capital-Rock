import SubscriptionForm from '@/components/marketplace/subscription/SubscriptionForm';
import MainLayout from '@/app/layouts/MainLayout';
import { Suspense } from 'react';

interface SubscriptionPageProps {
  params: {
    id: string;
  };
}

export default function SubscriptionPage({ params }: SubscriptionPageProps) {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <SubscriptionForm projectId={params.id} />
      </Suspense>
    </MainLayout>
  );
}
