import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { ScreenMode, BrandTheme } from '../types';

interface PricingSectionProps {
  onNavigate: (screen: ScreenMode) => void;
  theme: BrandTheme;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onNavigate, theme }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const isDark = theme === 'dark';

  const plans = [
    {
      name: 'Nest Starter',
      desc: 'Perfect for individual founders and prototypes.',
      price: isAnnual ? 0 : 0,
      period: 'Forever free',
      badge: 'Free Tier',
      isPopular: false,
      features: [
        'Up to 25,000 monthly clicks',
        'Basic click heatmaps',
        '30-day data retention',
        '6-digit email confirmation',
        '1 Workspace member',
      ],
      buttonText: 'Start Free',
      screenTarget: 'signup' as ScreenMode,
    },
    {
      name: 'Night Owl Pro',
      desc: 'For growing teams requiring deep wisdom and time analytics.',
      price: isAnnual ? 29 : 39,
      period: 'per month, billed annually',
      badge: 'Most Popular',
      isPopular: true,
      features: [
        '500,000 monthly clicks',
        'Real-time Wi-Fi signal streaming',
        'Full time & focus tracking clock',
        'Rage & dead-click intelligence',
        'Up to 10 Workspace members',
        'Priority technical support',
      ],
      buttonText: 'Start Pro Workspace',
      screenTarget: 'signup' as ScreenMode,
    },
    {
      name: 'Apex Owl Enterprise',
      desc: 'Dedicated telemetry, custom retention, and SSO governance.',
      price: isAnnual ? 99 : 129,
      period: 'per month, billed annually',
      badge: 'Enterprise',
      isPopular: false,
      features: [
        'Unlimited monthly clicks',
        'Custom telemetry sampling',
        'Google & SAML Single Sign-On',
        'Dedicated account strategist',
        'Unlimited Workspace members',
        'Custom domain & SOC2 audit logs',
      ],
      buttonText: 'Contact Sales',
      screenTarget: 'signup' as ScreenMode,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/15 text-amber-600 dark:text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clear, Transparent Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Outfit'] text-neutral-950 dark:text-white">
            Choose Your ClickOwl Plan
          </h2>

          <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-300">
            Every plan includes our signature intelligence engine with zero hidden fees.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                !isAnnual
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                isAnnual
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-amber-400 text-neutral-950">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-[32px] p-8 border flex flex-col justify-between relative transition-all duration-300 hover:shadow-2xl ${
                plan.isPopular
                  ? isDark
                    ? 'bg-neutral-900 border-amber-400 shadow-amber-400/10 ring-2 ring-amber-400/40'
                    : 'bg-white border-amber-400 shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/40'
                  : isDark
                  ? 'bg-neutral-900/60 border-neutral-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-neutral-950 text-xs font-black uppercase tracking-wider shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                    {plan.name}
                  </h3>
                  {!plan.isPopular && (
                    <span className="text-[11px] font-bold text-neutral-500 uppercase">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-6">
                  {plan.desc}
                </p>

                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-neutral-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black font-['Outfit'] text-neutral-950 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-xs text-neutral-500">/month</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1">{plan.period}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                      <div className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-500 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate(plan.screenTarget)}
                className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  plan.isPopular
                    ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300 shadow-md shadow-amber-400/25'
                    : isDark
                    ? 'bg-neutral-800 text-white hover:bg-neutral-700'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <span>{plan.buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
