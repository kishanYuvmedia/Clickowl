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
    </div>
  );
}
