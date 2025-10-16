'use client';

import React from 'react';
import { ResetIcon } from '@/lib/icons';

interface ResetButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function ResetButton({ 
  onClick, 
  className = ""
}: ResetButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full text-xs
        font-normal text-secondary-black transition-colors cursor-pointer
        w-auto flex-shrink-0 self-start ${className}`}
    >
      <ResetIcon />
      Reset
    </button>
  );
}
