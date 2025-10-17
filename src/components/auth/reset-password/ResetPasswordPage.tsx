'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import SuccessModal from '@/components/ui/SuccessModal';
import Link from 'next/link';

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (values: FormValues) => {
    // Handle reset password logic here
    console.log('Reset password values:', values);
    // Show success modal
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleBackToLogin = () => {
    setShowSuccessModal(false);
    router.push('/login');
  };

  const handleBackToLoginFromPage = () => {
    router.push('/login');
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-1 flex flex-col items-start">
          {/* Logo positioned consistently at the top */}
          <div className="w-full text-center mb-6 sm:mb-8 mt-8 sm:mt-12">
            <Logo className="mb-4 sm:mb-6" />
          </div>
          
          <div className="w-full">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-2">
                Enter new password
              </h1>
            </div>

            <Formik
              initialValues={{
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-6 mt-4 max-w-sm mx-auto">
                  <Field
                    as={Input}
                    name="newPassword"
                    type="password"
                    label="New Password"
                    error={errors.newPassword && touched.newPassword ? errors.newPassword : undefined}
                  />
                  
                  <Field
                    as={Input}
                    name="confirmPassword"
                    type="password"
                    label="Confirm New Password"
                    error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : undefined}
                  />

                  <Button type="submit" className="w-full">
                    Update Password
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleBackToLoginFromPage}
                      className="text-primary hover:text-primary-shade-700 underline font-sans"
                    >
                      Back
                    </button>
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

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Password updated successfully"
        buttonText="Back to Login"
        onButtonClick={handleBackToLogin}
      />
    </>
  );
}
