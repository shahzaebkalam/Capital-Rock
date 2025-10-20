import React from 'react';
import { PDFIcon } from '@/lib/icons';


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
