import React, { useState, useRef, useEffect } from 'react';
import {
  Filter,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Eye,
  Pencil,
  Trash2,
  Search,
  Download,
  X,
  Check,
  ChevronRight,
} from 'lucide-react';
import { DatePickerPopover } from './DatePickerPopover';

const chartData = [
  { date: 'May 12', web: 1200, server: 1100 },
  { date: 'May 13', web: 1350, server: 1200 },
  { date: 'May 14', web: 1100, server: 1050 },
  { date: 'May 15', web: 1800, server: 1600 },
  { date: 'May 16', web: 2400, server: 2200 },
  { date: 'May 17', web: 2800, server: 2600 },
  { date: 'May 18', web: 3200, server: 3000 },
  { date: 'May 19', web: 3500, server: 3300 },
  { date: 'May 20', web: 3800, server: 3600 },
  { date: 'May 21', web: 3600, server: 3400 },
  { date: 'May 22', web: 3200, server: 3000 },
  { date: 'May 23', web: 2800, server: 2600 },
];

const annotations = [
  { id: 1, date: 'May 15, 2026 | 09:30 AM', title: 'UI Update Deployed', description: 'New checkout flow UI deployed for a/b test.', addedBy: 'Dixita S.', color: '#7C3AED', chartIdx: 3 },
  { id: 2, date: 'May 18, 2026', title: 'Summer Campaign Launched', description: 'Started Meta Ads campaign for summer sale.', addedBy: 'Dixita S.', color: '#16A34A', chartIdx: 6 },
];

const events = [
  { name: 'page_view', total: '48,291', emq: '78%', updated: 'May 18, 2026 | 12:45 PM', sources: ['Browser'], destinations: 1 },
  { name: 'purchase_complete', total: '12,847', emq: '92%', updated: 'May 18, 2026 | 12:45 PM', sources: ['Server-side'], destinations: 2 },
  { name: 'add_to_cart', total: '8,291', emq: '85%', updated: 'May 18, 2026 | 12:45 PM', sources: ['Browser', 'Mobile'], destinations: 1 },
  { name: 'identify', total: '18,432', emq: '95%', updated: 'May 18, 2026 | 12:45 PM', sources: ['Web SDK'], destinations: 3 },
];

const logData = [
  { id: 'evt_001', timestamp: '2026-05-23 14:23:01', event: 'page_view', source: 'Browser', campaign: 'summer_2026', userId: 'usr_1a2b3c', email: 'john@example.com', status: 'success', response: '200 OK', records: 1 },
  { id: 'evt_002', timestamp: '2026-05-23 14:22:45', event: 'purchase_complete', source: 'Server-side', campaign: 'summer_2026', userId: 'usr_4d5e6f', email: 'sarah@company.com', status: 'success', response: '201 Created', records: 1 },
  { id: 'evt_003', timestamp: '2026-05-23 14:21:33', event: 'add_to_cart', source: 'Mobile', campaign: 'flash_sale', userId: 'usr_7g8h9i', email: 'mike@startup.io', status: 'failed', response: '422 Unprocessable', records: 0 },
  { id: 'evt_004', timestamp: '2026-05-23 14:20:12', event: 'identify', source: 'Web SDK', campaign: 'brand_awareness', userId: 'usr_j0k1l2', email: 'emma@business.com', status: 'success', response: '200 OK', records: 1 },
  { id: 'evt_005', timestamp: '2026-05-23 14:19:58', event: 'page_view', source: 'Browser', campaign: 'summer_2026', userId: 'usr_m3n4o5', email: 'alex@corp.com', status: 'success', response: '200 OK', records: 3 },
  { id: 'evt_006', timestamp: '2026-05-23 14:18:44', event: 'sign_up', source: 'Browser', campaign: 'onboarding', userId: 'usr_p6q7r8', email: 'lisa@newco.com', status: 'pending', response: '—', records: 0 },
  { id: 'evt_007', timestamp: '2026-05-23 14:17:22', event: 'page_view', source: 'Mobile', campaign: 'retarget', userId: 'usr_s9t0u1', email: 'david@agency.io', status: 'success', response: '200 OK', records: 1 },
  { id: 'evt_008', timestamp: '2026-05-23 14:16:10', event: 'add_to_cart', source: 'Browser', campaign: 'flash_sale', userId: 'usr_v2w3x4', email: 'anna@shop.com', status: 'failed', response: '500 Internal', records: 0 },
  { id: 'evt_009', timestamp: '2026-05-23 14:15:05', event: 'purchase_complete', source: 'Server-side', campaign: 'summer_2026', userId: 'usr_y5z6a7', email: 'tom@enterprise.com', status: 'success', response: '201 Created', records: 1 },
  { id: 'evt_010', timestamp: '2026-05-23 14:14:33', event: 'identify', source: 'Web SDK', campaign: 'brand_awareness', userId: 'usr_b8c9d0', email: 'sara@app.dev', status: 'success', response: '200 OK', records: 1 },
  { id: 'evt_011', timestamp: '2026-05-23 14:13:21', event: 'page_view', source: 'Browser', campaign: 'retarget', userId: 'usr_e1f2g3', email: 'mike@blog.co', status: 'success', response: '200 OK', records: 2 },
  { id: 'evt_012', timestamp: '2026-05-23 14:12:15', event: 'sign_up', source: 'Mobile', campaign: 'onboarding', userId: 'usr_h4i5j6', email: 'jen@design.io', status: 'success', response: '201 Created', records: 1 },
];

