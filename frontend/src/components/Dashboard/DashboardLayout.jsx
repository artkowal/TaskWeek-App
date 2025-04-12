// components/Layout/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar"; // Stwórz lub zmodyfikuj ten komponent, aby odpowiadał wymaganiom

const DashboardLayout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <DashboardNavbar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      {/* Footer nie jest renderowany */}
    </div>
  );
};

export default DashboardLayout;
