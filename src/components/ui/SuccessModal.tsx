'use client';

import React, { useEffect } from 'react';
import Logo from './Logo';
import { XIcon } from '@/lib/icons';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  buttonText,
  onButtonClick
}: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50 h-screen overflow-hidden">
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 z-10"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo width={60} height={60} />
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-5xl font-display text-gray-900 mb-4">
            {title}
          </h2>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={onButtonClick}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-shade transition-colors"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
