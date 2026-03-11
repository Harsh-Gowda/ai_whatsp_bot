import { LiveChat } from '../components/LiveChat';
import { LeadSidebar } from '../components/LeadSidebar';

export default function ConversationsPage() {
    return (
        <div className="h-[calc(100vh-140px)] flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-[var(--noir-text)]">Live Conversations</h1>

            <div className="flex-1 flex gap-6 min-h-0">
                {/* Left Sidebar - 1/3 width approx */}
                <div className="w-80 flex-shrink-0">
                    <LeadSidebar />
                </div>

                {/* Main Chat Area - Remaining width */}
                <div className="flex-1 min-w-0">
                    <LiveChat />
                </div>
            </div>
        </div>
    );
}
