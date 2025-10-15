import React from 'react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="flex items-start space-x-3">
          <div className="flex items-center h-5">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                ref={ref}
                checked={props.checked}
                onChange={props.onChange}
                {...props}
              />
              <div 
                className={cn(
                  'h-4 w-4 rounded-full border-2 cursor-pointer transition-all duration-200 flex items-center justify-center',
                  props.checked 
                    ? 'bg-primary border-primary' 
                    : 'bg-white border-gray-300 hover:border-gray-400',
                  error && 'border-error-500',
                  className
                )}
                onClick={() => {
                  if (props.onChange) {
                    const event = {
                      target: { 
                        name: props.name,
                        checked: !props.checked,
                        type: 'checkbox'
                      }
                    } as React.ChangeEvent<HTMLInputElement>;
                    props.onChange(event);
                  }
                }}
              >
                {props.checked && (
                  <svg 
                    className="w-3 h-3 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
          {label && (
            <label 
              className="text-sm text-gray-700 cursor-pointer select-none"
              onClick={() => {
                if (props.onChange) {
                  const event = {
                    target: { 
                      name: props.name,
                      checked: !props.checked,
                      type: 'checkbox'
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
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
