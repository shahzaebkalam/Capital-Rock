"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { useRouter } from "next/navigation";

interface FormValues {
  provider: string;
}

const providers = [
  { value: "sumsub", label: "Verify Via Sumsub" },
  { value: "veriff", label: "Verify Via Veriff" },
];

const validationSchema = Yup.object({
  provider: Yup.string().required("Please select a provider"),
});

export default function ProofOfIdStep() {
  const router = useRouter();

  const handleSubmit = (values: FormValues) => {
    const existing = JSON.parse(localStorage.getItem("kycData") || "{}");
    localStorage.setItem(
      "kycData",
      JSON.stringify({ ...existing, provider: values.provider })
    );
    router.push("/kyc?step=compliance");
  };

  const handleBack = () => {
    router.push("/register?step=personal-info");
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-2">
          Proof of ID KYC
        </h1>
      </div>

      <Formik
        initialValues={{ provider: providers[0].value }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="w-full max-w-md mx-auto">
            <div className="space-y-4">
              <Select
                name="provider"
                placeholder="Verify Via Sumsub"
                options={providers}
                value={values.provider}
                onChange={(e) => setFieldValue("provider", (e.target as HTMLSelectElement).value)}
                error={touched.provider && errors.provider ? errors.provider : ""}
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


