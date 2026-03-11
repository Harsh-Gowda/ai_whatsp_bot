import { useState, useRef, useEffect } from 'react';
import { Send, Phone, MoreVertical, CheckCheck, HelpCircle, Search } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

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
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#0b141a] border-l border-[var(--noir-border)]">
        <div className="max-w-md flex flex-col items-center">
          <div className="w-24 h-24 mb-8 bg-emerald-500/10 rounded-full flex items-center justify-center">
            <Phone className="w-10 h-10 text-emerald-500 opacity-50" />
          </div>
          <h3 className="text-3xl font-light text-[var(--noir-text)] mb-3">WhatsApp Web</h3>
          <p className="text-sm text-[var(--noir-text-secondary)] leading-relaxed mb-12">
            Select a lead from the contact list on the left to start responding to dental inquiries in real-time.
          </p>
          <div className="mt-8 flex items-center gap-2 text-[var(--noir-text-secondary)]/40 text-xs">
            <CheckCheck className="w-3 h-3" />
            End-to-end encrypted
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0b141a] border-l border-[var(--noir-border)] relative overflow-hidden">
      {/* WhatsApp Chat Header */}
      <div className="flex items-center justify-between p-3 bg-[var(--noir-charcoal-lifted)] z-10 border-b border-[var(--noir-border)]/30">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border border-[var(--noir-border)]">
            <AvatarFallback className="bg-emerald-500/20 text-emerald-400 font-semibold text-sm">
              {selectedLead.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-sm font-medium text-[var(--noir-text)]">
              {selectedLead.name}
            </h3>
            <p className="text-[10px] text-emerald-400">
              online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-[var(--noir-text-secondary)] cursor-pointer hover:text-[var(--noir-text)]" />
          <MoreVertical className="w-5 h-5 text-[var(--noir-text-secondary)] cursor-pointer hover:text-[var(--noir-text)]" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 relative custom-scrollbar bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat opacity-95">
        {chatMessages.map((message) => {
          const isUser = message.role === 'user';

          return (
            <div
              key={message.id}
              className={`flex w-full ${isUser ? 'justify-start' : 'justify-end'}`}
            >
              <div className={cn(
                "max-w-[75%] px-3 py-2 rounded-lg text-sm relative shadow-sm",
                isUser
                  ? "bg-[#202c33] text-[var(--noir-text)] rounded-tl-none border border-white/5"
                  : "bg-emerald-600 text-white rounded-tr-none"
              )}>
                {message.content}
                <div className={cn(
                  "flex items-center gap-1 justify-end mt-1",
                  isUser ? "text-[rgba(255,255,255,0.4)]" : "text-[rgba(255,255,255,0.7)]"
                )}>
                  <span className="text-[9px]">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {!isUser && (
                    <CheckCheck className="w-3 h-3" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* WhatsApp-style Input Area */}
      <div className="p-3 bg-[var(--noir-charcoal-lifted)] flex items-center gap-3 border-t border-[var(--noir-border)]/30">
        <Button variant="ghost" size="icon" className="text-[var(--noir-text-secondary)] h-10 w-10">
          <HelpCircle className="w-6 h-6" />
        </Button>
        <div className="flex-1">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            className="w-full bg-[var(--noir-surface)] border-none text-[15px] h-11 rounded-xl focus-visible:ring-0 placeholder:text-[var(--noir-text-secondary)]/50"
          />
        </div>
        <Button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className="bg-emerald-500 hover:bg-emerald-600 text-white w-12 h-11 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
        >
          <Send className="w-5 h-5 translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
}