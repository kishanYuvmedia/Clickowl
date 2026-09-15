import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, LogOut, Bell } from 'lucide-react';

interface DashboardTopBarProps {
  onProfile?: () => void;
  onLogout?: () => void;
}

export const DashboardTopBar: React.FC<DashboardTopBarProps> = ({ onProfile, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-16 bg-surface border-b border-border px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-bg border border-border flex items-center justify-center">
          <Bell className="w-4 h-4 text-muted" />
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-bg transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center shadow-sm">
            <span className="text-white text-[11px] font-bold">DS</span>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-[13px] font-semibold text-ink leading-tight">Dixita S.</p>
            <p className="text-[11px] text-muted">dixita@clickowl.io</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted" />
        </button>

        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 bg-surface border border-border rounded-xl shadow-xl z-50 py-1.5 min-w-[180px]">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-[13px] font-semibold text-ink">Dixita S.</p>
              <p className="text-[11px] text-muted mt-0.5">dixita@clickowl.io</p>
            </div>
            <button
              onClick={() => { setShowDropdown(false); onProfile?.(); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-ink hover:bg-bg transition-colors"
            >
              <User className="w-4 h-4 text-muted" />
              Profile
            </button>
            <button
              onClick={() => { setShowDropdown(false); onLogout?.(); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-danger hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
