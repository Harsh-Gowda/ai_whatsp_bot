import { useDashboard } from '../context/DashboardContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export function LeadSidebar() {
    const { leads, selectedLead, setSelectedLead } = useDashboard();

    return (
        <div className="flex flex-col h-full glass-card overflow-hidden">
            <div className="p-4 border-b border-[var(--noir-border)]">
                <h2 className="text-lg font-semibold text-[var(--noir-text)]">Conversions</h2>
                <p className="text-xs text-[var(--noir-text-secondary)] mt-1">
                    {leads.length} active conversations
                </p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {leads.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-sm text-[var(--noir-text-secondary)]">No leads found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-[var(--noir-border)]">
                        {leads.map((lead) => {
                            const transitionClass = "transition-all duration-200 ease-in-out";
                            const isActive = selectedLead?.id === lead.id;

                            return (
                                <button
                                    key={lead.id}
                                    onClick={() => setSelectedLead(lead)}
                                    className={cn(
                                        "w-full text-left p-4 flex gap-3 hover:bg-[var(--noir-surface)]",
                                        transitionClass,
                                        isActive && "bg-[var(--noir-surface)] border-l-2 border-emerald-500"
                                    )}
                                >
                                    <Avatar className="h-10 w-10 border border-[var(--noir-border)] flex-shrink-0">
                                        <AvatarFallback className="bg-emerald-500/10 text-emerald-400 text-xs">
                                            {lead.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-sm font-medium text-[var(--noir-text)] truncate">
                                                {lead.name}
                                            </span>
                                            <span className="text-[10px] text-[var(--noir-text-secondary)]">
                                                {formatDistanceToNow(new Date(lead.timestamp), { addSuffix: false })}
                                            </span>
                                        </div>

                                        <p className="text-xs text-[var(--noir-text-secondary)] truncate">
                                            {lead.inquiry}
                                        </p>

                                        <div className="flex gap-2 mt-2">
                                            <Badge
                                                variant="secondary"
                                                className={cn(
                                                    "text-[10px] font-normal h-4 px-1.5",
                                                    lead.intentLevel === 'high' ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                                                )}
                                            >
                                                {lead.intentLevel}
                                            </Badge>
                                            <Badge
                                                variant="outline"
                                                className="text-[10px] font-normal h-4 px-1.5 border-[var(--noir-border)] text-[var(--noir-text-secondary)]"
                                            >
                                                {lead.status}
                                            </Badge>
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
