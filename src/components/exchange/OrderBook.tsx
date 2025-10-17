'use client';

import React from 'react';
import Select from '../ui/Select';
import { OrderBookIcon } from '@/lib/icons';

interface OrderBookProps {
  activeTab: 'orderbook' | 'tradehistory';
  onTabChange: (tab: 'orderbook' | 'tradehistory') => void;
}

export default function OrderBook({ activeTab, onTabChange }: OrderBookProps) {
  const precisionOptions = [
    { value: '0.001', label: '0.001' },
    { value: '0.01', label: '0.01' },
    { value: '0.1', label: '0.1' },
    { value: '1', label: '1' }
  ];

  const sellOrders = [
    { price: 3.4500, amount: 10.00, quantity: 12.22, fillPercentage: 15 },
    { price: 3.4499, amount: 10.00, quantity: 12.22, fillPercentage: 55 },
    { price: 3.4498, amount: 10.00, quantity: 12.22, fillPercentage: 35 },
    { price: 3.4497, amount: 10.00, quantity: 12.22, fillPercentage: 25 },
    { price: 3.4496, amount: 10.00, quantity: 12.22, fillPercentage: 40 },
    { price: 3.4495, amount: 10.00, quantity: 12.22, fillPercentage: 65 }
  ];

  const buyOrders = [
    { price: 3.4501, amount: 10.00, quantity: 12.22, fillPercentage: 50 },
    { price: 3.4502, amount: 10.00, quantity: 12.22, fillPercentage: 60 },
    { price: 3.4503, amount: 10.00, quantity: 12.22, fillPercentage: 40 },
    { price: 3.4504, amount: 10.00, quantity: 12.22, fillPercentage: 20 },
    { price: 3.4505, amount: 10.00, quantity: 12.22, fillPercentage: 30 }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Tabs */}
      <div className="flex items-center justify-evenly border-b border-gray-200 mb-6">
        <button
          onClick={() => onTabChange('orderbook')}
          className={`pb-2 px-1 text-lg font-semibold ${
            activeTab === 'orderbook'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Order Book
        </button>
        <button
          onClick={() => onTabChange('tradehistory')}
          className={`pb-2 px-1 text-lg font-semibold ml-6 ${
            activeTab === 'tradehistory'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Trade History
        </button>
      </div>

      {activeTab === 'orderbook' && (
        <>
          {/* Order Book Header */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">OCEANV / USDC</h3>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-500 uppercase mb-2">
            <div>PRICE</div>
            <div>AMOUNT</div>
            <div>QUANTITY</div>
          </div>

          {/* Sell Orders (Red) */}
          <div className="space-y-1 mb-4">
            {sellOrders.map((order, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 text-sm relative">
                <div 
                  className="absolute inset-0 bg-error-400 opacity-20"
                  style={{ 
                    width: `${order.fillPercentage}%`,
                    left: 0,
                    right: 'auto'
                  }}
                ></div>
                <div className="text-error-600 relative z-10">{order.price}</div>
                <div className="text-gray-900 relative z-10">{order.amount}</div>
                <div className="text-gray-900 relative z-10">{order.quantity}</div>
              </div>
            ))}
          </div>

          {/* Current Price */}
          <div className="flex items-center justify-center py-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-success-600">4.4500</span>
              <span className="text-success-600">↑</span>
            </div>
          </div>

          {/* Buy Orders (Green) */}
          <div className="space-y-1 mb-4">
            {buyOrders.map((order, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 text-sm relative">
                <div 
                  className="absolute inset-0 bg-success-400 opacity-20"
                  style={{ 
                    width: `${order.fillPercentage}%`,
                    left: 0,
                    right: 'auto'
                  }}
                ></div>
                <div className="text-success-600 relative z-10">{order.price}</div>
                <div className="text-secondary-black relative z-10">{order.amount}</div>
                <div className="text-secondary-black relative z-10">{order.quantity}</div>
              </div>
            ))}
          </div>

          {/* Volume Distribution Bar */}
          <div className="mb-4">
            <div className="flex h-2 rounded overflow-hidden mb-2">
              <div className="bg-success-500" style={{ width: '38.66%' }}></div>
              <div className="bg-error-500" style={{ width: '61.34%' }}></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-success-600">38.66%</span>
              <span className="text-error-600">61.34%</span>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex justify-between items-center">
            <div className="w-30">
              <Select
                options={precisionOptions}
                value="0.001"
                onChange={() => {}}
              />
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <OrderBookIcon  />
            </div>
          </div>
        </>
      )}

      {activeTab === 'tradehistory' && (
        <div>
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 text-xs font-medium text-secondary-black uppercase mb-2 bg-gray-50 py-3 px-6 rounded-t-lg">
            <div className="text-left">TIME</div>
            <div className="text-right">PRICE</div>
            <div className="text-right">AMOUNT</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {[
              { time: '16:45:05', price: 3.4495, amount: 7.5, type: 'sell' },
              { time: '16:45:05', price: 3.4496, amount: 8.88, type: 'sell' },
              { time: '16:45:05', price: 3.4496, amount: 78.90, type: 'buy' },
              { time: '16:45:05', price: 3.4498, amount: 11.11, type: 'buy' },
              { time: '16:45:05', price: 3.4499, amount: 22.33, type: 'sell' },
              { time: '16:45:05', price: 3.4499, amount: 19.99, type: 'sell' },
              { time: '16:45:05', price: 3.4499, amount: 90.12, type: 'buy' },
              { time: '16:45:05', price: 3.4501, amount: 33.44, type: 'sell' },
              { time: '16:45:05', price: 3.4501, amount: 45.67, type: 'sell' },
            ].map((trade, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 text-sm py-3 px-6 hover:bg-gray-50">
                <div className="text-left text-gray-900">{trade.time}</div>
                <div className={`text-right font-medium ${
                  trade.type === 'buy' ? 'text-success-600' : 'text-error-600'
                }`}>
                  {trade.price}
                </div>
                <div className="text-right text-gray-900">{trade.amount}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
