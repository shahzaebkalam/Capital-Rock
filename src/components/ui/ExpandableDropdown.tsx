'use client';

import { useState, useRef, useEffect } from 'react';
import { DownArrowIcon } from '@/lib/icons';

interface ExpandableDropdownProps {
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function ExpandableDropdown({
  placeholder,
  options,
  value,
  onChange,
  error
}: ExpandableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    value ? options.find(option => option.value === value) || null : null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option: { value: string; label: string }) => {
    setSelectedOption(option);
    onChange(option.value);
    // Keep dropdown open so user can see their selection
  };

  return (
    <div ref={dropdownRef}>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border rounded-lg text-left font-sans transition-colors bg-background-light ${
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-stroke focus:border-primary focus:ring-primary'
        } ${isOpen ? 'border-primary ring-1 ring-primary' : ''}`}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <DownArrowIcon 
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </div>
      </button>

      {isOpen && (
        <div className="mt-1 space-y-1 border border-stroke rounded-lg bg-background-light">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionSelect(option)}
              className={`w-full px-4 py-3 text-left font-sans transition-colors flex items-center justify-between ${
                selectedOption?.value === option.value 
                  ? 'bg-primary-shade-100 border-primary-shade-200' 
                  : 'bg-background-light border-stroke hover:bg-gray-50'
              }`}
            >
              <span className="text-gray-900">{option.label}</span>
              <div className="flex items-center justify-center">
                {selectedOption?.value === option.value ? (
                  <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                    <svg 
                      className="w-3 h-3 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-stroke bg-white"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600 font-sans">{error}</p>
      )}
    </div>
  );
}
