'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ChevronLeftIcon, OceanAssetIcon, SolarAssetIcon } from '@/lib/icons';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface AmountStepProps {
  projectId: string;
  projectData: any;
}

interface FormValues {
  amount: string;
}

const validationSchema = Yup.object({
  amount: Yup.number()
    .min(5000, 'Minimum amount is $5,000')
    .max(500000, 'Maximum amount is $500,000')
    .required('Amount is required'),
});

export default function AmountStep({ projectId, projectData }: AmountStepProps) {
  const router = useRouter();

  const handleSubmit = (values: FormValues) => {
    // Store amount in sessionStorage for next steps
    sessionStorage.setItem('subscriptionAmount', values.amount);
    
    // Navigate to payment method step
    router.push(`/marketplace/${projectId}/subscribe?step=payment-method`);
  };

  // Create icon based on iconType
  const getProjectIcon = () => {
    const iconClass = "w-8 h-8 text-white";
    if (projectData.iconType === 'ocean') {
      return <OceanAssetIcon className={iconClass} />;
    } else if (projectData.iconType === 'solar') {
      return <SolarAssetIcon className={iconClass} />;
    }
    return <OceanAssetIcon className={iconClass} />;
  };

  // Get background color based on iconType
  const getIconBackgroundColor = () => {
    if (projectData.iconType === 'ocean') {
      return 'bg-blue-500';
    } else if (projectData.iconType === 'solar') {
      return 'bg-green-500';
    }
    return 'bg-blue-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-3">
        <Link 
          href={`/marketplace/${projectId}`}
          className="inline-flex items-center gap-2 text-secondary-black hover:text-gray-900 transition-colors font-sans text-lg sm:text-2xl font-semibold"
        >
          <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          Back
        </Link>
      </div>
      
      <div className="w-full bg-white flex items-start justify-center px-4 sm:px-6 py-8 sm:py-8">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 sm:p-6 lg:p-8">
          {/* Project Info */}
          <div className="text-center mb-8 sm:mb-8">
            <div className={`w-16 h-16 sm:w-16 sm:h-16 ${getIconBackgroundColor()} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-4`}>
              {getProjectIcon()}
            </div>
            <h2 className="text-xl sm:text-xl font-semibold text-gray-900 font-sans">{projectData.name}</h2>
            <p className="text-gray-800 font-sans text-base sm:text-base font-normal">{projectData.type}</p>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-2xl lg:text-5xl font-display text-center text-secondary-black mb-8 sm:mb-8">Choose Amount</h1>

          <Formik
            initialValues={{ amount: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6 sm:space-y-6">
                <Field
                  as={Input}
                  name="amount"
                  type="number"
                  label="Amount"
                  placeholder="Enter amount"
                  error={errors.amount && touched.amount ? errors.amount : undefined}
                />

                {/* Min/Max Labels */}
                <div className="flex justify-between text-sm sm:text-sm text-gray-500 font-sans">
                  <span>Min: $5,000</span>
                  <span>Max: $500,000</span>
                </div>

                {/* Continue Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-shade-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors font-sans text-base sm:text-base"
                >
                  Continue
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
