import React from 'react';
import { ScreenMode, BrandTheme } from '../../types';
import { ClickOwlLogo } from '../ClickOwlLogo';
import { ArrowLeft, Sun, Moon, ShieldCheck, HelpCircle } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  currentScreen: ScreenMode;
  onNavigate: (screen: ScreenMode) => void;
  theme: BrandTheme;
  onToggleTheme: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  currentScreen,
  onNavigate,
  theme,
  onToggleTheme,
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      id="auth-standalone-layout"
      className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${
        isDark ? 'bg-neutral-950 text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Dedicated Auth Header - completely separate from the website header */}
      <header
        id="auth-dedicated-header"
        className={`w-full py-4 px-4 sm:px-8 border-b transition-colors ${
          isDark
            ? 'bg-neutral-900/60 border-neutral-800/80 backdrop-blur-md'
            : 'bg-white/80 border-slate-200/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Brand Logo & Back to Website Link */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div
              onClick={() => onNavigate('homepage')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
              role="button"
              tabIndex={0}
              aria-label="ClickOwl Homepage"
            >
              <ClickOwlLogo theme={theme} variant="horizontal" size="sm" />
            </div>

            <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700 hidden sm:block" />

            <button
              onClick={() => onNavigate('homepage')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
              id="auth-back-to-website-btn"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </button>
          </div>

          {/* Right Controls: Quick Auth Tabs, Security Tag & Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Quick Auth Switcher */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-neutral-200/70 dark:bg-neutral-800/80 border border-neutral-300/60 dark:border-neutral-700/60 text-xs font-semibold">
              <button
                onClick={() => onNavigate('signin')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currentScreen === 'signin'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white font-bold shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currentScreen === 'signup'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white font-bold shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => onNavigate('verify')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currentScreen === 'verify'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white font-bold shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Verify Code
              </button>
            </div>

            {/* Security Indicator */}
            <div className="hidden md:flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>256-Bit SSL Secured</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition-colors ${
                isDark
                  ? 'border-neutral-800 bg-neutral-850 hover:bg-neutral-800 text-amber-400'
                  : 'border-slate-200 bg-white hover:bg-slate-100 text-amber-600'
              }`}
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area: Centering the Exact Mockup Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative">
        {/* Subtle ambient light glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="w-full max-w-5xl mx-auto">
          {children}
        </div>
      </main>

      {/* Dedicated Minimal Auth Footer - completely independent from website footer */}
      <footer
        id="auth-dedicated-footer"
        className={`w-full py-4 px-4 sm:px-8 border-t text-xs transition-colors ${
          isDark
            ? 'bg-neutral-900/40 border-neutral-800/80 text-neutral-500'
            : 'bg-white/60 border-slate-200 text-slate-500'
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              ClickOwl Auth Portal
            </span>
            <span>•</span>
            <span>© {new Date().getFullYear()} ClickOwl Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium">
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-amber-500 transition-colors">
              Terms of Service
            </a>
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-amber-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#help" onClick={(e) => e.preventDefault()} className="hover:text-amber-500 transition-colors">
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
