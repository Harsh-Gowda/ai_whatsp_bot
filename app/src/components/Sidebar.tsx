import { NavLink } from 'react-router-dom';
import {
    MessageSquare,
    Users,
    BarChart3,
    Settings,
    Zap,
    LayoutDashboard,
    LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Conversations', icon: MessageSquare, path: '/conversations' },
    { label: 'Leads', icon: Users, path: '/leads' },
    { label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Settings', icon: Settings, path: '/settings' },
];

export function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[var(--noir-charcoal)] border-r border-[var(--noir-border)] flex flex-col z-50">
            {/* Logo */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight text-[var(--noir-text)] leading-none">
                        Chatsmith
                    </span>
                    <span className="text-[10px] text-[var(--noir-text-secondary)] tracking-wider uppercase mt-1">
                        AI Receptionist
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                                    ? 'bg-[var(--noir-surface)] text-[var(--noir-text)] shadow-sm'
                                    : 'text-[var(--noir-text-secondary)] hover:text-[var(--noir-text)] hover:bg-[var(--noir-surface)]/50'
                                }
              `}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </NavLink>
                    );
                })}
            </nav>

            {/* User & Footer */}
            <div className="p-4 border-t border-[var(--noir-border)]">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--noir-surface)]/30 border border-[var(--noir-border)]/50">
                    <Avatar className="w-10 h-10 border-2 border-[var(--noir-border)]">
                        <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-sm font-semibold">
                            EV
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-medium text-[var(--noir-text)] truncate">Elena Voss</span>
                        <span className="text-xs text-[var(--noir-text-secondary)] truncate">Admin</span>
                    </div>
                </div>

                <button className="w-full mt-4 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
