'use client';

import React, { useEffect, useState } from 'react';
import { RightArrowIcon } from '@/lib/icons';
import Link from 'next/link';

interface SettingsItem {
  id: string;
  title: string;
  description: string;
  href: string;
}

export default function SettingsPage() {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('userType') : null;
    setUserType(stored ?? 'individual');
  }, []);

  const settingsItems: SettingsItem[] = (() => {
    switch (userType) {
      case 'issuer':
        // Issuer (image 2)
        return [
          {
            id: 'profile',
            title: 'Profile Info',
            description: 'Name, email, phone, nationality, investor type',
            href: '/settings/profile',
          },
          {
            id: 'security',
            title: 'Security',
            description: '2FA, password change',
            href: '/settings/security',
          },
          {
            id: 'notifications',
            title: 'Notifications preferences',
            description: 'Turn on / off notifications',
            href: '/settings/notifications',
          },
          {
            id: 'compliance',
            title: 'Compliance',
            description: 'KYC status, uploaded docs, jurisdiction info',
            href: '/settings/compliance',
          },
        ];
      case 'institution':
        // Institution (image 3)
        return [
          {
            id: 'general',
            title: 'General Settings',
            description: 'Platform Name, Logo, Support Email, Timezone',
            href: '/settings/profile', // maps to existing page
          },
          {
            id: 'roles',
            title: 'Roles & Permissions',
            description: 'Create/Edit roles with access levels',
            href: '/settings/security', // placeholder route
          },
          {
            id: 'wallet-config',
            title: 'Wallet & Payment Config',
            description: 'Whitelisted wallets, payout settings',
            href: '/settings/wallet',
          },
          {
            id: 'compliance',
            title: 'Compliance',
            description: 'KYC provider integration keys, AML API setup',
            href: '/settings/compliance',
          },
          {
            id: 'notification-settings',
            title: 'Notification Settings',
            description: 'Email templates, frequency, system triggers',
            href: '/settings/notifications',
          },
          {
            id: 'security',
            title: 'Security',
            description: '2FA, Access Logs, Admin Session Timeout',
            href: '/settings/security',
          },
        ];
      case 'individual':
      default:
        // Individual (image 1)
        return [
          {
            id: 'profile',
            title: 'Profile Info',
            description: 'Name, email, phone, nationality, investor type',
            href: '/settings/profile',
          },
          {
            id: 'security',
            title: 'Security',
            description: '2FA, password change',
            href: '/settings/security',
          },
          {
            id: 'wallet',
            title: 'Linked bank accounts / wallets / payout info',
            description: 'Connected accounts, wallets, whitelist status, add/remove accounts',
            href: '/settings/wallet',
          },
          {
            id: 'notifications',
            title: 'Notifications preferences',
            description: 'Turn on / off notifications',
            href: '/settings/notifications',
          },
          {
            id: 'compliance',
            title: 'Compliance',
            description: 'KYC status, uploaded docs, jurisdiction info',
            href: '/settings/compliance',
          },
        ];
    }
  })();

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
