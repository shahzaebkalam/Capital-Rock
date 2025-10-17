'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getProjectById } from '@/data/mockProjects';
import { ChevronLeftIcon, OceanAssetIcon, SolarAssetIcon } from '@/lib/icons';
import ProjectHeader from './ProjectHeader';
import ProjectInformation from './ProjectInformation';
import ProjectPerformance from './ProjectPerformance';
import ProjectDocuments from './ProjectDocuments';
import ProjectTerms from './ProjectTerms';
import ProjectSubscription from './ProjectSubscription';
import ProjectSummary from './ProjectSummary';

interface ProjectDetailPageProps {
  projectId: string;
}

export default function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const [isAccreditedInvestor, setIsAccreditedInvestor] = useState(false);

  // Get project data based on ID
  const projectData = getProjectById(projectId);

  // Handle case where project is not found
  if (!projectData) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white font-sans">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 font-sans">Project Not Found</h1>
          <p className="text-gray-600 font-sans mt-2">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Create icon based on iconType
  const getProjectIcon = () => {
    const iconClass = "w-8 h-8 text-white";
    if (projectData.iconType === 'ocean') {
      return <OceanAssetIcon className={iconClass} />;
    } else if (projectData.iconType === 'solar') {
      return <SolarAssetIcon className={iconClass} />;
    }
    return <OceanAssetIcon className={iconClass} />;
  };

  // Get background color based on iconType
  const getIconBackgroundColor = () => {
    if (projectData.iconType === 'ocean') {
      return 'bg-blue-500';
    } else if (projectData.iconType === 'solar') {
      return 'bg-green-500';
    }
    return 'bg-blue-500';
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <div className="mb-3">
        <Link 
          href="/marketplace" 
          className="inline-flex items-center gap-2 text-secondary-black hover:text-gray-900 transition-colors font-sans text-2xl font-semibold"
        >
          <ChevronLeftIcon className="w-6 h-6" />
          Back
        </Link>
      </div>
      
      <div className="p-6 bg-white font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Content */}
        <div className="space-y-8">
          <ProjectHeader 
            name={projectData.name}
            type={projectData.type}
            status={projectData.status}
            icon={getProjectIcon()}
            iconBackgroundColor={getIconBackgroundColor()}
          />
          
          <ProjectSummary 
            description={projectData.description}
            issuer={projectData.issuer}
          />
          
          <ProjectInformation details={projectData.details} />
          
          <ProjectPerformance />
          
          <ProjectDocuments documents={projectData.documents} />
          
          <ProjectTerms terms={projectData.terms} />
        </div>

        {/* Subscription Sidebar */}
        <div>
          <ProjectSubscription 
            projectId={projectId}
            subscription={projectData.subscription}
            isAccreditedInvestor={isAccreditedInvestor}
            setIsAccreditedInvestor={setIsAccreditedInvestor}
          />
        </div>
      </div>
      </div>
    </div>
  );
}
