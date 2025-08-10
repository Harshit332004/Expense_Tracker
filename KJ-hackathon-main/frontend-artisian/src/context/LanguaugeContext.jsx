import React, { createContext, useContext, useState } from 'react';

// Create the context
const LanguageContext = createContext();

// Create a provider component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en'); // Default to English

  const value = {
    language,
    setLanguage,
    // Add language options for UI if needed
    languageOptions: [
      { code: 'en', label: 'English' },
      { code: 'hi', label: 'Hindi' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}