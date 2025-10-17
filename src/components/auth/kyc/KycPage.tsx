"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import ProofOfIdStep from "./steps/ProofOfIdStep";
import ComplianceProfileStep from "./steps/ComplianceProfileStep";
import KycSuccessModal from "./KycSuccessModal";
import { useState } from "react";
import WalletConnectStep from "./steps/WalletConnectStep";

export default function KycPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!step || !["proof-of-id", "compliance", "wallet"].includes(step)) {
      router.replace("/kyc?step=proof-of-id");
    }
  }, [step, router]);

  // Success modal is controlled locally; children notify via callback

  const renderStep = () => {
    if (!step) {
      return (
        <div className="w-full max-w-md mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      );
    }

    switch (step) {
      case "proof-of-id":
        return <ProofOfIdStep />;
      case "compliance":
        return <ComplianceProfileStep />;
      case "wallet":
        return <WalletConnectStep onCompleted={() => setShowSuccess(true)} />;
      default:
        return <ProofOfIdStep />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-1 flex flex-col items-start">
        <div className="w-full text-center mb-6 sm:mb-8 mt-8 sm:mt-12">
          <Logo className="mb-4 sm:mb-6" />
        </div>

        {renderStep()}
      </div>

      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center pb-4">
        <p className="text-sm pt-8 max-w-sm mx-auto text-gray-600 font-sans">
          By logging In, you acknowledge that you have read and agree to the
          company{" "}
          <Link href="/privacy-policy" className="text-black underline">
            Privacy policy.
          </Link>
        </p>
      </div>

      <KycSuccessModal
        isOpen={showSuccess}
        onClose={() => {
          router.push("/dashboard");
          setShowSuccess(false);
        }}
        onGoToDashboard={() => router.push("/dashboard")}
      />
    </div>
  );
}
