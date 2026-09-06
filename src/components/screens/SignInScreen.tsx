import React, { useState } from 'react';
import { ClickOwlLogo } from '../ClickOwlLogo';
import { AnalyticsWatermark } from '../AnalyticsWatermark';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { ScreenMode, BrandTheme } from '../../types';

interface SignInScreenProps {
  onNavigate: (screen: ScreenMode) => void;
  theme: BrandTheme;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ onNavigate, theme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate sign in flow -> take to workspace dashboard
    setTimeout(() => {
      onNavigate('dashboard');
    }, 600);
  };

  const isDark = theme === 'dark';

  return (
    <div id="signin-screen-container" className="w-full py-4 sm:py-8">
      {/* Two-Column Mockup Card Layout matching 'Sign In.png' */}
      <div
        className={`grid grid-cols-1 md:grid-cols-12 rounded-[32px] overflow-hidden border shadow-2xl transition-all ${
          isDark
            ? 'bg-neutral-900/95 border-neutral-800 shadow-black/50'
            : 'bg-white border-slate-200/90 shadow-xl shadow-slate-200/50'
        }`}
      >
          {/* Left Column (Grey Curved Card matching 'Sign In.png') */}
          <div className="md:col-span-5 bg-[#dcdcdc] dark:bg-neutral-800/95 text-neutral-900 dark:text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden min-h-[500px] rounded-t-[32px] md:rounded-tr-none md:rounded-l-[32px] border-b md:border-b-0 md:border-r border-neutral-300 dark:border-neutral-700">
            {/* Top Logo & Title */}
            <div className="relative z-10 space-y-6">
              <ClickOwlLogo theme={isDark ? 'dark' : 'light'} variant="full" size="md" />

              <div className="pt-4">
                <p className="text-2xl sm:text-3xl font-normal text-neutral-800 dark:text-neutral-200">
                  Welcome to
                </p>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
                  ClickOwl
                </h1>
              </div>
            </div>

            {/* Bottom Mockup Watermark Graphic */}
            <div className="relative z-0 mt-8">
              <AnalyticsWatermark
                color={isDark ? '#525252' : '#9ca3af'}
                opacity={isDark ? 0.4 : 0.65}
                className="w-full max-w-[280px] mx-auto transform translate-y-4"
              />
            </div>
          </div>

          {/* Right Column (Sign In Form matching 'Sign In.png') */}
          <div className="md:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center mb-8 text-neutral-900 dark:text-white">
                Sign In
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-neutral-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    id="signin-email-input"
                    className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-neutral-800 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-neutral-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    id="signin-password-input"
                    className="w-full pl-11 pr-11 py-3 text-sm rounded-xl border border-neutral-800 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Sign In Button (Mockup styling: muted grey rounded button) */}
                <button
                  type="submit"
                  id="signin-submit-btn"
                  className="w-full py-3.5 text-sm font-semibold rounded-xl bg-[#dcdcdc] dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors shadow-sm mt-2 cursor-pointer"
                >
                  {submitted ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              {/* OR Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-neutral-300 dark:border-neutral-700"></div>
                <span className="px-4 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  or
                </span>
                <div className="flex-1 border-t border-neutral-300 dark:border-neutral-700"></div>
              </div>

              {/* Sign In With Google Button */}
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                id="signin-google-btn"
                className="w-full py-3 px-4 text-sm font-semibold rounded-xl border border-neutral-800 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {/* Google G Logo SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Sign In with Google</span>
              </button>

              {/* Toggle to Sign Up */}
              <p className="text-center text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-6">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('signup')}
                  className="font-bold text-neutral-900 dark:text-white underline hover:text-amber-500 transition-colors"
                >
                  Create an Account
                </button>
              </p>
            </div>
          </div>
        </div>
    </div>
  );
};
