'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ChevronLeftIcon, OceanAssetIcon, SolarAssetIcon } from '@/lib/icons';
import Button from '@/components/ui/Button';
import ExpandableDropdown from '@/components/ui/ExpandableDropdown';
import CurrencyDropdown from '@/components/ui/CurrencyDropdown';

interface PaymentMethodStepProps {
  projectId: string;
  projectData: { name: string; type: string; details: { targetROI: string }; terms: { minInvestment: string; maxInvestment: string; lockupPeriod: string } };
}

interface FormValues {
  paymentMethod: string;
  currency: string;
  network: string;
}

const validationSchema = Yup.object({
  paymentMethod: Yup.string().required('Payment method is required'),
  currency: Yup.string().required('Currency is required'),
  network: Yup.string().required('Network is required'),
});

const paymentMethods = [
  { value: 'sepa', label: 'SEPA Bank Transfer' },
  { value: 'usd-onchain', label: 'USD (On-chain Payment)' },
];

const currencies = [
  { value: 'USDC', label: 'USDC' },
  { value: 'USDT', label: 'USDT' },
  { value: 'ETH', label: 'ETH' },
];

const networks = [
  { value: 'bnb', label: 'BNB Smart Chain' },
  { value: 'ethereum', label: 'Ethereum (Default)' },
];

export default function PaymentMethodStep({ projectId, projectData }: PaymentMethodStepProps) {
  const router = useRouter();

  const handleSubmit = (values: FormValues) => {
    // Store payment method data in sessionStorage
    sessionStorage.setItem('paymentMethod', values.paymentMethod);
    sessionStorage.setItem('currency', values.currency);
    sessionStorage.setItem('network', values.network);
    
    // Navigate to confirm step
    router.push(`/marketplace/${projectId}/subscribe?step=confirm`);
  };

  // Create icon based on iconType
  const getProjectIcon = () => {
    const iconClass = "w-8 h-8 text-white";
    if (projectData.type.toLowerCase() .includes('ocean')) {
      return <OceanAssetIcon className={iconClass} />;
    } else if (projectData.type.toLowerCase() .includes('solar')) {
      return <SolarAssetIcon className={iconClass} />;
    }
    return <OceanAssetIcon className={iconClass} />;
  };

  // Get background color based on iconType
  const getIconBackgroundColor = () => {
    if (projectData.type.toLowerCase() .includes('ocean')) {
      return 'bg-blue-500';
    } else if (projectData.type.toLowerCase() .includes('solar')) {
      return 'bg-green-500';
    }
    return 'bg-blue-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-3">
        <Link 
          href={`/marketplace/${projectId}/subscribe?step=amount`}
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
          <h1 className="text-3xl sm:text-2xl lg:text-5xl font-display text-center text-secondary-black mb-8 sm:mb-8">Choose Payment Method</h1>

          <Formik
            initialValues={{
              paymentMethod: '',
              currency: 'USDC',
              network: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form className="space-y-6 sm:space-y-6">
                {/* Payment Method Selection */}
                <ExpandableDropdown
                  placeholder="Select Method"
                  options={paymentMethods}
                  value={values.paymentMethod}
                  onChange={(value) => setFieldValue('paymentMethod', value)}
                  error={errors.paymentMethod && touched.paymentMethod ? errors.paymentMethod : undefined}
                />

                {/* Currency Selection */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-lg text-secondary-black font-sans font-medium">Currency:</span>
                  <CurrencyDropdown
                    options={currencies}
                    value={values.currency}
                    onChange={(value) => setFieldValue('currency', value)}
                    error={errors.currency && touched.currency ? errors.currency : undefined}
                  />
                </div>

                {/* Network Selection */}
                <ExpandableDropdown
                  placeholder="Select Network"
                  options={networks}
                  value={values.network}
                  onChange={(value) => setFieldValue('network', value)}
                  error={errors.network && touched.network ? errors.network : undefined}
                />

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
