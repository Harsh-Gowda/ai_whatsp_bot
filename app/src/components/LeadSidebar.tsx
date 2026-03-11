import { useDashboard } from '../context/DashboardContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function LeadSidebar() {
    const { leads, selectedLead, setSelectedLead } = useDashboard();

    return (
        <div className="flex flex-col h-full bg-[var(--noir-charcoal-lifted)]">
            {/* Sidebar Header */}
            <div className="p-3 bg-[var(--noir-charcoal-lifted)] border-b border-[var(--noir-border)]">
                <div className="flex items-center justify-between mb-3">
                    <Avatar className="h-10 w-10 border border-[var(--noir-border)]">
                        <AvatarFallback className="bg-emerald-500/20 text-emerald-400">DS</AvatarFallback>
                    </Avatar>
                    <div className="flex gap-2">
                        <button className="p-2 text-[var(--noir-text-secondary)] hover:bg-[var(--noir-surface)] rounded-full transition-colors">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-[var(--noir-text-secondary)]" />
                    </div>
                    <Input
                        className="pl-10 h-9 bg-[var(--noir-surface)] border-none text-sm placeholder:text-[var(--noir-text-secondary)] focus-visible:ring-0"
                        placeholder="Search or start new chat"
                    />
                </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {leads.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-sm text-[var(--noir-text-secondary)]">No chats yet</p>
                    </div>
                ) : (
                    <div className="">
                        {leads.map((lead) => {
                            const isActive = selectedLead?.id === lead.id;

                            return (
                                <button
                                    key={lead.id}
                                    onClick={() => setSelectedLead(lead)}
                                    className={cn(
                                        "w-full text-left p-3 flex gap-3 hover:bg-[var(--noir-surface)] border-b border-[var(--noir-border)]/50 transition-colors relative",
                                        isActive && "bg-[var(--noir-surface)]"
                                    )}
                                >
                                    <Avatar className="h-12 w-12 flex-shrink-0">
                                        <AvatarFallback className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 font-semibold text-lg">
                                            {lead.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <div className="flex justify-between items-start">
                                            <span className="text-base font-medium text-[var(--noir-text)] truncate">
                                                {lead.name}
                                            </span>
                                            <span className={cn(
                                                "text-[10px] whitespace-nowrap",
                                                isActive ? "text-emerald-400" : "text-[var(--noir-text-secondary)]"
                                            )}>
                                                {formatDistanceToNow(new Date(lead.timestamp), { addSuffix: false })}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center mt-0.5">
                                            <p className="text-sm text-[var(--noir-text-secondary)] truncate flex-1 leading-tight">
                                                {lead.inquiry}
                                            </p>
                                            {lead.status === 'new' && !isActive && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ml-2" />
                                            )}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
