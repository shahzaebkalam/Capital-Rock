"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { DownArrowIcon, RightArrowIcon } from "@/lib/icons";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

type Tab = { id: string; label: string; href: string };

const getTabsForUserType = (userType: string | null): Tab[] => {
  switch (userType) {
    case 'issuer':
      return [
        { id: 'profile', label: 'Profile Info', href: '/settings/profile' },
        { id: 'security', label: 'Security', href: '/settings/security' },
        { id: 'notifications', label: 'Notifications', href: '/settings/notifications' },
        { id: 'compliance', label: 'Compliance', href: '/settings/compliance' },
      ];
    case 'institution':
      return [
        { id: 'general', label: 'General Settings', href: '/settings/profile' },
        { id: 'roles', label: 'Roles & Permissions', href: '/settings/security' },
        { id: 'wallet-config', label: 'Wallet & Payment Config', href: '/settings/wallet' },
        { id: 'compliance', label: 'Compliance', href: '/settings/compliance' },
        { id: 'notification-settings', label: 'Notification Settings', href: '/settings/notifications' },
        { id: 'security', label: 'Security', href: '/settings/security' },
      ];
    case 'individual':
    default:
      return [
        { id: 'profile', label: 'Profile Info', href: '/settings/profile' },
        { id: 'security', label: 'Security', href: '/settings/security' },
        { id: 'wallet', label: 'Wallet', href: '/settings/wallet' },
        { id: 'notifications', label: 'Notifications', href: '/settings/notifications' },
        { id: 'compliance', label: 'Compliance', href: '/settings/compliance' },
      ];
  }
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('userType') : null;
    setUserType(stored ?? 'individual');
  }, []);

  const settingsTabs: Tab[] = useMemo(() => getTabsForUserType(userType), [userType]);
  const isMainSettingsPage = pathname === "/settings";

  if (isMainSettingsPage) {
    return <>{children}</>;
  }

  const getActiveTab = () => {
    if (pathname.includes("/profile")) return "profile";
    if (pathname.includes("/wallet")) return "wallet";
    if (pathname.includes("/security")) return "security";
    if (pathname.includes("/notifications")) return "notifications";
    if (pathname.includes("/compliance")) return "compliance";
    return "profile";
  };

  const activeTab = getActiveTab();

  return (
    <MainLayout>
      <div>
        {/* Back Button */}
        <div className="mb-4">
          <Link
            href="/settings"
            className="inline-flex items-center text-2xl text-secondary-black hover:text-gray-900 font-semibold font-sans"
          >
            <DownArrowIcon className="text-secondary-black rotate-90 mr-2" />
            Back
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b border-stroke">
          <nav className="flex overflow-x-auto">
            {settingsTabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                className={`px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm font-sans rounded-t-lg whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-white text-black border-b-2 border-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content with White Background */}
        <div className="bg-white rounded-lg rounded-tl-none border border-gray-200">
          {children}
        </div>
      </div>
    </MainLayout>
  );
}
