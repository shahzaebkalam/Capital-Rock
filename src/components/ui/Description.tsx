import React from 'react';
import { cn } from '@/lib/utils';

interface DescriptionProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Description = React.forwardRef<HTMLTextAreaElement, DescriptionProps>(
  ({ className, label, error, rows = 6, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          rows={rows as number}
          placeholder={label}
          className={cn(
            'w-full rounded-lg border border-gray-300 bg-background-light px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            error && 'border-error-500 focus:ring-error-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
      </div>
    );
  }
);

Description.displayName = 'Description';

export default Description;


