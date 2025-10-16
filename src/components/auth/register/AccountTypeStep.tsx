'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/ui/Button';
import Radio from '@/components/ui/Radio';

interface FormValues {
  accountType: string;
}

const validationSchema = Yup.object({
  accountType: Yup.string().required('Please select an account type'),
});

const accountTypes = [
  { value: 'individual', label: 'Individual Investor' },
  { value: 'institution', label: 'Institution / Company (KYB)' },
  { value: 'issuer', label: 'Issuer' },
];

export default function AccountTypeStep() {
  const router = useRouter();

  const handleSubmit = (values: FormValues) => {
    // Store the account type in localStorage or context for later use
    localStorage.setItem('registerData', JSON.stringify({ accountType: values.accountType }));
    router.push('/register?step=personal-info');
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-2">
          Create your Capitalrock account
        </h1>
      </div>

      <Formik
        initialValues={{ accountType: 'individual' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form className="space-y-6 max-w-sm mx-auto">
            <div>
              <h2 className="text-base font-sans font-normal text-gray-900 mb-4 text-start">
                Choose your account type
              </h2>
              <div className="space-y-3">
                {accountTypes.map((type) => (
                  <Field
                    key={type.value}
                    as={Radio}
                    name="accountType"
                    value={type.value}
                    label={type.label}
                    checked={values.accountType === type.value}
                    className="w-full"
                    customColor="#B58833"
                  />
                ))}
                {errors.accountType && touched.accountType && (
                  <p className="text-sm text-error-600">{errors.accountType}</p>
                )}
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <Button type="submit" className="w-full" variant="primary" size="md">
                Continue
              </Button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-primary hover:text-primary-shade-700 underline text-md font-semibold "
                >
                  Back to Login
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

    </div>
  );
}
