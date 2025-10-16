'use client';

import React, { useState } from 'react';
import { MarketIcon, FlagIcon, OceanAssetIcon, WalletIcon } from '@/lib/icons';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import CurrencyDropdown from '../ui/CurrencyDropdown';

interface BuySellPanelProps {
  assetId: string;
}

export default function BuySellPanel({ assetId }: BuySellPanelProps) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'limit' | 'market'>('market');
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
          onClick={() => setActiveTab('buy')}
          className={`pb-2 px-1 text-lg font-semibold ${
            activeTab === 'buy'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Buy OCEANV
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`pb-2 px-1 text-lg font-semibold ml-6 ${
            activeTab === 'sell'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Sell OCEANV
        </button>
      </div>

      {/* Order Type */}
      <div className="mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setOrderType('limit')}
            className={`flex items-center justify-between px-4 py-2 rounded-lg border transition-all flex-1 ${
              orderType === 'limit'
                ? 'bg-primary-shade-100 border-primary'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                orderType === 'limit'
                  ? 'border-primary'
                  : 'border-gray-300'
              }`}>
                {orderType === 'limit' && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                )}
              </div>
              <span className={`text-sm ${
                orderType === 'limit' ? 'text-primary' : 'text-gray-500'
              }`}>
                Limit
              </span>
            </div>
            <FlagIcon className={`w-4 h-4 ${
              orderType === 'limit' ? 'text-primary' : 'text-gray-400'
            }`} />
          </button>
          <button
            onClick={() => setOrderType('market')}
            className={`flex items-center justify-between px-4 py-2 rounded-lg border transition-all flex-1 ${
              orderType === 'market'
                ? 'bg-primary-shade-100 border-primary'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                orderType === 'market'
                  ? 'border-primary'
                  : 'border-gray-300'
              }`}>
                {orderType === 'market' && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                )}
              </div>
              <span className={`text-sm ${
                orderType === 'market' ? 'text-primary' : 'text-gray-500'
              }`}>
                Market
              </span>
            </div>
            <MarketIcon className={`w-4 h-4 ${
              orderType === 'market' ? 'text-primary' : 'text-gray-400'
            }`} />
          </button>
        </div>
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
