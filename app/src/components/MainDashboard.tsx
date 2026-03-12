import { useEffect, useState } from 'react';
import { EngagementIntelligence } from './EngagementIntelligence';
import { LeadFeed } from './LeadFeed';
import { ActionsPanel } from './ActionsPanel';

export function MainDashboard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`
        grid grid-cols-1 lg:grid-cols-12 gap-5 h-full
        transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}
    >
      {/* Engagement Intelligence - Takes 5 columns */}
      <div 
        className={`
          lg:col-span-5 transition-all duration-700 delay-100
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
        `}
      >
        <EngagementIntelligence />
      </div>

      {/* Lead Feed - Takes 4 columns */}
      <div 
        className={`
          lg:col-span-4 transition-all duration-700 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <LeadFeed />
      </div>

      {/* Actions Panel - Takes 3 columns */}
      <div 
        className={`
          lg:col-span-3 transition-all duration-700 delay-300
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
        `}
      >
        <ActionsPanel />
      </div>
    </div>
  );
}