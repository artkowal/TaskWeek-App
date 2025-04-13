import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../api";

const AddTaskModal = ({ show, onHide }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      await api.post("/task", { title, description });
      onHide();
    } catch (error) {
      console.error("Błąd dodawania zadania:", error);
      alert("Błąd dodawania zadania");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj zadanie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tytuł</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={255}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Anuluj
          </Button>
          <Button variant="primary" type="submit">
            Zapisz
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
