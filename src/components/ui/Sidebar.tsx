'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
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
  RightArrowIcon 
} from '@/lib/icons';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hasSubmenu?: boolean;
}

const navigationItems: NavigationItem[] = [
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

  const isActive = (href: string) => {
    return pathname === href;
  };

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
          <div className="flex items-center justify-center py-3">
            <Logo width={60} height={60} />
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm transition-colors duration-200
                    ${active 
                      ? 'bg-primary text-white' 
                      : 'text-black hover:bg-gray-100'
                    }
                  `}
                  onClick={onMobileClose}
                >
                  <Icon className={`w-5 h-5 mr-3 ${active ? 'text-white' : 'text-black'}`} />
                  <span className="flex-1">{item.name}</span>
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
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${active 
                      ? 'bg-primary text-white' 
                      : 'text-black hover:bg-gray-100'
                    }
                  `}
                  onClick={onMobileClose}
                >
                  <Icon className={`w-5 h-5 mr-3 ${active ? 'text-white' : 'text-black'}`} />
                  <span className="flex-1">{item.name}</span>
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
