'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleMobileClose = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={handleMobileClose}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
          {/* Header */}
          <Header onMenuClick={handleMenuClick} />
          
          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
