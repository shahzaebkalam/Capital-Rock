'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/app/layouts/AuthLayout';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();

  const handleRegister = () => {
    router.push('/register?step=account-type');
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <Logo className="mb-4 sm:mb-6" />
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <Button className="w-full">
            Sign In
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={handleRegister}
                className="text-primary hover:text-primary-shade-700 underline"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
