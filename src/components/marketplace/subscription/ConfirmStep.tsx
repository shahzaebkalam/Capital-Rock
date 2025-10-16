'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronLeftIcon, OceanAssetIcon, PDFIcon, SolarAssetIcon } from '@/lib/icons';
import Button from '@/components/ui/Button';
import SuccessModal from '@/components/ui/SuccessModal';

interface ConfirmStepProps {
  projectId: string;
  projectData: any;
}

export default function ConfirmStep({ projectId, projectData }: ConfirmStepProps) {
  const router = useRouter();
  const [subscriptionData, setSubscriptionData] = useState({
    amount: '',
    currency: '',
    network: '',
    paymentMethod: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Get subscription data from previous steps
    const amount = sessionStorage.getItem('subscriptionAmount');
    const currency = sessionStorage.getItem('currency');
    const network = sessionStorage.getItem('network');
    const paymentMethod = sessionStorage.getItem('paymentMethod');

    if (!amount || !currency || !network || !paymentMethod) {
      // If missing data, redirect back to amount step
      router.push(`/marketplace/${projectId}/subscribe?step=amount`);
      return;
    }

    setSubscriptionData({
      amount,
      currency,
      network,
      paymentMethod
    });
  }, [projectId, router]);

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

  const handleConfirmAndPay = () => {
    // Here you would typically process the payment
    // For now, we'll just show the success modal
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    
    // Clear session storage
    sessionStorage.removeItem('subscriptionAmount');
    sessionStorage.removeItem('currency');
    sessionStorage.removeItem('network');
    sessionStorage.removeItem('paymentMethod');
    
    // Redirect to marketplace
    router.push('/marketplace');
  };

  const handleExploreMoreProjects = () => {
    setShowSuccessModal(false);
    
    // Clear session storage
    sessionStorage.removeItem('subscriptionAmount');
    sessionStorage.removeItem('currency');
    sessionStorage.removeItem('network');
    sessionStorage.removeItem('paymentMethod');
    
    // Redirect to marketplace
    router.push('/marketplace');
  };

  const handleDownloadReceipt = () => {
    // Here you would typically generate and download the receipt
    // For now, we'll just show an alert
    alert('Receipt download functionality would be implemented here');
  };

  const getNetworkDisplayName = (network: string) => {
    switch (network) {
      case 'ethereum':
        return 'Ethereum Mainnet';
      case 'bnb':
        return 'BNB Smart Chain';
      default:
        return network;
    }
  };

  const getPaymentMethodDisplayName = (method: string) => {
    switch (method) {
      case 'sepa':
        return 'SEPA Bank Transfer';
      case 'usd-onchain':
        return 'USD (On-chain Payment)';
      default:
        return method;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Back Button */}
      <div className="px-4 sm:px-6 pt-4">
        <Link 
          href={`/marketplace/${projectId}/subscribe?step=payment-method`}
          className="inline-flex items-center gap-2 text-secondary-black hover:text-gray-900 transition-colors font-sans text-lg sm:text-2xl font-semibold"
        >
          <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          Back
        </Link>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-lg shadow-sm p-6 sm:p-8">
          {/* Project Info */}
          <div className="text-center mb-6">
            <div className={`w-16 h-16 ${getIconBackgroundColor()} rounded-full flex items-center justify-center mx-auto mb-4`}>
              {getProjectIcon()}
            </div>
            <h2 className="text-xl font-semibold text-secondary-black font-sans">{projectData.name}</h2>
            <p className="text-gray-800 font-sans text-base font-normal">{projectData.type}</p>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display text-center text-secondary-black mb-8">Confirm Subscription</h1>

          {/* Summary Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 font-sans">Summary</h3>
            <div className="border border-stroke rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-secondary-black text-lg font-semibold font-sans">Asset:</span>
                <span className="font-normal text-lg text-secondary-black font-sans">{projectData.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-black text-lg font-semibold font-sans">Amount:</span>
                <span className="font-normal text-lg text-secondary-black font-sans">${parseFloat(subscriptionData.amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-black text-lg font-semibold font-sans">Currency:</span>
                <span className="font-normal text-lg text-secondary-black font-sans">{subscriptionData.currency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-black text-lg font-semibold font-sans">Network:</span>
                <span className="font-normal text-lg text-secondary-black font-sans">{getNetworkDisplayName(subscriptionData.network)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-black text-lg font-semibold font-sans">Estimated ROI:</span>
                <span className="font-normal text-lg text-secondary-black font-sans">{projectData.details.targetROI}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-black text-lg font-semibold font-sans">Lock-up:</span>
                <span className="font-normal text-lg text-secondary-black font-sans">{projectData.terms.lockupPeriod}</span>
              </div>
            </div>
          </div>

          {/* Confirm & Pay Button */}
          <Button
            onClick={handleConfirmAndPay}
            className="w-full bg-primary hover:bg-primary-shade-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors font-sans text-base"
          >
            Confirm & Pay
          </Button>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="🎉 Subscription Successful!"
        message={`Your investment of ${subscriptionData.currency} $${parseFloat(subscriptionData.amount).toLocaleString()} has been received.`}
        details="Tokens representing your share will be distributed after settlement on October 15, 2025."
        buttonText="Explore more projects"
        onButtonClick={handleExploreMoreProjects}
        secondaryButtonText="Download Receipt"
        onSecondaryButtonClick={handleDownloadReceipt}
        secondaryButtonIcon={<PDFIcon className="w-4 h-4" />}
      />
    </div>
  );
}
