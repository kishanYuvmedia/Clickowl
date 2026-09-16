import React from 'react';
import { ClickOwlLogo } from '../ClickOwlLogo';
import { BarChart3, Link2, Settings } from 'lucide-react';

export type DashboardPage = 'dashboard' | 'sites' | 'crm-connection' | 'analytics' | 'funnels' | 'retention' | 'destinations' | 'settings' | 'team-members' | 'api-keys';

interface DashboardSidebarProps {
  activePage: DashboardPage;
  onNavigate: (page: DashboardPage) => void;
}

const navItems = [
  { id: 'analytics' as DashboardPage, label: 'Event Overview', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'analytics' as DashboardPage, label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'sites' as DashboardPage, label: 'Connection Site', icon: <Link2 className="w-4 h-4" /> },
  { id: 'settings' as DashboardPage, label: 'Settings', icon: <Settings className="w-4 h-4" /> },
];

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activePage,
  onNavigate,
}) => {
  const isActive = (id: DashboardPage) => {
    if (id === 'analytics' && activePage === 'analytics') return true;
    if (id === 'sites' && (activePage === 'sites' || activePage === 'crm-connection')) return true;
    if (id === 'settings' && (activePage === 'settings' || activePage === 'team-members' || activePage === 'api-keys')) return true;
    return activePage === id;
  };

  return (
    <aside className="w-[240px] h-screen bg-surface flex flex-col border-r border-border shrink-0">
      <div className="px-5 h-16 flex items-center border-b border-border">
        <ClickOwlLogo variant="horizontal" size="sm" />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-150 ${
              isActive(item.id)
                ? 'bg-ink text-white shadow-md'
                : 'text-muted hover:text-ink hover:bg-bg'
            }`}
          >
            <span className={isActive(item.id) ? 'text-white' : 'text-muted'}>
              {item.icon}
            </span>
            <span className="flex-1 text-left">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
