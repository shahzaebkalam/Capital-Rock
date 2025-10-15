'use client';

import React from 'react';
import { DownArrowIcon } from '@/lib/icons';

interface Option {
  value: string;
  label: string;
}

interface CompactSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

export default function CompactSelect({
  label,
  value,
  onChange,
  options
}: CompactSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="
          appearance-none bg-gray-100 rounded-full px-2.5 py-1 pr-6 text-sm font-medium
          focus:outline-none
          transition-colors duration-200 text-black cursor-pointer
        "
      >
        <option value="" className="text-black">
          {label}
        </option>
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="text-black"
          >
            {option.label}
          </option>
        ))}
      </select>
      
      <div className="absolute inset-y-0 right-0 flex items-center pr-1.5 pointer-events-none">
        <DownArrowIcon className="w-3 h-3 text-black" />
      </div>
    </div>
  );
}
