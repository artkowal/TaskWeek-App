import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../api";
import "../../styles/EventModal.css";

const EventModal = ({ show, onHide, eventData, onSaveSuccess }) => {
  const isEditMode = !!eventData?.id;

  const [title, setTitle] = useState(eventData?.title || "");
  const [description, setDescription] = useState(eventData?.description || "");
  const [startTime, setStartTime] = useState(eventData?.startTime || "08:00");
  const [endTime, setEndTime] = useState(eventData?.endTime || "09:00");
  const [color, setColor] = useState(eventData?.color || "#000000");
  const [isRecurring, setIsRecurring] = useState(
    eventData?.isRecurring || false
  );
  const [dayOfWeek, setDayOfWeek] = useState(eventData?.dayOfWeek || 1);

  useEffect(() => {
    setTitle(eventData?.title || "");
    setDescription(eventData?.description || "");
    setStartTime(eventData?.startTime || "08:00");
    setEndTime(eventData?.endTime || "09:00");
    setColor(eventData?.color || "#000000");
    setIsRecurring(eventData?.isRecurring || false);
    setDayOfWeek(eventData?.dayOfWeek || 1);
  }, [eventData]);

  const dayOptions = [
    { value: 1, label: "Poniedziałek" },
    { value: 2, label: "Wtorek" },
    { value: 3, label: "Środa" },
    { value: 4, label: "Czwartek" },
    { value: 5, label: "Piątek" },
    { value: 6, label: "Sobota" },
    { value: 7, label: "Niedziela" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Walidacja
    if (startTime >= endTime) {
      alert("Godzina startu musi być wcześniejsza niż godzina zakończenia.");
      return;
    }
    const payload = {
      title,
      description,
      startTime,
      endTime,
      color,
      isRecurring,
      dayOfWeek,
    };

    try {
      if (isEditMode) {
        await api.patch(`/event/${eventData.id}`, payload);
      } else {
        await api.post("/event", payload);
      }
      onSaveSuccess();
      onHide();
    } catch (err) {
      console.error("Błąd zapisu zdarzenia:", err);
      alert("Błąd zapisu zdarzenia");
    }
  };

  const handleDelete = async () => {
    if (!eventData?.id) return;
    if (!window.confirm("Na pewno chcesz usunąć to wydarzenie?")) return;
    try {
      await api.delete(`/event/${eventData.id}`);
      onSaveSuccess();
      onHide();
    } catch (err) {
      console.error("Błąd usuwania zdarzenia:", err);
      alert("Błąd usuwania zdarzenia");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edytuj zdarzenie" : "Dodaj zdarzenie"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Pole: Tytuł */}
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
          {/* Pole: Opis */}
          <Form.Group className="mb-3">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={255}
            />
          </Form.Group>
          {/* Pole: Dzień tygodnia */}
          <Form.Group className="mb-3">
            <Form.Label>Dzień tygodnia</Form.Label>
            <Form.Select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(parseInt(e.target.value, 10))}
            >
              {dayOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* Wiersz: Godzina start i koniec */}
          <div className="d-flex gap-3">
            <Form.Group className="mb-3 flex-fill">
              <Form.Label>Godzina start</Form.Label>
              <Form.Control
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 flex-fill">
              <Form.Label>Godzina koniec</Form.Label>
              <Form.Control
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </Form.Group>
          </div>
          {/* Pole: Kolor */}
          <Form.Group className="mb-3">
            <Form.Label>Kolor</Form.Label>
            <div className="color-picker">
              <div
                className={`color-circle ${
                  color === "#ff0000" ? "selected" : ""
                }`}
                style={{ backgroundColor: "#ff0000" }}
                onClick={() => setColor("#ff0000")}
                title="Czerwony"
              ></div>
              <div
                className={`color-circle ${
                  color === "#28a745" ? "selected" : ""
                }`}
                style={{ backgroundColor: "#28a745" }}
                onClick={() => setColor("#28a745")}
                title="Zielony"
              ></div>
            </div>
          </Form.Group>
          {/* Pole: Powtarzaj co tydzień */}
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Powtarzaj co tydzień"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {isEditMode && (
            <Button variant="danger" onClick={handleDelete}>
              Usuń
            </Button>
          )}
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

export default EventModal;
