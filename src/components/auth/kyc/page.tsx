'use client';

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import SuccessModal from '@/components/ui/SuccessModal';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Link from 'next/link';
import { WalletConnectIcon } from '@/lib/icons';

// ✅ Validation Schemas for Each Step
const validationSchemas = [
  Yup.object({
    provider: Yup.string().required('Please select a verification provider'),
  }),
  Yup.object({
    jurisdiction: Yup.string().required('Select jurisdiction'),
    investorType: Yup.string().required('Select investor type'),
    confirmed: Yup.boolean().oneOf([true], 'You must confirm before continuing'),
  }),
  Yup.object({
    custodialWallet: Yup.string().required('Select your custodial wallet'),
  }),
  Yup.object({}), // No validation for last step
];

const MultiStepKyc: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // 0-based step index
  const [step, setStep] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Slugs to display in URL instead of numbers
  const stepSlugs = [
    'proof-of-id-kyc',
    'compliance-profile',
    'wallet-connection',
    'verification-status',
  ];

  // 🔹 URL → Step sync
  useEffect(() => {
    const stepParam = searchParams.get('step');
    // If URL is numeric, normalize to slug
    if (stepParam && /^\d+$/.test(stepParam)) {
      const num = Math.max(1, Math.min(stepSlugs.length, parseInt(stepParam, 10)));
      router.replace(`/kyc?step=${stepSlugs[num - 1]}`, { scroll: false });
      return;
    }
    // If no param, default to first slug
    if (!stepParam) {
      router.replace(`/kyc?step=${stepSlugs[0]}`, { scroll: false });
      return;
    }
    // Find slug index
    const idx = stepSlugs.indexOf(stepParam);
    setStep(idx >= 0 ? idx : 0);
  }, [searchParams, router]);

  // Open success modal automatically on last step (verification status)
  useEffect(() => {
    if (step === 3) setShowSuccess(true);
    else setShowSuccess(false);
  }, [step]);

  // 🔹 Step navigation with URL update
  const goToStep = (num: number) => {
    if (num < 0 || num >= stepSlugs.length) return;
    router.push(`/kyc?step=${stepSlugs[num]}`, { scroll: false });
  };

  // 🔹 Formik setup
  const formik = useFormik({
    initialValues: {
      provider: '',
      jurisdiction: '',
      investorType: '',
      confirmed: false,
      custodialWallet: '',
      kyc: true,
      wallet: true,
      compliance: true,
    },
    validationSchema: validationSchemas[step],
    onSubmit: () => {
      if (step < stepSlugs.length - 1) {
        goToStep(step + 1);
      } else {
        setShowSuccess(true);
      }
    },
    validateOnChange: false,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="min-h-screen bg-white flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-1 flex flex-col items-start">
        {/* Logo */}
        <div className="w-full text-center mb-6 sm:mb-8 mt-8 sm:mt-12">
          <Logo className="mb-4 sm:mb-6" />
        </div>

        {/* Steps */}
        <div className="w-full">
          {/* Step 1 */}
          {step === 0 && (
            <>
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-2">
                  Proof of ID KYC
                </h1>
              </div>

              <div className="space-y-6 mt-4 max-w-sm mx-auto w-full">
                <Select
                  value={formik.values.provider}
                  onChange={(e) => formik.setFieldValue('provider', e.target.value)}
                  options={[{ value: 'sumsub', label: 'Verify Via Sumsub' }]}
                  placeholder="Verify Via Sumsub"
                />
                {formik.errors.provider && (
                  <p className="text-red-500 text-sm">{formik.errors.provider}</p>
                )}

                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 1 && (
            <>
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-2">
                  Compliance profile
                </h1>
              </div>

              <div className="space-y-4 mt-4 max-w-sm mx-auto w-full">
                <Select
                  value={formik.values.jurisdiction}
                  onChange={(e) => formik.setFieldValue('jurisdiction', e.target.value)}
                  options={[
                    { value: 'us', label: 'United States' },
                    { value: 'uk', label: 'United Kingdom' },
                  ]}
                  placeholder="Jurisdiction"
                />
                {formik.errors.jurisdiction && (
                  <p className="text-red-500 text-sm">{formik.errors.jurisdiction}</p>
                )}

                <Select
                  value={formik.values.investorType}
                  onChange={(e) => formik.setFieldValue('investorType', e.target.value)}
                  options={[
                    { value: 'retail', label: 'Retail Investor' },
                    { value: 'professional', label: 'Professional Investor' },
                  ]}
                  placeholder="Investor Type"
                />
                {formik.errors.investorType && (
                  <p className="text-red-500 text-sm">{formik.errors.investorType}</p>
                )}

                <Checkbox
                  checked={formik.values.confirmed}
                  onChange={(e) => formik.setFieldValue('confirmed', e.target.checked)}
                  label="I confirm that I am not a PEP or under sanctions."
                />
                {formik.errors.confirmed && (
                  <p className="text-red-500 text-sm">{formik.errors.confirmed}</p>
                )}

                <Button type="submit" className="w-full">
                  Continue
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-primary hover:text-primary-shade-700 underline font-sans"
                    onClick={() => goToStep(step - 1)}
                  >
                    Back
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Step 3 */}
          {step === 2 && (
            <>
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-2">
                  Wallet connection & whitelisting
                </h1>
              </div>

              <div className="space-y-4 mt-4 max-w-sm mx-auto w-full">
                <button className="w-full h-10 rounded-lg border border-gray-300 bg-background-light text-sm text-gray-900 flex items-center justify-center gap-2">
                  <WalletConnectIcon className="w-6 h-4" />
                  Via WalletConnect
                </button>

                <div className="text-center text-xs text-gray-500">or</div>

                <Select
                  value={formik.values.custodialWallet}
                  onChange={(e) => formik.setFieldValue('custodialWallet', e.target.value)}
                  options={[
                    { value: 'fireblocks', label: 'Fireblocks' },
                    { value: 'copper', label: 'Copper' },
                  ]}
                  placeholder="Select Custodial Wallet"
                />
                {formik.errors.custodialWallet && (
                  <p className="text-red-500 text-sm">{formik.errors.custodialWallet}</p>
                )}

                <Button type="submit" className="w-full">
                  Continue
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-primary hover:text-primary-shade-700 underline font-sans"
                    onClick={() => goToStep(step - 1)}
                  >
                    Back
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Step 4 */}
          {step === 3 && (
            <>
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-6">
                  Verification status
                </h1>

                <div className="max-w-sm mx-auto text-left">
                  <p className="text-gray-700 font-sans mb-4">
                    Review the status of your account verification below
                  </p>

                  <div className="space-y-3">
                    <Checkbox
                      checked={formik.values.kyc}
                      onChange={(e) => formik.setFieldValue('kyc', e.target.checked)}
                      label="KYC"
                    />
                    <Checkbox
                      checked={formik.values.wallet}
                      onChange={(e) => formik.setFieldValue('wallet', e.target.checked)}
                      label="Wallet"
                    />
                    <Checkbox
                      checked={formik.values.compliance}
                      onChange={(e) => formik.setFieldValue('compliance', e.target.checked)}
                      label="Compliance Level"
                    />
                  </div>
                </div>
              </div>

              <div className="max-w-sm mx-auto w-full">
                <Button type="submit" className="w-full">
                  Go to Dashboard
                </Button>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="text-primary hover:text-primary-shade-700 underline font-sans"
                    onClick={() => goToStep(step - 1)}
                  >
                    Back
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center pb-4">
        <p className="text-sm pt-8 max-w-sm mx-auto text-gray-600 font-sans">
          By logging In, you acknowledge that you have read and agree to the
          company{' '}
          <Link href="/privacy-policy" className="text-black underline">
            Privacy policy.
          </Link>
        </p>
      </div>

      {/* Success modal for final KYC step - styled to match design */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Verification status"
        description="Review the status of your account verification below"
        checkboxes={[
          {
            label: 'KYC',
            checked: formik.values.kyc,
            onChange: (checked) => formik.setFieldValue('kyc', checked),
          },
          {
            label: 'Wallet',
            checked: formik.values.wallet,
            onChange: (checked) => formik.setFieldValue('wallet', checked),
          },
          {
            label: 'Compliance Level',
            checked: formik.values.compliance,
            onChange: (checked) => formik.setFieldValue('compliance', checked),
          },
        ]}
        buttonText="Go to Dashboard"
        onButtonClick={() => {
          setShowSuccess(false);
          router.push('/dashboard');
        }}
      />
    </form>
  );
};

export default MultiStepKyc;
