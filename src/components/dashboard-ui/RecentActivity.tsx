'use client';

import React from 'react';

interface RecentActivityItem {
  title: string;
  desc: string;
  time: string;
}

interface RecentActivityProps {
  title?: string;
  items: RecentActivityItem[];
}

export default function RecentActivity({ 
  title = "Recent Activity Table", 
  items 
}: RecentActivityProps) {

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 border border-stroke">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">{title}</h2>
      <div className="divide-y divide-gray-200 border border-stroke rounded-lg px-2 sm:px-4">
        {items.map((item, idx) => (
          <div key={idx} className="py-4 flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-black">{item.title}</p>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


