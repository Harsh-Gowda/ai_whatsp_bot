import { StatsBar } from '../components/StatsBar';
import { MainDashboard } from '../components/MainDashboard';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <StatsBar />
            <MainDashboard />
        </div>
    );
}
