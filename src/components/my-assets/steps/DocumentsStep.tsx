'use client';

import React from 'react';
import { FormikProps } from 'formik';
import ImageUploader from '@/components/ui/ImageUploader';
import Button from '@/components/ui/Button';

export const DOCS_FIELDS = ['ppm','pitch','agreement','model'] as const;

interface Props<FormValues> {
  formik: FormikProps<FormValues>;
}

export default function DocumentsStep<FormValues>({ formik }: Props<FormValues>) {
  const { values, setFieldValue, errors, touched } = formik;
  return (
    <div className="space-y-6">
      <h1 className="sm:text-4xl text-2xl font-normal text-center font-display mb-8">Documents Upload - PDF/DOCX</h1>
      <ImageUploader uploadType="agreement" label="Upload (Private Placement Memorandum)" value={(values as Record<string, unknown>).ppm as File | null | undefined} onChange={(f) => setFieldValue('ppm', f)} accept=".pdf,.doc,.docx" error={(touched as Record<string, unknown>).ppm && (errors as Record<string, unknown>).ppm ? String((errors as Record<string, unknown>).ppm) : undefined} />
      <ImageUploader uploadType="agreement" label="Pitch Deck" value={(values as Record<string, unknown>).pitch as File | null | undefined} onChange={(f) => setFieldValue('pitch', f)} accept=".pdf,.doc,.docx" error={(touched as Record<string, unknown>).pitch && (errors as Record<string, unknown>).pitch ? String((errors as Record<string, unknown>).pitch) : undefined} />
      <ImageUploader uploadType="agreement" label="Subscription Agreement" value={(values as Record<string, unknown>).agreement as File | null | undefined} onChange={(f) => setFieldValue('agreement', f)} accept=".pdf,.doc,.docx" error={(touched as Record<string, unknown>).agreement && (errors as Record<string, unknown>).agreement ? String((errors as Record<string, unknown>).agreement) : undefined} />
      <ImageUploader uploadType="agreement" label="Financial Model" value={(values as Record<string, unknown>).model as File | null | undefined} onChange={(f) => setFieldValue('model', f)} accept=".pdf,.doc,.docx" error={(touched as Record<string, unknown>).model && (errors as Record<string, unknown>).model ? String((errors as Record<string, unknown>).model) : undefined} />
      <Button type="submit" className="w-full bg-primary text-white">Submit for Approval</Button>
    </div>
  );
}


