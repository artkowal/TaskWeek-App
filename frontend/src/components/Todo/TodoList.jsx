import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Plus } from "lucide-react";
import TaskItem from "./TaskItem";
import AddTaskModal from "./AddTaskModal";
import useWindowSize from "../hooks/useWindowSize";

import "./TodoList.css";

const TodoList = ({ collapsed }) => {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const { width } = useWindowSize();
  const isLargeScreen = width >= 1200;

  const isOverlay = !isLargeScreen;

  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/task");
      setTasks(data.data || []);
    } catch (error) {
      console.error("Błąd pobierania zadań:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleComplete = async (task) => {
    try {
      await api.patch(`/task/${task.id}`, {
        title: task.title,
        description: task.description,
        isCompleted: !task.isCompleted,
      });
      fetchTasks();
    } catch (error) {
      console.error("Błąd aktualizacji zadania:", error);
    }
  };

  const handleDeleteTask = async (task) => {
    if (!window.confirm("Na pewno chcesz usunąć to zadanie?")) return;
    try {
      await api.delete(`/task/${task.id}`);
      fetchTasks();
    } catch (error) {
      console.error("Błąd usuwania zadania:", error);
    }
  };

  const sortedTasks = React.useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (a.isCompleted === b.isCompleted) return 0;
      return a.isCompleted ? 1 : -1;
    });
  }, [tasks]);

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    fetchTasks();
  };

  // Liczba zadań
  const taskCount = tasks.length;

  return (
    <div
      className={`todolist ${collapsed ? "collapsed" : ""} ${
        isOverlay ? "overlay-mode" : ""
      }`}
    >
      {!collapsed && (
        <>
          <div className="todolist-header">
            <h4 className="todolist-title">
              Lista Zadań <span>{taskCount}</span>
            </h4>
            <div className="todolist-add-btn" onClick={handleOpenAddModal}>
              <Plus size="20" />
            </div>
          </div>
          <div className="todolist-list">
            {sortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </>
      )}

      {showAddModal && (
        <AddTaskModal show={showAddModal} onHide={handleCloseAddModal} />
      )}
    </div>
  );
};

export default TodoList;
