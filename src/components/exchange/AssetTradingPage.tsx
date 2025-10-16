"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DownArrowIcon,
  StarIcon,
  SearchIcon,
  FullscreenIcon,
} from "@/lib/icons";
import MarketStats from "./MarketStats";
import TradingChart from "./TradingChart";
import BuySellPanel from "./BuySellPanel";
import OrderBook from "./OrderBook";
import TradeHistory from "./TradeHistory";

interface AssetTradingPageProps {
  assetId: string;
}

export default function AssetTradingPage({ assetId }: AssetTradingPageProps) {
  const router = useRouter();
  const [activeChartTab, setActiveChartTab] = useState<
    "price" | "marketcap" | "tradingview"
  >("price");
  const [activeOrderTab, setActiveOrderTab] = useState<
    "orderbook" | "tradehistory"
  >("orderbook");
  const [activeTradeTab, setActiveTradeTab] = useState<
    | "trademarket"
    | "openorder"
    | "openhistory"
    | "tradehistory"
    | "portfolio"
    | "watchlist"
  >("trademarket");

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-2xl font-semibold text-secondary-black hover:text-gray-900 mb-4"
        >
          <DownArrowIcon className=" mr-2 rotate-90" />
          Back
        </button>

        {/* Main Content Grid - 70/30 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-6">
          {/* Left Column - Chart (70%) */}
          <div className="lg:col-span-7">
            {/* Market Stats Section */}
            <MarketStats assetId={assetId} />
            <TradingChart
              activeTab={activeChartTab}
              onTabChange={setActiveChartTab}
            />

            {/* Trade History */}
            <div>
              <TradeHistory
                activeTab={activeTradeTab}
                onTabChange={setActiveTradeTab}
              />
            </div>
          </div>

          {/* Right Column - Buy/Sell Panel (30%) */}
          <div className="lg:col-span-3">
            <BuySellPanel assetId={assetId} />
            
          {/* Order Book */}
            <OrderBook
              activeTab={activeOrderTab}
              onTabChange={setActiveOrderTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
