'use client';

import React from 'react';
import { SearchIcon } from '@/lib/icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  value, 
  onChange, 
  className = "w-64"
}: SearchBarProps) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-transparent ${className}`}
      />
    </div>
  );
}
