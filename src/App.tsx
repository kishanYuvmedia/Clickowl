import React, { useState } from 'react';
import { ScreenMode } from './types';
import { AuthLayout } from './components/screens/AuthLayout';
import { SignInScreen } from './components/screens/SignInScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { MailConfirmationScreen } from './components/screens/MailConfirmationScreen';
import { WorkspaceReadyScreen } from './components/screens/WorkspaceReadyScreen';
import { Layers } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>('signin');

  const handleNavigate = (screen: ScreenMode) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen font-['Plus_Jakarta_Sans'] transition-colors duration-300 bg-white text-slate-900"
      id="clickowl-app-root"
    >
      <main>
        {currentScreen === 'signin' && (
          <AuthLayout
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
          >
            <SignInScreen onNavigate={handleNavigate} />
          </AuthLayout>
        )}

        {currentScreen === 'signup' && (
          <AuthLayout
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
          >
            <SignUpScreen onNavigate={handleNavigate} />
          </AuthLayout>
        )}

        {currentScreen === 'verify' && (
          <AuthLayout
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
          >
            <MailConfirmationScreen onNavigate={handleNavigate} />
          </AuthLayout>
        )}

        {currentScreen === 'dashboard' && (
          <WorkspaceReadyScreen onNavigate={handleNavigate} />
        )}
      </main>

      <div
        className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 p-1.5 rounded-2xl bg-neutral-900/90 text-white backdrop-blur-md border border-neutral-700/60 shadow-2xl"
        id="floating-screen-switcher"
      >
        <div className="flex items-center gap-1 px-2 text-[11px] font-bold text-amber-400">
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Screen:</span>
        </div>

        <button
          onClick={() => handleNavigate('signin')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-xl transition-colors ${
            currentScreen === 'signin'
              ? 'bg-amber-400 text-neutral-950 font-bold'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-700/50'
          }`}
          title="Sign In Screen"
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
          title="Sign Up Screen"
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
          title="Mail Verification"
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
          title="Workspace Ready"
        >
          Workspace
        </button>
      </div>
    </div>
  );
}
