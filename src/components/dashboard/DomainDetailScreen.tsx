import React, { useState } from 'react';
import { ChevronLeft, Globe, CheckCircle2, Copy, Check, ExternalLink } from 'lucide-react';

type Tab = 'overview' | 'settings' | 'logs';

interface DomainDetailProps {
  domain: {
    id: string;
    name: string;
    domain: string;
    status: string;
    lastSync: string;
    eventsToday: number;
  };
  onBack: () => void;
  onDisconnect: () => void;
}

const scriptCode = `<!-- ClickOwl Pulse Tracker -->
<script>
  (function(c,l,i,c,k,O,w,l) {
    c[c] = c[c] || function() {
      (c[c].q = c[c].q || []).push(arguments);
    };
    O = l.createElement(i);
    O.async = 1;
    O.src = 'https://cdn.clickowl.io/pulse/v1.min.js';
    w = l.getElementsByTagName(i)[0];
    w.parentNode.insertBefore(O, w);
  })(window, document, 'script', 'ClickOwl');

  ClickOwl('init', {
    siteId: '8x2k9',
    trackPageviews: true,
    trackEvents: true
  });
</script>`;

const recentEvents = [
  { name: 'page_view', total: '48,291', emq: '78%', updated: '2 min ago' },
  { name: 'purchase_complete', total: '12,847', emq: '92%', updated: '5 min ago' },
  { name: 'add_to_cart', total: '8,291', emq: '85%', updated: '12 min ago' },
  { name: 'identify', total: '18,432', emq: '95%', updated: '1 hr ago' },
];

export const DomainDetailScreen: React.FC<DomainDetailProps> = ({
  domain,
  onBack,
  onDisconnect,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-full mx-auto space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink transition-colors"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span>Site Connections</span>
      </button>

      <div className="bg-surface border border-border rounded-xl p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-bg border border-border flex items-center justify-center">
              <Globe className="w-5 h-5 text-muted" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg font-bold text-ink">{domain.name}</h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  Active
                </span>
              </div>
              <p className="text-xs text-muted mt-1">
                {domain.domain} · Connected · Last synced {domain.lastSync}
              </p>
            </div>
          </div>
          <button
            onClick={onDisconnect}
            className="px-3 py-1.5 text-xs font-semibold text-danger border border-danger/20 rounded-md hover:bg-danger/5 transition-colors"
          >
            Disconnect
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-bg rounded-lg p-3.5 border border-border">
            <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Events Today</p>
            <p className="text-xl font-bold text-ink">{domain.eventsToday.toLocaleString()}</p>
          </div>
          <div className="bg-bg rounded-lg p-3.5 border border-border">
            <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Script Status</p>
            <div className="flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-sm font-semibold text-ink">Installed</span>
            </div>
          </div>
          <div className="bg-bg rounded-lg p-3.5 border border-border">
            <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">DNS Status</p>
            <div className="flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-sm font-semibold text-ink">Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="flex gap-0">
          {(['overview', 'settings', 'logs'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-[1px] ${
                activeTab === tab
                  ? 'border-ink text-ink'
                  : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-5">
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-bold text-ink">Tracking Script</h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-muted bg-bg border border-border rounded-md hover:border-ink/20 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-success" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="p-4">
              <pre className="text-[11px] font-mono text-ink bg-bg rounded-lg p-4 overflow-x-auto leading-relaxed">
                {scriptCode}
              </pre>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-bold text-ink">Recent Events</h3>
              <button className="text-xs text-muted hover:text-ink flex items-center gap-1 transition-colors">
                View All <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Event</th>
                  <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Total</th>
                  <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">EMQ</th>
                  <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Last Seen</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((event) => (
                  <tr key={event.name} className="border-b border-border/50 last:border-0 hover:bg-bg/50 transition-colors">
                    <td className="px-5 py-3">
                      <span className="font-mono text-xs text-info font-semibold">{event.name}</span>
                    </td>
                    <td className="px-5 py-3 text-xs font-semibold text-ink">{event.total}</td>
                    <td className="px-5 py-3 text-xs text-muted">{event.emq}</td>
                    <td className="px-5 py-3 text-xs text-muted">{event.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-sm font-bold text-ink mb-4">DNS Configuration</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-xs text-muted">Type</span>
              <span className="text-xs text-ink font-mono font-medium bg-bg px-2 py-0.5 rounded">CNAME</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-xs text-muted">Host</span>
              <span className="text-xs text-ink font-mono font-medium">track</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-xs text-muted">Value</span>
              <span className="text-xs text-ink font-mono font-medium">pulse-track.clickowl.io</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-muted">TTL</span>
              <span className="text-xs text-ink font-mono font-medium">Auto</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-surface border border-border rounded-xl p-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-bg border border-border flex items-center justify-center mb-3">
              <Globe className="w-5 h-5 text-muted" />
            </div>
            <p className="text-sm text-muted">Event logs will appear here.</p>
          </div>
        </div>
      )}
    </div>
  );
};
