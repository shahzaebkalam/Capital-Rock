'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import AuthLayout from '@/app/layouts/AuthLayout';
import AccountTypeStep from './AccountTypeStep';
import PersonalInfoStep from './PersonalInfoStep';
import ConfirmationStep from './ConfirmationStep';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');

  useEffect(() => {
    // Redirect to account-type if no step parameter or invalid step
    if (!step || !['account-type', 'personal-info', 'confirmation'].includes(step)) {
      router.replace('/register?step=account-type');
    }
  }, [step, router]);

  const renderStep = () => {
    // Show loading or redirect if step is not set yet
    if (!step) {
      return (
        <div className="w-full max-w-md mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      );
    }

    switch (step) {
      case 'account-type':
        return <AccountTypeStep />;
      case 'personal-info':
        return <PersonalInfoStep />;
      case 'confirmation':
        return <ConfirmationStep />;
      default:
        return <AccountTypeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-1 flex flex-col justify-center">
        {renderStep()}
      </div>
      
      {/* Privacy Policy at the very bottom */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center pb-4">
        <p className="text-sm w-2/5 mx-auto text-gray-500 font-sans">
          By logging In, you acknowledge that you have read and agree to the company{' '}
          <a href="#" className="text-gray-700 underline hover:text-gray-900 font-bold">
            Privacy policy.
          </a>
        </p>
      </div>
    </div>
  );
}
