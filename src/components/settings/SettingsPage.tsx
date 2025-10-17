'use client';

import React from 'react';
import { RightArrowIcon } from '@/lib/icons';
import Link from 'next/link';

interface SettingsItem {
  id: string;
  title: string;
  description: string;
  href: string;
}

export default function SettingsPage() {
  const settingsItems: SettingsItem[] = [
    {
      id: 'profile',
      title: 'Profile Info',
      description: 'Name, email, phone, nationality, investor type',
      href: '/settings/profile'
    },
    {
      id: 'wallet',
      title: 'Wallet',
      description: 'Connected accounts, wallets, whitelist status, add/remove accounts',
      href: '/settings/wallet'
    },
    {
      id: 'security',
      title: 'Security',
      description: '2FA, password change',
      href: '/settings/security'
    },
    {
      id: 'notifications',
      title: 'Notifications preferences',
      description: 'Turn on / off notifications',
      href: '/settings/notifications'
    },
    {
      id: 'compliance',
      title: 'Compliance',
      description: 'KYC status, uploaded docs, jurisdiction info',
      href: '/settings/compliance'
    }
  ];

  return (
    <div className="">
      {/* Header - Outside white container */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-secondary-black mb-2">Settings</h1>
      </div>

      {/* White container with settings cards */}
      <div className="bg-white flex flex-col gap-4 rounded-lg border border-gray-200 p-8">
        <p className="text-black text-base font-sans font-semibold">Manage your account security and notifications settings</p>
        <div className="space-y-4">
          {settingsItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-base font-normal text-gray-600">
                    {item.description}
                  </p>
                </div>
                <RightArrowIcon className='text-gray-600' />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
