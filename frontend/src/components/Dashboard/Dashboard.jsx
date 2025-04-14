import React, { useState, useEffect } from "react";
import WeekView from "../Schedule/WeekView";
import TodoList from "../Todo/TodoList";
import useWindowSize from "../hooks/UseWindowSize";

const Dashboard = () => {
  const [todoCollapsed, setTodoCollapsed] = useState(false);
  const { width } = useWindowSize();
  const isLargeScreen = width >= 1600;

  useEffect(() => {
    if (!isLargeScreen) {
      setTodoCollapsed(true);
    } else {
      setTodoCollapsed(false);
    }
  }, [isLargeScreen]);

  return (
    <div
      style={{
        fontSize: "0.85rem",
        height: "92vh",
        display: "flex",
        overflowX: "hidden",
        marginTop: "1rem",
      }}
    >
      <div
        style={{
          flex: 7,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          borderRight: isLargeScreen ? "1px solid #ccc" : "none",
          padding: "0 5px",
        }}
      >
        <WeekView onToggleTodo={() => setTodoCollapsed((prev) => !prev)} />
      </div>

      {isLargeScreen ? (
        // Dla dużych ekranów
        <div
          style={{
            flex: todoCollapsed ? 0 : 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            transition: "all 0.3s ease",
            position: "relative",
          }}
        >
          <TodoList collapsed={todoCollapsed} />
        </div>
      ) : (
        <>
          {!todoCollapsed && (
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "400px",
                height: "95vh",
                backgroundColor: "#fff",
                boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.2)",
                zIndex: 1050,
                overflowY: "auto",
                transition: "all 0.3s ease",
              }}
            >
              <TodoList collapsed={todoCollapsed} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
