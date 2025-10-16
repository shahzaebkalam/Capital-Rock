import React from 'react';

interface ProjectInformationProps {
  details: {
    location: string;
    assetType: string;
    currentStage: string;
    targetROI: string;
    totalRaised: string;
    investorCount: string;
    nextDistribution: string;
  };
}

export default function ProjectInformation({ details }: ProjectInformationProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-black font-sans">More Information</h2>
      <div className="space-y-2">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-secondary-black font-medium text-base capitalize font-sans">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
            <span className="font-medium text-gray-800 text-base font-sans">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
