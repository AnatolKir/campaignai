'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ROLE_OPTIONS, 
  COMPANY_SIZE_OPTIONS, 
  MONTHLY_SPEND_OPTIONS, 
  WEEKLY_HOURS_OPTIONS, 
  TEAM_SIZE_OPTIONS,
  SOCIAL_MEDIA_TOOLS,
  type Step1Data,
  type Step2Data,
  type RoleType,
  type CompanySizeType,
  type MonthlySpendType,
  type WeeklyHoursType,
  type TeamSizeType
} from '../types/early-access';

// Country data with phone codes
const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '+34' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '+39' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', dialCode: '+31' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', dialCode: '+46' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', dialCode: '+47' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', dialCode: '+45' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', dialCode: '+358' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', dialCode: '+41' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', dialCode: '+43' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', dialCode: '+32' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', dialCode: '+65' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', dialCode: '+852' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', dialCode: '+64' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '+54' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', dialCode: '+56' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', dialCode: '+57' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
  { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '+86' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', dialCode: '+82' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', dialCode: '+66' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', dialCode: '+60' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', dialCode: '+63' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', dialCode: '+62' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', dialCode: '+84' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', dialCode: '+27' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dialCode: '+234' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', dialCode: '+254' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', dialCode: '+20' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', dialCode: '+212' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', dialCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', dialCode: '+966' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', dialCode: '+972' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', dialCode: '+90' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', dialCode: '+7' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', dialCode: '+380' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', dialCode: '+48' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', dialCode: '+420' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', dialCode: '+36' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', dialCode: '+40' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', dialCode: '+30' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '+351' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', dialCode: '+353' },
];

// How did you hear about us options
const REFERRAL_OPTIONS = [
  { value: 'social_media', label: 'Social Media' },
  { value: 'search_engine', label: 'Search Engine (Google, Bing, etc.)' },
  { value: 'trade_show', label: 'Trade Show/Conference' },
  { value: 'referral', label: 'Referral from Friend/Colleague' },
  { value: 'industry_publication', label: 'Industry Publication/Blog' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'email_marketing', label: 'Email Marketing' },
  { value: 'online_ad', label: 'Online Advertisement' },
  { value: 'partner', label: 'Business Partner' },
  { value: 'other', label: 'Other' },
];

