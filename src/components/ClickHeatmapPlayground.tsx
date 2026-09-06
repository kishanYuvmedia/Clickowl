import React, { useState, useRef } from 'react';
import { MousePointer, Sparkles, RefreshCw, Zap, Shield, Flame } from 'lucide-react';
import { BrandTheme } from '../types';

interface ClickPoint {
  id: string;
  x: number;
  y: number;
  intensity: number;
  insight: string;
}

interface ClickHeatmapPlaygroundProps {
  theme: BrandTheme;
}

export const ClickHeatmapPlayground: React.FC<ClickHeatmapPlaygroundProps> = ({ theme }) => {
  const [clicks, setClicks] = useState<ClickPoint[]>([
    { id: '1', x: 28, y: 35, intensity: 94, insight: 'High-intent CTA hover zone' },
    { id: '2', x: 72, y: 40, intensity: 88, insight: 'Pricing tier selection node' },
    { id: '3', x: 50, y: 65, intensity: 78, insight: 'Interactive demo engagement' },
    { id: '4', x: 34, y: 80, intensity: 65, insight: 'Feature verification scan' },
  ]);

  const canvasRef = useRef<HTMLDivElement>(null);

  const insightsPool = [
    'Primary navigation hotspot',
    'High-intent CTA conversion zone',
    'Focused micro-interaction spot',
    'Optimal readability baseline',
    'Value-proposition focal point',
    'Sub-conscious visual anchor',
  ];

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const randomInsight = insightsPool[Math.floor(Math.random() * insightsPool.length)];
    const newPoint: ClickPoint = {
      id: Math.random().toString(),
      x,
      y,
      intensity: Math.floor(Math.random() * 30) + 70,
      insight: randomInsight,
    };

    setClicks((prev) => [...prev.slice(-15), newPoint]);
  };

  const handleSimulate = () => {
    const simulated: ClickPoint[] = [];
    for (let i = 0; i < 6; i++) {
      simulated.push({
        id: Math.random().toString(),
        x: Math.floor(Math.random() * 80) + 10,
        y: Math.floor(Math.random() * 70) + 15,
        intensity: Math.floor(Math.random() * 25) + 75,
        insight: insightsPool[Math.floor(Math.random() * insightsPool.length)],
      });
    }
    setClicks(simulated);
  };

  const handleClear = () => {
    setClicks([]);
  };

  const isDark = theme === 'dark';

  return (
    <section id="interactive-playground" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/15 text-amber-600 dark:text-amber-400 mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>Live Interactive Demo</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Outfit'] text-neutral-950 dark:text-white">
            Experience “Wisdom In Every Click”
          </h2>

          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            Click anywhere inside the telemetry canvas below to generate real-time wisdom nodes and heat attribution.
          </p>
        </div>

        {/* Playground Container */}
        <div
          className={`rounded-[32px] border overflow-hidden shadow-2xl transition-all ${
            isDark
              ? 'bg-neutral-900 border-neutral-800 shadow-black/50'
              : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}
        >
          {/* Controls Bar */}
          <div
            className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4 ${
              isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                Heatmap Canvas Mode:
              </span>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-400/20 text-amber-500">
                {clicks.length} Active Nodes
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulate}
                className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Auto-Simulate Clicks</span>
              </button>
              <button
                onClick={handleClear}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
                  isDark ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Canvas Area */}
          <div
            ref={canvasRef}
            onClick={handleCanvasClick}
            className={`relative w-full h-[380px] sm:h-[440px] cursor-crosshair overflow-hidden select-none p-6 ${
              isDark ? 'bg-neutral-950/70' : 'bg-slate-50/50'
            }`}
            id="heatmap-interactive-canvas"
          >
            {/* Grid Lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
              style={{
                backgroundImage: `radial-gradient(${isDark ? '#FBBF24' : '#111827'} 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />

            {/* Instruction Callout if empty */}
            {clicks.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-neutral-400">
                <MousePointer className="w-8 h-8 mb-2 animate-bounce text-amber-400" />
                <p className="text-sm font-bold">Click anywhere to generate a wisdom node</p>
                <p className="text-xs text-neutral-500">Telemetry is calculated instantly</p>
              </div>
            )}

            {/* Render Click Nodes */}
            {clicks.map((point) => (
              <div
                key={point.id}
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute pointer-events-none transition-all duration-300"
              >
                {/* Outermost pulsing ring */}
                <div className="w-16 h-16 rounded-full bg-amber-400/20 animate-ping absolute -inset-5" />
                {/* Secondary glow */}
                <div className="w-10 h-10 rounded-full bg-amber-400/40 blur-sm absolute -inset-2" />
                {/* Core Owl Eye Mark */}
                <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-white dark:border-neutral-900 shadow-md flex items-center justify-center text-[9px] font-black text-neutral-950">
                  {point.intensity}%
                </div>

                {/* Insight Tooltip */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-neutral-900/90 dark:bg-white/90 text-white dark:text-neutral-950 text-[10px] font-bold shadow-lg pointer-events-none">
                  {point.insight}
                </div>
              </div>
            ))}
          </div>

          {/* Live Telemetry Bar */}
          <div
            className={`p-4 border-t grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs ${
              isDark ? 'bg-neutral-950/90 border-neutral-800' : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <span className="text-neutral-500 font-medium">Coordinate System:</span>
              <div className="font-bold text-neutral-900 dark:text-white mt-0.5">
                Cartesian X/Y % Normalized
              </div>
            </div>
            <div>
              <span className="text-neutral-500 font-medium">Attribution Algorithm:</span>
              <div className="font-bold text-amber-500 mt-0.5">ClickOwl Multi-Touch V2</div>
            </div>
            <div>
              <span className="text-neutral-500 font-medium">Mean Conversion Intent:</span>
              <div className="font-bold text-emerald-500 mt-0.5">88.4% High Confidence</div>
            </div>
            <div>
              <span className="text-neutral-500 font-medium">Privacy Protection:</span>
              <div className="font-bold text-neutral-900 dark:text-white mt-0.5">Zero PII Masking</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
