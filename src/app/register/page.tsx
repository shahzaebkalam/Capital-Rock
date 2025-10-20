import RegisterPage from '@/components/auth/register/RegisterPage';
import { Suspense } from 'react';

export default function Register() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPage />
    </Suspense>
  );
}
