'use client';

import { ImageIcon } from '@/lib/icons';
import React, { useState } from 'react';

interface ActivityRow {
  id: number;
  assetName: string;
  date: string;
  type: string;
  amount: string;
  status: 'Completed' | 'Settled';
}

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium border";
  const statusClasses = {
    'Completed': 'bg-success-100 text-success-600 border-success-300',
    'Settled': 'bg-success-100 text-success-600 border-success-300',
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status as keyof typeof statusClasses]}`}>
      {status}
    </span>
  );
};

export default function RecentActivityTable() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  
  const activities: ActivityRow[] = [
    {
      id: 1,
      assetName: 'ChainLink',
      date: '08 Oct 2025',
      type: 'Subscription',
      amount: '$2,000',
      status: 'Completed',
    },
    {
      id: 2,
      assetName: 'Ondo Finance',
      date: '08 Oct 2025',
      type: 'Dividend',
      amount: '$45',
      status: 'Settled',
    },
    {
      id: 3,
      assetName: 'RealEstate A',
      date: '08 Oct 2025',
      type: 'Subscription',
      amount: '$2,000',
      status: 'Completed',
    },
    {
      id: 4,
      assetName: 'RealIT',
      date: '08 Oct 2025',
      type: 'Dividend',
      amount: '$45',
      status: 'Settled',
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(activities.map(activity => activity.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id));
    }
  };

  const isAllSelected = selectedItems.length === activities.length;
  const isIndeterminate = selectedItems.length > 0 && selectedItems.length < activities.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-stroke">
      <div className="px-6 py-4 border-b border-stroke">
        <h3 className="text-lg font-semibold text-neutral">Recent Activity Table</h3>
      </div>
      <div className="overflow-x-auto rounded-lg px-6">
        <table className="w-full">
          <thead className="bg-gray-200 rounded-t-lg">
            <tr>
              <th className="w-12 px-2 py-3 text-left">
                <input 
                  type="checkbox" 
                  className="rounded border-stroke" 
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="pl-2 pr-6 py-3 text-left text-sm font-medium text-black tracking-wider">
                Asset Name
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-black tracking-wider">
                Date
              </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-black tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-black tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-black tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-stroke">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-background-light">
                <td className="w-12 px-2 py-4 whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    className="rounded border-stroke" 
                    checked={selectedItems.includes(activity.id)}
                    onChange={(e) => handleSelectItem(activity.id, e.target.checked)}
                  />
                </td>
                <td className="pl-2 pr-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <ImageIcon />
                    </div>
                    <span className="text-sm font-medium text-neutral">{activity.assetName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral text-center">
                  {activity.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral text-center">
                  {activity.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral text-center">
                  {activity.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <StatusBadge status={activity.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
