import React, { useState, useEffect } from 'react';
import { ClickOwlLogo } from './ClickOwlLogo';
import { ScreenMode, BrandTheme } from '../types';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Layers, 
  ChevronDown, 
  LogIn, 
  UserPlus, 
  CheckCircle2, 
  LayoutDashboard, 
  Sparkles,
  ArrowRight,
  MousePointerClick
} from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenMode;
  onNavigate: (screen: ScreenMode) => void;
  theme: BrandTheme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  theme,
  onToggleTheme,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScreenMenuOpen, setIsScreenMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  const screenOptions: { id: ScreenMode; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'homepage', label: 'Homepage UI', icon: MousePointerClick, badge: 'Main' },
    { id: 'signin', label: 'Sign In Screen', icon: LogIn },
    { id: 'signup', label: 'Sign Up Screen', icon: UserPlus },
    { id: 'verify', label: 'Mail Verification', icon: CheckCircle2 },
    { id: 'dashboard', label: 'Workspace Ready', icon: LayoutDashboard },
  ];

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 shadow-lg shadow-black/20'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : isDark
          ? 'bg-transparent'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('homepage')}
            role="button"
            tabIndex={0}
            aria-label="ClickOwl Home"
          >
            <ClickOwlLogo 
              theme={theme} 
              variant="full" 
              size="md" 
              animated={true}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => onNavigate('homepage')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentScreen === 'homepage'
                  ? isDark
                    ? 'text-amber-400 bg-neutral-900/80'
                    : 'text-neutral-900 bg-slate-100'
                  : isDark
                  ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Overview
            </button>

            <a
              href="#features"
              onClick={(e) => {
                if (currentScreen !== 'homepage') {
                  e.preventDefault();
                  onNavigate('homepage');
                  setTimeout(() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isDark ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Features
            </a>

            <a
              href="#analytics-preview"
              onClick={(e) => {
                if (currentScreen !== 'homepage') {
                  e.preventDefault();
                  onNavigate('homepage');
                  setTimeout(() => {
                    document.getElementById('analytics-preview')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isDark ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Workspace Analytics
            </a>

            <a
              href="#interactive-playground"
              onClick={(e) => {
                if (currentScreen !== 'homepage') {
                  e.preventDefault();
                  onNavigate('homepage');
                  setTimeout(() => {
                    document.getElementById('interactive-playground')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isDark ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Click Heatmap
            </a>

            <a
              href="#pricing"
              onClick={(e) => {
                if (currentScreen !== 'homepage') {
                  e.preventDefault();
                  onNavigate('homepage');
                  setTimeout(() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isDark ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Pricing
            </a>

            {/* Screen Mockup Switcher Dropdown */}
            <div className="relative ml-2">
              <button
                onClick={() => setIsScreenMenuOpen(!isScreenMenuOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                  isDark
                    ? 'border-amber-400/30 text-amber-300 bg-amber-950/20 hover:bg-amber-950/40'
                    : 'border-amber-300 text-amber-900 bg-amber-50 hover:bg-amber-100'
                }`}
                title="Quickly preview all screens from mockups"
                id="screen-selector-dropdown-button"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Screen Mockups:</span>
                <span className="font-bold underline capitalize">
                  {currentScreen === 'homepage' ? 'Home' : currentScreen}
                </span>
                <ChevronDown className="w-3 h-3 text-amber-400" />
              </button>

              {isScreenMenuOpen && (
                <div
                  className={`absolute left-0 mt-2 w-64 rounded-xl shadow-2xl border p-2 z-50 ${
                    isDark
                      ? 'bg-neutral-900 border-neutral-800 text-white'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                  id="screen-selector-dropdown-menu"
                >
                  <div className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-500">
                    Switch Screen View
                  </div>
                  {screenOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isActive = currentScreen === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          onNavigate(opt.id);
                          setIsScreenMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-left transition-colors ${
                          isActive
                            ? isDark
                              ? 'bg-amber-400/15 text-amber-300 font-semibold'
                              : 'bg-amber-100/70 text-amber-950 font-semibold'
                            : isDark
                            ? 'hover:bg-neutral-800 text-neutral-300'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-amber-500' : 'text-slate-400'}`} />
                          <span>{opt.label}</span>
                        </div>
                        {opt.badge && (
                          <span className="text-[10px] uppercase font-bold bg-amber-400/20 text-amber-500 px-1.5 py-0.5 rounded">
                            {opt.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Buttons & Utilities */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition-colors ${
                isDark
                  ? 'border-neutral-800 text-amber-400 bg-neutral-900 hover:bg-neutral-800'
                  : 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100'
              }`}
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Brand Theme'}
              id="theme-toggle-button"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth Buttons matching mockups */}
            <button
              onClick={() => onNavigate('signin')}
              className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all ${
                isDark
                  ? 'border-neutral-700 text-neutral-200 hover:border-neutral-500 hover:text-white bg-neutral-900/50'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900 bg-white'
              }`}
              id="navbar-signin-button"
            >
              Sign In
            </button>

            <button
              onClick={() => onNavigate('signup')}
              className="px-4 py-2 text-sm font-bold rounded-xl bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20 hover:shadow-lg hover:shadow-amber-400/30 flex items-center gap-1.5 group"
              id="navbar-signup-button"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg border ${
                isDark ? 'border-neutral-800 text-amber-400 bg-neutral-900' : 'border-slate-200 text-slate-700 bg-slate-100'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg border transition-colors ${
                isDark ? 'border-neutral-800 text-white bg-neutral-900' : 'border-slate-200 text-slate-900 bg-slate-100'
              }`}
              aria-label="Toggle mobile menu"
              id="mobile-menu-toggle-button"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-3 ${
            isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
          id="mobile-drawer-menu"
        >
          <div className="py-2 border-b border-neutral-800/20">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
              Preview Screen Mockups
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {screenOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    onNavigate(opt.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 text-xs rounded-lg font-medium ${
                    currentScreen === opt.id
                      ? 'bg-amber-400 text-neutral-950 font-bold'
                      : isDark
                      ? 'bg-neutral-900 text-neutral-300'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <opt.icon className="w-3.5 h-3.5" />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('homepage');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800"
            >
              Home Overview
            </button>
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800"
            >
              Features
            </a>
            <a
              href="#analytics-preview"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800"
            >
              Workspace Analytics
            </a>
            <a
              href="#interactive-playground"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800"
            >
              Click Heatmap
            </a>
            <a
              href="#pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800"
            >
              Pricing Plans
            </a>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 flex gap-2">
            <button
              onClick={() => {
                onNavigate('signin');
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 text-center text-sm font-semibold rounded-xl border border-slate-300 dark:border-neutral-700"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                onNavigate('signup');
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 text-center text-sm font-bold rounded-xl bg-amber-400 text-neutral-950"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
