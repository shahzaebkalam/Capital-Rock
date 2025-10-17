import React from 'react';

interface ProjectSummaryProps {
  description: string;
  issuer: {
    name: string;
    description: string;
  };
}

export default function ProjectSummary({ description, issuer }: ProjectSummaryProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-black font-sans">Summary</h2>
      <p className="text-gray-800 text-base leading-relaxed font-sans">{description}</p>
      
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-black font-sans">About Issuer</h3>
        <div>
          <p className="text-gray-800 text-base mt-1 font-sans">
            <span className='text-black font-medium text-base'>{issuer.name} </span>
            {issuer.description}</p>
        </div>
      </div>
    </div>
  );
}
