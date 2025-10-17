'use client';

import React, { useState } from 'react';
import { CalendarIcon, DocumentIcon, DownArrowIcon } from '@/lib/icons';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

export default function RegulatoryReports() {
  const [format, setFormat] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const formatOptions = [
    { value: 'sec', label: 'SEC' },
    { value: 'bafin', label: 'BaFin' }
  ];

  const downloadOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'csv', label: 'CSV' },
    { value: 'xlsx', label: 'Excel' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header with expand/collapse */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">2. Regulatory Reports</h2>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
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
                placeholder="Choose Format (SEC / BaFin)"
                options={formatOptions}
                value={format}
                onChange={(e) => setFormat(e.target.value)}
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
              <Button variant="primary" className="w-full sm:w-auto">
                Generate Report
              </Button>
            </div>
          </div>

          {/* Export Reports Section */}
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-4">Export Reports</h3>
            
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
                value={downloadFormat}
                onChange={(e) => setDownloadFormat(e.target.value)}
                variant="primary"
                arrowClassName="text-white"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
