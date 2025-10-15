'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import { MailIcon, PhoneIcon } from '@/lib/icons';

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  understandRisk: boolean;
}

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  country: Yup.string().required('Country is required'),
  address: Yup.string().required('Address is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to the terms'),
  understandRisk: Yup.boolean().oneOf([true], 'You must understand the risks'),
});

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'sg', label: 'Singapore' },
];

export default function PersonalInfoStep() {
  const router = useRouter();

  const handleSubmit = (values: FormValues) => {
    // Store the personal info in localStorage
    const existingData = JSON.parse(localStorage.getItem('registerData') || '{}');
    localStorage.setItem('registerData', JSON.stringify({
      ...existingData,
      ...values,
    }));
    router.push('/register?step=confirmation');
  };

  const handleBack = () => {
    router.push('/register?step=account-type');
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-5xl font-display text-gray-900 mb-2">
          Personal information
        </h1>
      </div>

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          phone: '',
          country: '',
          address: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false,
          understandRisk: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="space-y-6 mt-4">
            <Field
              as={Input}
              name="fullName"
              label="Full Name"
              error={errors.fullName && touched.fullName ? errors.fullName : undefined}
            />

            <Field
              as={Input}
              name="email"
              type="email"
              label="Email Address"
              icon={
                <MailIcon />
              }
              error={errors.email && touched.email ? errors.email : undefined}
            />

            <Field
              as={Input}
              name="phone"
              type="tel"
              label="Phone"
              icon={
                <PhoneIcon />
              }
              error={errors.phone && touched.phone ? errors.phone : undefined}
            />

            <Field
              as={Select}
              name="country"
              label="Country"
              options={countries}
              error={errors.country && touched.country ? errors.country : undefined}
            />

            <Field
              as={Input}
              name="address"
              label="Address"
              error={errors.address && touched.address ? errors.address : undefined}
            />

            <Field
              as={Input}
              name="password"
              type="password"
              label="Password"
              error={errors.password && touched.password ? errors.password : undefined}
            />

            <Field
              as={Input}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : undefined}
            />

            <div className="space-y-3">
              <Checkbox
                name="agreeToTerms"
                label="I agree to Terms & Privacy"
                checked={values.agreeToTerms}
                onChange={(e) => setFieldValue('agreeToTerms', e.target.checked)}
                error={errors.agreeToTerms && touched.agreeToTerms ? errors.agreeToTerms : undefined}
              />

              <Checkbox
                name="understandRisk"
                label="I understand Investing involves risk."
                checked={values.understandRisk}
                onChange={(e) => setFieldValue('understandRisk', e.target.checked)}
                error={errors.understandRisk && touched.understandRisk ? errors.understandRisk : undefined}
              />
            </div>

            <div className="space-y-6 pt-4">
              <Button type="submit" className="w-full">
                Create Account
              </Button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-primary hover:text-primary-shade-700 underline text-sm"
                >
                  Back
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

    
    </div>
  );
}