export default function ComingSoonPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  
  // Phone and country state
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default to US
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  
  // Email validation state
  const [emailError, setEmailError] = useState('');
  
  // Full name state (separate from step1Data to handle properly)
  const [fullName, setFullName] = useState('');

  // Step 1 data
  const [step1Data, setStep1Data] = useState<Step1Data>({
    email: '',
    firstName: '',
    lastName: '',
    companyName: '',
    role: '' as RoleType,
    consentedToMarketing: true, // Default to checked
  });

  // Step 2 data
  const [step2Data, setStep2Data] = useState<Step2Data>({
    companySize: '' as CompanySizeType,
    monthlySpend: '' as MonthlySpendType,
    weeklyHours: '' as WeeklyHoursType,
    teamSize: '' as TeamSizeType,
    currentTools: [],
    biggestChallenge: '',
    primaryGoal: '',
  });

  // Organize all social media tools by category
  const allSocialMediaTools = [
    ...SOCIAL_MEDIA_TOOLS.established,
    ...SOCIAL_MEDIA_TOOLS.ai_powered,
    ...SOCIAL_MEDIA_TOOLS.content_creation,
    ...SOCIAL_MEDIA_TOOLS.analytics,
    ...SOCIAL_MEDIA_TOOLS.other
  ];

  // Filter countries based on search
  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Fetch waitlist count on load
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const response = await fetch('/api/early-access');
        if (response.ok) {
          const data = await response.json();
          setWaitlistCount(data.count);
        }
      } catch (error) {
        console.error('Failed to fetch waitlist count:', error);
      }
    };

    fetchWaitlistCount();
  }, []);

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('');
      return true;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Phone number validation
  const validatePhoneNumber = (phone: string) => {
    // Remove all non-digits
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Basic validation - should have reasonable length
    if (!digitsOnly) {
      setPhoneError('');
      return true;
    }
    
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      setPhoneError('Please enter a valid phone number');
      return false;
    }
    
    setPhoneError('');
    return true;
  };

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    
    // Format based on country
    if (selectedCountry.code === 'US' || selectedCountry.code === 'CA') {
      // North American format: (XXX) XXX-XXXX
      if (digitsOnly.length >= 6) {
        return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
      } else if (digitsOnly.length >= 3) {
        return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
      } else {
        return digitsOnly;
      }
    } else {
      // International format: add spaces every 3-4 digits
      return digitsOnly.replace(/(\d{3,4})/g, '$1 ').trim();
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhoneNumber(formatted);
    validatePhoneNumber(value);
  };

  const handleEmailChange = (email: string) => {
    setStep1Data(prev => ({ ...prev, email }));
    validateEmail(email);
  };

  // Handle full name change and split into first/last
  const handleFullNameChange = (name: string) => {
    setFullName(name);
    const names = name.trim().split(/\s+/);
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || '';
    setStep1Data(prev => ({ ...prev, firstName, lastName }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const validateStep1 = () => {
    const { email, firstName, companyName, role, consentedToMarketing } = step1Data;
    
    if (!email || !firstName || !companyName || !role) {
      setMessage('Please fill in all required fields');
      return false;
    }
    
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address');
      return false;
    }
    
    if (!consentedToMarketing) {
      setMessage('You must consent to marketing emails to receive 3 free months');
      return false;
    }
    
    setMessage('');
    return true;
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...step1Data,
          ...step2Data,
          phoneNumber: phoneNumber ? `${selectedCountry.dialCode} ${phoneNumber}` : '',
          country: selectedCountry.name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message);
        setWaitlistCount(data.signupOrder);
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Failed to connect. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep2 = () => {
    const { companySize, monthlySpend, weeklyHours, teamSize, biggestChallenge, primaryGoal } = step2Data;
    
    if (!companySize || !monthlySpend || !weeklyHours || !teamSize || !biggestChallenge || !primaryGoal) {
      setMessage('Please fill in all required fields');
      return false;
    }
    
    setMessage('');
    return true;
  };

  const handleToolToggle = (tool: string) => {
    setStep2Data(prev => ({
      ...prev,
      currentTools: prev.currentTools.includes(tool)
        ? prev.currentTools.filter(t => t !== tool)
        : [...prev.currentTools, tool]
    }));
  };

  // Handle keyboard navigation for country search
  const handleCountrySearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredCountries.length > 0) {
      setSelectedCountry(filteredCountries[0]);
      setIsCountryDropdownOpen(false);
      setCountrySearch('');
    } else if (e.key === 'Escape') {
      setIsCountryDropdownOpen(false);
      setCountrySearch('');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to Campaign AI!</h2>
            <p className="text-gray-300 text-lg mb-6">
              You're #{waitlistCount} on the waitlist! We'll send you updates at {step1Data.email}
            </p>
            <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-300 mb-3">What's Next?</h3>
              <ul className="text-purple-200 space-y-2">
                <li>✨ 3 months free when we launch</li>
                <li>🚀 Early access to new features</li>
                <li>💬 Direct input on product development</li>
                <li>🎯 Priority customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Content Area */}
        <div className="text-white space-y-8">
          {/* Logo in top left */}
          <div className="flex items-center space-x-3 mb-8">
            <Image
              src="/logo.png"
              alt="Campaign AI Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-white text-2xl font-bold">Campaign.ai</span>
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center bg-purple-500/20 border border-purple-400/50 rounded-full px-4 py-2 text-purple-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
            Coming Soon
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Your AI-Powered
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Campaign
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Management Tool
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              AI-powered automated campaign management that works 24/7 to grow your brand across all social platforms
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI Content Creation</h3>
                <p className="text-gray-400">Tailored to your brand voice</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Smart Analytics</h3>
                <p className="text-gray-400">Real-time insights & tracking</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">24/7 Automation</h3>
                <p className="text-gray-400">Automated engagement & DMs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Be Among the First 1,000 Beta Testers
            </h2>
            <p className="text-gray-300">
              Sign on to be a beta tester for free unlimited access for 3 months!
            </p>
          </div>

          {/* Step 1 Form */}
          {currentStep === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      emailError ? 'border-red-500' : 'border-white/20'
                    }`}
                    placeholder="you@company.com"
                    value={step1Data.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                  />
                  {emailError && (
                    <p className="text-red-400 text-sm mt-1">{emailError}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => handleFullNameChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Acme Inc."
                    value={step1Data.companyName}
                    onChange={(e) => setStep1Data(prev => ({ ...prev, companyName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="flex">
                    {/* Country Selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="flex items-center px-3 py-3 bg-white/10 border border-white/20 rounded-l-lg border-r-0 focus:outline-none focus:ring-2 focus:ring-purple-500 h-12"
                      >
                        <span className="text-white text-sm mr-2">{selectedCountry.flag}</span>
                        <span className="text-white text-sm">{selectedCountry.dialCode}</span>
                        <svg className="w-4 h-4 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Country Dropdown */}
                      {isCountryDropdownOpen && (
                        <div className="absolute z-50 top-full left-0 w-80 bg-purple-900 border border-white/20 rounded-lg shadow-xl max-h-60 overflow-hidden">
                          <div className="p-3 border-b border-white/20">
                            <input
                              type="text"
                              placeholder="Search countries..."
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              onKeyDown={handleCountrySearchKeyDown}
                              autoFocus
                            />
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {filteredCountries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setIsCountryDropdownOpen(false);
                                  setCountrySearch('');
                                }}
                                className="w-full flex items-center px-3 py-2 hover:bg-white/10 text-left"
                              >
                                <span className="mr-3">{country.flag}</span>
                                <span className="text-white text-sm flex-1">{country.name}</span>
                                <span className="text-gray-400 text-sm">{country.dialCode}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <input
                      type="tel"
                      className={`flex-1 px-4 py-3 bg-white/10 border rounded-r-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-12 ${
                        phoneError ? 'border-red-500' : 'border-white/20'
                      }`}
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-red-400 text-sm mt-1">{phoneError}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role/Title *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={step1Data.role}
                    onChange={(e) => setStep1Data(prev => ({ ...prev, role: e.target.value as RoleType }))}
                  >
                    <option value="" className="bg-purple-900">Select an option</option>
                    {ROLE_OPTIONS.map(role => (
                      <option key={role.value} value={role.value} className="bg-purple-900">
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    How did you hear about us?
                  </label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="" className="bg-purple-900">Select an option</option>
                    {REFERRAL_OPTIONS.map(option => (
                      <option key={option.value} value={option.value} className="bg-purple-900">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-5 h-5 text-purple-600 bg-white/10 border border-white/20 rounded focus:ring-purple-500"
                    checked={step1Data.consentedToMarketing}
                    onChange={(e) => setStep1Data(prev => ({ ...prev, consentedToMarketing: e.target.checked }))}
                  />
                  <div className="flex-1">
                    <label className="text-sm text-gray-300">
                      <strong className="text-white">Required:</strong> I agree to receive marketing communications about Campaign AI. 
                      <strong className="text-purple-300"> This is mandatory to qualify for 3 free months when we launch.</strong>
                    </label>
                    <p className="text-xs text-gray-400 mt-1">
                      You can unsubscribe at any time. We respect your privacy and will only send relevant updates.
                    </p>
                  </div>
                </div>
              </div>

              {message && (
                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
              >
                Join the Beta Waitlist
              </button>

              <div className="text-center text-sm text-gray-400">
                By signing up, you agree to our{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300 underline">Privacy Policy</a>{' '}
                and{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300 underline">Terms of Service</a>
              </div>
            </form>
          )}

          {/* Step 2 Form */}
          {currentStep === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Tell us about your social media management</h3>
                <p className="text-gray-300 text-sm">This helps us tailor Campaign AI to your specific needs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Size *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={step2Data.companySize}
                    onChange={(e) => setStep2Data(prev => ({ ...prev, companySize: e.target.value as CompanySizeType }))}
                  >
                    <option value="" className="bg-purple-900">Select size</option>
                    {COMPANY_SIZE_OPTIONS.map(size => (
                      <option key={size.value} value={size.value} className="bg-purple-900">
                        {size.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Monthly Social Media Tools & Staff Spend *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={step2Data.monthlySpend}
                    onChange={(e) => setStep2Data(prev => ({ ...prev, monthlySpend: e.target.value as MonthlySpendType }))}
                  >
                    <option value="" className="bg-purple-900">Select spend</option>
                    {MONTHLY_SPEND_OPTIONS.map(spend => (
                      <option key={spend.value} value={spend.value} className="bg-purple-900">
                        {spend.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">
                    Include staff salaries, freelancers, and tool subscriptions (not ad spend)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Weekly Hours on Social Media Management *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={step2Data.weeklyHours}
                    onChange={(e) => setStep2Data(prev => ({ ...prev, weeklyHours: e.target.value as WeeklyHoursType }))}
                  >
                    <option value="" className="bg-purple-900">Select hours</option>
                    {WEEKLY_HOURS_OPTIONS.map(hours => (
                      <option key={hours.value} value={hours.value} className="bg-purple-900">
                        {hours.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">
                    Total time spent creating, scheduling, and managing social media content
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Social Media Team Size *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={step2Data.teamSize}
                    onChange={(e) => setStep2Data(prev => ({ ...prev, teamSize: e.target.value as TeamSizeType }))}
                  >
                    <option value="" className="bg-purple-900">Select team size</option>
                    {TEAM_SIZE_OPTIONS.map(team => (
                      <option key={team.value} value={team.value} className="bg-purple-900">
                        {team.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">
                    People dedicated to social media management (full-time, part-time, or freelance)
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Social Media Management Tools (select all that apply)
                </label>
                <div className="max-h-64 overflow-y-auto space-y-4">
                  {/* Established Social Media Platforms */}
                  <div>
                    <h4 className="text-sm font-medium text-purple-300 mb-2">Established Platforms</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {SOCIAL_MEDIA_TOOLS.established.map(tool => (
                        <label key={tool} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 bg-white/10 border border-white/20 rounded focus:ring-purple-500"
                            checked={step2Data.currentTools.includes(tool)}
                            onChange={() => handleToolToggle(tool)}
                          />
                          <span className="text-sm text-gray-300">{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* AI-Powered Tools */}
                  <div>
                    <h4 className="text-sm font-medium text-purple-300 mb-2">AI-Powered Tools</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {SOCIAL_MEDIA_TOOLS.ai_powered.map(tool => (
                        <label key={tool} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 bg-white/10 border border-white/20 rounded focus:ring-purple-500"
                            checked={step2Data.currentTools.includes(tool)}
                            onChange={() => handleToolToggle(tool)}
                          />
                          <span className="text-sm text-gray-300">{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Content Creation */}
                  <div>
                    <h4 className="text-sm font-medium text-purple-300 mb-2">Content Creation</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {SOCIAL_MEDIA_TOOLS.content_creation.map(tool => (
                        <label key={tool} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 bg-white/10 border border-white/20 rounded focus:ring-purple-500"
                            checked={step2Data.currentTools.includes(tool)}
                            onChange={() => handleToolToggle(tool)}
                          />
                          <span className="text-sm text-gray-300">{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Analytics & Reporting */}
                  <div>
                    <h4 className="text-sm font-medium text-purple-300 mb-2">Analytics & Reporting</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {SOCIAL_MEDIA_TOOLS.analytics.map(tool => (
                        <label key={tool} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 bg-white/10 border border-white/20 rounded focus:ring-purple-500"
                            checked={step2Data.currentTools.includes(tool)}
                            onChange={() => handleToolToggle(tool)}
                          />
                          <span className="text-sm text-gray-300">{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Other Options */}
                  <div>
                    <h4 className="text-sm font-medium text-purple-300 mb-2">Other</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {SOCIAL_MEDIA_TOOLS.other.map(tool => (
                        <label key={tool} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 bg-white/10 border border-white/20 rounded focus:ring-purple-500"
                            checked={step2Data.currentTools.includes(tool)}
                            onChange={() => handleToolToggle(tool)}
                          />
                          <span className="text-sm text-gray-300">{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Biggest Social Media Management Challenge *
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Creating consistent content, managing multiple platforms, analyzing performance, engaging with followers..."
                  value={step2Data.biggestChallenge}
                  onChange={(e) => setStep2Data(prev => ({ ...prev, biggestChallenge: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Primary Social Media Goal *
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Increase brand awareness, generate leads, boost engagement, save time on content creation, grow followers..."
                  value={step2Data.primaryGoal}
                  onChange={(e) => setStep2Data(prev => ({ ...prev, primaryGoal: e.target.value }))}
                />
              </div>

              {message && (
                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  {message}
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting ? 'Joining...' : 'Complete Signup'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isCountryDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsCountryDropdownOpen(false)}
        />
      )}
    </div>
  );
}