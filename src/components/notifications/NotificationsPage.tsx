"use client";

import React, { useState, useEffect } from "react";
import { SearchBar, FilterDropdown, ResetButton } from "@/components/searchbar";
import { BroadcastIcon } from "@/lib/icons";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
};

const mockNotifications: NotificationItem[] = Array.from({ length: 8 }).map(
  (_, index) => ({
    id: `n-${index}`,
    title: "Feedback Request: We Value Your Opinion",
    description:
      "In the quiet moments of reflection, we find clarity amidst the chaos. Each thought is a stepping stone, guiding us toward the path of self–discovery and growth.",
    timeLabel: "Yesterday",
  })
);

export default function NotificationsPage() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [user, setUser] = useState("");
  const [actionType, setActionType] = useState("");
  const [asset, setAsset] = useState("");
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserType(localStorage.getItem("userType"));
    }
  }, []);

  const simpleOptions = [
    { value: "", label: "Any" },
    { value: "one", label: "Option 1" },
    { value: "two", label: "Option 2" },
  ];

  return (
    <div className="space-y-6">
      {/* Row 1: Heading only */}
      <div>
        <h1 className="text-lg font-medium text-gray-900">Notifications</h1>
      </div>

      {/* Row 2: Controls (institution only) */}
      {userType === "institution" && (
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          {/* Search + filters tray */}
          <div className="w-full md:flex-1 flex flex-col md:flex-row md:items-center border border-gray-200 rounded-md bg-white h-auto md:h-10 p-2 md:pl-2 md:pr-2 shadow-sm gap-2">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder=""
              className="w-full md:w-[200px] h-8 py-0 border-0 rounded-none bg-transparent focus:ring-0 focus:border-transparent placeholder-transparent"
            />
            <div className="flex items-center gap-2 md:ml-2 flex-wrap md:flex-nowrap overflow-x-auto w-full md:w-auto bg-white rounded-md p-2 md:bg-transparent md:p-0">
              <FilterDropdown
                options={simpleOptions}
                value={dateRange}
                onChange={setDateRange}
                placeholder="Date Range"
              />
              <FilterDropdown
                options={simpleOptions}
                value={user}
                onChange={setUser}
                placeholder="User"
              />
              <FilterDropdown
                options={simpleOptions}
                value={actionType}
                onChange={setActionType}
                placeholder="Action Type"
              />
              <FilterDropdown
                options={simpleOptions}
                value={asset}
                onChange={setAsset}
                placeholder="Asset"
              />
              <ResetButton
                onClick={() => {
                  setSearch("");
                  setDateRange("");
                  setUser("");
                  setActionType("");
                  setAsset("");
                }}
              />
            </div>
          </div>

          <button className="w-full md:w-auto md:ml-4 h-10 px-6 rounded-lg bg-[#B8892E] text-white text-[13px] font-medium hover:bg-[#a67927] inline-flex items-center justify-center gap-2 whitespace-nowrap">
            <span>Broadcast Announcement</span>
            <BroadcastIcon />
          </button>
        </div>
      )}

      {/* Content container */}
      <div className="rounded-lg border border-gray-200 bg-white p-3">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Latest</h2>

        <ul className="space-y-3">
          {mockNotifications.map((item) => (
            <li key={item.id}>
              <div className="bg-white rounded-md border border-gray-200 px-4 py-3">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="ml-4 shrink-0">
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {item.timeLabel}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
