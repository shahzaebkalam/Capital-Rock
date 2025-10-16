'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import AmountStep from "./AmountStep";
import PaymentMethodStep from "./PaymentMethodStep";
import ConfirmStep from "./ConfirmStep";
import { getProjectById } from '@/data/mockProjects';

interface SubscriptionFormProps {
  projectId: string;
}

export default function SubscriptionForm({ projectId }: SubscriptionFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step");

  const projectData = getProjectById(projectId);

  useEffect(() => {
    // Redirect to amount if no step parameter or invalid step
    if (
      !step ||
      !["amount", "payment-method", "confirm"].includes(step)
    ) {
      router.replace(`/marketplace/${projectId}/subscribe?step=amount`);
    }
  }, [step, router, projectId]);

  if (!projectData) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
          <p className="text-gray-600 mt-2">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    // Show loading or redirect if step is not set yet
    if (!step) {
      return (
        <div className="w-full max-w-md mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      );
    }

    switch (step) {
      case "amount":
        return <AmountStep projectId={projectId} projectData={projectData} />;
      case "payment-method":
        return <PaymentMethodStep projectId={projectId} projectData={projectData} />;
      case "confirm":
        return <ConfirmStep projectId={projectId} projectData={projectData} />;
      default:
        return <AmountStep projectId={projectId} projectData={projectData} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {renderStep()}
    </div>
  );
}
