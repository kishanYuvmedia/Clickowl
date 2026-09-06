import React, { useState } from 'react';
import { ScreenMode, BrandTheme } from '../types';
import { ClickOwlLogo } from './ClickOwlLogo';
import { AnalyticsWatermark } from './AnalyticsWatermark';
import { 
  LogIn, 
  UserPlus, 
  Mail, 
  AlertCircle, 
  LayoutDashboard, 
  Maximize2, 
  Check, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ScreensShowcaseProps {
  onNavigate: (screen: ScreenMode) => void;
  theme: BrandTheme;
}

export const ScreensShowcase: React.FC<ScreensShowcaseProps> = ({ onNavigate, theme }) => {
  const [activeScreenTab, setActiveScreenTab] = useState<'signin' | 'signup' | 'verify' | 'wrongcode' | 'dashboard'>('signin');

  const isDark = theme === 'dark';

  return (
    <section id="mockups-showcase" className="py-20 relative border-t border-slate-200/60 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/15 text-amber-600 dark:text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exact Design Mockup Match</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Outfit'] text-neutral-950 dark:text-white">
            Design Screens & Authentication Flow
          </h2>

          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            Crafted strictly in accordance with your logo and mockup specs. Select any screen below or launch full view.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'signin', label: '1. Sign In', icon: LogIn },
            { id: 'signup', label: '2. Sign Up', icon: UserPlus },
            { id: 'verify', label: '3. Mail Confirmation', icon: Mail },
            { id: 'wrongcode', label: '4. Invalid Code Alert', icon: AlertCircle },
            { id: 'dashboard', label: '5. Welcome Dashboard', icon: LayoutDashboard },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeScreenTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveScreenTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20 scale-105'
                    : isDark
                    ? 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mockup Preview Stage */}
        <div
          className={`rounded-[32px] border overflow-hidden shadow-2xl transition-all ${
            isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Top Bar with "Launch Fullscreen" CTA */}
          <div
            className={`px-6 py-4 border-b flex items-center justify-between ${
              isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Screen Mode:
              </span>
              <span className="text-xs font-bold text-amber-500 capitalize">
                {activeScreenTab}
              </span>
            </div>

            <button
              onClick={() => {
                if (activeScreenTab === 'signin') onNavigate('signin');
                else if (activeScreenTab === 'signup') onNavigate('signup');
                else if (activeScreenTab === 'verify' || activeScreenTab === 'wrongcode') onNavigate('verify');
                else if (activeScreenTab === 'dashboard') onNavigate('dashboard');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold hover:bg-amber-400 hover:text-neutral-950 dark:hover:bg-amber-400 dark:hover:text-neutral-950 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Open as Full View</span>
            </button>
          </div>

          {/* Screen Content Preview */}
          <div className="p-6 sm:p-10">
            {activeScreenTab === 'signin' && (
              <div className="grid grid-cols-1 md:grid-cols-12 rounded-[28px] overflow-hidden border border-neutral-300 dark:border-neutral-700 max-w-4xl mx-auto shadow-lg">
                <div className="md:col-span-5 bg-[#dcdcdc] dark:bg-neutral-800 p-8 flex flex-col justify-between min-h-[380px]">
                  <div>
                    <ClickOwlLogo theme={isDark ? 'dark' : 'light'} variant="full" size="sm" />
                    <div className="mt-8">
                      <p className="text-xl font-normal text-neutral-800 dark:text-neutral-200">Welcome to</p>
                      <h3 className="text-2xl font-black text-neutral-950 dark:text-white mt-0.5">ClickOwl</h3>
                    </div>
                  </div>
                  <AnalyticsWatermark color={isDark ? '#525252' : '#9ca3af'} opacity={0.6} className="w-48 mx-auto" />
                </div>
                <div className="md:col-span-7 p-8 flex flex-col justify-center bg-white dark:bg-neutral-900">
                  <h3 className="text-2xl font-black text-center mb-6 text-neutral-900 dark:text-white">Sign In</h3>
                  <div className="space-y-3 max-w-sm mx-auto w-full">
                    <div className="p-3 text-xs rounded-xl border border-neutral-800 dark:border-neutral-700 text-neutral-500">
                      ✉️ Email
                    </div>
                    <div className="p-3 text-xs rounded-xl border border-neutral-800 dark:border-neutral-700 text-neutral-500">
                      🔒 Password
                    </div>
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="w-full py-3 text-xs font-bold rounded-xl bg-[#dcdcdc] dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-300 transition-colors"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeScreenTab === 'signup' && (
              <div className="grid grid-cols-1 md:grid-cols-12 rounded-[28px] overflow-hidden border border-neutral-300 dark:border-neutral-700 max-w-4xl mx-auto shadow-lg">
                <div className="md:col-span-5 bg-[#dcdcdc] dark:bg-neutral-800 p-8 flex flex-col justify-between min-h-[380px]">
                  <div>
                    <ClickOwlLogo theme={isDark ? 'dark' : 'light'} variant="full" size="sm" />
                    <div className="mt-8">
                      <p className="text-xl font-normal text-neutral-800 dark:text-neutral-200">Welcome to</p>
                      <h3 className="text-2xl font-black text-neutral-950 dark:text-white mt-0.5">ClickOwl</h3>
                    </div>
                  </div>
                  <AnalyticsWatermark color={isDark ? '#525252' : '#9ca3af'} opacity={0.6} className="w-48 mx-auto" />
                </div>
                <div className="md:col-span-7 p-8 flex flex-col justify-center bg-white dark:bg-neutral-900">
                  <h3 className="text-2xl font-black text-center mb-4 text-neutral-900 dark:text-white">Sign Up</h3>
                  <div className="space-y-2.5 max-w-sm mx-auto w-full text-xs">
                    <div className="p-2.5 rounded-xl border border-neutral-800 dark:border-neutral-700 text-neutral-500">
                      ✉️ Email
                    </div>
                    <div className="p-2.5 rounded-xl border border-neutral-800 dark:border-neutral-700 text-neutral-500">
                      🔒 Password
                    </div>
                    <div className="p-2.5 rounded-xl border border-neutral-800 dark:border-neutral-700 text-neutral-500">
                      🔒 Confirm Password
                    </div>
                    <button
                      onClick={() => onNavigate('verify')}
                      className="w-full py-3 text-xs font-bold rounded-xl bg-[#dcdcdc] dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-300 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeScreenTab === 'verify' && (
              <div className="grid grid-cols-1 md:grid-cols-12 rounded-[28px] overflow-hidden border border-neutral-300 dark:border-neutral-700 max-w-4xl mx-auto shadow-lg">
                <div className="md:col-span-5 bg-[#dcdcdc] dark:bg-neutral-800 p-8 flex flex-col justify-between min-h-[380px]">
                  <div>
                    <ClickOwlLogo theme={isDark ? 'dark' : 'light'} variant="full" size="sm" />
                    <div className="mt-8">
                      <p className="text-xl font-normal text-neutral-800 dark:text-neutral-200">Welcome to</p>
                      <h3 className="text-2xl font-black text-neutral-950 dark:text-white mt-0.5">ClickOwl</h3>
                    </div>
                  </div>
                  <AnalyticsWatermark color={isDark ? '#525252' : '#9ca3af'} opacity={0.6} className="w-48 mx-auto" />
                </div>
                <div className="md:col-span-7 p-8 flex flex-col justify-center text-center bg-white dark:bg-neutral-900">
                  <h3 className="text-2xl font-black text-neutral-900 dark:text-white mb-2">Check Your Mail</h3>
                  <p className="text-xs text-neutral-500 mb-6">
                    We sent a 6-digit code to johndoe@xyz.con.<br />Enter it below to verify your account.
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-8 h-10 rounded-lg bg-[#dcdcdc] dark:bg-neutral-800" />
                    ))}
                    <span>-</span>
                    {[3, 4, 5].map((i) => (
                      <div key={i} className="w-8 h-10 rounded-lg bg-[#dcdcdc] dark:bg-neutral-800" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-500 mb-4">Resend code in 05:00</p>
                  <button
                    onClick={() => onNavigate('verify')}
                    className="max-w-xs mx-auto w-full py-2.5 text-xs font-bold rounded-xl border border-neutral-800 dark:border-neutral-600 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    Verify Email
                  </button>
                </div>
              </div>
            )}

            {activeScreenTab === 'wrongcode' && (
              <div className="grid grid-cols-1 md:grid-cols-12 rounded-[28px] overflow-hidden border border-neutral-300 dark:border-neutral-700 max-w-4xl mx-auto shadow-lg">
                <div className="md:col-span-5 bg-[#dcdcdc] dark:bg-neutral-800 p-8 flex flex-col justify-between min-h-[380px]">
                  <div>
                    <ClickOwlLogo theme={isDark ? 'dark' : 'light'} variant="full" size="sm" />
                    <div className="mt-8">
                      <p className="text-xl font-normal text-neutral-800 dark:text-neutral-200">Welcome to</p>
                      <h3 className="text-2xl font-black text-neutral-950 dark:text-white mt-0.5">ClickOwl</h3>
                    </div>
                  </div>
                  <AnalyticsWatermark color={isDark ? '#525252' : '#9ca3af'} opacity={0.6} className="w-48 mx-auto" />
                </div>
                <div className="md:col-span-7 p-8 flex flex-col justify-center text-center bg-white dark:bg-neutral-900">
                  <h3 className="text-2xl font-black text-neutral-900 dark:text-white mb-2">Check Your Mail</h3>
                  <p className="text-xs text-neutral-500 mb-6">
                    We sent a 6-digit code to johndoe@xyz.con.<br />Enter it below to verify your account.
                  </p>
                  {/* Invalid Red Boxes from 'Wronf Code.png' */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {['1', '2', '4'].map((digit, i) => (
                      <div key={i} className="w-8 h-10 rounded-lg border-2 border-red-500 flex items-center justify-center font-bold text-sm text-neutral-900 dark:text-white">
                        {digit}
                      </div>
                    ))}
                    <span>-</span>
                    {['4', '6', '6'].map((digit, i) => (
                      <div key={i} className="w-8 h-10 rounded-lg border-2 border-red-500 flex items-center justify-center font-bold text-sm text-neutral-900 dark:text-white">
                        {digit}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white mb-4">
                    Invalid Code ! <span className="underline cursor-pointer">Resend ?</span>
                  </p>
                  <button
                    onClick={() => onNavigate('verify')}
                    className="max-w-xs mx-auto w-full py-2.5 text-xs font-bold rounded-xl border border-neutral-800 dark:border-neutral-600 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    Verify Email
                  </button>
                </div>
              </div>
            )}

            {activeScreenTab === 'dashboard' && (
              <div className="border border-neutral-300 dark:border-neutral-700 rounded-2xl overflow-hidden max-w-4xl mx-auto shadow-lg">
                <div className="bg-[#dcdcdc] dark:bg-neutral-800 p-3 border-b border-neutral-300 dark:border-neutral-700 flex justify-between items-center text-xs font-bold">
                  <span>ClickOwl Console Header</span>
                  <span className="text-neutral-600 dark:text-neutral-300">Workspace Ready</span>
                </div>
                <div className="flex flex-col sm:flex-row min-h-[300px]">
                  <div className="w-full sm:w-56 bg-[#dcdcdc] dark:bg-neutral-800 p-4 border-r border-neutral-300 dark:border-neutral-700 flex flex-col justify-between">
                    <ClickOwlLogo theme={isDark ? 'dark' : 'light'} variant="horizontal" size="sm" />
                    <AnalyticsWatermark color={isDark ? '#404040' : '#9ca3af'} opacity={0.6} className="w-36 mx-auto" />
                  </div>
                  <div className="flex-1 p-8 flex flex-col items-center justify-center text-center bg-white dark:bg-neutral-900">
                    <h3 className="text-3xl font-black text-neutral-950 dark:text-white mb-3">
                      Your Workspace is Ready
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-md mb-6">
                      Click the button below to explore the fully functional dashboard with clickstream metrics and time intelligence.
                    </p>
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="px-6 py-2.5 rounded-xl bg-amber-400 text-neutral-950 font-bold text-xs hover:bg-amber-300 transition-colors"
                    >
                      Enter Workspace Console
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
