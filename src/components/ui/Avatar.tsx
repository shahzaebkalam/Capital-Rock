'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const sizeValues = {
  sm: { width: 32, height: 32 },
  md: { width: 40, height: 40 },
  lg: { width: 48, height: 48 },
  xl: { width: 64, height: 64 },
};

export default function Avatar({ 
  src, 
  alt = 'User avatar', 
  size = 'md', 
  className,
  fallback = 'U'
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={cn(
      'relative inline-flex items-center justify-center rounded-full border-2 border-stroke bg-background-light text-gray-600 font-medium overflow-hidden',
      sizeClasses[size],
      className
    )}>
       {src && !imageError ? (
         <Image
           src={src}
           alt={alt}
           width={sizeValues[size].width}
           height={sizeValues[size].height}
           className="w-full h-full object-cover"
           onError={handleImageError}
         />
       ) : (
         <span className="select-none">
           {fallback.charAt(0).toUpperCase()}
         </span>
       )}
    </div>
  );
}
