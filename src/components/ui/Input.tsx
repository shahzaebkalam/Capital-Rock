import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { EyeOffIcon, EyeOnIcon, MailIcon } from '@/lib/icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const isEmail = type === 'email';

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="w-full">
        <div className="relative">
          <input
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            placeholder={label}
            className={cn(
              'flex h-10 w-full rounded-lg border border-gray-300 bg-background-light px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-error-500 focus:ring-error-500',
              (icon || isPassword || isEmail) && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {isPassword ? (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOnIcon className="w-4 h-4" />
              ) : (
                <EyeOffIcon className="w-4 h-4" />
              )}
            </button>
          ) : isEmail ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <MailIcon className="w-4 h-4 text-gray-400" />
            </div>
          ) : (
            icon && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {icon}
              </div>
            )
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
