import { LeadFeed } from '../components/LeadFeed';

export default function LeadsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Patient Leads</h1>
            <div className="max-w-4xl mx-auto">
                <LeadFeed />
            </div>
        </div>
    );
}
