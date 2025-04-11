// src/components/Dashboard/Dashboard.jsx
import React from "react";
import { Row, Col } from "react-bootstrap";
import WeekView from "./Schedule/WeekView";
import TodoList from "./Todo/TodoList";

const Dashboard = () => {
  return (
    <div>
      <Row>Tutaj będą informacje o uzytkowniku</Row>
      <Row>
        {/* Harmonogram – 80% szerokości */}
        <Col xs={12} lg={9}>
          <WeekView />
        </Col>
        {/* Lista to‑do – 20% szerokości */}
        <Col xs={12} lg={3}>
          <TodoList />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
