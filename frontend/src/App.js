import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
      <Routes>
        {/* Layout */}
        <Route element={<Layout />}>
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<RedirectToDashboardOrWelcome />} />
        </Route>

        {/* DashboardLayout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* zagnieżdżony routing */}
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

const RedirectToDashboardOrWelcome = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" /> : <Navigate to="/welcome" />;
};

export default App;
