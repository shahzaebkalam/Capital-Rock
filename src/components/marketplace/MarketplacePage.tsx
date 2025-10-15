"use client";

import React, { useState } from "react";
import SearchAndFilters from "./SearchAndFilters";
import AssetTable from "./AssetTable";
import Pagination from "@/components/ui/Pagination";
import { GridIcon, ListIcon } from "@/lib/icons";

export default function MarketplacePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    jurisdiction: "",
    minTicketSize: "",
    currency: "",
    status: "",
  });

  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleResetFilters = () => {
    setFilters({
      category: "",
      jurisdiction: "",
      minTicketSize: "",
      currency: "",
      status: "",
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">
          Marketplace
        </h1>
        
        {/* View Toggle */}
        <div className="flex items-center bg-white rounded-lg p-0.5 border border-gray-200">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-black text-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <GridIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-black text-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search and Filters Row */}
      <div className="w-full">
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </div>

      {/* Asset List */}
      <div className="space-y-4 bg-white p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900">Asset List</h2>
        <AssetTable
          currentPage={currentPage}
          searchQuery={searchQuery}
          filters={filters}
          viewMode={viewMode}
          onTotalPagesChange={setTotalPages}
        />
        {/* Pagination */}
        <div className="flex justify-center pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
