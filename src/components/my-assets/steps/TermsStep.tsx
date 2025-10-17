'use client';

import React from 'react';
import { Field, FormikProps } from 'formik';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

export const TERMS_FIELDS = ['totalSupply','pricePerToken','minInvestment','maxInvestment','vesting','lockup'] as const;

interface Props<FormValues> {
  formik: FormikProps<FormValues & any>;
  onContinue: () => void;
}

export default function TermsStep<FormValues>({ formik, onContinue }: Props<FormValues>) {
  return (
    <div className="space-y-6">
      <h1 className="sm:text-4xl text-2xl font-normal text-center font-display mb-8">Terms & Tokenomics</h1>
      {['totalSupply','pricePerToken','minInvestment','maxInvestment'].map((name) => (
        <Field key={name} name={name}>
          {({ field, form }: any) => (
            <Input
              {...field}
              label={name === 'totalSupply' ? 'Total Supply' : name === 'pricePerToken' ? 'Price per Token' : name === 'minInvestment' ? 'Minimum Investment' : 'Maximum Investment'}
              error={form.touched[name] && form.errors[name]}
            />
          )}
        </Field>
      ))}
      <Field name="vesting">
        {({ field, form }: any) => (
          <Select
            {...field}
            placeholder="Vesting Period"
            options={[{ value: '6m', label: '6 months' }, { value: '12m', label: '12 months' }]}
            error={form.touched.vesting && form.errors.vesting}
          />
        )}
      </Field>
      <Field name="lockup">
        {({ field, form }: any) => (
          <Select
            {...field}
            placeholder="Lock-up Period"
            options={[{ value: '3m', label: '3 months' }, { value: '6m', label: '6 months' }]}
            error={form.touched.lockup && form.errors.lockup}
          />
        )}
      </Field>
      <Button type="button" className="w-full bg-primary text-white" onClick={onContinue}>Continue</Button>
    </div>
  );
}


