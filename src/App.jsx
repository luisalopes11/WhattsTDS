import { Route, Routes } from "react-router-dom";
import RegisterScreen from "./pages/RegisterScreen";
import ContactsListScreen from "./pages/ContactsListScreen";
import ChatScreen from "./pages/ChatScreen";
import { GuestRoute, ProtectedRoute } from "./routes/AuthRoutes";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestRoute>
            <RegisterScreen />
          </GuestRoute>
        }
      />
      <Route
        path="/contacts"
        element={
          <ProtectedRoute>
            <ContactsListScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/:phone"
        element={
          <ProtectedRoute>
            <ChatScreen />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