const userData = [
  { id: 'usr_1a2b3c', email: 'john@example.com', firstName: 'John', lastName: 'Doe', events: 247, lastActive: '2 min ago', country: 'India', device: 'Desktop', browser: 'Chrome', os: 'macOS', status: 'active' },
  { id: 'usr_4d5e6f', email: 'sarah@company.com', firstName: 'Sarah', lastName: 'Wilson', events: 189, lastActive: '15 min ago', country: 'United States', device: 'Mobile', browser: 'Safari', os: 'iOS', status: 'active' },
  { id: 'usr_7g8h9i', email: 'mike@startup.io', firstName: 'Mike', lastName: 'Chen', events: 56, lastActive: '1 hr ago', country: 'United Kingdom', device: 'Desktop', browser: 'Firefox', os: 'Windows', status: 'active' },
  { id: 'usr_j0k1l2', email: 'emma@business.com', firstName: 'Emma', lastName: 'Davis', events: 312, lastActive: '3 hr ago', country: 'Germany', device: 'Tablet', browser: 'Chrome', os: 'Android', status: 'inactive' },
  { id: 'usr_m3n4o5', email: 'alex@corp.com', firstName: 'Alex', lastName: 'Brown', events: 78, lastActive: '1 day ago', country: 'India', device: 'Desktop', browser: 'Edge', os: 'Windows', status: 'inactive' },
  { id: 'usr_p6q7r8', email: 'lisa@newco.com', firstName: 'Lisa', lastName: 'Johnson', events: 134, lastActive: '30 min ago', country: 'Japan', device: 'Mobile', browser: 'Chrome', os: 'Android', status: 'active' },
  { id: 'usr_s9t0u1', email: 'david@agency.io', firstName: 'David', lastName: 'Lee', events: 92, lastActive: '45 min ago', country: 'United States', device: 'Desktop', browser: 'Chrome', os: 'macOS', status: 'active' },
  { id: 'usr_v2w3x4', email: 'anna@shop.com', firstName: 'Anna', lastName: 'Martinez', events: 45, lastActive: '2 hr ago', country: 'India', device: 'Mobile', browser: 'Safari', os: 'iOS', status: 'active' },
];

interface FilterChip {
  id: string;
  label: string;
  value: string;
}

interface FilterOption {
  label: string;
  value: string;
}

const filterDefinitions: Record<string, { label: string; options: FilterOption[] }> = {
  country: {
    label: 'Country',
    options: [
      { label: 'India', value: 'India' },
      { label: 'United States', value: 'United States' },
      { label: 'United Kingdom', value: 'United Kingdom' },
      { label: 'Germany', value: 'Germany' },
      { label: 'Japan', value: 'Japan' },
    ],
  },
  campaign: {
    label: 'Campaign Name contains',
    options: [
      { label: 'summer', value: 'summer' },
      { label: 'winter', value: 'winter' },
      { label: 'sale', value: 'sale' },
      { label: 'launch', value: 'launch' },
    ],
  },
  device: {
    label: 'Device Category',
    options: [
      { label: 'Mobile', value: 'Mobile' },
      { label: 'Desktop', value: 'Desktop' },
      { label: 'Tablet', value: 'Tablet' },
    ],
  },
};

