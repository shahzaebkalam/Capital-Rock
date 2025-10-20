
export interface Project {
  id: number;
  name: string;
  type: string;
  status: 'Active' | 'Pending' | 'Closed' | 'Sold Out';
  description: string;
  issuer: {
    name: string;
    description: string;
  };
  details: {
    location: string;
    assetType: string;
    currentStage: string;
    targetROI: string;
    totalRaised: string;
    investorCount: string;
    nextDistribution: string;
  };
  terms: {
    minInvestment: string;
    maxInvestment: string;
    vestingPeriod: string;
    lockupPeriod: string;
    expectedROI: string;
    distributionFrequency: string;
    settlementMethod: string;
    jurisdiction: string;
  };
  subscription: {
    minAmount: string;
    maxAmount: string;
    currency: string;
    paymentMethod: string;
  };
  documents: Array<{
    title: string;
    type: string;
    date: string;
  }>;
  iconType: 'ocean' | 'solar';
}

export const mockProjects: Project[] = [
  {
    id: 1,
    name: 'OceanView Apartments',
    type: 'Real Estate',
    status: 'Active',
    description: 'OceanView Apartments is a luxury real estate development in Miami Beach, Florida, aiming to deliver 120 premium beachfront apartments. Investors receive quarterly profit distributions and equity-backed returns after project completion.',
    issuer: {
      name: 'PrimeRealty Group',
      description: 'PrimeRealty Group is a leading real estate development company with over 15 years of experience in luxury residential and commercial projects. We specialize in beachfront properties and have successfully delivered over 50 projects across Florida.'
    },
    details: {
      location: 'Miami Beach, Florida',
      assetType: 'Real Estate Development',
      currentStage: 'Phase 2 - Construction',
      targetROI: '14.2% (Annualized)',
      totalRaised: '$8.5M / $10M Goal',
      investorCount: '214',
      nextDistribution: '12 Oct 2025'
    },
    terms: {
      minInvestment: '$5,000',
      maxInvestment: '$500,000',
      vestingPeriod: '24 months',
      lockupPeriod: '12 months',
      expectedROI: '14-16% p.a.',
      distributionFrequency: 'Quarterly',
      settlementMethod: 'Tokenized shares (ERC-1400)',
      jurisdiction: 'Delaware, USA'
    },
    subscription: {
      minAmount: '$10,000',
      maxAmount: '$500,000',
      currency: 'USD',
      paymentMethod: 'SEPA Transfer / USDC'
    },
    documents: [
      { title: 'Private Placement Memorandum (PPM)', type: 'PDF', date: '15 Mar 2024' },
      { title: 'Subscription Agreement', type: 'PDF', date: '15 Mar 2024' },
      { title: 'Financial Projections', type: 'XLSX', date: '20 Apr 2024' }
    ],
    iconType: 'ocean'
  },
  {
    id: 2,
    name: 'GreenSolar Energy Fund',
    type: 'Renewable Energy',
    status: 'Active',
    description: 'GreenSolar Energy Fund is a comprehensive renewable energy investment focusing on solar panel installations across commercial and residential properties. The fund aims to generate sustainable returns while contributing to environmental goals.',
    issuer: {
      name: 'Ecoinvest Ltd',
      description: 'Ecoinvest Ltd is a specialized renewable energy investment firm with expertise in solar, wind, and hydroelectric projects. We have successfully funded over 200 renewable energy installations across North America.'
    },
    details: {
      location: 'California, USA',
      assetType: 'Solar Energy Infrastructure',
      currentStage: 'Phase 1 - Installation',
      targetROI: '12.8% (Annualized)',
      totalRaised: '$5.2M / $8M Goal',
      investorCount: '156',
      nextDistribution: '20 Oct 2025'
    },
    terms: {
      minInvestment: '$2,500',
      maxInvestment: '$250,000',
      vestingPeriod: '18 months',
      lockupPeriod: '6 months',
      expectedROI: '12-15% p.a.',
      distributionFrequency: 'Quarterly',
      settlementMethod: 'Tokenized shares (ERC-1400)',
      jurisdiction: 'California, USA'
    },
    subscription: {
      minAmount: '$5,000',
      maxAmount: '$250,000',
      currency: 'USD',
      paymentMethod: 'SEPA Transfer / USDC'
    },
    documents: [
      { title: 'Investment Prospectus', type: 'PDF', date: '10 Feb 2024' },
      { title: 'Environmental Impact Report', type: 'PDF', date: '10 Feb 2024' },
      { title: 'Financial Model', type: 'XLSX', date: '15 Feb 2024' }
    ],
    iconType: 'solar'
  },
  {
    id: 3,
    name: 'TechStart Innovation Fund',
    type: 'Technology',
    status: 'Pending',
    description: 'TechStart Innovation Fund focuses on early-stage technology startups with high growth potential. The fund provides capital and mentorship to innovative companies in AI, blockchain, and fintech sectors.',
    issuer: {
      name: 'Innovate Capital',
      description: 'Innovate Capital is a venture capital firm specializing in technology investments. With a portfolio of over 100 successful startups, we have a proven track record of identifying and nurturing innovative companies.'
    },
    details: {
      location: 'Silicon Valley, USA',
      assetType: 'Venture Capital Fund',
      currentStage: 'Fundraising',
      targetROI: '25.0% (Annualized)',
      totalRaised: '$3.8M / $15M Goal',
      investorCount: '89',
      nextDistribution: 'TBD'
    },
    terms: {
      minInvestment: '$10,000',
      maxInvestment: '$1,000,000',
      vestingPeriod: '36 months',
      lockupPeriod: '24 months',
      expectedROI: '20-30% p.a.',
      distributionFrequency: 'Annually',
      settlementMethod: 'Tokenized shares (ERC-1400)',
      jurisdiction: 'Delaware, USA'
    },
    subscription: {
      minAmount: '$25,000',
      maxAmount: '$1,000,000',
      currency: 'USD',
      paymentMethod: 'SEPA Transfer / USDC'
    },
    documents: [
      { title: 'Fund Prospectus', type: 'PDF', date: '01 Jan 2024' },
      { title: 'Investment Agreement', type: 'PDF', date: '01 Jan 2024' },
      { title: 'Portfolio Strategy', type: 'PDF', date: '05 Jan 2024' }
    ],
    iconType: 'ocean'
  },
  {
    id: 4,
    name: 'GreenSolar Energy Fund',
    type: 'Renewable Energy',
    status: 'Active',
    description: 'GreenSolar Energy Fund is a comprehensive renewable energy investment focusing on solar panel installations across commercial and residential properties. The fund aims to generate sustainable returns while contributing to environmental goals.',
    issuer: {
      name: 'Ecoinvest Ltd',
      description: 'Ecoinvest Ltd is a specialized renewable energy investment firm with expertise in solar, wind, and hydroelectric projects. We have successfully funded over 200 renewable energy installations across North America.'
    },
    details: {
      location: 'California, USA',
      assetType: 'Solar Energy Infrastructure',
      currentStage: 'Phase 1 - Installation',
      targetROI: '12.8% (Annualized)',
      totalRaised: '$5.2M / $8M Goal',
      investorCount: '156',
      nextDistribution: '20 Oct 2025'
    },
    terms: {
      minInvestment: '$2,500',
      maxInvestment: '$250,000',
      vestingPeriod: '18 months',
      lockupPeriod: '6 months',
      expectedROI: '12-15% p.a.',
      distributionFrequency: 'Quarterly',
      settlementMethod: 'Tokenized shares (ERC-1400)',
      jurisdiction: 'California, USA'
    },
    subscription: {
      minAmount: '$5,000',
      maxAmount: '$250,000',
      currency: 'USD',
      paymentMethod: 'SEPA Transfer / USDC'
    },
    documents: [
      { title: 'Investment Prospectus', type: 'PDF', date: '10 Feb 2024' },
      { title: 'Environmental Impact Report', type: 'PDF', date: '10 Feb 2024' },
      { title: 'Financial Model', type: 'XLSX', date: '15 Feb 2024' }
    ],
    iconType: 'solar'
  },
  {
    id: 5,
    name: 'OceanView Apartments',
    type: 'Real Estate',
    status: 'Active',
    description: 'OceanView Apartments is a luxury real estate development in Miami Beach, Florida, aiming to deliver 120 premium beachfront apartments. Investors receive quarterly profit distributions and equity-backed returns after project completion.',
    issuer: {
      name: 'PrimeRealty Group',
      description: 'PrimeRealty Group is a leading real estate development company with over 15 years of experience in luxury residential and commercial projects. We specialize in beachfront properties and have successfully delivered over 50 projects across Florida.'
    },
    details: {
      location: 'Miami Beach, Florida',
      assetType: 'Real Estate Development',
      currentStage: 'Phase 2 - Construction',
      targetROI: '14.2% (Annualized)',
      totalRaised: '$8.5M / $10M Goal',
      investorCount: '214',
      nextDistribution: '12 Oct 2025'
    },
    terms: {
      minInvestment: '$5,000',
      maxInvestment: '$500,000',
      vestingPeriod: '24 months',
      lockupPeriod: '12 months',
      expectedROI: '14-16% p.a.',
      distributionFrequency: 'Quarterly',
      settlementMethod: 'Tokenized shares (ERC-1400)',
      jurisdiction: 'Delaware, USA'
    },
    subscription: {
      minAmount: '$10,000',
      maxAmount: '$500,000',
      currency: 'USD',
      paymentMethod: 'SEPA Transfer / USDC'
    },
    documents: [
      { title: 'Private Placement Memorandum (PPM)', type: 'PDF', date: '15 Mar 2024' },
      { title: 'Subscription Agreement', type: 'PDF', date: '15 Mar 2024' },
      { title: 'Financial Projections', type: 'XLSX', date: '20 Apr 2024' }
    ],
    iconType: 'ocean'
  }
];

export const getProjectById = (id: string | number): Project | undefined => {
  const projectId = typeof id === 'string' ? parseInt(id) : id;
  return mockProjects.find(project => project.id === projectId);
};
