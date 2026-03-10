import { useState } from 'react';
import { Search, Filter, MoreHorizontal, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useDashboard, type Lead } from '../context/DashboardContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusConfig = {
  new: { label: 'New', className: 'status-new' },
  replied: { label: 'Replied', className: 'status-replied' },
  booked: { label: 'Booked', className: 'status-booked' },
  escalated: { label: 'Escalated', className: 'status-escalated' },
};

const intentConfig = {
  high: { color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', label: 'High' },
  medium: { color: 'text-amber-400', bgColor: 'bg-amber-500/10', label: 'Medium' },
  low: { color: 'text-blue-400', bgColor: 'bg-blue-500/10', label: 'Low' },
};

interface LeadRowProps {
  lead: Lead;
  isSelected: boolean;
  onSelect: (lead: Lead) => void;
}

function LeadRow({ lead, isSelected, onSelect }: LeadRowProps) {
  const status = statusConfig[lead.status];
  const intent = intentConfig[lead.intentLevel];

  return (
    <div
      onClick={() => onSelect(lead)}
      className={`
        group flex items-center gap-3 p-3 rounded-xl cursor-pointer
        transition-all duration-200
        ${isSelected 
          ? 'bg-[var(--noir-surface)] border border-emerald-500/30' 
          : 'hover:bg-[var(--noir-surface)]/50 border border-transparent'
        }
      `}
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-[var(--noir-surface)] flex items-center justify-center flex-shrink-0 border border-[var(--noir-border)]">
        <User className="w-5 h-5 text-[var(--noir-text-secondary)]" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-medium text-[var(--noir-text)] truncate">
            {lead.name}
          </h4>
          <span className="text-[10px] text-[var(--noir-text-secondary)] flex-shrink-0">
            {formatDistanceToNow(new Date(lead.timestamp), { addSuffix: true })}
          </span>
        </div>
        
        <p className="text-xs text-[var(--noir-text-secondary)] truncate mt-0.5">
          {lead.inquiry}
        </p>
        
        <div className="flex items-center gap-2 mt-2">
          <span className={`status-pill ${status.className}`}>
            {status.label}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${intent.bgColor} ${intent.color}`}>
            {intent.label} Intent
          </span>
        </div>
      </div>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-[var(--noir-text-secondary)] hover:text-[var(--noir-text)] hover:bg-[var(--noir-surface)]"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end"
          className="bg-[var(--noir-charcoal-lifted)] border-[var(--noir-border)]"
        >
          <DropdownMenuItem className="text-[var(--noir-text)] hover:bg-[var(--noir-surface)] cursor-pointer">
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem className="text-[var(--noir-text)] hover:bg-[var(--noir-surface)] cursor-pointer">
            Send Message
          </DropdownMenuItem>
          <DropdownMenuItem className="text-[var(--noir-text)] hover:bg-[var(--noir-surface)] cursor-pointer">
            Mark as Booked
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
            Archive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function LeadFeed() {
  const { leads, selectedLead, setSelectedLead } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.inquiry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter ? lead.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    new: leads.filter(l => l.status === 'new').length,
    replied: leads.filter(l => l.status === 'replied').length,
    booked: leads.filter(l => l.status === 'booked').length,
    escalated: leads.filter(l => l.status === 'escalated').length,
  };

  return (
    <div className="glass-card h-full flex flex-col min-h-[500px]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--noir-border)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--noir-text)] uppercase tracking-wider">
              Recent Leads
            </h3>
            <p className="text-xs text-[var(--noir-text-secondary)] mt-0.5">
              {leads.length} total leads • {statusCounts.new} new
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--noir-text-secondary)] hover:text-[var(--noir-text)] hover:bg-[var(--noir-surface)]"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--noir-text-secondary)]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads..."
            className="pl-10 bg-[var(--noir-surface)] border-[var(--noir-border)] text-[var(--noir-text)] placeholder:text-[var(--noir-text-secondary)]/50 focus:ring-emerald-500/30 focus:border-emerald-500/50"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {(['new', 'replied', 'booked', 'escalated'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? null : status)}
              className={`
                px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider transition-all
                ${statusFilter === status
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-[var(--noir-surface)] text-[var(--noir-text-secondary)] border border-[var(--noir-border)] hover:border-[var(--noir-text-secondary)]/30'
                }
              `}
            >
              {status} ({statusCounts[status]})
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
        <div className="space-y-1">
          {filteredLeads.map((lead) => (
            <LeadRow
              key={lead.id}
              lead={lead}
              isSelected={selectedLead?.id === lead.id}
              onSelect={setSelectedLead}
            />
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--noir-surface)] flex items-center justify-center mb-3">
              <Search className="w-5 h-5 text-[var(--noir-text-secondary)]" />
            </div>
            <p className="text-sm text-[var(--noir-text-secondary)]">
              No leads found
            </p>
            <p className="text-xs text-[var(--noir-text-secondary)]/60 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[var(--noir-border)]">
        <Button 
          variant="outline" 
          className="w-full border-[var(--noir-border)] text-[var(--noir-text-secondary)] hover:text-[var(--noir-text)] hover:bg-[var(--noir-surface)] hover:border-[var(--noir-text-secondary)]/30"
        >
          View All Leads
        </Button>
      </div>
    </div>
  );
}