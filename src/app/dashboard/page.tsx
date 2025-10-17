"use client";

import MainLayout from '@/app/layouts/MainLayout';
import InvestorDashboard from '@/components/dashboard/Investor/InvestorDashboard';
import IssuerDashboard from '@/components/dashboard/Issuer/IssuerDashboard';
import InstitutionDashboard from '@/components/dashboard/Institution/InstitutionDashboard';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('userType') : null;
      if (stored) setUserType(stored);
    } catch {
      // no-op
    }
  }, []);;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {userType === 'issuer' ? <IssuerDashboard /> : userType === 'individual' ? <InvestorDashboard /> : userType === 'institution' ? <InstitutionDashboard /> : null}
      </div>
    </MainLayout>
  );
}