function Dropdown({
  options,
  onSelect,
  onClose,
}: {
  options: FilterOption[];
  onSelect: (value: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute top-full left-0 mt-1 bg-surface border border-border rounded-lg shadow-lg z-50 py-1 min-w-[180px]">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => { onSelect(opt.value); onClose(); }}
          className="w-full text-left px-3 py-2 text-xs text-ink hover:bg-bg transition-colors"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const websites = ['Example2.com', 'mysite.io', 'shop.example.com'];

function MiniLineChart() {
  const maxVal = 3800;
  const w = 800;
  const h = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;

  const getX = (i: number) => padding.left + (i / (chartData.length - 1)) * chartW;
  const getY = (val: number) => padding.top + chartH - (val / maxVal) * chartH;

  const webPath = chartData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.web)}`)
    .join(' ');

  const serverPath = chartData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.server)}`)
    .join(' ');

  const webAreaPath = `${webPath} L ${getX(chartData.length - 1)} ${padding.top + chartH} L ${getX(0)} ${padding.top + chartH} Z`;

  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-[220px]"
        onMouseLeave={() => setHoverIdx(null)}
      >
        {[0, 950, 1900, 2850, 3800].map((val) => (
          <g key={val}>
            <line
              x1={padding.left}
              y1={getY(val)}
              x2={w - padding.right}
              y2={getY(val)}
              stroke="#E5E5E5"
              strokeWidth="1"
            />
            <text x={padding.left - 8} y={getY(val) + 4} textAnchor="end" className="fill-muted" fontSize="10">
              {val >= 1000 ? `${val / 1000}k` : val}
            </text>
          </g>
        ))}

        {chartData.map((d, i) => (
          <text key={i} x={getX(i)} y={h - 8} textAnchor="middle" className="fill-muted" fontSize="10">
            {d.date.replace('May ', '')}
          </text>
        ))}

        <path d={webAreaPath} fill="url(#webGradient)" opacity="0.15" />
        <path d={webPath} fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={serverPath} fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {annotations.map((ann) => (
          <g key={ann.id}>
            <circle cx={getX(ann.chartIdx)} cy={getY(chartData[ann.chartIdx].web)} r="6" fill={ann.color} opacity="0.2" />
            <circle cx={getX(ann.chartIdx)} cy={getY(chartData[ann.chartIdx].web)} r="3" fill={ann.color} />
            <text x={getX(ann.chartIdx)} y={getY(chartData[ann.chartIdx].web) - 12} textAnchor="middle" fill={ann.color} fontSize="8" fontWeight="bold">
              {ann.id}
            </text>
          </g>
        ))}

        {chartData.map((d, i) => (
          <g key={i}>
            <circle cx={getX(i)} cy={getY(d.web)} r="3" fill="white" stroke="#0EA5E9" strokeWidth="2" />
            <circle cx={getX(i)} cy={getY(d.server)} r="3" fill="white" stroke="#F59E0B" strokeWidth="2" />
          </g>
        ))}

        {hoverIdx !== null && (
          <>
            <line
              x1={getX(hoverIdx)}
              y1={padding.top}
              x2={getX(hoverIdx)}
              y2={padding.top + chartH}
              stroke="#010101"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.3"
            />
            <rect x={getX(hoverIdx) - 50} y={padding.top - 8} width="100" height="50" rx="6" fill="#010101" />
            <text x={getX(hoverIdx)} y={padding.top + 12} textAnchor="middle" fill="white" fontSize="10" fontWeight="600">
              Web: {chartData[hoverIdx].web.toLocaleString()}
            </text>
            <text x={getX(hoverIdx)} y={padding.top + 28} textAnchor="middle" fill="white" fontSize="10" fontWeight="600">
              Server: {chartData[hoverIdx].server.toLocaleString()}
            </text>
          </>
        )}

        {chartData.map((_, i) => (
          <rect
            key={i}
            x={getX(i) - chartW / chartData.length / 2}
            y={padding.top}
            width={chartW / chartData.length}
            height={chartH}
            fill="transparent"
            onMouseEnter={() => setHoverIdx(i)}
          />
        ))}

        <defs>
          <linearGradient id="webGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex items-center justify-end gap-4 mt-2 text-xs text-muted">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9]" />
          <span>Web</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <span>Server</span>
        </div>
      </div>
    </div>
  );
}

