import React, { useState, useEffect, useRef } from 'react';
import { ClickOwlLogo } from '../ClickOwlLogo';
import { AnalyticsWatermark } from '../AnalyticsWatermark';
import { RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { ScreenMode } from '../../types';

interface MailConfirmationScreenProps {
  onNavigate: (screen: ScreenMode) => void;
}

export const MailConfirmationScreen: React.FC<MailConfirmationScreenProps> = ({
  onNavigate,
}) => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [isInvalid, setIsInvalid] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [isVerified, setIsVerified] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const entered = code.join('');
    if (entered === '124466' || isInvalid) {
      setIsInvalid(true);
    } else if (entered.length === 6) {
      setIsVerified(true);
      setTimeout(() => {
        onNavigate('dashboard');
      }, 700);
    } else {
      setIsInvalid(true);
      setCode(['1', '2', '4', '4', '6', '6']);
    }
  };

  const toggleSimulateError = () => {
    if (!isInvalid) {
      setIsInvalid(true);
      setCode(['1', '2', '4', '4', '6', '6']);
    } else {
      setIsInvalid(false);
      setCode(['', '', '', '', '', '']);
      inputsRef.current[0]?.focus();
    }
  };

  return (
    <div id="mail-confirmation-screen-container" className="w-full py-4 sm:py-8">
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={toggleSimulateError}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl border flex items-center gap-2 transition-all shadow-sm ${
            isInvalid
              ? 'border-red-400 text-red-500 bg-red-50'
              : 'border-slate-300 text-slate-700 hover:bg-slate-100 bg-white'
          }`}
          id="toggle-error-simulation-btn"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{isInvalid ? 'Current: Invalid Code State' : 'Toggle: Simulate Wrong Code'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 rounded-[32px] overflow-hidden border shadow-2xl transition-all bg-white border-slate-200/90 shadow-xl shadow-slate-200/50">
        {/* Left Column */}
        <div className="md:col-span-5 bg-[#dcdcdc] text-neutral-900 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden min-h-[500px] rounded-t-[32px] md:rounded-tr-none md:rounded-l-[32px] border-b md:border-b-0 md:border-r border-neutral-300">
          <div className="relative z-10 space-y-6">
            <ClickOwlLogo variant="full" size="md" />

            <div className="pt-4">
              <p className="text-2xl sm:text-3xl font-normal text-neutral-800">
                Welcome to
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 mt-1">
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
        <div className="md:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mb-3">
              Check Your Mail
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xs mx-auto mb-8">
              We sent a 6-digit code to <span className="font-semibold text-neutral-900">johndoe@xyz.con</span>.
              <br />
              Enter it below to verify your account.
            </p>

            <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-6" id="verification-code-inputs">
              {[0, 1, 2].map((idx) => (
                <input
                  key={idx}
                  ref={(el) => { inputsRef.current[idx] = el; }}
                  type="text"
                  maxLength={1}
                  value={code[idx]}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-10 h-12 sm:w-11 sm:h-12 text-center text-lg font-bold rounded-xl transition-all ${
                    isInvalid
                      ? 'border-2 border-red-500 text-neutral-900 bg-white focus:outline-none'
                      : code[idx]
                      ? 'bg-neutral-200 text-neutral-900 border border-neutral-400'
                      : 'bg-[#dcdcdc] text-neutral-900 border border-transparent focus:border-amber-400 focus:outline-none'
                  }`}
                />
              ))}

              <span className="text-neutral-500 font-bold px-1">-</span>

              {[3, 4, 5].map((idx) => (
                <input
                  key={idx}
                  ref={(el) => { inputsRef.current[idx] = el; }}
                  type="text"
                  maxLength={1}
                  value={code[idx]}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-10 h-12 sm:w-11 sm:h-12 text-center text-lg font-bold rounded-xl transition-all ${
                    isInvalid
                      ? 'border-2 border-red-500 text-neutral-900 bg-white focus:outline-none'
                      : code[idx]
                      ? 'bg-neutral-200 text-neutral-900 border border-neutral-400'
                      : 'bg-[#dcdcdc] text-neutral-900 border border-transparent focus:border-amber-400 focus:outline-none'
                  }`}
                />
              ))}
            </div>

            <div className="h-8 flex items-center justify-center mb-6">
              {isInvalid ? (
                <p className="text-xs sm:text-sm font-semibold text-neutral-900">
                  Invalid Code !{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsInvalid(false);
                      setCode(['', '', '', '', '', '']);
                      inputsRef.current[0]?.focus();
                    }}
                    className="underline font-bold text-neutral-950 hover:text-amber-500 cursor-pointer"
                  >
                    Resend ?
                  </button>
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                  Resend code in{' '}
                  <span className="font-bold underline text-neutral-900">
                    {formatTime(countdown)}
                  </span>
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleVerify}
              id="verify-email-submit-btn"
              className="w-full py-3 text-sm font-semibold rounded-xl border border-neutral-800 bg-transparent text-neutral-900 hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer"
            >
              {isVerified ? (
                <span className="flex items-center justify-center gap-2 text-emerald-600">
                  <CheckCircle className="w-4 h-4" /> Code Verified!
                </span>
              ) : (
                'Verify Email'
              )}
            </button>

            <p className="text-xs text-neutral-600 mt-6">
              Wrong email?{' '}
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                className="font-bold text-neutral-900 underline hover:text-amber-500"
              >
                Sign Up with different e-mail
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
