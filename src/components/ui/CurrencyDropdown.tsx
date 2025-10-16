'use client';

import { useState, useRef, useEffect } from 'react';
import { DownArrowIcon, CurrencyIcon } from '@/lib/icons';

interface CurrencyDropdownProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: React.ComponentType<{ className?: string }>;
  width?: string;
}

export default function CurrencyDropdown({
  options,
  value,
  onChange,
  error,
  icon: CustomIcon,
  width = '100%'
}: CurrencyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    value ? options.find(option => option.value === value) || null : null
  );
  const [buttonWidth, setButtonWidth] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [isOpen]);

  const handleOptionSelect = (option: { value: string; label: string }) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center justify-between">
        
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: width }}
          className={`px-3 py-2 border rounded-full text-left font-sans transition-colors bg-background-light flex items-center justify-between text-sm ${
            error 
              ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
              : 'border-stroke focus:border-primary focus:ring-primary'
          } ${isOpen ? 'border-primary ring-1 ring-primary' : ''}`}
        >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            {CustomIcon ? 
            <div className="flex items-center p-1 rounded-full bg-blue-500 justify-center">
              <CustomIcon className="w-4 h-4 text-white" />
            </div>
            : <CurrencyIcon  />}
          </div>
          <span className={selectedOption ? 'text-secondary-black' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : 'Select Currency'}
          </span>
        </div>
        <DownArrowIcon 
          className={`w-3 h-3 ml-2 text-secondary-black transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
        </button>
      </div>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-1 bg-background-light border border-stroke rounded-lg shadow-lg z-10"
          style={{ width: width }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionSelect(option)}
              className={` px-3 py-2 text-left font-sans transition-colors flex items-center gap-2 text-base font-medium hover:bg-gray-50 ${
                selectedOption?.value === option.value 
                  ? 'bg-primary-shade-100 border-primary-shade-200 text-primary' 
                  : 'bg-background-light border-stroke hover:bg-gray-50 text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center">
                {CustomIcon ? 
                <div className="flex items-center p-1 rounded-full bg-blue-500 justify-center">
                  <CustomIcon className="w-4 h-4 text-white" />
                </div>
                : <CurrencyIcon  />}
              </div>
              <span>{option.label}</span>
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
