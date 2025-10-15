"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import AccountTypeStep from "./AccountTypeStep";
import PersonalInfoStep from "./PersonalInfoStep";
import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step");

  useEffect(() => {
    // Redirect to account-type if no step parameter or invalid step
    if (
      !step ||
      !["account-type", "personal-info"].includes(step)
    ) {
      router.replace("/register?step=account-type");
    }
  }, [step, router]);

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
      case "account-type":
        return <AccountTypeStep />;
      case "personal-info":
        return <PersonalInfoStep />;
      default:
        return <AccountTypeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-1 flex flex-col items-start">
        {/* Logo positioned consistently at the top */}
        <div className="w-full text-center mb-6 sm:mb-8 mt-8 sm:mt-12">
          <Logo className="mb-4 sm:mb-6" />
        </div>
        
        {renderStep()}
      </div>

      {/* Privacy Policy at the very bottom */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center pb-4">
        <p className="text-sm pt-8 max-w-sm mx-auto text-gray-600 font-sans">
          By logging In, you acknowledge that you have read and agree to the
          company{" "}
          <Link href="/privacy-policy" className="text-black underline">
            Privacy policy.
          </Link>
        </p>
      </div>
    </div>
  );
}
