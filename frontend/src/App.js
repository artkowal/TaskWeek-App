// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import WelcomeScreen from "./components/Layout/WelcomeScreen";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Trasy dla stron głównych korzystające z Layout */}
          <Route element={<Layout />}>
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<RedirectToDashboardOrWelcome />} />
          </Route>

          {/* Trasa dashboard korzystająca z DashboardLayout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Tu wykorzystujemy zagnieżdżony routing, by wyświetlić Dashboard */}
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const RedirectToDashboardOrWelcome = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" /> : <Navigate to="/welcome" />;
};

export default App;
