import React from 'react';
import { ScreenMode } from '../../types';
import { ClickOwlLogo } from '../ClickOwlLogo';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  currentScreen: ScreenMode;
  onNavigate: (screen: ScreenMode) => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  currentScreen,
  onNavigate,
}) => {
  return (
    <div
      id="auth-standalone-layout"
      className="min-h-screen flex flex-col justify-between transition-colors duration-300 bg-[#f8fafc] text-slate-900"
    >
      <header
        id="auth-dedicated-header"
        className="w-full py-4 px-4 sm:px-8 border-b transition-colors bg-white/80 border-slate-200/80 backdrop-blur-md"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <div
              onClick={() => onNavigate('signin')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
              role="button"
              tabIndex={0}
              aria-label="ClickOwl"
            >
              <ClickOwlLogo variant="horizontal" size="sm" />
            </div>

            <div className="h-4 w-px bg-neutral-300 hidden sm:block" />

            <button
              onClick={() => onNavigate('signin')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
              id="auth-back-to-signin-btn"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-neutral-200/70 border border-neutral-300/60 text-xs font-semibold">
              <button
                onClick={() => onNavigate('signin')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currentScreen === 'signin'
                    ? 'bg-white text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currentScreen === 'signup'
                    ? 'bg-white text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => onNavigate('verify')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currentScreen === 'verify'
                    ? 'bg-white text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                Verify Code
              </button>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>256-Bit SSL Secured</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="w-full max-w-5xl mx-auto">
          {children}
        </div>
      </main>

      <footer
        id="auth-dedicated-footer"
        className="w-full py-4 px-4 sm:px-8 border-t text-xs transition-colors bg-white/60 border-slate-200 text-slate-500"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-700">
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
