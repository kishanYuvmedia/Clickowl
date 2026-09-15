import React from 'react';
import { DashboardSidebar, DashboardPage } from './DashboardSidebar';
import { DashboardTopBar } from './DashboardTopBar';

interface DashboardLayoutProps {
  activePage: DashboardPage;
  onNavigate: (page: DashboardPage) => void;
  onProfile?: () => void;
  onLogout?: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activePage,
  onNavigate,
  onProfile,
  onLogout,
  children,
}) => {
  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <DashboardSidebar activePage={activePage} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopBar onProfile={onProfile} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-bg">{children}</main>
      </div>
    </div>
  );
};
