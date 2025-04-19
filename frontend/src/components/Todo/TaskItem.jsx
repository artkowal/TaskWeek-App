import React from "react";
import { CheckSquare, Square, Trash } from "lucide-react";
import "../../styles/TaskItem.css";

const TaskItem = ({ task, onToggle, onDelete }) => {
  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task);
  };

  return (
    <div className={`task-item ${task.isCompleted ? "completed" : ""}`}>
      <div
        className="task-toggle"
        onClick={handleToggle}
        title="Zaznacz jako ukończone"
      >
        {task.isCompleted ? (
          <CheckSquare size={16} color="#000000" />
        ) : (
          <Square size={16} color="#999" />
        )}
      </div>

      {/* Ikona kosza */}
      <div className="task-delete" onClick={handleDelete} title="Usuń zadanie">
        <Trash size={16} color="#e74c3c" />
      </div>

      {/* Treść zadania */}
      <div className="task-content">
        <div className="task-title">{task.title}</div>
        {task.description && task.description.trim() !== "" && (
          <div className="task-description">{task.description}</div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
