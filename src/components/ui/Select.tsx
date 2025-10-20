import React from 'react';
import { cn } from '@/lib/utils';
import { DownArrowIcon } from '@/lib/icons';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  arrowClassName?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, placeholder, value, arrowClassName, variant = 'default', ...props }, ref) => {
    const isPlaceholder = !value || value === '';
    
    const variants = {
      default: 'bg-background-light border-gray-300 text-gray-900',
      primary: 'bg-primary border-primary text-white',
      secondary: 'bg-white border-gray-300 text-gray-900',
      outline: 'bg-transparent border-gray-300 text-gray-900'
    };
    
    return (
      <div className="w-full">
        <div className="relative">
          <select
            className={cn(
              'flex h-10 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-10',
              variants[variant],
              isPlaceholder && variant === 'default' ? 'text-gray-400' : '',
              isPlaceholder && variant === 'primary' ? 'text-white/70' : '',
              error && 'border-error-500 focus:ring-error-500',
              className
            )}
            ref={ref}
            value={value}
            {...props}
          >
            {!value && placeholder && (
              <option value="" disabled className={variant === 'primary' ? 'text-white/70' : 'text-gray-400'}>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} className={variant === 'primary' ? 'text-white bg-primary' : 'text-gray-900'}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <DownArrowIcon className={arrowClassName} />
          </div>
        </div>
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
