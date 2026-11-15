import React, { useState } from 'react';
import { EmailProvider } from './context/EmailContext.jsx';
import { ViewModeProvider, useViewMode } from './context/ViewModeContext.jsx';
import Navbar from './components/Navbar.jsx';
import AssistantDashboard from './components/AssistantView/AssistantDashboard.jsx';
import ClientDashboard from './components/ClientView/ClientDashboard.jsx';
import ConnectAccountModal from './components/Onboarding/ConnectAccountModal.jsx';
import SimulateIncomingModal from './components/AICopilot/SimulateIncomingModal.jsx';
import AIChatDrawer from './components/AICopilot/AIChatDrawer.jsx';
import OnboardingTour from './components/Onboarding/OnboardingTour.jsx';
import Toast from './components/common/Toast.jsx';

function MainApp() {
  const { viewMode } = useViewMode();
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isSimulateOpen, setIsSimulateOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        onOpenConnect={() => setIsConnectOpen(true)}
        onOpenSimulate={() => setIsSimulateOpen(true)}
        onOpenAIChat={() => setIsAIChatOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
      />

      {/* Main View Router: Assistant vs Client */}
      <main className="flex-1 pb-16">
        {viewMode === 'assistant' ? (
          <AssistantDashboard />
        ) : (
          <ClientDashboard />
        )}
      </main>

      {/* Interactive Modals */}
      <ConnectAccountModal
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
      />

      <SimulateIncomingModal
        isOpen={isSimulateOpen}
        onClose={() => setIsSimulateOpen(false)}
      />

      <AIChatDrawer
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />

      <OnboardingTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
      />

      {/* Global Notifications */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <EmailProvider>
      <ViewModeProvider>
        <MainApp />
      </ViewModeProvider>
    </EmailProvider>
  );
}
