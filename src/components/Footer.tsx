import React from 'react';
import { ClickOwlLogo } from './ClickOwlLogo';
import { ScreenMode, BrandTheme } from '../types';
import { Heart, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenMode) => void;
  theme: BrandTheme;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, theme }) => {
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        isDark
          ? 'bg-neutral-950 border-neutral-800/80 text-neutral-400'
          : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}
      id="main-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <ClickOwlLogo theme={theme} variant="full" size="md" />
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm leading-relaxed">
              ClickOwl is the intelligent workspace analytics platform turning every interaction into clarity. Wisdom in every click.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-500 font-semibold pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational • SOC-2 Type II</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-amber-500 transition-colors">
                  Features Overview
                </a>
              </li>
              <li>
                <a href="#interactive-playground" className="hover:text-amber-500 transition-colors">
                  Click Heatmaps
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-500 transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Workspace Console
                </button>
              </li>
            </ul>
          </div>

          {/* Screens / Mockups Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Design Screens
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('signin')}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Sign In Screen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('signup')}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Sign Up Screen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('verify')}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Mail Confirmation Screen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Welcome Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Trust & Privacy
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-amber-500 cursor-pointer">Security Overview</li>
              <li className="hover:text-amber-500 cursor-pointer">Terms of Service</li>
              <li className="hover:text-amber-500 cursor-pointer">Privacy Notice</li>
              <li className="hover:text-amber-500 cursor-pointer">GDPR Compliance</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} ClickOwl Technologies Inc. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="text-neutral-500">“Wisdom In Every Click”</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
