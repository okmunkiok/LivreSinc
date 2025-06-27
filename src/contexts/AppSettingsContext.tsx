import React, { createContext, useContext, useState } from 'react';

interface AppSettings {
  devMode: boolean;
  setDevMode: (value: boolean) => void;
  showCharacter: boolean;
  setShowCharacter: (value: boolean) => void;
}

const AppSettingsContext = createContext<AppSettings | undefined>(undefined);

export const AppSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [devMode, setDevMode] = useState(false);
  const [showCharacter, setShowCharacter] = useState(true); // 기본값 true

  return (
    <AppSettingsContext.Provider value={{ 
      devMode, 
      setDevMode, 
      showCharacter, 
      setShowCharacter 
    }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within AppSettingsProvider');
  }
  return context;
};
