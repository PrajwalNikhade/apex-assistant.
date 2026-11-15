import React, { createContext, useContext, useState } from 'react';

const ViewModeContext = createContext();

export function ViewModeProvider({ children }) {
  // 'assistant' or 'client'
  const [viewMode, setViewMode] = useState('assistant');

  const toggleViewMode = () => {
    setViewMode(prev => (prev === 'assistant' ? 'client' : 'assistant'));
  };

  const persona = viewMode === 'assistant' 
    ? {
        role: 'Executive Assistant',
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@apexholdings.com',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        badge: 'Assistant Mode'
      }
    : {
        role: 'Client / CEO',
        name: 'Alexander Wright',
        email: 'alexander.wright@apexholdings.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        badge: 'Client Mode (Minimal)'
      };

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode, toggleViewMode, persona }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) throw new Error('useViewMode must be used within a ViewModeProvider');
  return context;
};
