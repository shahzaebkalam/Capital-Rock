'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthLayout from '@/app/layouts/AuthLayout';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (values: FormValues) => {
    // Handle login logic here
    console.log('Login values:', values);
    // For now, just redirect to a dashboard or home page
    router.push('/dashboard');
  };

  const handleRegister = () => {
    router.push('/register?step=account-type');
  };

  return (
    <AuthLayout>
      {/* Logo positioned consistently at the top */}
      <div className="w-full text-center mb-6 sm:mb-8 mt-8 sm:mt-12">
        <Logo className="mb-4 sm:mb-6" />
      </div>
      
      <div className="w-full">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600 font-sans">Sign in to your account</p>
        </div>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <Field
                as={Input}
                name="email"
                type="email"
                label="Email"
                error={errors.email && touched.email ? errors.email : undefined}
              />
              
              <Field
                as={Input}
                name="password"
                type="password"
                label="Password"
                error={errors.password && touched.password ? errors.password : undefined}
              />

              <Button type="submit" className="w-full">
                Sign In
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600 font-sans">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={handleRegister}
                    className="text-primary hover:text-primary-shade-700 underline"
                  >
                    Create one
                  </button>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
}
