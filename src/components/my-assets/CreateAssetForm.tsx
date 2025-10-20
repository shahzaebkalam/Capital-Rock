'use client';

import React, { useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import BasicInfoStep from './steps/BasicInfoStep';
import TermsStep from './steps/TermsStep';
import DocumentsStep from './steps/DocumentsStep';
import { ChevronLeftIcon } from '@/lib/icons';

type StepKey = 'basic' | 'terms' | 'docs';
const steps: StepKey[] = ['basic', 'terms', 'docs'];

const BasicSchema = Yup.object({
  name: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  tags: Yup.array().of(Yup.string().trim()).min(1, 'At least one tag is required').required('Required'),
});

const TermsSchema = Yup.object({
  totalSupply: Yup.string().required('Required'),
  pricePerToken: Yup.string().required('Required'),
  minInvestment: Yup.string().required('Required'),
  maxInvestment: Yup.string().required('Required'),
  vesting: Yup.string().required('Required'),
  lockup: Yup.string().required('Required'),
});

const DocsSchema = Yup.object({
  ppm: Yup.mixed<File>().required('Required').test('fileType', 'File must be a PDF or DOCX', (value) => !value || ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type)),
  pitch: Yup.mixed<File>().required('Required').test('fileType', 'File must be a PDF or DOCX', (value) => !value || ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type)),
  agreement: Yup.mixed<File>().required('Required').test('fileType', 'File must be a PDF or DOCX', (value) => !value || ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type)),
  model: Yup.mixed<File>().required('Required').test('fileType', 'File must be a PDF or DOCX', (value) => !value || ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type)),
});

const initialValues = {
  // basic
  thumbnail: null as File | null,
  name: '',
  type: '',
  description: '',
  tags: [] as string[],
  // terms
  totalSupply: '',
  pricePerToken: '',
  minInvestment: '',
  maxInvestment: '',
  vesting: '',
  lockup: '',
  // docs
  ppm: null as File | null,
  pitch: null as File | null,
  agreement: null as File | null,
  model: null as File | null,
};

export default function CreateAssetForm() {
  const search = useSearchParams();
  const router = useRouter();

  const stepFromQuery = ((): StepKey => {
    const s = (search.get('step') || 'basic') as StepKey;
    return steps.includes(s) ? s : 'basic';
  })();

  const stepIndex = useMemo(() => steps.indexOf(stepFromQuery), [stepFromQuery]);

  const goTo = (idx: number) => {
    const safe = Math.max(0, Math.min(steps.length - 1, idx));
    const next = steps[safe];
    router.push(`?step=${next}`);
  };

  // Ensure step param exists and is valid (match Register/KYC pattern)
  useEffect(() => {
    if (!search.get('step') || !steps.includes(stepFromQuery)) {
      router.replace('/my-assets/create?step=basic');
    }
  }, [search, stepFromQuery, router]);

  const validationSchema = useMemo(() => {
    if (stepFromQuery === 'basic') return BasicSchema;
    if (stepFromQuery === 'terms') return TermsSchema;
    return DocsSchema;
  }, [stepFromQuery]);

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log(values);
    router.push('/my-assets');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-3">
            <button
          type="button"
          onClick={() => {
            if (stepIndex > 0) {
              const prev = steps[stepIndex - 1];
              router.push(`?step=${prev}`);
            } else {
              router.push('/my-assets');
            }
          }}
          className="inline-flex items-center gap-2 text-secondary-black hover:text-gray-900 transition-colors font-sans text-lg sm:text-2xl font-semibold"
        >
          <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          Back
        </button>
      </div>
      <div className="w-full bg-white flex items-start justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {(formik) => (
              <Form className="space-y-6">
          {stepFromQuery === 'basic' && (
            <BasicInfoStep formik={formik} onContinue={() => {
              formik.validateForm().then((errs) => {
                const hasErrors = Object.keys(errs).length > 0;
                if (!hasErrors) goTo(stepIndex + 1);
                else {
                  formik.setTouched({ name: true, type: true, description: true, tags: true }, true);
                }
              });
            }} />
          )}

          {stepFromQuery === 'terms' && (
            <TermsStep formik={formik} onContinue={() => {
              formik.validateForm().then((errs) => {
                const hasErrors = Object.keys(errs).length > 0;
                if (!hasErrors) goTo(stepIndex + 1);
                else {
                  formik.setTouched({ totalSupply: true, pricePerToken: true, minInvestment: true, maxInvestment: true, vesting: true, lockup: true }, true);
                }
              });
            }} />
          )}

          {stepFromQuery === 'docs' && (
            <DocumentsStep formik={formik} />
          )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}


