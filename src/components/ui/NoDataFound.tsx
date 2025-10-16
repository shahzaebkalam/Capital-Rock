'use client';

import React from 'react';

interface NoDataFoundProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function NoDataFound({ 
  title = "No data found", 
  description = "There are no items to display at the moment.",
  icon
}: NoDataFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon && (
        <div className="mb-4 text-gray-400">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">{description}</p>
    </div>
  );
}
