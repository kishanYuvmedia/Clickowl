import React, { useState, useEffect } from 'react';
import { ScreenMode, BrandTheme } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ScreensShowcase } from './components/ScreensShowcase';
import { ClickHeatmapPlayground } from './components/ClickHeatmapPlayground';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';
import { AuthLayout } from './components/screens/AuthLayout';
import { SignInScreen } from './components/screens/SignInScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { MailConfirmationScreen } from './components/screens/MailConfirmationScreen';
import { WorkspaceReadyScreen } from './components/screens/WorkspaceReadyScreen';
import { Layers, MousePointer, Sun, Moon } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>('homepage');
  const [theme, setTheme] = useState<BrandTheme>('dark');

  // Sync theme class to html/document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigate = (screen: ScreenMode) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen font-['Plus_Jakarta_Sans'] transition-colors duration-300 ${
        theme === 'dark' ? 'bg-neutral-950 text-white' : 'bg-white text-slate-900'
      }`}
      id="clickowl-app-root"
    >
      {/* Website Top Fixed Responsive Navigation Bar - strictly for the website homepage */}
      {currentScreen === 'homepage' && (
        <Navbar
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* Screen Views */}
      <main>
        {currentScreen === 'homepage' && (
          <>
            <HeroSection onNavigate={handleNavigate} theme={theme} />
            <FeaturesSection onNavigate={handleNavigate} theme={theme} />
            <ScreensShowcase onNavigate={handleNavigate} theme={theme} />
            <div id="analytics-preview">
              <ClickHeatmapPlayground theme={theme} />
            </div>
            <PricingSection onNavigate={handleNavigate} theme={theme} />
            <Footer onNavigate={handleNavigate} theme={theme} />
          </>
        )}

        {currentScreen === 'signin' && (
          <AuthLayout
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            theme={theme}
            onToggleTheme={toggleTheme}
          >
            <SignInScreen onNavigate={handleNavigate} theme={theme} />
          </AuthLayout>
        )}

        {currentScreen === 'signup' && (
          <AuthLayout
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            theme={theme}
            onToggleTheme={toggleTheme}
          >
            <SignUpScreen onNavigate={handleNavigate} theme={theme} />
          </AuthLayout>
        )}

        {currentScreen === 'verify' && (
          <AuthLayout
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            theme={theme}
            onToggleTheme={toggleTheme}
          >
            <MailConfirmationScreen onNavigate={handleNavigate} theme={theme} />
          </AuthLayout>
        )}

        {currentScreen === 'dashboard' && (
          <WorkspaceReadyScreen
            onNavigate={handleNavigate}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        )}
      </main>

      {/* Floating Fast Switcher Pill (always accessible at bottom right) */}
      <div
        className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 p-1.5 rounded-2xl bg-neutral-900/90 dark:bg-neutral-800/90 text-white backdrop-blur-md border border-neutral-700/60 shadow-2xl"
        id="floating-screen-switcher"
      >
        <div className="flex items-center gap-1 px-2 text-[11px] font-bold text-amber-400">
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Screen:</span>
        </div>

        <button
          onClick={() => handleNavigate('homepage')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-xl transition-colors ${
            currentScreen === 'homepage'
              ? 'bg-amber-400 text-neutral-950 font-bold'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-700/50'
          }`}
          title="Homepage UI"
        >
          Home
        </button>

        <button
          onClick={() => handleNavigate('signin')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-xl transition-colors ${
            currentScreen === 'signin'
              ? 'bg-amber-400 text-neutral-950 font-bold'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-700/50'
          }`}
          title="Sign In Screen Mockup"
        >
          Sign In
        </button>

        <button
          onClick={() => handleNavigate('signup')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-xl transition-colors ${
            currentScreen === 'signup'
              ? 'bg-amber-400 text-neutral-950 font-bold'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-700/50'
          }`}
          title="Sign Up Screen Mockup"
        >
          Sign Up
        </button>

        <button
          onClick={() => handleNavigate('verify')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-xl transition-colors ${
            currentScreen === 'verify'
              ? 'bg-amber-400 text-neutral-950 font-bold'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-700/50'
          }`}
          title="Mail Verification Mockup"
        >
          Verify
        </button>

        <button
          onClick={() => handleNavigate('dashboard')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-xl transition-colors ${
            currentScreen === 'dashboard'
              ? 'bg-amber-400 text-neutral-950 font-bold'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-700/50'
          }`}
          title="Workspace Ready Dashboard Mockup"
        >
          Workspace
        </button>

        <div className="w-px h-4 bg-neutral-700 mx-0.5" />

        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-xl hover:bg-neutral-700 text-amber-400 transition-colors"
          title={theme === 'dark' ? 'Switch to Light Slate Theme' : 'Switch to Dark Brand Theme'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

