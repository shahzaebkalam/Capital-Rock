'use client';

import React, { useState } from 'react';
import { OceanAssetIcon, SolarAssetIcon } from '@/lib/icons';
import NoDataFound from '@/components/ui/NoDataFound';
import Pagination from '@/components/ui/Pagination';

interface CashflowTransaction {
  id: number;
  assetName: string;
  iconType: 'ocean' | 'solar';
  issuer: string;
  type: 'Dividend' | 'Coupon' | 'Interest';
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

// Mock data for cashflow transactions
const mockCashflowTransactions: CashflowTransaction[] = [
  {
    id: 1,
    assetName: 'OceanView Apartments',
    iconType: 'ocean',
    issuer: 'PrimeRealty Group',
    type: 'Dividend',
    amount: 25.00,
    date: '12 Oct 2025',
    status: 'Completed'
  },
  {
    id: 2,
    assetName: 'GreenSolar Energy Fund',
    iconType: 'solar',
    issuer: 'Ecoinvest Ltd',
    type: 'Coupon',
    amount: 50.00,
    date: '20 Oct 2025',
    status: 'Completed'
  },
  {
    id: 3,
    assetName: 'OceanView Apartments',
    iconType: 'ocean',
    issuer: 'PrimeRealty Group',
    type: 'Dividend',
    amount: 25.00,
    date: '12 Oct 2025',
    status: 'Completed'
  },
  {
    id: 4,
    assetName: 'GreenSolar Energy Fund',
    iconType: 'solar',
    issuer: 'Ecoinvest Ltd',
    type: 'Coupon',
    amount: 50.00,
    date: '20 Oct 2025',
    status: 'Completed'
  },
  {
    id: 5,
    assetName: 'OceanView Apartments',
    iconType: 'ocean',
    issuer: 'PrimeRealty Group',
    type: 'Dividend',
    amount: 25.00,
    date: '12 Oct 2025',
    status: 'Completed'
  },
  {
    id: 6,
    assetName: 'GreenSolar Energy Fund',
    iconType: 'solar',
    issuer: 'Ecoinvest Ltd',
    type: 'Coupon',
    amount: 50.00,
    date: '20 Oct 2025',
    status: 'Completed'
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
  const statusClasses = {
    'Completed': 'bg-success-100 text-success-600 border border-success-300',
    'Pending': 'bg-warning-100 text-warning-600 border border-warning-300',
    'Failed': 'bg-error-100 text-error-600 border border-error-300',
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status as keyof typeof statusClasses]}`}>
      {status}
    </span>
  );
};

interface CashflowTableProps {
  searchTerm: string;
  viewMode: 'grid' | 'list';
  currentPage: number;
  onCurrentPageChange: (page: number) => void;
  onTotalPagesChange: (pages: number) => void;
}

export default function CashflowTable({ 
  searchTerm, 
  viewMode, 
  currentPage, 
  onCurrentPageChange, 
  onTotalPagesChange 
}: CashflowTableProps) {
  const [selectedTransactions, setSelectedTransactions] = useState<Set<number>>(new Set());

  const getProjectIcon = (iconType: 'ocean' | 'solar') => {
    const iconClass = "w-6 h-6 text-white";
    if (iconType === 'ocean') {
      return <OceanAssetIcon className={iconClass} />;
    } else if (iconType === 'solar') {
      return <SolarAssetIcon className={iconClass} />;
    }
    return <OceanAssetIcon className={iconClass} />;
  };

  const getIconBackgroundColor = (iconType: 'ocean' | 'solar') => {
    if (iconType === 'ocean') {
      return 'bg-blue-500';
    } else if (iconType === 'solar') {
      return 'bg-green-500';
    }
    return 'bg-blue-500';
  };

  // Filter transactions based on search term
  const filteredTransactions = mockCashflowTransactions.filter(transaction =>
    transaction.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // Update total pages in parent component
  React.useEffect(() => {
    onTotalPagesChange(totalPages);
  }, [totalPages, onTotalPagesChange]);

  const handleSelectAll = (select: boolean) => {
    if (select) {
      setSelectedTransactions(new Set(paginatedTransactions.map(transaction => transaction.id)));
    } else {
      setSelectedTransactions(new Set());
    }
  };

  const handleSelectTransaction = (transactionId: number) => {
    setSelectedTransactions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(transactionId)) {
        newSet.delete(transactionId);
      } else {
        newSet.add(transactionId);
      }
      return newSet;
    });
  };

  const allSelected = paginatedTransactions.length > 0 && paginatedTransactions.every(transaction => selectedTransactions.has(transaction.id));
  const someSelected = paginatedTransactions.some(transaction => selectedTransactions.has(transaction.id));

  if (filteredTransactions.length === 0) {
    return <NoDataFound title="No cashflows found" description="No cashflow transactions match your search criteria." />;
  }

  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">List</h2>
        </div>
        
        <div className="space-y-4 p-6">
          {/* Grid Header with Select All */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(input) => {
                  if (input) input.indeterminate = someSelected && !allSelected;
                }}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-stroke"
              />
              <span className="text-sm font-medium text-gray-700">
                {selectedTransactions.size > 0 ? `${selectedTransactions.size} selected` : 'Select all'}
              </span>
            </div>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.has(transaction.id)}
                      onChange={() => handleSelectTransaction(transaction.id)}
                      className="rounded border-stroke"
                    />
                    <div className={`w-8 h-8 ${getIconBackgroundColor(transaction.iconType)} rounded-full flex items-center justify-center`}>
                      {getProjectIcon(transaction.iconType)}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 text-sm">{transaction.assetName}</h3>
                  <p className="text-xs text-gray-600">{transaction.issuer}</p>
                  <p className="text-xs text-gray-600">{transaction.type}</p>
                  <p className="font-semibold text-gray-900">${transaction.amount.toFixed(2)}</p>
                  <p className="text-xs text-gray-600">{transaction.date}</p>
                  <StatusBadge status={transaction.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalPages > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onCurrentPageChange}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">List</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-2 py-3 text-left">
                <input 
                  type="checkbox" 
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected && !allSelected;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-stroke" 
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
                Asset Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
                Issuer
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-secondary-black tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="w-12 px-2 py-4">
                  <input 
                    type="checkbox" 
                    checked={selectedTransactions.has(transaction.id)}
                    onChange={() => handleSelectTransaction(transaction.id)}
                    className="rounded border-stroke" 
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${getIconBackgroundColor(transaction.iconType)} rounded-full flex items-center justify-center`}>
                      {getProjectIcon(transaction.iconType)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{transaction.assetName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.issuer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={transaction.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 0 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onCurrentPageChange}
          />
        </div>
      )}
    </div>
  );
}
