// src/components/Todo/TodoItem.jsx
import React from "react";
import { ListGroup, Form } from "react-bootstrap";
import api from "../../api";

const TodoItem = ({ task, onTaskUpdate }) => {
  const toggleComplete = async () => {
    try {
      // Wywołaj PATCH, aby zmienić stan zadania (np. isCompleted)
      await api.patch(`/task/${task.id}`, {
        title: task.title,
        description: task.description,
        isCompleted: !task.isCompleted,
      });
      onTaskUpdate();
    } catch (error) {
      console.error("Błąd aktualizacji zadania:", error);
    }
  };

  return (
    <ListGroup.Item className="d-flex align-items-center">
      <Form.Check
        type="checkbox"
        checked={task.isCompleted}
        onChange={toggleComplete}
        className="me-2"
      />
      <span
        style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}
      >
        {task.title}
      </span>
    </ListGroup.Item>
  );
};

export default TodoItem;
