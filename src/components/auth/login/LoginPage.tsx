'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

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


  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-1 flex flex-col items-start">
        {/* Logo positioned consistently at the top */}
        <div className="w-full text-center mb-6 sm:mb-8 mt-8 sm:mt-12">
          <Logo className="mb-4 sm:mb-6" />
        </div>
        
        <div className="w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-2">
              Sign In
            </h1>
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
              <Form className="space-y-6 mt-4 max-w-sm mx-auto">
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  label="Email or Phone"
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
                  Login
                </Button>

                <div className="text-center">
                  <Link
                    href="/forgot-password"
                    className="text-primary hover:text-primary-shade-700 underline font-sans"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Privacy Policy at the very bottom */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center pb-4">
        <p className="text-sm pt-8 max-w-sm mx-auto text-gray-600 font-sans">
          By logging In, you acknowledge that you have read and agree to the
          company{" "}
          <Link href="/privacy-policy" className="text-black underline">
            Privacy policy.
          </Link>
        </p>
      </div>
    </div>
  );
}
