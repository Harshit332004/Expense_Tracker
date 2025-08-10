import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
export const ChatbotContext = createContext();

// Create a provider component
export function ChatbotProvider({ children }) {
  const [isChatActive, setIsChatActive] = useState( false);

  useEffect(() => {
    localStorage.setItem("isChatActive", JSON.stringify(isChatActive));
  }, [isChatActive]);

  return (
    <ChatbotContext.Provider value={{ isChatActive, setIsChatActive }}>
      {children}
    </ChatbotContext.Provider>
  );
}

// Create a custom hook to use the ChatbotContext
