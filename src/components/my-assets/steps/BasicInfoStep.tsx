'use client';

import React from 'react';
import { Field, FormikProps, FieldProps } from 'formik';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import ImageUploader from '@/components/ui/ImageUploader';
import Button from '@/components/ui/Button';
import Description from '@/components/ui/Description';
import TagsInput from '@/components/ui/TagsInput';

export const BASIC_FIELDS = ['name', 'type', 'description', 'tags'] as const;

interface Props<FormValues> {
  formik: FormikProps<FormValues>;
  onContinue: () => void;
}

export default function BasicInfoStep<FormValues>({ formik, onContinue }: Props<FormValues>) {
  const { values, setFieldValue } = formik;

  return (
    <div className="space-y-6">
      <h1 className="sm:text-4xl text-2xl font-normal text-center font-display mb-8">Basic Info</h1>
      <ImageUploader value={(values as Record<string, unknown>).thumbnail as File | null | undefined} onChange={(f) => setFieldValue('thumbnail', f)} />
      <Field name="name">
        {({ field, form }: { field: FieldProps['field']; form: FieldProps['form'] }) => (
          <Input {...field} label="Asset Name" error={form.touched.name && form.errors.name ? String(form.errors.name) : undefined} />
        )}
      </Field>
      <Field name="type">
        {({ field, form }: { field: FieldProps['field']; form: FieldProps['form'] }) => (
          <Select
            {...field}
            placeholder="Asset Type"
            options={[
              { value: 'Real Estate', label: 'Real Estate' },
              { value: 'Private Equity', label: 'Private Equity' },
              { value: 'Tokenized RE', label: 'Tokenized RE' },
            ]}
            error={form.touched.type && form.errors.type ? String(form.errors.type) : undefined}
          />
        )}
      </Field>
      <Field name="description">
        {({ field, form }: { field: FieldProps['field']; form: FieldProps['form'] }) => (
          <Description {...field} label="Short Description" error={form.touched.description && form.errors.description ? String(form.errors.description) : undefined} />
        )}
      </Field>
      <Field name="tags">
        {({ field, form }: { field: FieldProps['field']; form: FieldProps['form'] }) => (
          <TagsInput value={field.value || []} onChange={(t) => form.setFieldValue('tags', t)} error={form.touched.tags && (form.errors as Record<string, unknown>).tags ? String((form.errors as Record<string, unknown>).tags) : undefined} />
        )}
      </Field>
      <Button type="button" className="w-full bg-primary text-white" onClick={onContinue}>Continue</Button>
    </div>
  );
}


