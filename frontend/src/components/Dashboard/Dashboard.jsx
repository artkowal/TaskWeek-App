// src/components/Dashboard/Dashboard.jsx
import React from "react";
import WeekView from "../Schedule/WeekView";
import TodoList from "../Todo/TodoList";

const Dashboard = () => {
  return (
    <div
      style={{
        fontSize: "0.85rem",
        height: "calc(100vh - 120px)",
        display: "flex",
        overflowX: "hidden",
        marginTop: "1rem",
      }}
    >
      {/* Harmonogram tygodnia (80%) */}
      <div
        style={{
          flex: 7,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          borderRight: "1px solid #ccc",
          padding: "0 5px",
        }}
      >
        <WeekView />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          padding: "0 5px",
        }}
      >
        <TodoList />
      </div>
    </div>
  );
};

export default Dashboard;
