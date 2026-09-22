import { createContext, useContext, useEffect, useState } from "react";
import { chat } from "../lib/chat";
import { getStoredPhone, savePhone } from "../lib/storage";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const storedPhone = getStoredPhone();
      if (!storedPhone) {
        setLoading(false);
        return;
      }

      try {
        const profile = await chat.identify(storedPhone);
        setUser(profile);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function register({ phone, displayName, appName }) {
    const profile = await chat.register({ phone, displayName, appName });
    savePhone(profile.phone);
    setUser(profile);
    return profile;
  }

  return (
    <ChatContext.Provider value={{ user, loading, register, chat }}>
      {children}
    </ChatContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat deve ser usado dentro de ChatProvider");
  }
  return context;
}
