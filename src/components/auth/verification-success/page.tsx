'use client';

import React from 'react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const VerificationSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-1 flex flex-col items-center">
        {/* Close (top-right) */}
        <div className="w-full flex justify-end pt-4">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">×</Link>
        </div>

        {/* Logo */}
        <div className="w-full text-center mb-6 sm:mb-8 mt-6 sm:mt-8">
          <Logo className="mb-4 sm:mb-6" />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-5xl font-display text-gray-900">Verification successful</h1>
        </div>

        {/* Button */}
        <div className="max-w-sm mx-auto w-full">
          <Link href="/dashboard">
            <Button className="w-full">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccessPage;


