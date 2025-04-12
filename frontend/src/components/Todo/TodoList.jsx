import React, { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import api from "../../api";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

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

  const handleTaskChange = () => {
    fetchTasks();
  };

  return (
    <div>
      <h2>Lista To‑Do</h2>
      <ListGroup>
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} onTaskUpdate={handleTaskChange} />
        ))}
      </ListGroup>

      <Button
        variant="primary"
        className="mt-3"
        onClick={() => alert("DODAJ MODAL")}
      >
        Dodaj zadanie
      </Button>
    </div>
  );
};

export default TodoList;
