import React, { useState } from 'react';
import { ClickOwlLogo } from '../ClickOwlLogo';
import { AnalyticsWatermark } from '../AnalyticsWatermark';
import {
  LayoutDashboard,
  Link2,
  BarChart3,
  Send,
  Settings,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

export type DashboardPage = 'dashboard' | 'sites' | 'crm-connection' | 'analytics' | 'funnels' | 'retention' | 'destinations' | 'settings' | 'team-members' | 'api-keys';

interface DashboardSidebarProps {
  activePage: DashboardPage;
  onNavigate: (page: DashboardPage) => void;
}

interface NavItem {
  id: DashboardPage;
  label: string;
  icon: React.ReactNode;
  children?: { id: DashboardPage; label: string }[];
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: 'sites',
    label: 'Connections',
    icon: <Link2 className="w-4 h-4" />,
    children: [
      { id: 'sites', label: 'Site Connection' },
      { id: 'crm-connection', label: 'CRM Connection' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 className="w-4 h-4" />,
    children: [
      { id: 'analytics', label: 'Event Overview' },
      { id: 'funnels', label: 'Funnels' },
      { id: 'retention', label: 'Retention' },
    ],
  },
  {
    id: 'destinations',
    label: 'Destinations',
    icon: <Send className="w-4 h-4" />,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-4 h-4" />,
    children: [
      { id: 'settings', label: 'General' },
      { id: 'team-members', label: 'Team Members' },
      { id: 'api-keys', label: 'API Keys' },
    ],
  },
];

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activePage,
  onNavigate,
}) => {
  const [expandedItems, setExpandedItems] = useState<DashboardPage[]>(['sites', 'analytics', 'settings']);

  const toggleExpand = (id: DashboardPage) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isActive = (id: DashboardPage) => activePage === id;
  const isParentActive = (item: NavItem) =>
    item.children?.some((child) => child.id === activePage) || item.id === activePage;

  React.useEffect(() => {
    navItems.forEach((item) => {
      if (item.children?.some((child) => child.id === activePage)) {
        setExpandedItems((prev) => prev.includes(item.id) ? prev : [...prev, item.id]);
      }
    });
  }, [activePage]);

  return (
    <aside className="w-[240px] h-screen bg-surface flex flex-col border-r border-border shrink-0">
      <div className="px-5 h-16 flex items-center border-b border-border">
        <ClickOwlLogo variant="horizontal" size="sm" />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => {
                if (item.children) {
                  toggleExpand(item.id);
                  if (!item.children.some((c) => c.id === activePage)) {
                    onNavigate(item.children[0].id);
                  }
                } else {
                  onNavigate(item.id);
                }
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-150 ${
                isActive(item.id) && !item.children
                  ? 'bg-ink text-white shadow-md'
                  : isParentActive(item)
                  ? 'text-ink bg-bg'
                  : 'text-muted hover:text-ink hover:bg-bg'
              }`}
            >
              <span className={isActive(item.id) && !item.children ? 'text-white' : 'text-muted'}>
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.children && (
                <span className="text-muted">
                  {expandedItems.includes(item.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </span>
              )}
            </button>

            {item.children && expandedItems.includes(item.id) && (
              <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-border pl-3">
                {item.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => onNavigate(child.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                      isActive(child.id)
                        ? 'bg-brand text-ink shadow-sm'
                        : 'text-muted hover:text-ink hover:bg-bg'
                    }`}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="px-4 pb-5 pt-4 border-t border-border">
        <AnalyticsWatermark
          color="#9ca3af"
          opacity={0.4}
          className="w-full max-w-[140px] mx-auto"
        />
      </div>
    </aside>
  );
};
