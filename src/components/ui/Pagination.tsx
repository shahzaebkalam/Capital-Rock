'use client';

import React from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ChevronDoubleLeftIcon, 
  ChevronDoubleRightIcon 
} from '@/lib/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5
}: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    // Adjust if we're near the beginning or end
    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisiblePages);
    }
    if (currentPage > totalPages - halfVisible) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }
    
    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }
    
    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* First Page */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition-colors border border-stroke ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-primary hover:bg-gray-100'
          }`}
        >
          <ChevronDoubleLeftIcon className="w-4 h-4" />
        </button>
      )}

      {/* Previous Page */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-colors border border-stroke ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-primary hover:bg-gray-100'
        }`}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-stroke ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next Page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-colors border border-stroke ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-primary hover:bg-gray-100'
        }`}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </button>

      {/* Last Page */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition-colors border border-stroke ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-primary hover:bg-gray-100'
          }`}
        >
          <ChevronDoubleRightIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
