'use client';

import React from 'react';
import { FormikProps } from 'formik';
import ImageUploader from '@/components/ui/ImageUploader';
import Button from '@/components/ui/Button';

export const DOCS_FIELDS = ['ppm','pitch','agreement','model'] as const;

interface Props<FormValues> {
  formik: FormikProps<FormValues & any>;
}

export default function DocumentsStep<FormValues>({ formik }: Props<FormValues>) {
  const { values, setFieldValue, errors, touched } = formik as any;
  return (
    <div className="space-y-6">
      <h1 className="sm:text-4xl text-2xl font-normal text-center font-display mb-8">Documents Upload - PDF/DOCX</h1>
      <ImageUploader uploadType="agreement" label="Upload (Private Placement Memorandum)" value={values.ppm} onChange={(f) => setFieldValue('ppm', f)} accept=".pdf,.doc,.docx" error={touched.ppm && errors.ppm} />
      <ImageUploader uploadType="agreement" label="Pitch Deck" value={values.pitch} onChange={(f) => setFieldValue('pitch', f)} accept=".pdf,.doc,.docx" error={touched.pitch && errors.pitch} />
      <ImageUploader uploadType="agreement" label="Subscription Agreement" value={values.agreement} onChange={(f) => setFieldValue('agreement', f)} accept=".pdf,.doc,.docx" error={touched.agreement && errors.agreement} />
      <ImageUploader uploadType="agreement" label="Financial Model" value={values.model} onChange={(f) => setFieldValue('model', f)} accept=".pdf,.doc,.docx" error={touched.model && errors.model} />
      <Button type="submit" className="w-full bg-primary text-white">Submit for Approval</Button>
    </div>
  );
}


