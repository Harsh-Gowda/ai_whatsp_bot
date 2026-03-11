import { useState, useRef, useEffect } from 'react';
import { Send, Phone, MoreVertical, CheckCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useDashboard } from '../context/DashboardContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LiveChat() {
  const { chatMessages, selectedLead } = useDashboard();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      // In real implementation, this would send to backend
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!selectedLead) {
    return (
      <div className="glass-card h-full flex items-center justify-center text-center p-8 min-h-[500px]">
        <div className="max-w-xs">
          <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-[var(--noir-border)] grayscale opacity-50">
            <AvatarFallback className="bg-[var(--noir-surface)] text-[var(--noir-text-secondary)]">
              ?
            </AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold text-[var(--noir-text)] mb-2">No Conversation Selected</h3>
          <p className="text-sm text-[var(--noir-text-secondary)]">
            Select a lead from the sidebar to start responding to their messages in real-time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card h-full flex flex-col min-h-[500px]">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--noir-border)]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10 border-2 border-[var(--noir-border)]">
              <AvatarFallback className="bg-emerald-500/20 text-emerald-400 font-semibold">
                {selectedLead ? selectedLead.name.split(' ').map(n => n[0]).join('') : 'EV'}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[var(--noir-charcoal-lifted)]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--noir-text)]">
              {selectedLead ? selectedLead.name : 'Dr. Elena Voss'}
            </h3>
            <p className="text-xs text-[var(--noir-text-secondary)]">
              {selectedLead ? selectedLead.inquiry : 'Dental Studio'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-[var(--noir-text-secondary)] hover:text-[var(--noir-text)] hover:bg-[var(--noir-surface)]"
          >
            <Phone className="w-4 h-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-[var(--noir-text-secondary)] hover:text-[var(--noir-text)] hover:bg-[var(--noir-surface)]"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[var(--noir-charcoal-lifted)] border-[var(--noir-border)]"
            >
              <DropdownMenuItem className="text-[var(--noir-text)] hover:bg-[var(--noir-surface)] cursor-pointer">
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[var(--noir-text)] hover:bg-[var(--noir-surface)] cursor-pointer">
                Mark as Lead
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                Block User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {chatMessages.map((message, index) => {
          const isUser = message.role === 'user';
          const showAvatar = index === 0 || chatMessages[index - 1].role !== message.role;

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${isUser ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {showAvatar && (
                <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
                  <AvatarFallback
                    className={`text-xs font-semibold ${isUser
                        ? 'bg-[var(--noir-surface)] text-[var(--noir-text-secondary)]'
                        : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                  >
                    {isUser ? 'P' : 'AI'}
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={`flex flex-col ${!showAvatar && (isUser ? 'ml-11' : 'mr-11')}`}>
                <div className={isUser ? 'message-bubble-user' : 'message-bubble-ai'}>
                  <p className="text-sm text-[var(--noir-text)] leading-relaxed">
                    {message.content}
                  </p>
                </div>
                <div className={`flex items-center gap-1 mt-1 ${isUser ? '' : 'flex-row-reverse'}`}>
                  <span className="text-[10px] text-[var(--noir-text-secondary)]">
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                  </span>
                  {!isUser && (
                    <CheckCheck className="w-3 h-3 text-emerald-400" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[var(--noir-border)]">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a reply..."
            className="flex-1 bg-[var(--noir-surface)] border-[var(--noir-border)] text-[var(--noir-text)] placeholder:text-[var(--noir-text-secondary)]/50 focus:ring-emerald-500/30 focus:border-emerald-500/50"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[10px] text-[var(--noir-text-secondary)] mt-2 text-center">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}