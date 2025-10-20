import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';

interface ProjectSubscriptionProps {
  projectId: string;
  subscription: {
    minAmount: string;
    maxAmount: string;
    currency: string;
    paymentMethod: string;
  };
  isAccreditedInvestor: boolean;
  setIsAccreditedInvestor: (value: boolean) => void;
}

interface FormValues {
  isAccreditedInvestor: boolean;
}

const validationSchema = Yup.object({
  isAccreditedInvestor: Yup.boolean()
    .oneOf([true], 'You must confirm that you are an Accredited Investor to proceed'),
});

export default function ProjectSubscription({ 
  projectId,
  subscription, 
  isAccreditedInvestor, 
  setIsAccreditedInvestor 
}: ProjectSubscriptionProps) {
  const handleSubmit = (values: FormValues) => {
    // Update parent state
    setIsAccreditedInvestor(values.isAccreditedInvestor);
    
    // Navigate to subscription flow
    window.location.href = `/marketplace/${projectId}/subscribe?step=amount`;
  };

  return (
    <div className="bg-white rounded-lg border border-stroke p-6 sticky top-6">
      <h2 className="text-base font-semibold text-black mb-6 font-sans">Subscription</h2>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between items-center py-2 border-b border-stroke">
          <span className="text-secondary-black font-medium text-base font-sans">Minimum Investment Amount:</span>
          <span className="font-medium text-gray-800 text-base font-sans">{subscription.minAmount}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-stroke">
          <span className="text-secondary-black font-medium text-base font-sans">Maximum Investment Amount:</span>
          <span className="font-medium text-gray-800 text-base font-sans">{subscription.maxAmount}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-stroke">
          <span className="text-secondary-black font-medium text-base font-sans">Currency:</span>
          <span className="font-medium text-gray-800 text-base font-sans">{subscription.currency}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-stroke">
          <span className="text-secondary-black font-medium text-base font-sans">Payment Method:</span>
          <span className="font-medium text-gray-800 text-base font-sans">{subscription.paymentMethod}</span>
        </div>
      </div>

      <Formik
        initialValues={{
          isAccreditedInvestor: isAccreditedInvestor,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <div className="mb-6">
              <Checkbox
                checked={values.isAccreditedInvestor}
                onChange={(e) => setFieldValue('isAccreditedInvestor', e.target.checked)}
                label="I am an Accredited Investor"
              />
              {errors.isAccreditedInvestor && touched.isAccreditedInvestor && (
                <div className="text-red-600 text-sm mt-1 font-sans">
                  {errors.isAccreditedInvestor}
                </div>
              )}
            </div>

            <Button 
              type="submit"
              variant="primary" 
              size="lg" 
              className="w-full"
            >
              Subscribe Now
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
