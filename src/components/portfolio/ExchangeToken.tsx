'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import CurrencyDropdown from '@/components/ui/CurrencyDropdown';
import { WalletIcon, OceanAssetIcon } from '@/lib/icons';

export default function ExchangeToken() {
  const [activeTab, setActiveTab] = useState<'exchange' | 'buy'>('exchange');
  const [quantity, setQuantity] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('OCEANV');
  const [selectedCurrency, setSelectedCurrency] = useState('USDC');

  const tokenOptions = [
    { value: 'OCEANV', label: 'OCEANV', icon: 'ocean' },
    { value: 'SOLAR', label: 'SOLAR', icon: 'solar' },
    { value: 'REAL', label: 'REAL', icon: 'real' }
  ];

  const currencyOptions = [
    { value: 'USDC', label: 'USDC' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Tabs */}
      <div className="flex items-center justify-evenly border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('exchange')}
          className={`pb-2 px-1 text-lg font-semibold ${
            activeTab === 'exchange'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Exchange Token
        </button>
        <button
          onClick={() => setActiveTab('buy')}
          className={`pb-2 px-1 text-lg font-semibold ml-6 ${
            activeTab === 'buy'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Buy / Sell
        </button>
      </div>

      {/* Available Balance */}
      <div className="mb-6">
        <div className="flex flex-col gap-1  items-start justify-start">
          <span className="text-xs text-gray-800">Available</span>
          <div className="flex items-center gap-2">
            <WalletIcon className=" text-gray-400" />
            <span className="text-sm font-medium text-secondary-black">$10,000.00</span>
          </div>
        </div>
      </div>

      {/* Quantity Input */}
      <div className="mb-4">
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 flex items-center justify-between">
          <div className="flex-1">
            <div className="text-sm text-gray-600 mb-1">Quantity ({selectedToken})</div>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="$0"
              className="bg-transparent border-none outline-none text-secondary-black text-sm w-full"
            />
          </div>
          <CurrencyDropdown
            options={tokenOptions.map(option => ({ value: option.value, label: option.label }))}
            value={selectedToken}
            onChange={setSelectedToken}
            icon={OceanAssetIcon}
            width="140px"
          />
        </div>
      </div>

      {/* Buy for Input */}
      <div className="mb-6">
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 flex items-center justify-between">
          <div className="flex-1">
            <div className="text-sm text-gray-600 mb-1">Buy for ({selectedCurrency})</div>
            <input
              type="text"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              placeholder="$0"
              className="bg-transparent border-none outline-none text-secondary-black text-sm w-full"
            />
          </div>
          <CurrencyDropdown
            options={currencyOptions}
            value={selectedCurrency}
            onChange={setSelectedCurrency}
            width="140px"
          />
        </div>
      </div>

      {/* Exchange Button */}
      <Button
        variant="primary"
        className="w-full"
      >
        Exchange
      </Button>
    </div>
  );
}

