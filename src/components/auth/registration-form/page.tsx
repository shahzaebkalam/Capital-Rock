// 'use client';

// import React, { useState } from 'react';
// import Logo from '@/components/ui/Logo';
// import Button from '@/components/ui/Button';
// import Select from '@/components/ui/Select';
// import Link from 'next/link';
// import { WalletConnectIcon } from '@/lib/icons';

// const WalletConnectionPage: React.FC = () => {
//   const [custodialWallet, setCustodialWallet] = useState('');

//   const custodialOptions = [
//     { value: 'fireblocks', label: 'Fireblocks' },
//     { value: 'copper', label: 'Copper' },
//   ];

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-1 flex flex-col items-start">
//         <div className="w-full text-center mb-6 sm:mb-8 mt-8 sm:mt-12">
//           <Logo className="mb-4 sm:mb-6" />
//         </div>

//         <div className="w-full">
//           <div className="text-center mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-5xl font-display text-gray-900 mb-2">
//               Wallet connection & whitelisting
//             </h1>
//           </div>

//           <div className="space-y-4 mt-4 max-w-sm mx-auto w-full">
//             <button className="w-full h-10 rounded-lg border border-gray-300 bg-background-light text-sm text-gray-900 flex items-center justify-center gap-2">
//               <WalletConnectIcon className="w-6 h-4" />
//               Via WalletConnect
//             </button>

//             <div className="text-center text-xs text-gray-500">or</div>

//             <Select
//               value={custodialWallet}
//               onChange={(e) => setCustodialWallet(e.target.value)}
//               options={custodialOptions}
//               placeholder="Select Custodial Wallet"
//             />

//             <Button className="w-full" onClick={() => window.location.assign('/verification-status')}>Continue</Button>

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

// export default WalletConnectionPage;


