import React, { useState } from 'react';
import { ChevronRight, Radio } from 'lucide-react';

interface AddDomainProps {
  onBack: () => void;
  onNext: () => void;
}

export const AddDomainScreen: React.FC<AddDomainProps> = ({ onBack, onNext }) => {
  const [websiteName, setWebsiteName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteType, setWebsiteType] = useState('');
  const [connectionMethod, setConnectionMethod] = useState<'server' | 'local'>('server');

  const isFormValid = websiteName.trim() !== '' && websiteUrl.trim() !== '' && websiteType.trim() !== '';

  return (
    <div className="max-w-full mx-auto space-y-6">
      <nav className="flex items-center gap-1.5 text-xs text-muted">
        <button onClick={onBack} className="hover:text-ink transition-colors">Sites</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-ink font-medium">Add Domain</span>
      </nav>

      <div className="flex gap-8">
        <div className="w-[180px] flex-shrink-0">
          <h3 className="text-[10px] font-bold text-muted uppercase tracking-wider mb-4">Add Website Checklist</h3>
          <div className="space-y-0">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-ink text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  1
                </div>
                <div className="w-px h-6 bg-border" />
              </div>
              <span className="text-xs font-semibold text-ink pt-0.5">Add Domain</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full border-2 border-border text-muted flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  2
                </div>
              </div>
              <div>
                <span className="text-xs text-muted">Setup Website</span>
                <div className="space-y-1 mt-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-[11px] text-muted">Server-side setup</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-[11px] text-muted">Generate Script</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-5">
          <div className="bg-surface border border-border rounded-xl p-6 space-y-5">
            <h2 className="text-sm font-bold text-ink">Tools and Tips</h2>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink">Website Name</label>
              <input
                type="text"
                placeholder="Site Name"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-bg text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-ink/20"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink">Website URL</label>
              <input
                type="text"
                placeholder="https://example.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-bg text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-ink/20"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink">Website Type</label>
              <select
                value={websiteType}
                onChange={(e) => setWebsiteType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-bg text-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
              >
                <option value="" disabled>Select method</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="saas">SaaS</option>
                <option value="blog">Blog</option>
                <option value="corporate">Corporate</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => setConnectionMethod('server')}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  connectionMethod === 'server'
                    ? 'border-ink bg-ink/[0.02]'
                    : 'border-border hover:border-ink/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    connectionMethod === 'server' ? 'border-ink' : 'border-border'
                  }`}>
                    {connectionMethod === 'server' && (
                      <div className="w-2 h-2 rounded-full bg-ink" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-ink">Connect through Server Side Setup</span>
                      <span className="text-[9px] font-bold bg-success/10 text-success px-1.5 py-0.5 rounded uppercase tracking-wider">Recommended</span>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">Full infrastructure integration. Includes CDN optimization, SSL management and global propagation.</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setConnectionMethod('local')}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  connectionMethod === 'local'
                    ? 'border-ink bg-ink/[0.02]'
                    : 'border-border hover:border-ink/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    connectionMethod === 'local' ? 'border-ink' : 'border-border'
                  }`}>
                    {connectionMethod === 'local' && (
                      <div className="w-2 h-2 rounded-full bg-ink" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-ink">Connect Without Server Side Setup</span>
                    <p className="text-[11px] text-muted leading-relaxed">Keep records local. No automatic DNS propagation or CDN edge routing will be configured at this stage.</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-xs font-bold text-ink mb-1">Tools and Tips</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Technical guides</span>
              <span className="text-xs text-ink font-semibold flex items-center gap-1 hover:underline cursor-pointer">
                Documentation <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onBack}
              className="px-5 py-2 text-xs font-semibold text-muted border border-border rounded-lg hover:bg-bg transition-colors"
            >
              Back
            </button>
            <button
              onClick={onNext}
              disabled={!isFormValid}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                isFormValid
                  ? 'bg-ink text-white hover:bg-ink-soft'
                  : 'bg-border text-muted cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
