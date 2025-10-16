import React from 'react';
import { PDFIcon } from '@/lib/icons';

// Icons for document types
const XLSXIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14 2H10L8 0H2C1.45 0 1 0.45 1 1V15C1 15.55 1.45 16 2 16H14C14.55 16 15 15.55 15 15V3C15 2.45 14.55 2 14 2ZM13 14H3V2H7.59L9.59 4H13V14Z" fill="#059669"/>
    <path d="M4 6H12V7H4V6ZM4 8H12V9H4V8ZM4 10H10V11H4V10Z" fill="#059669"/>
  </svg>
);

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 1V11M8 11L5 8M8 11L11 8M2 13V14C2 14.55 2.45 15 3 15H13C13.55 15 14 14.55 14 14V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface ProjectDocumentsProps {
  documents: Array<{
    title: string;
    type: string;
    date: string;
  }>;
}

export default function ProjectDocuments({ documents }: ProjectDocumentsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 font-sans">Documents</h2>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="items-center">
              <th className="px-4 py-3 text-left text-sm font-medium text-secondary-black font-sans w-1/3">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-secondary-black font-sans w-1/6">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-secondary-black font-sans w-1/4">Uploaded Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-secondary-black font-sans w-1/4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {documents.map((doc, index) => (
              <tr key={index} className="hover:bg-gray-50 items-center">
                <td className="px-4 py-3 text-sm text-gray-900 font-sans w-1/3">{doc.title}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-sans w-1/6">
                  {doc.type}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 font-sans w-1/4">{doc.date}</td>
                <td className="px-4 py-3 text-sm w-1/4">
                  <button className="text-primary hover:text-primary-shade-700 flex items-center gap-1 font-sans">
                    <PDFIcon />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
