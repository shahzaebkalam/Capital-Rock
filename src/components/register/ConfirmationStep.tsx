"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

export default function ConfirmationStep() {
  const router = useRouter();

  const handleGoToInbox = () => {
    // In a real app, this would redirect to email or show instructions
    window.open("https://mail.google.com", "_blank");
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="mb-6 sm:mb-8">
        <Logo className="mb-4 sm:mb-6" />
      </div>

      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-5xl font-display text-gray-900 mb-2">
          Account created. Check your inbox to verify
        </h1>
      </div>

      <div className="mb-8">
        <Button onClick={handleGoToInbox} className="w-full">
          Go to Inbox
        </Button>
      </div>
    </div>
  );
}
