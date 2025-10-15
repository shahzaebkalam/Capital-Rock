"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function ConfirmationStep() {
  const router = useRouter();

  const handleGoToInbox = () => {
    // In a real app, this would redirect to email or show instructions
    router.push("/inbox");
  };

  return (
    <div className="w-full flex flex-col justify-start items-center flex-1 pt-16 sm:pt-20">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-2">
          Account created. Check your inbox to verify
        </h1>
      </div>

      <div className="mb-8 pt-4 sm:max-w-md mx-auto">
        <Button onClick={handleGoToInbox} className="w-full">
          Go to Inbox
        </Button>
      </div>
    </div>
  );
}
