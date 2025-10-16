'use client';

import React, { useState } from 'react';
import Avatar from './Avatar';
import { VerifiedIcon, WalletIcon, DownArrowIcon } from '@/lib/icons';

interface HeaderProps {
  userName?: string;
  walletAddress?: string;
  avatarSrc?: string;
  className?: string;
  onMenuClick?: () => void;
}

export default function Header({ 
  userName = 'John Doe', 
  walletAddress = 'A6xj8ef7ho9893jk..',
  avatarSrc = '/avatar.jpg',
  className = '',
  onMenuClick
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className={`bg-white border-b border-stroke px-4 py-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Top Row - Menu Button + Welcome + Avatar */}
        <div className="flex items-center justify-between mb-3 min-w-0">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary flex-shrink-0"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Welcome Message */}
            <div className="flex flex-col min-w-0 flex-1">
              <h1 className="text-sm sm:text-lg font-semibold text-black font-sans truncate">
                Welcome back, {userName}
              </h1>
            </div>
          </div>

          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none focus:ring-offset-2 rounded-full"
            >
              <Avatar 
                src={avatarSrc}
                size="md"
                fallback={userName}
                alt={`${userName}'s avatar`}
              />
              <DownArrowIcon />
            </button>

            {/* Mobile Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <hr className="my-1" />
                <a
                  href="/login"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row - Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {/* KYC Status */}
          <div className="flex items-center bg-background-light border border-stroke rounded-md px-2 py-2 min-w-0 flex-shrink-0">
            <span className="text-xs text-black mr-1 font-sans">KYC:</span>
            <VerifiedIcon />
            <span className="text-xs text-black ml-1 font-sans">Verified</span>
          </div>

          {/* Wallet Address */}
          <div className="flex items-center bg-background-light border border-stroke rounded-md px-2 py-2 min-w-0 flex-shrink-0">
            <span className="text-xs text-black mr-1 font-sans">Wallet:</span>
            <WalletIcon className="text-[#3676E3]" />
            <span className="text-xs text-black ml-1 font-sans truncate max-w-20">{walletAddress}</span>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between">
        {/* Left Section - Welcome Message */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-black font-sans">
            Welcome back, {userName}
          </h1>
          <p className="text-base text-black">
            Easily manage all in one place.
          </p>
        </div>

        {/* Right Section - Status and Avatar */}
        <div className="flex items-center gap-4">
          {/* KYC Status */}
          <div className="flex items-center bg-background-light border border-stroke rounded-md px-3 py-2">
            <span className="text-sm text-black mr-2 font-sans">KYC:</span>
            <VerifiedIcon />
            <span className="text-sm text-black ml-2 font-sans">Verified</span>
          </div>

          {/* Wallet Address */}
          <div className="flex items-center bg-background-light border border-stroke rounded-md px-3 py-2">
            <span className="text-sm text-black mr-2 font-sans">Wallet:</span>
            <WalletIcon className="text-[#3676E3]" />
            <span className="text-sm text-black ml-2 font-sans">{walletAddress}</span>
          </div>

          {/* Avatar with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none focus:ring-offset-2 rounded-md"
            >
              <Avatar 
                src={avatarSrc}
                size="md"
                fallback={userName}
                alt={`${userName}'s avatar`}
              />
              <DownArrowIcon />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                >
                  Settings
                </a>
                <hr className="my-1" />
                <a
                  href="/login"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </header>
  );
}
