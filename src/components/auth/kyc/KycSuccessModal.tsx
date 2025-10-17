'use client';

import React from 'react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { XIcon } from '@/lib/icons';

interface KycSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
}

export default function KycSuccessModal({ isOpen, onClose, onGoToDashboard }: KycSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50 h-screen overflow-hidden">
      {/* Close */}
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
          <XIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className="mb-6">
          <Logo width={120} height={120} />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-5xl font-display text-secondary-black mb-8 text-center">
          Verification status
        </h2>

        {/* Status list */}
        <div className="w-full max-w-sm mx-auto mb-8">
          <p className="text-secondary-black mb-4 text-base font-normal">Review the status of your account verification below</p>
          <ul className="space-y-3">
            {['KYC', 'Wallet', 'Compliance Level'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-800">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-base font-normal">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="w-full max-w-sm">
          <Button onClick={onGoToDashboard} variant="primary" className="w-full">
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}


