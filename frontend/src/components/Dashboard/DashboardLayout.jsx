import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);
  const closeSidebar = () => setSidebarVisible(false);

  return (
    <div className="dashboard-layout">
      <DashboardNavbar onToggleSidebar={toggleSidebar} />
      <div className="dashboard-body">
        {sidebarVisible && (
          <>
            <DashboardSidebar />
            <div className="dashboard-overlay" onClick={closeSidebar}></div>
          </>
        )}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
