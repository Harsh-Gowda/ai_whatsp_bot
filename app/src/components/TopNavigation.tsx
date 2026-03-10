import { useState } from 'react';
import { MessageSquare, Users, BarChart3, Settings, ChevronDown, Zap } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { label: 'Dashboard', icon: BarChart3, active: true },
  { label: 'Conversations', icon: MessageSquare, active: false },
  { label: 'Leads', icon: Users, active: false },
  { label: 'Settings', icon: Settings, active: false },
];

export function TopNavigation() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <nav className="w-full bg-[var(--noir-charcoal)] border-b border-[var(--noir-border)]">
      <div className="px-4 sm:px-6 lg:px-7">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[var(--noir-text)]">
                Chatsmith
              </span>
              <span className="text-[10px] text-[var(--noir-text-secondary)] tracking-wider uppercase">
                AI Receptionist
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.label;
              
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveItem(item.label)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-[var(--noir-surface)] text-[var(--noir-text)]' 
                      : 'text-[var(--noir-text-secondary)] hover:text-[var(--noir-text)] hover:bg-[var(--noir-surface)]/50'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[var(--noir-surface)] transition-colors">
                <Avatar className="w-8 h-8 border-2 border-[var(--noir-border)]">
                  <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-sm font-semibold">
                    EV
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium text-[var(--noir-text)]">Elena V.</span>
                  <span className="text-xs text-[var(--noir-text-secondary)]">Admin</span>
                </div>
                <ChevronDown className="w-4 h-4 text-[var(--noir-text-secondary)]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-[var(--noir-charcoal-lifted)] border-[var(--noir-border)]"
            >
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-[var(--noir-text)]">Elena Voss</p>
                <p className="text-xs text-[var(--noir-text-secondary)]">elena@dentalstudio.com</p>
              </div>
              <DropdownMenuSeparator className="bg-[var(--noir-border)]" />
              <DropdownMenuItem className="text-[var(--noir-text)] hover:bg-[var(--noir-surface)] cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}