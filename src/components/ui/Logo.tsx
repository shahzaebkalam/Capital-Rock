import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', width = 125, height = 125 }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className=" mb-2">
        <Image
          src="/logo.png"
          alt="Capitalrock Logo"
          width={width}
          height={height}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;
