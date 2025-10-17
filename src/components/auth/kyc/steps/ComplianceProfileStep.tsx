"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import { useRouter } from "next/navigation";

interface FormValues {
  jurisdiction: string;
  investorType: string;
  confirm: boolean;
}

const jurisdictions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "sg", label: "Singapore" },
];

const investorTypes = [
  { value: "retail", label: "Retail" },
  { value: "professional", label: "Professional" },
  { value: "institution", label: "Institution" },
];

const validationSchema = Yup.object({
  jurisdiction: Yup.string().required("Required"),
  investorType: Yup.string().required("Required"),
  confirm: Yup.boolean().oneOf([true], "You must confirm to continue"),
});

export default function ComplianceProfileStep() {
  const router = useRouter();

  const handleSubmit = (values: FormValues) => {
    const existing = JSON.parse(localStorage.getItem("kycData") || "{}");
    localStorage.setItem("kycData", JSON.stringify({ ...existing, compliance: values }));
    router.push("/kyc?step=wallet");
  };

  const handleBack = () => {
    router.push("/kyc?step=proof-of-id");
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-2">
          Compliance profile
        </h1>
      </div>

      <Formik
        initialValues={{ jurisdiction: "", investorType: "", confirm: false }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="w-full max-w-md mx-auto">
            <div className="space-y-4">
              <Select
                placeholder="Jurisdiction"
                options={jurisdictions}
                value={values.jurisdiction}
                onChange={(e) => setFieldValue("jurisdiction", (e.target as HTMLSelectElement).value)}
                error={touched.jurisdiction && errors.jurisdiction ? errors.jurisdiction : ""}
              />

              <Select
                placeholder="Investor Type"
                options={investorTypes}
                value={values.investorType}
                onChange={(e) => setFieldValue("investorType", (e.target as HTMLSelectElement).value)}
                error={touched.investorType && errors.investorType ? errors.investorType : ""}
              />

              <Checkbox
                checked={values.confirm}
                onChange={(e) => setFieldValue("confirm", e.target.checked)}
                label="I confirm that I am not a PEP or under sanctions."
                error={touched.confirm && errors.confirm ? (errors.confirm as string) : ""}
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


