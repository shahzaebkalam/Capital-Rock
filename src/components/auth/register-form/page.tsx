// 'use client';

// import React, { useState } from 'react';
// import Logo from '@/components/ui/Logo';
// import Select from '@/components/ui/Select';
// import Checkbox from '@/components/ui/Checkbox';
// import Button from '@/components/ui/Button';
// import Link from 'next/link';

// const CompliancePage: React.FC = () => {
//   const [jurisdiction, setJurisdiction] = useState('');
//   const [investorType, setInvestorType] = useState('');
//   const [confirmed, setConfirmed] = useState(false);

//   const jurisdictions = [
//     { value: 'us', label: 'United States' },
//     { value: 'uk', label: 'United Kingdom' },
//   ];

//   const investorTypes = [
//     { value: 'retail', label: 'Retail Investor' },
//     { value: 'professional', label: 'Professional Investor' },
//   ];

//   const canContinue = jurisdiction && investorType && confirmed;

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-1 flex flex-col items-start">
//         <div className="w-full text-center mb-6 sm:mb-8 mt-8 sm:mt-12">
//           <Logo className="mb-4 sm:mb-6" />
//         </div>

//         <div className="w-full">
//           <div className="text-center mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-2">
//               Compliance profile
//             </h1>
//           </div>

//           <div className="space-y-4 mt-4 max-w-sm mx-auto w-full">
//             <Select
//               value={jurisdiction}
//               onChange={(e) => setJurisdiction(e.target.value)}
//               options={jurisdictions}
//               placeholder="Jurisdiction"
//             />

//             <Select
//               value={investorType}
//               onChange={(e) => setInvestorType(e.target.value)}
//               options={investorTypes}
//               placeholder="Investor Type"
//             />

//             <Checkbox
//               checked={confirmed}
//               onChange={(e) => setConfirmed(e.target.checked)}
//               label="I confirm that I am not a PEP or under sanctions."
//             />

//             <Button className="w-full" disabled={!canContinue} onClick={() => window.location.assign('/wallet')}>
//               Continue
//             </Button>

//             <div className="text-center">
//               <button className="text-primary hover:text-primary-shade-700 underline font-sans" onClick={() => history.back()}>
//                 Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center pb-4">
//         <p className="text-sm pt-8 max-w-sm mx-auto text-gray-600 font-sans">
//           By logging In, you acknowledge that you have read and agree to the
//           company{' '}
//           <Link href="/privacy-policy" className="text-black underline">
//             Privacy policy.
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CompliancePage;


