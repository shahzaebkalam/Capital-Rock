// 'use client';

// import React, { useState } from 'react';
// import Logo from '@/components/ui/Logo';
// import Button from '@/components/ui/Button';
// import Link from 'next/link';
// import Checkbox from '@/components/ui/Checkbox';

// const VerificationStatusPage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-1 flex flex-col items-start">
//         <div className="w-full text-center mb-6 sm:mb-8 mt-8 sm:mt-12">
//           <Logo className="mb-4 sm:mb-6" />
//         </div>

//         <div className="w-full">
//           <div className="text-center mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-6">
//               Verification status
//             </h1>

//             <div className="max-w-sm mx-auto text-left">
//               <p className="text-gray-700 font-sans mb-4">
//                 Review the status of your account verification below
//               </p>

//               {(() => {
//                 const [kyc, setKyc] = useState(true);
//                 const [wallet, setWallet] = useState(true);
//                 const [compliance, setCompliance] = useState(true);

//                 return (
//                   <div className="space-y-3">
//                     <Checkbox
//                       checked={kyc}
//                       onChange={(e) => setKyc(e.target.checked)}
//                       label="KYC"
//                     />
//                     <Checkbox
//                       checked={wallet}
//                       onChange={(e) => setWallet(e.target.checked)}
//                       label="Wallet"
//                     />
//                     <Checkbox
//                       checked={compliance}
//                       onChange={(e) => setCompliance(e.target.checked)}
//                       label="Compliance Level"
//                     />
//                   </div>
//                 );
//               })()}
//             </div>
//           </div>

//           <div className="max-w-sm mx-auto w-full">
//             <Button className="w-full" onClick={() => window.location.assign('/dashboard')}>
//               Go to Dashboard
//             </Button>

//             <div className="text-center mt-4">
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

// export default VerificationStatusPage;


