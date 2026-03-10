import { LiveChat } from '../components/LiveChat';

export default function ConversationsPage() {
    return (
        <div className="h-[calc(100vh-120px)]">
            <h1 className="text-2xl font-bold mb-6">Live Conversations</h1>
            <div className="h-full">
                <LiveChat />
            </div>
        </div>
    );
}
