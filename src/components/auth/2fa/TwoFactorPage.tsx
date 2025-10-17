"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import QRCode from 'qrcode';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import SuccessModal from '@/components/ui/SuccessModal';
import Link from 'next/link';

interface FormValues {
  code: string;
}

const validationSchema = Yup.object({
  code: Yup.string()
    .length(6, 'Code must be exactly 6 digits')
    .matches(/^\d{6}$/, 'Code must contain only numbers')
    .required('Verification code is required'),
});

export default function TwoFactorPage() {
  const router = useRouter();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [manualKey, setManualKey] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Generate QR code and manual key on component mount
  useEffect(() => {
    const generate2FASetup = async () => {
      // Generate a random secret key (in real app, this would come from backend)
      const secret = '45DAJSHJ1AS2NNWW22DD45DAJSHJ1AS2';
      setManualKey(secret);

      // Create TOTP URI for QR code
      const issuer = 'CAPITALROCK';
      const accountName = 'user@capitalrock.com'; // In real app, this would be dynamic
      const totpUri = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}`;

      try {
        // Generate QR code
        const qrCodeUrl = await QRCode.toDataURL(totpUri, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
        setQrCodeDataUrl(qrCodeUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generate2FASetup();
  }, []);

  const handleSubmit = (values: FormValues) => {
    // Handle 2FA verification logic here
    console.log('2FA verification code:', values.code);
    
    // For demo purposes, accept any 6-digit code
    if (values.code.length === 6) {
      setShowSuccess(true);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
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
              2FA Two factor authentication setup
            </h1>
          </div>

          {/* QR Code and Manual Key Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 text-center">
              Scan code or Enter Key
            </h2>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Use your authenticator app to scan the QR code or manually enter the key.
            </p>
            
            {/* QR Code */}
            {qrCodeDataUrl && (
              <div className="flex justify-center mb-4">
                <img 
                  src={qrCodeDataUrl} 
                  alt="2FA QR Code" 
                  className="w-48 h-48 border border-gray-200 rounded"
                />
              </div>
            )}

            {/* Manual Entry Key */}
            <div className="text-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manual Entry Key
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-sm text-gray-800 break-all">
                {manualKey}
              </div>
            </div>
          </div>

          {/* Verification Form */}
          <Formik
            initialValues={{
              code: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6 mt-4 max-w-sm mx-auto">
                <Field
                  as={Input}
                  name="code"
                  type="password"
                  label="6 Digital Code"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  error={errors.code && touched.code ? errors.code : undefined}
                />

                <Button type="submit" className="w-full">
                  Verify Setup
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleBack}
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

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Verification successful"
        buttonText="Go to Dashboard"
        onButtonClick={handleSuccessClose}
      />
    </div>
  );
}
