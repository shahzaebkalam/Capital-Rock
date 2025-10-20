"use client";

import MainLayout from '@/app/layouts/MainLayout';
import CreateAssetForm from '@/components/my-assets/CreateAssetForm';
import { Suspense } from 'react';

export default function CreateAssetPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <CreateAssetForm />
        </Suspense>
      </div>
    </MainLayout>
  );
}