import React, { useState } from 'react';
import { ClickOwlLogo } from '../ClickOwlLogo';
import { AnalyticsWatermark } from '../AnalyticsWatermark';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { ScreenMode } from '../../types';

interface SignInScreenProps {
  onNavigate: (screen: ScreenMode) => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onNavigate('app');
    }, 600);
  };

  return (
    <div id="signin-screen-container" className="w-full">
      <div
        className="grid grid-cols-1 md:grid-cols-12 overflow-hidden transition-all"
        style={{
          background: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        }}
      >
        {/* Left Column */}
        <div
          className="md:col-span-5 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden min-h-[480px]"
          style={{
            background: 'linear-gradient(0deg, rgba(247, 244, 188, 0.7) 0%, rgba(255, 241, 227, 0.7) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.4)',
          }}
        >
          <div className="relative z-10 space-y-6">
            <ClickOwlLogo variant="full" size="md" />

            <div className="pt-4">
              <p className="text-2xl sm:text-3xl font-normal" style={{ color: '#2A2A2A' }}>
                Welcome to
              </p>
              <h1
                className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1"
                style={{ color: '#010101' }}
              >
                ClickOwl
              </h1>
            </div>
          </div>

          <div className="relative z-0 mt-8">
            <AnalyticsWatermark
              color="#9ca3af"
              opacity={0.65}
              className="w-full max-w-[280px] mx-auto transform translate-y-4"
            />
          </div>
        </div>

        {/* Right Column */}
        <div
          className="md:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center"
          style={{ background: '#FFFFFF' }}
        >
          <div className="max-w-md mx-auto w-full">
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center mb-8"
              style={{ color: '#010101' }}
            >
              Sign In
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: '#737373' }}>
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  id="signin-email-input"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white transition-all placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#FFD10A] focus:border-transparent"
                  style={{
                    border: '1px solid #E7E7E3',
                    borderRadius: '8px',
                    color: '#171717',
                  }}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: '#737373' }}>
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  id="signin-password-input"
                  className="w-full pl-11 pr-11 py-3 text-sm bg-white transition-all placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#FFD10A] focus:border-transparent"
                  style={{
                    border: '1px solid #E7E7E3',
                    borderRadius: '8px',
                    color: '#171717',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center transition-colors"
                  style={{ color: '#737373' }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="submit"
                id="signin-submit-btn"
                className="w-full py-3.5 text-sm font-semibold transition-colors cursor-pointer"
                style={{
                  background: '#FFD10A',
                  color: '#010101',
                  border: '1px solid #FFD10A',
                  borderRadius: '8px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E8B900';
                  e.currentTarget.style.borderColor = '#E8B900';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFD10A';
                  e.currentTarget.style.borderColor = '#FFD10A';
                }}
              >
                {submitted ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1" style={{ borderTop: '1px solid #E7E7E3' }}></div>
              <span className="px-4 text-xs font-medium" style={{ color: '#737373' }}>or</span>
              <div className="flex-1" style={{ borderTop: '1px solid #E7E7E3' }}></div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('app')}
              id="signin-google-btn"
              className="w-full py-3 px-4 text-sm font-semibold bg-white flex items-center justify-center gap-2 transition-colors"
              style={{
                border: '1px solid #E7E7E3',
                borderRadius: '8px',
                color: '#171717',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F7F7F5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <span>Sign In with Google</span>
            </button>

            <p className="text-center text-xs sm:text-sm mt-6" style={{ color: '#737373' }}>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                className="font-bold underline transition-colors"
                style={{ color: '#010101' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#E8B900'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#010101'; }}
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
