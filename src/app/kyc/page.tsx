import KycPage from '@/components/auth/kyc/KycPage';
import { Suspense } from 'react';

export default function Kyc() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KycPage />
    </Suspense>
  );
}


