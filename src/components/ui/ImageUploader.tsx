'use client';

import { AgreementUploadIcon, DocumentIcon, ImageUploadIcon } from '@/lib/icons';
import React, { useRef } from 'react';

interface ImageUploaderProps {
  label?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  uploadType?: 'image' | 'document' | 'agreement';
  error?: string;
}

export default function ImageUploader({ label = 'Thumbnail / Logo', value, onChange, accept = 'image/*', uploadType = 'image', error }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => inputRef.current?.click();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
  };

  return (
    <div className="w-full">
      <div
        role="button"
        onClick={handleClick}
        className={`w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-500 hover:border-primary/60 cursor-pointer ${error ? 'border-error-500' : 'border-gray-300'}`}
      >
        {value ? (
          <span className="text-sm font-medium text-gray-700 truncate max-w-xs">{value.name}</span>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span>{uploadType === 'image' ? <ImageUploadIcon /> : uploadType === 'document' ? <DocumentIcon /> : <AgreementUploadIcon />}</span>
            <span className="text-sm">{label}</span>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleChange} />
      {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
    </div>
  );
}


