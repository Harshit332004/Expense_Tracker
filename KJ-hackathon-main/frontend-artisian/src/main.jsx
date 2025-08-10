import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChatbotProvider } from "./context/ChatbotContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { LanguageProvider } from "./context/LanguaugeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchProvider>
      <LanguageProvider>
      <BrowserRouter>
        <ChatbotProvider>
          
          <App />
        </ChatbotProvider>
      </BrowserRouter>
      </LanguageProvider>
    </SearchProvider>
  </StrictMode>
);
