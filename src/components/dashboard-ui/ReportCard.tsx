'use client';

import React, { useState } from 'react';
import { CalendarIcon, DocumentIcon, DownArrowIcon } from '@/lib/icons';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface ReportCardProps {
  title: string;
  stepNumber?: number;
  primarySelectOptions: Array<{ value: string; label: string }>;
  primarySelectPlaceholder: string;
  primarySelectValue: string;
  onPrimarySelectChange: (value: string) => void;
  buttonText?: string;
  onButtonClick?: () => void;
  showExportSection?: boolean;
  exportSectionTitle?: string;
  downloadOptions?: Array<{ value: string; label: string }>;
  downloadValue?: string;
  onDownloadChange?: (value: string) => void;
  downloadSelectVariant?: 'default' | 'primary';
  downloadSelectArrowClassName?: string;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
  className?: string;
}

export default function ReportCard({
  title,
  stepNumber,
  primarySelectOptions,
  primarySelectPlaceholder,
  primarySelectValue,
  onPrimarySelectChange,
  buttonText = 'Generate Report',
  onButtonClick,
  showExportSection = true,
  exportSectionTitle = 'Export Reports',
  downloadOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'csv', label: 'CSV' },
    { value: 'xlsx', label: 'Excel' }
  ],
  downloadValue = '',
  onDownloadChange,
  downloadSelectVariant = 'default',
  downloadSelectArrowClassName,
  isExpanded = true,
  onToggleExpanded,
  className = ''
}: ReportCardProps) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleToggleExpanded = () => {
    if (onToggleExpanded) {
      onToggleExpanded();
    }
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      {/* Header with expand/collapse */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {stepNumber && `${stepNumber}. `}
          {title}
        </h2>
        <button 
          onClick={handleToggleExpanded}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <DownArrowIcon className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {/* Collapsible Content */}
      {isExpanded && (
        <>
          {/* Report Generation Section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
            <div className="flex-1 min-w-0">
              <Select
                placeholder={primarySelectPlaceholder}
                options={primarySelectOptions}
                value={primarySelectValue}
                onChange={(e) => onPrimarySelectChange(e.target.value)}
              />
            </div>

            <div className="w-full sm:w-48">
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                icon={<CalendarIcon className="w-4 h-4 text-gray-400" />}
              />
            </div>

            <div className="w-full sm:w-48">
              <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                icon={<CalendarIcon className="w-4 h-4 text-gray-400" />}
              />
            </div>

            <div className="w-full sm:w-auto">
              <Button 
                variant="primary" 
                className="w-full sm:w-auto"
                onClick={handleButtonClick}
              >
                {buttonText}
              </Button>
            </div>
          </div>

          {/* Export Reports Section */}
          {showExportSection && (
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-4">{exportSectionTitle}</h3>
              
              {/* Document Preview Area */}
              <div className="bg-white border-2 border-dashed border-stroke rounded-lg p-12 mb-4 w-72">
                <div className="flex flex-col items-center justify-center">
                  <DocumentIcon />
                </div>
              </div>

              {/* Download Dropdown */}
              <div className="w-72">
                <Select
                  placeholder="Download as"
                  options={downloadOptions}
                  value={downloadValue}
                  onChange={(e) => onDownloadChange?.(e.target.value)}
                  variant={downloadSelectVariant}
                  arrowClassName={downloadSelectArrowClassName}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
