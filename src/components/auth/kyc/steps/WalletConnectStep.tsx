"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { useRouter } from "next/navigation";
import Image from "next/image";

const custodialWallets = [
  { value: "fireblocks", label: "Fireblocks" },
  { value: "copper", label: "Copper" },
];

interface FormValues {
  method: "walletconnect" | "custodial" | "";
  custodial: string;
}

const validationSchema = Yup.object({
  custodial: Yup.string()
    .test('wallet-or-custodial', 'Please select a custodial wallet or continue via WalletConnect', function (value) {
      const { method } = this.parent as { method: string };
      if (method === 'walletconnect') return true;
      return !!value;
    })
});

interface WalletConnectStepProps {
  onCompleted?: () => void;
}

export default function WalletConnectStep({ onCompleted }: WalletConnectStepProps) {
  const router = useRouter();

  const handleSubmit = (values: FormValues) => {
    const existing = JSON.parse(localStorage.getItem("kycData") || "{}");
    localStorage.setItem("kycData", JSON.stringify({ ...existing, wallet: values }));
    if (onCompleted) onCompleted();
  };

  const handleBack = () => {
    router.push("/kyc?step=compliance");
  };

  const handleComplete = () => {
    if (onCompleted) onCompleted();
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-2">
          Wallet connection & whitelisting
        </h1>
      </div>

      <Formik
        initialValues={{ method: "", custodial: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="w-full max-w-md mx-auto">
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setFieldValue("method", "walletconnect")}
                className={`w-full border rounded-md py-3 px-4 text-gray-800 flex items-center justify-center gap-2 ${
                  values.method === "walletconnect" ? "border-primary" : 'border-gray-300'
                }`}
              >
                <Image src="/walletConnect.png" alt="WalletConnect" width={20} height={20} />
                <span>Via WalletConnect</span>
              </button>

              <div className="text-center text-gray-600">or</div>

              <Select
                placeholder="Select Custodial Wallet"
                options={custodialWallets}
                value={values.custodial}
                onFocus={() => setFieldValue("method", "custodial")}
                onChange={(e) => {
                  const v = (e.target as HTMLSelectElement).value;
                  setFieldValue("custodial", v);
                  setFieldValue("method", "custodial");
                }}
                error={values.method !== 'walletconnect' && errors.custodial ? (errors.custodial as string) : ''}
              />

              <Button type="submit" variant="primary" className="w-full">
                Continue
              </Button>

              <button
                type="button"
                onClick={handleBack}
                className="text-primary hover:text-primary-shade-700 underline text-base font-semibold block mx-auto"
              >
                Back
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}


