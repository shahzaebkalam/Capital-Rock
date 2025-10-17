import { USFlagIcon, EthereumIcon } from '@/lib/icons';
import React from 'react';

interface ProjectTermsProps {
  terms: {
    minInvestment: string;
    maxInvestment: string;
    vestingPeriod: string;
    lockupPeriod: string;
    expectedROI: string;
    distributionFrequency: string;
    settlementMethod: string;
    jurisdiction: string;
  };
}

export default function ProjectTerms({ terms }: ProjectTermsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-black font-sans">Terms</h2>
      <div className="space-y-2">
        {Object.entries(terms).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-secondary-black font-medium text-base capitalize font-sans">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
            <span className="font-medium text-gray-800 text-base flex items-center gap-2 font-sans">
              {key === 'settlementMethod' && <EthereumIcon />}
              {key === 'jurisdiction' && <USFlagIcon />}
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
