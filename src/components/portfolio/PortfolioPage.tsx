'use client';

import React from 'react';
import PortfolioSummary from './PortfolioSummary';
import PortfolioTable from './PortfolioTable';
import ExchangeToken from './ExchangeToken';
import TopGainers from './TopGainers';

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-black">Portfolio</h1>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Summary and Asset Holdings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Section */}
          <PortfolioSummary />
          
          {/* Asset Holdings Table */}
          <PortfolioTable />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <ExchangeToken />
          <TopGainers />
        </div>
      </div>
    </div>
  );
}

