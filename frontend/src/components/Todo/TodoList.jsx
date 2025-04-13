import React, { useEffect, useState } from "react";
import api from "../../api";
import TaskItem from "./TaskItem";
import { Plus } from "lucide-react";
import AddTaskModal from "./AddTaskModal";
import "../../styles/TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

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
    <div className="todolist">
      {/* Nagłówek */}
      <div className="todolist-header">
        <h4 className="todolist-title">Lista Zadań ({taskCount})</h4>
        <div className="todolist-add-btn" onClick={handleOpenAddModal}>
          <Plus size={16} color="#fff" />
        </div>
      </div>

      {/* Lista zadań */}
      <div className="todolist-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggleComplete}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>

      {/* Modal dodawania zadania */}
      {showAddModal && (
        <AddTaskModal show={showAddModal} onHide={handleCloseAddModal} />
      )}
    </div>
  );
};

export default TodoList;
