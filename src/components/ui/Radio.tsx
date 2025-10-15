import React from 'react';
import { cn } from '@/lib/utils';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  customColor?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, customColor = '#B58833', ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="radio"
              className={cn(
                'sr-only', // Hide the default radio button
                className
              )}
              ref={ref}
              {...props}
            />
            {/* Custom radio button */}
            <div
              className={cn(
                'h-4 w-4 rounded-full border-2 cursor-pointer transition-all duration-200 relative',
                props.checked 
                  ? 'border-transparent' 
                  : 'border-gray-300 hover:border-gray-400',
                error && 'border-error-500',
                'focus-within:ring-2 focus-within:ring-offset-2',
                props.checked ? 'focus-within:ring-opacity-50' : 'focus-within:ring-gray-300'
              )}
              style={{
                backgroundColor: 'white',
                borderColor: props.checked ? customColor : (error ? '#EF4444' : '#D1D5DB'),
                '--tw-ring-color': customColor,
              } as React.CSSProperties}
              onClick={() => {
                if (props.onChange) {
                  const event = {
                    target: { 
                      name: props.name,
                      value: props.value,
                      checked: true
                    }
                  } as React.ChangeEvent<HTMLInputElement>;
                  props.onChange(event);
                }
              }}
            >
              {props.checked && (
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                  style={{ backgroundColor: customColor }}
                />
              )}
            </div>
          </div>
          {label && (
            <label 
              className=" font-sans text-gray-700 cursor-pointer select-none"
              onClick={() => {
                if (props.onChange) {
                  const event = {
                    target: { 
                      name: props.name,
                      value: props.value,
                      checked: true
                    }
                  } as React.ChangeEvent<HTMLInputElement>;
                  props.onChange(event);
                }
              }}
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
