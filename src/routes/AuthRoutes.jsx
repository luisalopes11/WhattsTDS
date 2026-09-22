import { Navigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";
import { LoadingScreen } from "../components/LoadingScreen";

export function GuestRoute({ children }) {
  const { user, loading } = useChat();

  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/contacts" replace />;

  return children;
}

export function ProtectedRoute({ children }) {
  const { user, loading } = useChat();

  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/" replace />;

  return children;
}
