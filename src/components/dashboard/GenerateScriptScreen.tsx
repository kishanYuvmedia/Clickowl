import React, { useState } from 'react';
import { ChevronRight, Copy, Check, Send } from 'lucide-react';

interface GenerateScriptProps {
  onBack: () => void;
  onNext: () => void;
}

export const GenerateScriptScreen: React.FC<GenerateScriptProps> = ({ onBack, onNext }) => {
  const [copied, setCopied] = useState(false);

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
    trackEvents: true,
    respectPrivacy: true
  });

  ClickOwl('track', 'pageview');
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-[1280px] mx-auto space-y-6">
      <nav className="flex items-center gap-1.5 text-xs text-muted">
        <button onClick={onBack} className="hover:text-ink transition-colors">Sites</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={onBack} className="hover:text-ink transition-colors">Add Domain</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-ink font-medium">Website Setup</span>
      </nav>

      <div className="flex gap-8">
        <div className="w-[180px] flex-shrink-0">
          <h3 className="text-[10px] font-bold text-muted uppercase tracking-wider mb-4">Add Website Checklist</h3>
          <div className="space-y-0">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <div className="w-px h-6 bg-border" />
              </div>
              <span className="text-xs text-muted line-through pt-0.5">Add Domain</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-ink text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  2
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold text-ink">Setup Website</span>
                <div className="space-y-1.5 mt-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-success" />
                    <span className="text-[11px] text-muted">Server-side setup</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-ink" />
                    <span className="text-[11px] font-semibold text-ink">Generate Script</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-bold text-ink">Add Tracking Script</h2>
              <p className="text-xs text-muted mt-1">Place this script inside the <code className="px-1 py-0.5 bg-bg rounded text-[10px] font-mono">&lt;head&gt;</code> tag of your website.</p>
            </div>

            <div className="p-5">
              <div className="bg-[#1e1e2e] rounded-xl overflow-hidden border border-[#313244]">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#181825] border-b border-[#313244]">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f38ba8]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f9e2af]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1]" />
                    </div>
                    <span className="text-[11px] text-[#6c7086] font-mono ml-2">pulse-tracker.html</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#313244] hover:bg-[#45475a] transition-colors text-[10px] text-[#cdd6f4] font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-[#a6e3a1]" />
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
                <div className="p-4 overflow-x-auto">
                  <pre className="text-[11px] leading-relaxed font-mono">
                    <code>
                      <span className="text-[#6c7086]">{`<!-- ClickOwl Pulse Tracker -->`}</span>{'\n'}
                      <span className="text-[#cba6f7]">{'<script>'}</span>{'\n'}
                      <span className="text-[#89dceb]">{'  (function'}</span><span className="text-[#f9e2af]">{'(c,l,i,c,k,O,w,l)'}</span><span className="text-[#89dceb]">{' {'}</span>{'\n'}
                      <span className="text-[#89dceb]">{'    c[c]'}</span><span className="text-[#cba6f7]">{' = '} </span><span className="text-[#89dceb]">{'c[c] '}</span><span className="text-[#cba6f7]">{'|| '} </span><span className="text-[#89dceb]">{'function'}</span><span className="text-[#f9e2af]">{'()'}</span><span className="text-[#89dceb]">{' {'}</span>{'\n'}
                      <span className="text-[#89dceb]">{'      (c[c].q '}</span><span className="text-[#cba6f7]">{'= '} </span><span className="text-[#89dceb]">{'c[c].q '}</span><span className="text-[#cba6f7]">{'|| '} </span><span className="text-[#89dceb]">{'[]).push(arguments);'}</span>{'\n'}
                      <span className="text-[#89dceb]">{'    }'}</span><span className="text-[#f9e2af]">{";  "}</span>{'\n'}
                      <span className="text-[#89dceb]">{'    O '}</span><span className="text-[#cba6f7]">{'= '} </span><span className="text-[#89dceb]">{'l.createElement(i);'}</span>{'\n'}
                      <span className="text-[#89dceb]">{'    O.async '}</span><span className="text-[#cba6f7]">{'= '} </span><span className="text-[#fab387]">{'1'}</span><span className="text-[#89dceb]">{";  "}</span>{'\n'}
                      <span className="text-[#89dceb]">{'    O.src '}</span><span className="text-[#cba6f7]">{'= '} </span><span className="text-[#a6e3a1]">{'https://cdn.clickowl.io/pulse/v1.min.js'}</span><span className="text-[#89dceb]">{";  "}</span>{'\n'}
                      <span className="text-[#89dceb]">{'    w '}</span><span className="text-[#cba6f7]">{'= '} </span><span className="text-[#89dceb]">{'l.getElementsByTagName(i)[0];'}</span>{'\n'}
                      <span className="text-[#89dceb]">{'    w.parentNode.insertBefore(O, w);'}</span>{'\n'}
                      <span className="text-[#89dceb]">{'  }'}</span><span className="text-[#f9e2af]">{";  "}</span><span className="text-[#89dceb]">{'(window, document, '}</span><span className="text-[#a6e3a1]">{'script'}</span><span className="text-[#89dceb]">{' , '}</span><span className="text-[#a6e3a1]">{'ClickOwl'}</span><span className="text-[#89dceb]">{' );'}</span>{'\n'}
                      <span className="text-[#89dceb]">{'  '}</span>{'\n'}
                      <span className="text-[#89dceb]">{'  ClickOwl('}</span><span className="text-[#a6e3a1]">{'init'}</span><span className="text-[#89dceb]">{' , {'}</span>{'\n'}
                      <span className="text-[#89dceb]">{'    siteId: '}</span><span className="text-[#a6e3a1]">{'8x2k9'}</span><span className="text-[#89dceb]">{" ,  "}</span>{'\n'}
                      <span className="text-[#89dceb]">{'    trackPageviews: '}</span><span className="text-[#fab387]">{'true'}</span><span className="text-[#89dceb]">{" ,  "}</span>{'\n'}
                      <span className="text-[#89dceb]">{'    trackEvents: '}</span><span className="text-[#fab387]">{'true'}</span><span className="text-[#89dceb]">{" ,  "}</span>{'\n'}
                      <span className="text-[#89dceb]">{'    respectPrivacy: '}</span><span className="text-[#fab387]">{'true'}</span>{'\n'}
                      <span className="text-[#89dceb]">{'  }'}</span><span className="text-[#f9e2af]">{' );'}</span>{'\n'}
                      <span className="text-[#89dceb]">{'  '}</span>{'\n'}
                      <span className="text-[#89dceb]">{'  ClickOwl('}</span><span className="text-[#a6e3a1]">{'track'}</span><span className="text-[#89dceb]">{' , '}</span><span className="text-[#a6e3a1]">{'pageview'}</span><span className="text-[#89dceb]">{' );'}</span>{'\n'}
                      <span className="text-[#cba6f7]">{'</script>'}</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5">
              <button
                onClick={onNext}
                className="w-full py-2.5 text-xs font-semibold text-white bg-ink rounded-lg hover:bg-ink-soft transition-colors"
              >
                Verify
              </button>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center flex-shrink-0">
              <Send className="w-4 h-4 text-muted" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-bold text-ink">Send to Developer</h3>
              <p className="text-[11px] text-muted mt-0.5 leading-relaxed">Share the installation instructions with your developer to complete the setup.</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-bg transition-colors">
              <Send className="w-4 h-4 text-muted" />
            </button>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
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
              className="px-5 py-2 text-xs font-semibold text-white bg-ink rounded-lg hover:bg-ink-soft transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
