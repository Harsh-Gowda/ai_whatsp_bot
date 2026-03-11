import { LiveChat } from '../components/LiveChat';
import { LeadSidebar } from '../components/LeadSidebar';

export default function ConversationsPage() {
    return (
        <div className="h-[calc(100vh-100px)] -m-8 flex overflow-hidden border-b border-[var(--noir-border)]">
            {/* Left Sidebar - Contact List */}
            <div className="w-[350px] flex-shrink-0 border-r border-[var(--noir-border)] bg-[var(--noir-charcoal-lifted)]">
                <LeadSidebar />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 min-w-0 bg-[#0b141a]">
                <LiveChat />
            </div>
        </div>
    );
}
