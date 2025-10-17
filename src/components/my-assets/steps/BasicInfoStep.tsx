'use client';

import React from 'react';
import { Field, FormikProps } from 'formik';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import ImageUploader from '@/components/ui/ImageUploader';
import Button from '@/components/ui/Button';
import Description from '@/components/ui/Description';
import TagsInput from '@/components/ui/TagsInput';

export const BASIC_FIELDS = ['name', 'type', 'description', 'tags'] as const;

interface Props<FormValues> {
  formik: FormikProps<FormValues & any>;
  onContinue: () => void;
}

export default function BasicInfoStep<FormValues>({ formik, onContinue }: Props<FormValues>) {
  const { values, setFieldValue } = formik as any;

  return (
    <div className="space-y-6">
      <h1 className="sm:text-4xl text-2xl font-normal text-center font-display mb-8">Basic Info</h1>
      <ImageUploader value={values.thumbnail} onChange={(f) => setFieldValue('thumbnail', f)} />
      <Field name="name">
        {({ field, form }: any) => (
          <Input {...field} label="Asset Name" error={form.touched.name && form.errors.name} />
        )}
      </Field>
      <Field name="type">
        {({ field, form }: any) => (
          <Select
            {...field}
            placeholder="Asset Type"
            options={[
              { value: 'Real Estate', label: 'Real Estate' },
              { value: 'Private Equity', label: 'Private Equity' },
              { value: 'Tokenized RE', label: 'Tokenized RE' },
            ]}
            error={form.touched.type && form.errors.type}
          />
        )}
      </Field>
      <Field name="description">
        {({ field, form }: any) => (
          <Description {...field} label="Short Description" error={form.touched.description && form.errors.description} />
        )}
      </Field>
      <Field name="tags">
        {({ field, form }: any) => (
          <TagsInput value={field.value || []} onChange={(t) => form.setFieldValue('tags', t)} error={form.touched.tags && (form.errors as any).tags} />
        )}
      </Field>
      <Button type="button" className="w-full bg-primary text-white" onClick={onContinue}>Continue</Button>
    </div>
  );
}


