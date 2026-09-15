import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerPopoverProps {
  onClose: () => void;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const RECENTLY_USED = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last Month', value: 'last-month' },
  { label: 'Last 90 Days', value: 'last-90' },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function CalendarMonth({
  year,
  month,
  selectedStart,
  selectedEnd,
  onSelect,
}: {
  year: number;
  month: number;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  onSelect: (date: Date) => void;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const isSelected = (day: number) => {
    if (!selectedStart && !selectedEnd) return false;
    const d = new Date(year, month, day);
    if (selectedStart && d.getTime() === selectedStart.getTime()) return true;
    if (selectedEnd && d.getTime() === selectedEnd.getTime()) return true;
    return false;
  };

  const isInRange = (day: number) => {
    if (!selectedStart || !selectedEnd) return false;
    const d = new Date(year, month, day).getTime();
    return d > selectedStart.getTime() && d < selectedEnd.getTime();
  };

  return (
    <div className="flex-1 min-w-[200px]">
      <p className="text-xs font-semibold text-ink text-center mb-3">
        {MONTHS[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-0">
        {WEEKDAYS.map((wd, i) => (
          <div key={i} className="text-center text-[10px] text-muted font-medium py-1.5">
            {wd}
          </div>
        ))}
        {days.map((day, i) => (
          <div key={i} className="flex items-center justify-center h-8">
            {day !== null && (
              <button
                onClick={() => onSelect(new Date(year, month, day))}
                className={`relative w-8 h-8 flex items-center justify-center rounded-md text-xs transition-colors ${
                  isSelected(day)
                    ? 'bg-ink text-white font-bold z-10'
                    : isInRange(day)
                    ? 'bg-bg text-ink'
                    : isToday(day)
                    ? 'text-info font-bold'
                    : 'text-ink hover:bg-bg'
                }`}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({ onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [leftMonth, setLeftMonth] = useState(4);
  const [leftYear, setLeftYear] = useState(2026);
  const [rightMonth, setRightMonth] = useState(5);
  const [rightYear, setRightYear] = useState(2026);

  const [fromDate, setFromDate] = useState('05/12/2026');
  const [toDate, setToDate] = useState('05/23/2026');
  const [compareWith, setCompareWith] = useState(false);
  const [compareTo, setCompareTo] = useState('Previous Period');
  const [compFromDate, setCompFromDate] = useState('04/12/2026');
  const [compToDate, setCompToDate] = useState('04/23/2026');

  const [selectedStart, setSelectedStart] = useState<Date | null>(new Date(2026, 4, 12));
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(new Date(2026, 4, 23));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const handlePrev = () => {
    if (leftMonth === 0) {
      setLeftMonth(11);
      setLeftYear(leftYear - 1);
    } else {
      setLeftMonth(leftMonth - 1);
    }
    if (rightMonth === 0) {
      setRightMonth(11);
      setRightYear(rightYear - 1);
    } else {
      setRightMonth(rightMonth - 1);
    }
  };

  const handleNext = () => {
    if (leftMonth === 11) {
      setLeftMonth(0);
      setLeftYear(leftYear + 1);
    } else {
      setLeftMonth(leftMonth + 1);
    }
    if (rightMonth === 11) {
      setRightMonth(0);
      setRightYear(rightYear + 1);
    } else {
      setRightMonth(rightMonth + 1);
    }
  };

  const handleDateSelect = (date: Date) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(date);
      setSelectedEnd(null);
    } else {
      if (date < selectedStart) {
        setSelectedEnd(selectedStart);
        setSelectedStart(date);
      } else {
        setSelectedEnd(date);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/20 flex items-start justify-end pt-16 pr-8 z-[100]">
      <div
        ref={ref}
        className="bg-surface border border-border rounded-xl shadow-xl w-[680px] flex overflow-hidden"
      >
        <div className="w-[200px] border-r border-border p-4 flex flex-col">
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-[10px] text-muted font-medium mb-1">From</label>
              <input
                type="text"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-bg border border-border rounded-md text-ink focus:outline-none focus:border-ink/20"
              />
            </div>
            <div>
              <label className="block text-[10px] text-muted font-medium mb-1">To</label>
              <input
                type="text"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-bg border border-border rounded-md text-ink focus:outline-none focus:border-ink/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <label className="text-[11px] text-muted">Compare with</label>
            <button
              onClick={() => setCompareWith(!compareWith)}
              className={`relative w-8 h-4 rounded-full transition-colors ${
                compareWith ? 'bg-ink' : 'bg-border'
              }`}
            >
              <span
                className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                  compareWith ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {compareWith && (
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-[10px] text-muted font-medium mb-1">Compare To</label>
                <select
                  value={compareTo}
                  onChange={(e) => setCompareTo(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-bg border border-border rounded-md text-ink focus:outline-none focus:border-ink/20"
                >
                  <option>Previous Period</option>
                  <option>Previous Year</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-muted font-medium mb-1">From</label>
                <input
                  type="text"
                  value={compFromDate}
                  onChange={(e) => setCompFromDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-bg border border-border rounded-md text-ink focus:outline-none focus:border-ink/20"
                />
              </div>
              <div>
                <label className="block text-[10px] text-muted font-medium mb-1">To</label>
                <input
                  type="text"
                  value={compToDate}
                  onChange={(e) => setCompToDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-bg border border-border rounded-md text-ink focus:outline-none focus:border-ink/20"
                />
              </div>
            </div>
          )}

          <div className="mt-auto">
            <p className="text-[10px] text-muted font-medium mb-2">Recently Used</p>
            <div className="space-y-0.5">
              {RECENTLY_USED.map((item) => (
                <button
                  key={item.value}
                  className="w-full text-left px-2 py-1.5 text-[11px] text-muted hover:text-ink hover:bg-bg rounded transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button className="w-full mt-4 px-3 py-2 bg-ink text-white text-xs font-semibold rounded-md hover:bg-ink-soft transition-colors">
              Apply
            </button>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrev} className="p-1 text-muted hover:text-ink transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-6">
              <span className="text-xs text-ink font-medium">
                {MONTHS[leftMonth]} {leftYear}
              </span>
              <span className="text-xs text-ink font-medium">
                {MONTHS[rightMonth]} {rightYear}
              </span>
            </div>
            <button onClick={handleNext} className="p-1 text-muted hover:text-ink transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-4">
            <CalendarMonth
              year={leftYear}
              month={leftMonth}
              selectedStart={selectedStart}
              selectedEnd={selectedEnd}
              onSelect={handleDateSelect}
            />
            <CalendarMonth
              year={rightYear}
              month={rightMonth}
              selectedStart={selectedStart}
              selectedEnd={selectedEnd}
              onSelect={handleDateSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
