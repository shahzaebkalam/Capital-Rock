import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background-light">
      {/* Header will be added here in future */}
      <div className="flex">
        {/* Sidebar will be added here in future */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
