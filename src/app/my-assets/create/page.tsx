"use client";

import MainLayout from '@/app/layouts/MainLayout';
import CreateAssetForm from '@/components/my-assets/CreateAssetForm';

export default function CreateAssetPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <CreateAssetForm />
      </div>
    </MainLayout>
  );
}


