import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { BottomBar } from './components/BottomBar';
import { NoiseOverlay } from './components/NoiseOverlay';
import { DashboardProvider } from './context/DashboardContext';

// Pages
import DashboardPage from './pages/DashboardPage';
import ConversationsPage from './pages/ConversationsPage';
import LeadsPage from './pages/LeadsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardProvider>
      <div className="min-h-screen bg-[var(--noir-charcoal)] text-[var(--noir-text)] overflow-hidden flex">
        {/* Noise Texture Overlay */}
        <NoiseOverlay />

        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col min-h-screen transition-all duration-700 ml-64 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Top Status Bar (formerly BottomBar) */}
          <BottomBar />

          {/* Main Content with Routing */}
          <main className="flex-1 px-8 py-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/conversations" element={<ConversationsPage />} />
              <Route path="/leads" element={<LeadsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}

export default App;