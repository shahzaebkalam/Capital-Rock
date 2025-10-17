'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SuccessModal from '@/components/ui/SuccessModal';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

const TwoFASetupPage: React.FC = () => {
  const [code, setCode] = useState('');
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleVerifySetup = () => {
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-1 flex flex-col items-start">
        <div className="w-full text-center mb-6 sm:mb-8 mt-8 sm:mt-12">
          <Logo className="mb-4 sm:mb-6" />
        </div>

        <div className="w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-6">
              2FA Two factor authentication setup
            </h1>
          </div>

          <div className="max-w-sm mx-auto w-full">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
              <h2 className="text-sm font-medium text-black-700 mb-1">Scan code or Enter Key</h2>
              <p className="text-xs text-gray-500 mb-6">
                Use your authenticator app to scan the QR code or
                manually enter the key.
              </p>

              <div className="mx-auto mb-6 inline-block rounded bg-white p-2">
                <div className="h-40 w-40 bg-white border border-gray-300 p-1">
                  <div className="w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-[13px] text-primary mb-1">Manual Entry Key</p>
                <p className="text-[13px] text-gray-600 break-all">
                  45DA JSHJ 1AS2 NWWW 22DD 45DA JSHJ 1AS2
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="6 Digital Code"
                type="password"
              />
            </div>

            <div className="mt-4">
              <Button className="w-full" onClick={handleVerifySetup}>Verify Setup</Button>
            </div>

            <div className="text-center mt-4">
              <button className="text-primary hover:text-primary-shade-700 underline font-sans" onClick={() => history.back()}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center pb-4">
        <p className="text-sm pt-8 max-w-sm mx-auto text-gray-600 font-sans">
          By logging In, you acknowledge that you have read and agree to the
          company{' '}
          <Link href="/privacy-policy" className="text-black underline">
            Privacy policy.
          </Link>
        </p>
      </div>

      {/* Success modal after verifying 2FA setup */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Verification successful"
        buttonText="Go to Dashboard"
        onButtonClick={() => {
          setShowSuccess(false);
          router.push('/dashboard');
        }}
      />
    </div>
  );
};

export default TwoFASetupPage;


