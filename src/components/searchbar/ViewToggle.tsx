'use client';

import React from 'react';
import { GridIcon, ListIcon } from '@/lib/icons';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  className?: string;
}

export default function ViewToggle({ 
  viewMode, 
  onViewModeChange, 
  className = ""
}: ViewToggleProps) {
  return (
    <div className={`flex items-center bg-white rounded-lg border border-gray-200 p-0.5 ${className}`}>
      <button
        onClick={() => onViewModeChange('grid')}
        className={`p-1.5 rounded-md transition-colors ${
          viewMode === 'grid' 
            ? 'bg-black text-white' 
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <GridIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={`p-1.5 rounded-md transition-colors ${
          viewMode === 'list' 
            ? 'bg-black text-white' 
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <ListIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
