import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
    return (
        <div className="max-w-4xl space-y-8">
            <h1 className="text-2xl font-bold">Settings</h1>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Clinic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="clinic-name">Clinic Name</Label>
                            <Input id="clinic-name" defaultValue="Dental Studio" className="bg-[var(--noir-surface)] border-[var(--noir-border)]" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="doctor-name">Doctor Name</Label>
                            <Input id="doctor-name" defaultValue="Dr. Elena Voss" className="bg-[var(--noir-surface)] border-[var(--noir-border)]" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>AI Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="font-medium">AI Receptionist Active</p>
                            <p className="text-sm text-[var(--noir-text-secondary)]">Enable or disable the AI bot on WhatsApp</p>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    <div className="pt-4">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
