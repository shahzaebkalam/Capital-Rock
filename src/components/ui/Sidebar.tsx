'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from './Logo';
import { 
  DashboardIcon, 
  MarketplaceIcon, 
  ExchangeIcon, 
  PortfolioIcon, 
  CashflowsIcon, 
  ReportsIcon, 
  NotificationsIcon, 
  SettingsIcon, 
  RightArrowIcon, 
  InvestorsIcon,
  DistributionsIcon,
  AuditTrail,
  KYCIcon,
  TransactionsIcon
} from '@/lib/icons';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hasSubmenu?: boolean;
}

const investorNavigationItems: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
  { name: 'Marketplace (Primary Market)', href: '/marketplace', icon: MarketplaceIcon },
  { name: 'Exchange (Secondary Market)', href: '/exchange', icon: ExchangeIcon },
  { name: 'Portfolio', href: '/portfolio', icon: PortfolioIcon },
  { name: 'Cashflows', href: '/cashflows', icon: CashflowsIcon },
  { name: 'Reports', href: '/reports', icon: ReportsIcon },
];

const utilityItems: NavigationItem[] = [
  { name: 'Notifications', href: '/notifications', icon: NotificationsIcon },
  { name: 'Settings', href: '/settings', icon: SettingsIcon, hasSubmenu: true },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ isMobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('userType') : null;
      if (stored) setUserType(stored);
    } catch {
      // no-op
    }
  }, []);

  const issuerNavigationItems: NavigationItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
    { name: 'My Assets', href: '/my-assets', icon: PortfolioIcon },
    { name: 'Investors List', href: '/investors-list', icon: InvestorsIcon },
    { name: 'Distributions', href: '/distributions', icon: DistributionsIcon },
    { name: 'Reports & Analytics', href: '/reports-analytics', icon: ReportsIcon },
  ];

  const institutionNavigationItems: NavigationItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
    { name: 'Asset Management', href: '/asset-management', icon: PortfolioIcon },
    { name: 'User Management', href: '/user-management', icon: InvestorsIcon },
    { name: 'KYC / Compliance Management', href: '/kyc-management', icon: KYCIcon },
    { name: 'Transactions & Payments', href: '/transactions-payments', icon: TransactionsIcon },
    { name: 'Distributions Management', href: '/distributions-management', icon: DistributionsIcon },
    { name: 'Reports & Analytics', href: '/reports-analytics', icon: ReportsIcon },
    { name: 'Audit Trail', href: '/audit-trail', icon: AuditTrail },
  ];

  const isActive = (href: string) => {
    // For marketplace, check if pathname starts with the href
    if (href === '/marketplace') {
      return pathname.startsWith('/marketplace');
    }
    // For exchange, check if pathname starts with the href
    if (href === '/exchange') {
      return pathname.startsWith('/exchange');
    }
    // For settings, check if pathname starts with the href
    if (href === '/settings') {
      return pathname.startsWith('/settings');
    }
    if (href === '/my-assets') {
      return pathname.startsWith('/my-assets');
    }
    // For other routes, use exact match
    return pathname === href;
  };

  const mainNavItems = userType === 'issuer' 
    ? issuerNavigationItems 
    : userType === 'institution' 
      ? institutionNavigationItems 
      : investorNavigationItems;

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-80 sm:w-80 lg:w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:shadow-none
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-center py-3 cursor-pointer" onClick={() => router.push('/')}>
            <Logo width={60} height={60} />
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-3">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm transition-colors duration-200 min-w-0
                    ${active 
                      ? 'bg-primary text-white' 
                      : 'text-black hover:bg-gray-100'
                    }
                  `}
                  onClick={onMobileClose}
                >
                  <Icon className={`w-5 h-5 mr-3 ${active ? 'text-white' : 'text-black'}`} />
                  <span className="flex-1 truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Utility Section */}
          <div className="px-4 py-6 border-t border-gray-200 space-y-2">
            {utilityItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 min-w-0
                    ${active 
                      ? 'bg-primary text-white' 
                      : 'text-black hover:bg-gray-100'
                    }
                  `}
                  onClick={onMobileClose}
                >
                  <Icon className={` mr-3 ${active ? 'text-white' : 'text-black'}`} />
                  <span className="flex-1 truncate">{item.name}</span>
                  {item.hasSubmenu && (
                    <RightArrowIcon className={` ${active ? 'text-white' : 'text-black'}`} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
