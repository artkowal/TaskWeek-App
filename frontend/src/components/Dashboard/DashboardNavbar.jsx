// components/Layout/DashboardNavbar.jsx
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";
import welcomeImage from "../../assets/taskweek_icon-55.png";
import { LogOut } from "lucide-react"; // Upewnij się, że Lucide jest zainstalowany: npm install lucide-react
import "../../styles/DashboardNavbar.css"; // Plik ze stylami

const DashboardNavbar = () => {
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
    <Navbar className="dashboard-navbar" expand="lg" bg="light">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/dashboard" className="dashboard-brand">
          <img
            src={welcomeImage}
            alt="TaskWeek Logo"
            className="dashboard-logo"
          />
          <span className="dashboard-brand-text">Task Week</span>
        </Navbar.Brand>
        <Nav className="dashboard-nav">
          {user && (
            <>
              <span className="dashboard-welcome">Witaj, {user.name}!</span>
              <Button
                variant="outline-danger"
                className="dashboard-logout"
                onClick={handleLogout}
              >
                <LogOut className="dashboard-logout-icon" />
                Wyloguj
              </Button>
            </>
          )}
        </Nav>
      </div>
    </Navbar>
  );
};

export default DashboardNavbar;
