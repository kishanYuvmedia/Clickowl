import React, { useState, useEffect } from 'react';
import { ClickOwlLogo } from './ClickOwlLogo';
import { AnalyticsWatermark } from './AnalyticsWatermark';
import { ScreenMode, BrandTheme } from '../types';
import { 
  Play, 
  Pause, 
  ArrowRight, 
  MousePointer, 
  Clock, 
  Sparkles, 
  Activity, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  Flame,
  Layers
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (screen: ScreenMode) => void;
  theme: BrandTheme;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, theme }) => {
  const [timerActive, setTimerActive] = useState(true);
  const [seconds, setSeconds] = useState(1450);
  const [clickCount, setClickCount] = useState(4820);
  const [liveNodes, setLiveNodes] = useState([
    { id: 1, label: 'Header CTA', clicks: 1420, rate: '14.8%', active: true },
    { id: 2, label: 'Pricing Card (Pro)', clicks: 940, rate: '8.2%', active: false },
    { id: 3, label: 'Feature Demo', clicks: 1820, rate: '19.4%', active: true },
    { id: 4, label: 'Checkout Button', clicks: 640, rate: '6.7%', active: false },
  ]);

  // Live timer effect for the focus clock
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
        if (Math.random() > 0.6) {
          setClickCount((c) => c + 1);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  const formatTimer = (sec: number) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${hrs > 0 ? hrs + 'h ' : ''}${mins.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  const isDark = theme === 'dark';

  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-20 lg:pt-36 lg:pb-32 overflow-hidden"
    >
      {/* Ambient background glow matching logo colors */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div
            onClick={() => onNavigate('dashboard')}
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-all hover:scale-105 shadow-sm ${
              isDark
                ? 'bg-neutral-900 border-neutral-800 text-amber-300 hover:border-amber-400/50'
                : 'bg-white border-amber-200 text-amber-900 hover:border-amber-400'
            }`}
          >
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold text-amber-500">ClickOwl 2.0</span>
            <span className="text-neutral-400">|</span>
            <span>Your Intelligent Workspace is Ready</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-['Outfit'] leading-[1.08] text-neutral-950 dark:text-white">
            Turn Every Click Into{' '}
            <span className="relative inline-block text-amber-500 dark:text-amber-400">
              Actionable Wisdom
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-amber-400/40"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 10C80 2 220 2 298 10"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Wisdom in every click. ClickOwl pairs high-fidelity clickstream telemetry with team focus tracking and unified workspaces to help products thrive.
          </p>

          {/* Action Button Group */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('signup')}
              className="px-7 py-3.5 text-base font-bold rounded-2xl bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/25 hover:shadow-xl hover:shadow-amber-400/40 flex items-center gap-2 group cursor-pointer"
              id="hero-cta-get-started"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('signin')}
              className={`px-6 py-3.5 text-base font-semibold rounded-2xl border transition-all ${
                isDark
                  ? 'border-neutral-700 bg-neutral-900/60 text-white hover:bg-neutral-850 hover:border-neutral-500'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400'
              }`}
              id="hero-cta-signin"
            >
              Sign In to Workspace
            </button>

            <a
              href="#interactive-playground"
              className={`px-5 py-3.5 text-sm font-semibold rounded-2xl flex items-center gap-2 transition-colors ${
                isDark ? 'text-amber-400 hover:text-amber-300' : 'text-neutral-700 hover:text-amber-600'
              }`}
            >
              <MousePointer className="w-4 h-4" />
              <span>Try Live Heatmap</span>
            </a>
          </div>

          {/* Key Trust Signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>6-Digit Secure Verification</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Instant Workspace Setup</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Hero Dashboard Card (Inspired by 'Welcome Dashboard.png' + Watermark Artwork) */}
        <div className="relative max-w-5xl mx-auto mt-4">
          <div
            className={`rounded-[32px] overflow-hidden border shadow-2xl transition-all ${
              isDark
                ? 'bg-neutral-900/90 border-neutral-800 shadow-amber-500/5'
                : 'bg-white border-slate-200/90 shadow-2xl shadow-slate-200/60'
            }`}
          >
            {/* Header of Interactive Card */}
            <div
              className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3 ${
                isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
                <span className="text-xs font-bold tracking-tight text-neutral-800 dark:text-neutral-200">
                  ClickOwl Live Workspace Simulator
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-400/20 text-amber-500 uppercase">
                  Real-Time
                </span>
              </div>

              {/* Focus Time Tracking Clock Control */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-600 dark:text-amber-300 text-xs font-bold">
                  <Clock className={`w-3.5 h-3.5 ${timerActive ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                  <span>Session: {formatTimer(seconds)}</span>
                </div>

                <button
                  onClick={() => setTimerActive(!timerActive)}
                  className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                    timerActive
                      ? 'border-amber-400 text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30'
                      : 'border-slate-300 text-slate-600 dark:border-neutral-700 dark:text-neutral-300'
                  }`}
                  title={timerActive ? 'Pause focus timer' : 'Resume focus timer'}
                >
                  {timerActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Trend Analytics & Click Watermark Visualization */}
              <div className="lg:col-span-8 space-y-6">
                {/* Live Stats Row */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-200/60 dark:border-neutral-700/60">
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                      Live Clicks
                    </span>
                    <div className="text-xl sm:text-2xl font-black mt-1 text-neutral-900 dark:text-white flex items-center gap-2">
                      <span>{clickCount.toLocaleString()}</span>
                      <span className="text-xs text-emerald-500 font-bold">+18%</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-200/60 dark:border-neutral-700/60">
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                      Wisdom Score
                    </span>
                    <div className="text-xl sm:text-2xl font-black mt-1 text-neutral-900 dark:text-white">
                      98.6%
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-200/60 dark:border-neutral-700/60">
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                      Active Users
                    </span>
                    <div className="text-xl sm:text-2xl font-black mt-1 text-neutral-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>328</span>
                    </div>
                  </div>
                </div>

                {/* Main Interactive Chart Box with the watermark graphic embedded */}
                <div className="relative p-6 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden min-h-[260px] flex flex-col justify-between">
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <h2 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                        <Activity className="w-4 h-4 text-amber-500" />
                        <span>Clickstream Attribution Stream</span>
                      </h2>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Interactive nodes mapping real user journeys
                      </p>
                    </div>

                    <span className="text-xs font-bold text-amber-500 bg-amber-400/10 px-2.5 py-1 rounded-full">
                      Wisdom Engine Active
                    </span>
                  </div>

                  {/* Visual Chart with animated node bars */}
                  <div className="relative z-10 my-4">
                    <div className="flex items-end justify-between gap-3 h-36 px-4">
                      {[
                        { day: 'Mon', h: '55%', val: '2.1k' },
                        { day: 'Tue', h: '80%', val: '3.8k' },
                        { day: 'Wed', h: '65%', val: '2.9k' },
                        { day: 'Thu', h: '95%', val: '4.6k' },
                        { day: 'Fri', h: '75%', val: '3.4k' },
                        { day: 'Sat', h: '45%', val: '1.8k' },
                        { day: 'Sun', h: '90%', val: '4.2k' },
                      ].map((item, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                          <span className="text-[10px] font-bold text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.val}
                          </span>
                          <div className="w-full max-w-[36px] bg-slate-100 dark:bg-neutral-800 rounded-t-lg h-28 relative flex items-end">
                            <div
                              style={{ height: item.h }}
                              className="w-full bg-neutral-900 dark:bg-amber-400 rounded-t-lg transition-all duration-500 group-hover:bg-amber-500"
                            />
                          </div>
                          <span className="text-[11px] font-medium text-neutral-500">
                            {item.day}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Watermark in background matching mockup artwork */}
                  <div className="absolute right-0 bottom-0 pointer-events-none opacity-20 dark:opacity-10 w-72">
                    <AnalyticsWatermark color={isDark ? '#FBBF24' : '#111827'} />
                  </div>
                </div>
              </div>

              {/* Right Column: Click Nodes Telemetry */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-800/50 border border-slate-200/70 dark:border-neutral-700/60">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Top Click Targets
                    </span>
                    <Flame className="w-4 h-4 text-amber-500" />
                  </div>

                  <div className="space-y-2.5">
                    {liveNodes.map((node) => (
                      <div
                        key={node.id}
                        className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-400" />
                          <span className="font-semibold text-neutral-900 dark:text-white">
                            {node.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-neutral-950 dark:text-amber-300">
                            {node.clicks}
                          </span>
                          <span className="text-neutral-500 ml-1">({node.rate})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fast Action CTA Box */}
                <div className="p-5 rounded-2xl bg-amber-400/10 border border-amber-400/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-300 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Workspace Simulation</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    Switch to the authentic sign in or verification screens from your design mockups anytime.
                  </p>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="w-full mt-3 py-2 text-xs font-bold rounded-xl bg-neutral-950 text-white dark:bg-amber-400 dark:text-neutral-950 hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                  >
                    <span>Open "Workspace Ready" Screen</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
