'use client';

import React, { useState } from 'react';
import { DocumentIcon, CheckIcon, XIcon } from '@/lib/icons';
import Button from '../ui/Button';

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'approved' | 'pending' | 'rejected';
  uploadedDate: string;
  expiryDate?: string;
}

export default function ComplianceSettings() {
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Government ID',
      type: 'Identity Verification',
      status: 'approved',
      uploadedDate: '2024-01-15',
      expiryDate: '2029-01-15'
    },
    {
      id: '2',
      name: 'Proof of Address',
      type: 'Address Verification',
      status: 'approved',
      uploadedDate: '2024-01-15'
    },
    {
      id: '3',
      name: 'Accredited Investor Certificate',
      type: 'Investor Qualification',
      status: 'pending',
      uploadedDate: '2024-01-20'
    },
    {
      id: '4',
      name: 'Tax Document',
      type: 'Tax Compliance',
      status: 'rejected',
      uploadedDate: '2024-01-10'
    }
  ]);

  const [kycStatus] = useState({
    overall: 'pending',
    identity: 'approved',
    address: 'approved',
    accreditation: 'pending',
    tax: 'rejected'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckIcon className="w-4 h-4" />;
      case 'rejected':
        return <XIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-secondary-black mb-8">Compliance</h1>

        <div className="space-y-8">
          {/* KYC Status Overview */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Overall Status</span>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(kycStatus.overall)}`}>
                  {kycStatus.overall.charAt(0).toUpperCase() + kycStatus.overall.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Identity Verification</span>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(kycStatus.identity)}`}>
                  {kycStatus.identity.charAt(0).toUpperCase() + kycStatus.identity.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Address Verification</span>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(kycStatus.address)}`}>
                  {kycStatus.address.charAt(0).toUpperCase() + kycStatus.address.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Accreditation</span>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(kycStatus.accreditation)}`}>
                  {kycStatus.accreditation.charAt(0).toUpperCase() + kycStatus.accreditation.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Jurisdiction Information */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Jurisdiction Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country of Residence</label>
                <p className="text-gray-900">United States</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Jurisdiction</label>
                <p className="text-gray-900">US Federal</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Regulatory Status</label>
                <p className="text-gray-900">Accredited Investor</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Compliance Level</label>
                <p className="text-gray-900">Tier 1</p>
              </div>
            </div>
          </div>

          {/* Uploaded Documents */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Uploaded Documents</h3>
              <Button variant="outline" className="flex items-center gap-2">
                <DocumentIcon className="w-4 h-4" />
                Upload Document
              </Button>
            </div>
            
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <DocumentIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600">{doc.type}</p>
                        <p className="text-xs text-gray-500">Uploaded: {doc.uploadedDate}</p>
                        {doc.expiryDate && (
                          <p className="text-xs text-gray-500">Expires: {doc.expiryDate}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusColor(doc.status)}`}>
                        {getStatusIcon(doc.status)}
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                      {doc.status === 'rejected' && (
                        <Button variant="outline" size="sm">
                          Re-upload
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}
