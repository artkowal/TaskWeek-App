import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";
import { LogOut, Menu } from "lucide-react";
import "../../styles/DashboardNavbar.css";

const DashboardNavbar = ({ onToggleSidebar }) => {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
      await checkAuth();
      navigate("/login");
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  return (
    <Navbar className="dashboard-navbar" expand="lg">
      <div className="container-fluid">
        <Button
          variant="link"
          className="dashboard-toggle-sidebar"
          onClick={onToggleSidebar}
        >
          <Menu size={20} color="#ffffff" />
        </Button>
        <Navbar.Brand as={Link} to="/dashboard" className="dashboard-brand">
          <span className="dashboard-brand-text">Task Week</span>
        </Navbar.Brand>
        <Nav className="dashboard-nav ms-auto">
          {user && (
            <Button
              variant="outline-danger"
              className="dashboard-logout"
              onClick={handleLogout}
            >
              <LogOut className="dashboard-logout-icon" />
              Wyloguj
            </Button>
          )}
        </Nav>
      </div>
    </Navbar>
  );
};

export default DashboardNavbar;
