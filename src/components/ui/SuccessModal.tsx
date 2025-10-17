'use client';

import React, { useEffect } from 'react';
import Logo from './Logo';
import { XIcon } from '@/lib/icons';
import Button from './Button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  onButtonClick: () => void;
  // Optional second button props
  secondaryButtonText?: string;
  onSecondaryButtonClick?: () => void;
  secondaryButtonIcon?: React.ReactNode;
  // Optional message content
  message?: string;
  details?: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  buttonText,
  onButtonClick,
  secondaryButtonText,
  onSecondaryButtonClick,
  secondaryButtonIcon,
  message,
  details
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
          <Logo width={120} height={120} />
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-5xl font-display text-secondary-black mb-4">
            {title}
          </h2>
          {message && (
            <p className="text-lg text-gray-800 mb-2 font-sans">
              {message}
            </p>
          )}
          {details && (
            <p className="text-lg text-gray-800 font-sans">
              {details}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col space-y-4 ${(message || details) ? 'w-full max-w-2xl' : 'items-center'}`}>
          {/* Primary Button */}
          <Button
            onClick={onButtonClick}
            variant="primary"
            size="md"
            className={(message || details) ? 'w-full' : ''}
          >
            {buttonText}
          </Button>
          
          {/* Secondary Button (if provided) */}
          {secondaryButtonText && onSecondaryButtonClick && (
            <Button
              onClick={onSecondaryButtonClick}
              variant="secondary"
              size="md"
              className={(message || details) ? 'w-full' : ''}
            >
              {secondaryButtonText} {secondaryButtonIcon && <span className="ml-2">{secondaryButtonIcon}</span>}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
