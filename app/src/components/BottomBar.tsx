import { useState, useEffect } from 'react';
import {
  Wifi, WifiOff, HelpCircle, Settings,
  Bell
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function BottomBar() {
  const { isBotPaused } = useDashboard();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate online status check
    const checkOnline = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOnline);
    checkOnline();

    return () => {
      clearInterval(timer);
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOnline);
    };
  }, []);

  return (
    <TooltipProvider>
      <div className="w-full bg-[var(--noir-charcoal-lifted)] border-b border-[var(--noir-border)] sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-7 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Connection Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 status-pulse' : 'bg-red-500'}`} />
                <span className="text-sm text-[var(--noir-text)]">
                  {isOnline ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-sm text-[var(--noir-text-secondary)]">
                <span className="text-[var(--noir-border)]">|</span>
                <span>Dental Studio</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                  Production
                </span>
              </div>
            </div>

            {/* Center: Keyboard Hint */}
            <div className="hidden md:flex items-center gap-2 text-xs text-[var(--noir-text-secondary)]">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--noir-surface)] border border-[var(--noir-border)] text-[10px]">
                  /
                </kbd>
                to search
              </span>
              <span className="text-[var(--noir-border)]">•</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--noir-surface)] border border-[var(--noir-border)] text-[10px]">
                  Esc
                </kbd>
                to close
              </span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Bot Status Indicator */}
              <div className={`
                hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
                ${isBotPaused
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }
              `}>
                {isBotPaused ? (
                  <>
                    <WifiOff className="w-3 h-3" />
                    Bot Paused
                  </>
                ) : (
                  <>
                    <Wifi className="w-3 h-3" />
                    Bot Active
                  </>
                )}
              </div>

              {/* Time */}
              <span className="hidden lg:block text-sm text-[var(--noir-text-secondary)] font-tabular">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false
                })}
              </span>

              {/* Action Buttons */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[var(--noir-text-secondary)] hover:text-[var(--noir-text)] hover:bg-[var(--noir-surface)]"
                  >
                    <Bell className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-[var(--noir-charcoal-lifted)] border-[var(--noir-border)] text-[var(--noir-text)]"
                >
                  Notifications
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[var(--noir-text-secondary)] hover:text-[var(--noir-text)] hover:bg-[var(--noir-surface)]"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-[var(--noir-charcoal-lifted)] border-[var(--noir-border)] text-[var(--noir-text)]"
                >
                  Help & Support
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[var(--noir-text-secondary)] hover:text-[var(--noir-text)] hover:bg-[var(--noir-surface)]"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-[var(--noir-charcoal-lifted)] border-[var(--noir-border)] text-[var(--noir-text)]"
                >
                  Settings
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}