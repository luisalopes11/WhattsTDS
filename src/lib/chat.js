import { createSenacChat } from "senac-chat";

export const chat = createSenacChat({
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
});