export const EventOverviewScreen: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'logs' | 'users'>('overview');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showWebsiteDropdown, setShowWebsiteDropdown] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(websites[0]);
  const [chips, setChips] = useState<FilterChip[]>([]);
  const [logSearch, setLogSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState<typeof logData[0] | null>(null);
  const [selectedUser, setSelectedUser] = useState<typeof userData[0] | null>(null);

  const removeChip = (id: string) => {
    setChips((prev) => prev.filter((c) => c.id !== id));
  };

  const addFilter = (filterKey: string, value: string) => {
    const def = filterDefinitions[filterKey];
    const existing = chips.find((c) => c.label === def.label);
    if (existing) {
      setChips((prev) => prev.map((c) => (c.id === existing.id ? { ...c, value } : c)));
    } else {
      setChips((prev) => [...prev, { id: Date.now().toString(), label: def.label, value }]);
    }
  };

  const filteredLogs = logData.filter(
    (l) =>
      l.event.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.email.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.campaign.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.userId.toLowerCase().includes(logSearch.toLowerCase())
  );

  const filteredUsers = userData.filter(
    (u) =>
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.firstName.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.lastName.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.id.toLowerCase().includes(userSearch.toLowerCase())
  );

  const renderTabHeader = () => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-0">
        {(['overview', 'logs', 'users'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveSubTab(tab); setSelectedLog(null); setSelectedUser(null); }}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-[1px] ${
              activeSubTab === tab
                ? 'border-ink text-ink'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {tab === 'overview' ? 'Event Overview' : tab === 'logs' ? 'Logs' : 'Users'}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'global-filter' ? null : 'global-filter')}
            className="flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>
        <button
          onClick={() => setShowDatePicker(true)}
          className="flex items-center gap-2 text-xs text-muted hover:text-ink transition-colors"
        >
          <span>May 12, 2026 – May 23, 2026</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted" />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowWebsiteDropdown(!showWebsiteDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 bg-bg border border-border rounded-md text-xs text-ink hover:border-ink/20 transition-colors"
          >
            <span>{selectedWebsite}</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted" />
          </button>
          {showWebsiteDropdown && (
            <div className="absolute top-full right-0 mt-1 bg-surface border border-border rounded-lg shadow-lg z-50 py-1 min-w-[160px]">
              {websites.map((site) => (
                <button
                  key={site}
                  onClick={() => { setSelectedWebsite(site); setShowWebsiteDropdown(false); }}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                    selectedWebsite === site
                      ? 'text-ink bg-bg font-medium'
                      : 'text-muted hover:bg-bg hover:text-ink'
                  }`}
                >
                  {site}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderChips = () => {
    if (chips.length === 0) return null;
    return (
      <div className="flex items-center gap-2">
        {chips.map((chip) => {
          const filterKey = Object.keys(filterDefinitions).find(
            (k) => filterDefinitions[k].label === chip.label
          );
          return (
            <div key={chip.id} className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === chip.id ? null : chip.id)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-bg border border-border rounded-md text-xs hover:border-ink/20 transition-colors"
              >
                <span className="text-muted">{chip.label}:</span>
                <span className="text-ink font-medium">{chip.value}</span>
                <X
                  className="w-3 h-3 text-muted hover:text-danger ml-0.5"
                  onClick={(e) => { e.stopPropagation(); removeChip(chip.id); }}
                />
              </button>
              {openDropdown === chip.id && filterKey && (
                <Dropdown
                  options={filterDefinitions[filterKey].options}
                  onSelect={(val) => addFilter(filterKey, val)}
                  onClose={() => setOpenDropdown(null)}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderOverview = () => (
    <>
        <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Total Events</p>
          <p className="text-xl font-bold text-ink">104,187</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-success" />
            <span className="text-xs text-success font-semibold">+14.3%</span>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Unique Users</p>
          <p className="text-xl font-bold text-ink">18,432</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown className="w-3 h-3 text-danger" />
            <span className="text-xs text-danger font-semibold">-2.1%</span>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Avg Processing</p>
          <p className="text-xl font-bold text-ink">42ms</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-success" />
            <span className="text-xs text-success font-semibold">-8ms</span>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Delivery Rate</p>
          <p className="text-xl font-bold text-ink">99.2%</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-success" />
            <span className="text-xs text-success font-semibold">+0.3%</span>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-ink">Event Activity</h2>
        </div>
        <MiniLineChart />
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-ink">Annotations</h2>
          <button className="text-xs text-muted hover:text-ink flex items-center gap-1 transition-colors">
            Add <Pencil className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">#</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Date</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Title</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Description</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Added by</th>
              </tr>
            </thead>
            <tbody>
              {annotations.map((ann) => (
                <tr key={ann.id} className="border-b border-border/50 last:border-0 hover:bg-bg/50 transition-colors">
                  <td className="px-5 py-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: ann.color }}>
                      {ann.id}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-muted">{ann.date}</td>
                  <td className="px-5 py-3 text-xs font-semibold text-ink">{ann.title}</td>
                  <td className="px-5 py-3 text-xs text-muted">{ann.description}</td>
                  <td className="px-5 py-3 text-xs text-muted">{ann.addedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-ink">Events</h2>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search events..."
              className="input-search pl-9 w-48"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Event Name</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Total Events</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">EMQ Score</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Sources</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider text-right">Dest.</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.name} className="border-b border-border/50 last:border-0 hover:bg-bg/50 transition-colors cursor-pointer">
                  <td className="px-5 py-3">
                    <span className="font-mono text-xs text-info font-semibold">{event.name}</span>
                  </td>
                  <td className="px-5 py-3 font-semibold text-ink">{event.total}</td>
                  <td className="px-5 py-3 text-muted">{event.emq}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {event.sources.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-bg border border-border rounded text-[11px] text-muted">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-bg border border-border text-xs font-semibold text-ink">
                      {event.destinations}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderLogs = () => (
    <div className="flex gap-0">
      <div className={`bg-surface border border-border rounded-xl overflow-hidden ${selectedLog ? 'w-1/2' : 'w-full'}`}>
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-ink">Event Logs</h2>
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider px-2 py-0.5 bg-bg border border-border rounded-full">{filteredLogs.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted hover:text-ink border border-border rounded-md hover:border-ink/20 transition-colors">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search logs..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                className="input-search pl-9 w-56"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Timestamp</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Event</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Source</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Campaign</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">User</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Status</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider text-right">Resp.</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                  className={`border-b border-border/50 last:border-0 hover:bg-bg/50 transition-colors cursor-pointer ${
                    selectedLog?.id === log.id ? 'bg-info/5' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-[11px] text-muted font-mono">{log.timestamp}</td>
                  <td className="px-4 py-3 text-[11px] text-ink font-mono font-medium">{log.event}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-bg border border-border rounded text-[10px] text-muted">{log.source}</span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-muted">{log.campaign}</td>
                  <td className="px-4 py-3 text-[11px] text-info font-medium">{log.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      log.status === 'success' ? 'bg-success/10 text-success' : log.status === 'failed' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'
                    }`}>{log.status}</span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-muted font-mono text-right">{log.response}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLog && (
        <div className="w-1/2 ml-4 bg-surface border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-ink">Event Detail</h2>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                selectedLog.status === 'success' ? 'bg-success/10 text-success' : selectedLog.status === 'failed' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'
              }`}>{selectedLog.status}</span>
            </div>
            <button onClick={() => setSelectedLog(null)} className="text-muted hover:text-ink transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Event Name</p>
                <p className="text-xs text-ink font-mono font-semibold">{selectedLog.event}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Timestamp</p>
                <p className="text-xs text-ink font-mono">{selectedLog.timestamp}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Source</p>
                <p className="text-xs text-ink">{selectedLog.source}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Campaign</p>
                <p className="text-xs text-ink">{selectedLog.campaign}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Response</p>
                <p className="text-xs text-ink font-mono">{selectedLog.response}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Records</p>
                <p className="text-xs text-ink font-semibold">{selectedLog.records}</p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-2">User Context</p>
              <div className="bg-bg rounded-lg p-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[11px] text-muted">User ID</span>
                  <span className="text-[11px] text-ink font-mono">{selectedLog.userId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-muted">Email</span>
                  <span className="text-[11px] text-info font-medium">{selectedLog.email}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-2">Event Properties</p>
              <div className="bg-bg rounded-lg p-3 font-mono text-[11px] text-ink space-y-1">
                <p>{'{'}</p>
                <p className="pl-4">"event": "{selectedLog.event}",</p>
                <p className="pl-4">"timestamp": "{selectedLog.timestamp}",</p>
                <p className="pl-4">"source": "{selectedLog.source}",</p>
                <p className="pl-4">"campaign": "{selectedLog.campaign}",</p>
                <p className="pl-4">"userId": "{selectedLog.userId}",</p>
                <p className="pl-4">"records": {selectedLog.records}</p>
                <p>{'}'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderUsers = () => (
    <div className="flex gap-0">
      <div className={`bg-surface border border-border rounded-xl overflow-hidden ${selectedUser ? 'w-1/2' : 'w-full'}`}>
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-ink">Users</h2>
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider px-2 py-0.5 bg-bg border border-border rounded-full">{filteredUsers.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted hover:text-ink border border-border rounded-md hover:border-ink/20 transition-colors">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="input-search pl-9 w-56"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">User ID</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Email</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Events</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Country</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Device</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Last Active</th>
                <th className="px-4 py-2.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                  className={`border-b border-border/50 last:border-0 hover:bg-bg/50 transition-colors cursor-pointer ${
                    selectedUser?.id === user.id ? 'bg-info/5' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-[11px] text-ink font-mono font-medium">{user.id}</td>
                  <td className="px-4 py-3 text-[11px] text-ink">{user.email}</td>
                  <td className="px-4 py-3 text-[11px] font-semibold text-ink">{user.events}</td>
                  <td className="px-4 py-3 text-[11px] text-muted">{user.country}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-bg border border-border rounded text-[10px] text-muted">{user.device}</span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-muted">{user.lastActive}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      user.status === 'active' ? 'bg-success/10 text-success' : 'bg-bg text-muted'
                    }`}>{user.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="w-1/2 ml-4 bg-surface border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{selectedUser.firstName[0]}{selectedUser.lastName[0]}</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-ink">{selectedUser.firstName} {selectedUser.lastName}</h2>
                <p className="text-[11px] text-muted">{selectedUser.email}</p>
              </div>
            </div>
            <button onClick={() => setSelectedUser(null)} className="text-muted hover:text-ink transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">User ID</p>
                <p className="text-xs text-ink font-mono font-semibold">{selectedUser.id}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Status</p>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  selectedUser.status === 'active' ? 'bg-success/10 text-success' : 'bg-bg text-muted'
                }`}>{selectedUser.status}</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Total Events</p>
                <p className="text-xs text-ink font-semibold">{selectedUser.events}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Last Active</p>
                <p className="text-xs text-ink">{selectedUser.lastActive}</p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-2">Device Info</p>
              <div className="bg-bg rounded-lg p-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[11px] text-muted">Device</span>
                  <span className="text-[11px] text-ink">{selectedUser.device}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-muted">Browser</span>
                  <span className="text-[11px] text-ink">{selectedUser.browser}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-muted">OS</span>
                  <span className="text-[11px] text-ink">{selectedUser.os}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-muted">Country</span>
                  <span className="text-[11px] text-ink">{selectedUser.country}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-2">User Properties</p>
              <div className="bg-bg rounded-lg p-3 font-mono text-[11px] text-ink space-y-1">
                <p>{'{'}</p>
                <p className="pl-4">"userId": "{selectedUser.id}",</p>
                <p className="pl-4">"email": "{selectedUser.email}",</p>
                <p className="pl-4">"firstName": "{selectedUser.firstName}",</p>
                <p className="pl-4">"lastName": "{selectedUser.lastName}",</p>
                <p className="pl-4">"country": "{selectedUser.country}",</p>
                <p className="pl-4">"device": "{selectedUser.device}",</p>
                <p className="pl-4">"browser": "{selectedUser.browser}",</p>
                <p className="pl-4">"os": "{selectedUser.os}"</p>
                <p>{'}'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-[1280px] mx-auto space-y-6">
      {renderTabHeader()}
      {renderChips()}

      {activeSubTab === 'overview' && renderOverview()}
      {activeSubTab === 'logs' && renderLogs()}
      {activeSubTab === 'users' && renderUsers()}

      {showDatePicker && (
        <DatePickerPopover onClose={() => setShowDatePicker(false)} />
      )}
    </div>
  );
};
