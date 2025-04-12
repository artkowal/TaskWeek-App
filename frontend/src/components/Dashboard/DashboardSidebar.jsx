// components/Layout/DashboardSidebar.jsx
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";
import { User } from "lucide-react"; // Ikona użytkownika
import "../../styles/DashboardSidebar.css";

const DashboardSidebar = () => {
  const { user, checkAuth } = useAuth();
  const [weeklyDeleting, setWeeklyDeleting] = useState(false);

  useEffect(() => {
    setWeeklyDeleting(user?.weeklyDeleting || false);
  }, [user]);

  const handleChangeWeeklyDeleting = async (e) => {
    const newValue = e.target.checked;
    setWeeklyDeleting(newValue);
    try {
      await api.patch("/user", { weeklyDeleting: newValue });
      await checkAuth();
    } catch (error) {
      console.error("Błąd przy zmianie ustawienia weeklyDeleting:", error);
    }
  };

  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-content">
        <div className="sidebar-user-info">
          <div className="sidebar-user-icon">
            <User size={40} />
          </div>
          <div className="sidebar-user-name">{user?.name}</div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          disabled
          className="sidebar-change-password"
        >
          Zmień hasło
        </Button>
        <Form.Group controlId="weeklyDeleting" className="sidebar-checkbox">
          <Form.Check
            type="checkbox"
            label="Automatyczne czyszczenie co tydzień"
            checked={weeklyDeleting}
            onChange={handleChangeWeeklyDeleting}
          />
        </Form.Group>
      </div>
    </div>
  );
};

export default DashboardSidebar;
