import React from 'react';
import { 
  MousePointerClick, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Wifi, 
  Layers, 
  ArrowRight,
  Check
} from 'lucide-react';
import { ScreenMode, BrandTheme } from '../types';

interface FeaturesSectionProps {
  onNavigate: (screen: ScreenMode) => void;
  theme: BrandTheme;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onNavigate, theme }) => {
  const isDark = theme === 'dark';

  const features = [
    {
      icon: MousePointerClick,
      tag: 'Core Intelligence',
      title: 'Wisdom In Every Click',
      description:
        'Transform anonymous clicks into deep behavioral insights. Automatic intent clustering, drop-off detection, and conversion friction scoring.',
      perks: ['Rage & Dead Click Detection', 'Micro-Interaction Heatmaps', 'Smart Journey Mapping'],
    },
    {
      icon: Clock,
      tag: 'Time & Session Analytics',
      title: 'Time Intelligence & Focus Tracking',
      description:
        'Inspired by our signature analog focus clock, measure dwell time, active cognitive focus, and workflow velocity across your entire user base.',
      perks: ['Dwell-time Heat Mapping', 'Session Productivity Metrics', 'Team Focus Timer'],
    },
    {
      icon: Wifi,
      tag: 'Real-time Telemetry',
      title: 'Instant Signal Streaming',
      description:
        'Reflecting the owl Wi-Fi broadcast signal in our brand mark, every interaction streams with sub-50ms latency straight to your workspace.',
      perks: ['Sub-second Event Ingestion', 'Live Visitor Ping Feed', 'Zero Performance Overhead'],
    },
    {
      icon: Layers,
      tag: 'Ready Workspace',
      title: 'Instant Workspace Deployment',
      description:
        '“Your Workspace is Ready” within seconds. Pre-configured dashboards, shared team notebooks, and frictionless team onboarding.',
      perks: ['Pre-built Analytics Templates', 'Role-Based Access Control', '1-Click Team Invites'],
    },
    {
      icon: ShieldCheck,
      tag: 'Verified Security',
      title: '6-Digit MFA Verification',
      description:
        'Built with consumer-grade simplicity and enterprise-grade security. Passwordless 6-digit email confirmation codes with smart fraud shields.',
      perks: ['6-Digit Cryptographic Codes', 'Google Single Sign-On', 'SOC2 Compliant Encryption'],
    },
    {
      icon: Sparkles,
      tag: 'Brand Cohesion',
      title: 'Designed Around ClickOwl Identity',
      description:
        'Crafted specifically from the ClickOwl brand mascot, high-contrast golden-yellow palette, and curved dual-card design system.',
      perks: ['Dark & Light Theme Parity', 'Mobile-Responsive Shell', 'Accessible High Contrast'],
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/15 text-amber-600 dark:text-amber-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built For Precision</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Outfit'] text-neutral-950 dark:text-white">
            Engineered for Clear Vision & Fast Decisions
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300">
            Every feature in ClickOwl is calibrated to turn raw user interaction into actionable product intelligence.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`p-7 sm:p-8 rounded-[28px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group ${
                  isDark
                    ? 'bg-neutral-900/80 border-neutral-800 hover:border-amber-400/40 hover:shadow-black/60'
                    : 'bg-white border-slate-200/90 hover:border-amber-300 hover:shadow-slate-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-neutral-900 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-amber-500" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2.5">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-neutral-800/80 space-y-2">
                  {feature.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div
          className={`mt-16 p-8 sm:p-12 rounded-[32px] border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 ${
            isDark
              ? 'bg-neutral-900 border-neutral-800'
              : 'bg-slate-100/90 border-slate-200'
          }`}
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Ready to see ClickOwl in action?
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-lg">
              Explore our interactive click heatmap playground below or jump straight into the verified workspace setup.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('signup')}
              className="px-6 py-3 text-sm font-bold rounded-xl bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/20"
            >
              Create Free Workspace
            </button>
            <button
              onClick={() => onNavigate('signin')}
              className={`px-5 py-3 text-sm font-semibold rounded-xl border transition-colors ${
                isDark ? 'border-neutral-700 text-white hover:bg-neutral-800' : 'border-slate-300 text-slate-800 hover:bg-white'
              }`}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
