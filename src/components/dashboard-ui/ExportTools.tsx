'use client';

import React, { useState } from 'react';
import ReportCard from './ReportCard';

interface ExportToolsProps {
  stepNumber?: number;
  exportTypeOptions?: Array<{ value: string; label: string }>;
  primarySelectPlaceholder?: string;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

export default function ExportTools({
  stepNumber = 2,
  exportTypeOptions = [
    { value: 'transaction-history', label: 'Transaction History' },
    { value: 'holdings-snapshot', label: 'Holdings Snapshot' }
  ],
  primarySelectPlaceholder = 'Select',
  isExpanded: externalIsExpanded,
  onToggleExpanded: externalOnToggleExpanded,
}: ExportToolsProps) {
  const [exportType, setExportType] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('');
  const [internalIsExpanded, setInternalIsExpanded] = useState(true);

  // Use external state if provided, otherwise use internal state
  const isExpanded = externalIsExpanded !== undefined ? externalIsExpanded : internalIsExpanded;
  
  const handleToggleExpanded = () => {
    if (externalOnToggleExpanded) {
      externalOnToggleExpanded();
    } else {
      setInternalIsExpanded(!internalIsExpanded);
    }
  };

  return (
    <ReportCard
      title="Export Tools"
      stepNumber={stepNumber}
      primarySelectOptions={exportTypeOptions}
      primarySelectPlaceholder={primarySelectPlaceholder}
      primarySelectValue={exportType}
      onPrimarySelectChange={setExportType}
      downloadValue={downloadFormat}
      onDownloadChange={setDownloadFormat}
      isExpanded={isExpanded}
      onToggleExpanded={handleToggleExpanded}
    />
  );
}
