'use client';

import React, { useEffect } from 'react';
import Logo from './Logo';
import Button from './Button';
import Checkbox from './Checkbox';
import { XIcon } from '@/lib/icons';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  onButtonClick: () => void;
  description?: string;
  items?: string[];
  checkboxes?: { label: string; checked: boolean; onChange: (checked: boolean) => void }[];
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  buttonText,
  onButtonClick,
  description,
  items,
  checkboxes
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
      {/* Close Button (absolute like other pages) */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
        aria-label="Close"
      >
        <XIcon className="w-5 h-5" />
      </button>

      {/* Main Content - positioned like other auth pages */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 pt-6 sm:pt-10">
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-8 mt-2">
          <Logo width={60} height={60} />
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-5xl font-display text-gray-900 mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-gray-700 font-sans max-w-sm mx-auto">
              {description}
            </p>
          )}
          {checkboxes && checkboxes.length > 0 && (
            <div className="mt-4 max-w-sm mx-auto text-left space-y-3">
              {checkboxes.map((item, idx) => (
                <Checkbox
                  key={idx}
                  checked={item.checked}
                  onChange={(e) => item.onChange(e.target.checked)}
                  label={item.label}
                />
              ))}
            </div>
          )}
          {!checkboxes && items && items.length > 0 && (
            <div className="mt-4 max-w-sm mx-auto text-left space-y-3">
              {items.map((label, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-800">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="font-sans text-sm sm:text-base">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-center w-full px-4">
          <Button onClick={onButtonClick} className="w-full max-w-sm">
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
