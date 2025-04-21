import React, { useState, useEffect } from "react";
import WeekView from "../Schedule/WeekView";
import TodoList from "../Todo/TodoList";
import useWindowSize from "../hooks/useWindowSize";

import "./Dashboard.css";

const Dashboard = () => {
  const [todoCollapsed, setTodoCollapsed] = useState(false);
  const { width } = useWindowSize();
  const isLargeScreen = width >= 1500;

  useEffect(() => {
    setTodoCollapsed(!isLargeScreen);
  }, [isLargeScreen]);

  return (
    <div className="dashboard">
      <div className="dashboard-weekview">
        <WeekView onToggleTodo={() => setTodoCollapsed((prev) => !prev)} />
      </div>

      {isLargeScreen ? (
        <div className={`dashboard-todo ${todoCollapsed ? "collapsed" : ""}`}>
          <TodoList collapsed={todoCollapsed} />
        </div>
      ) : (
        !todoCollapsed && (
          <div className="dashboard-todo-overlay">
            <TodoList collapsed={todoCollapsed} />
          </div>
        )
      )}
    </div>
  );
};

export default Dashboard;
