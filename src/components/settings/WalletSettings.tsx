'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  isWhitelisted: boolean;
}

interface Wallet {
  id: string;
  walletName: string;
  address: string;
  network: string;
  isWhitelisted: boolean;
}

export default function WalletSettings() {
  const [bankAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      bankName: 'Chase Bank',
      accountNumber: '****1234',
      accountType: 'Checking',
      isWhitelisted: true
    },
    {
      id: '2',
      bankName: 'Bank of America',
      accountNumber: '****5678',
      accountType: 'Savings',
      isWhitelisted: false
    }
  ]);

  const [wallets] = useState<Wallet[]>([
    {
      id: '1',
      walletName: 'MetaMask',
      address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      network: 'Ethereum',
      isWhitelisted: true
    },
    {
      id: '2',
      walletName: 'Coinbase Wallet',
      address: '0x8ba1f109551bD432803012645Hac136c',
      network: 'Ethereum',
      isWhitelisted: false
    }
  ]);

  const toggleWhitelist = (type: 'bank' | 'wallet', id: string) => {
    console.log(`Toggle whitelist for ${type} ${id}`);
  };

  const removeAccount = (type: 'bank' | 'wallet', id: string) => {
    console.log(`Remove ${type} ${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-secondary-black mb-8">Wallet</h1>

        <div className="space-y-8">
          {/* Bank Accounts */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Bank Accounts</h2>
              <Button variant="outline" className="flex items-center gap-2">
               +
                Add Bank Account
              </Button>
            </div>
            
            <div className="space-y-4">
              {bankAccounts.map((account) => (
                <div key={account.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-900">{account.bankName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          account.isWhitelisted 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {account.isWhitelisted ? 'Whitelisted' : 'Not Whitelisted'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {account.accountNumber} • {account.accountType}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleWhitelist('bank', account.id)}
                        className={`px-3 py-1 rounded text-sm ${
                          account.isWhitelisted
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {account.isWhitelisted ? 'Remove from Whitelist' : 'Add to Whitelist'}
                      </button>
                      <button
                        onClick={() => removeAccount('bank', account.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        ♻
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wallets */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Wallets</h2>
              <Button variant="outline" className="flex items-center gap-2">
                +
                Add Wallet
              </Button>
            </div>
            
            <div className="space-y-4">
              {wallets.map((wallet) => (
                <div key={wallet.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-900">{wallet.walletName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          wallet.isWhitelisted 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {wallet.isWhitelisted ? 'Whitelisted' : 'Not Whitelisted'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-mono">
                        {wallet.address}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{wallet.network}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleWhitelist('wallet', wallet.id)}
                        className={`px-3 py-1 rounded text-sm ${
                          wallet.isWhitelisted
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {wallet.isWhitelisted ? 'Remove from Whitelist' : 'Add to Whitelist'}
                      </button>
                      <button
                        onClick={() => removeAccount('wallet', wallet.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        ♻
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}
