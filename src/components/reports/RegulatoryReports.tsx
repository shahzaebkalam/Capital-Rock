'use client';

import React, { useState } from 'react';
import ReportCard from '../dashboard-ui/ReportCard';

export default function RegulatoryReports() {
  const [format, setFormat] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const formatOptions = [
    { value: 'sec', label: 'SEC' },
    { value: 'bafin', label: 'BaFin' }
  ];


  return (
    <ReportCard
      title="Regulatory Reports"
      stepNumber={2}
      primarySelectOptions={formatOptions}
      primarySelectPlaceholder="Choose Format (SEC / BaFin)"
      primarySelectValue={format}
      onPrimarySelectChange={setFormat}
      downloadValue={downloadFormat}
      onDownloadChange={setDownloadFormat}
      downloadSelectVariant="primary"
      downloadSelectArrowClassName="text-white"
      isExpanded={isExpanded}
      onToggleExpanded={() => setIsExpanded(!isExpanded)}
    />
  );
}
