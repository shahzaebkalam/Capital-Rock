'use client';

import React from 'react';
import { OceanAssetIcon, SolarAssetIcon, TableArrowIcon } from '@/lib/icons';

interface RiskExposureData {
  id: number;
  assetName: string;
  iconType: 'ocean' | 'solar';
  riskPercentage: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const mockRiskData: RiskExposureData[] = [
  { id: 1, assetName: 'OceanView', iconType: 'ocean', riskPercentage: 20, riskLevel: 'Low' },
  { id: 2, assetName: 'GreenSolar', iconType: 'solar', riskPercentage: 15, riskLevel: 'Low' },
  { id: 3, assetName: 'OceanView', iconType: 'ocean', riskPercentage: 40, riskLevel: 'Medium' },
  { id: 4, assetName: 'OceanView', iconType: 'ocean', riskPercentage: 20, riskLevel: 'Low' },
  { id: 5, assetName: 'GreenSolar', iconType: 'solar', riskPercentage: 30, riskLevel: 'Medium' },
  { id: 6, assetName: 'OceanView', iconType: 'ocean', riskPercentage: 20, riskLevel: 'High' },
  { id: 7, assetName: 'GreenSolar', iconType: 'solar', riskPercentage: 10, riskLevel: 'Low' },
  { id: 8, assetName: 'OceanView', iconType: 'ocean', riskPercentage: 20, riskLevel: 'Low' },
];

const getAssetIcon = (iconType: 'ocean' | 'solar') => {
  const iconClass = "w-6 h-6 text-white";
  return iconType === 'ocean' ? <OceanAssetIcon className={iconClass} /> : <SolarAssetIcon className={iconClass} />;
};

const getIconBackgroundColor = (iconType: 'ocean' | 'solar') => {
  return iconType === 'ocean' ? 'bg-blue-500' : 'bg-green-500';
};

const getRiskLevelColor = (riskLevel: 'Low' | 'Medium' | 'High') => {
  switch (riskLevel) {
    case 'Low':
      return 'bg-green-50 text-green-700 border border-green-200';
    case 'Medium':
      return 'bg-orange-50 text-orange-700 border border-orange-200';
    case 'High':
      return 'bg-red-50 text-red-700 border border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border border-gray-200';
  }
};

const getProgressBarColor = (riskLevel: 'Low' | 'Medium' | 'High') => {
  switch (riskLevel) {
    case 'Low':
      return 'bg-success-600';
    case 'Medium':
      return 'bg-warning-600';
    case 'High':
      return 'bg-error-600';
    default:
      return 'bg-gray-600';
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
  const statusClasses = {
    'Low': 'bg-success-100 text-success-600 border border-success-300',
    'Medium': 'bg-warning-100 text-warning-600 border border-warning-300',
    'High': 'bg-error-100 text-error-600 border border-error-300',
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status as keyof typeof statusClasses]}`}>
      {status}
    </span>
  );
};

export default function RiskExposureTable() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-secondary-black">Risk Exposure</h3>
        <div className="flex items-center gap-2">
          <button className="text-sm font-medium text-gray-600 underline">W</button>
          <button className="text-sm font-medium text-gray-600 underline">M</button>
          <button className="text-sm font-medium text-gray-600 underline">Q</button>
          <button className="text-sm font-medium text-gray-600 underline">Y</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-secondary-black flex items-center gap-1 w-1/3">
                Asset Name
                <TableArrowIcon />
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-secondary-black w-1/2">Risk Percentage</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-secondary-black w-1/6">Risk</th>
            </tr>
          </thead>
          <tbody>
            {mockRiskData.map((asset) => (
              <tr key={asset.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 w-1/3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getIconBackgroundColor(asset.iconType)}`}>
                      {getAssetIcon(asset.iconType)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{asset.assetName}</span>
                  </div>
                </td>
                <td className="py-3 px-4 w-1/2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-8">{asset.riskPercentage}%</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressBarColor(asset.riskLevel)}`}
                        style={{ width: `${asset.riskPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 w-1/6">
                  <StatusBadge status={asset.riskLevel} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
