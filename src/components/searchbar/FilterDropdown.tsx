"use client";

import React from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  options: ReadonlyArray<FilterOption>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function FilterDropdown({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
}: FilterDropdownProps) {
  return (
    <div className="relative">
      <select
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        className={`appearance-none bg-gray-100 rounded-full px-4 py-1 pr-6 text-xs
        font-normal text-secondary-black focus:outline-none focus:ring-1 focus:ring-secondary-black focus:border-transparent cursor-pointer
        w-auto flex-shrink-0 min-w-[120px] ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="#020202"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
