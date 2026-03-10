import { StatsBar } from '../components/StatsBar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Analytics & performance</h1>
            <StatsBar />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg">Response Time Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center text-[var(--noir-text-secondary)]">
                        Chart Placeholder - Response Time
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg">Lead Quality Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center text-[var(--noir-text-secondary)]">
                        Chart Placeholder - Quality
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
