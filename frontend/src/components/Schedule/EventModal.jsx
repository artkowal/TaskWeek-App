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
  const [color, setColor] = useState(eventData?.color || "#f2f2f2");
  const [isRecurring, setIsRecurring] = useState(
    eventData?.isRecurring || false
  );
  const [dayOfWeek, setDayOfWeek] = useState(eventData?.dayOfWeek || 1);

  useEffect(() => {
    setTitle(eventData?.title || "");
    setDescription(eventData?.description || "");
    setStartTime(eventData?.startTime || "08:00");
    setEndTime(eventData?.endTime || "09:00");
    setColor(eventData?.color || "#f2f2f2");
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
                  color === "#d6e4fd" ? "selected" : ""
                }`}
                style={{ backgroundColor: "#d6e4fd" }}
                onClick={() => setColor("#d6e4fd")}
                title="soft sky"
              />
              <div
                className={`color-circle ${
                  color === "#fecdbf" ? "selected" : ""
                }`}
                style={{ backgroundColor: "#fecdbf" }}
                onClick={() => setColor("#fecdbf")}
                title="orange"
              ></div>
              <div
                className={`color-circle ${
                  color === "#f3c2e4" ? "selected" : ""
                }`}
                style={{ backgroundColor: "#f3c2e4" }}
                onClick={() => setColor("#f3c2e4")}
                title="pink"
              ></div>
              <div
                className={`color-circle ${
                  color === "#ffe3c2" ? "selected" : ""
                }`}
                style={{ backgroundColor: "#ffe3c2" }}
                onClick={() => setColor("#ffe3c2")}
                title="yellow"
              ></div>
              <div
                className={`color-circle ${
                  color === "#c0e4fe" ? "selected" : ""
                }`}
                style={{ backgroundColor: "#c0e4fe" }}
                onClick={() => setColor("#c0e4fe")}
                title="blue"
              ></div>
              <div
                className={`color-circle ${
                  color === "#c6f4fd" ? "selected" : ""
                }`}
                style={{ backgroundColor: "#c6f4fd" }}
                onClick={() => setColor("#c6f4fd")}
                title="green"
              ></div>
              <div
                className={`color-circle ${
                  color === "#fde4c6" ? "selected" : ""
                }`}
                style={{ backgroundColor: "#fde4c6" }}
                onClick={() => setColor("#fde4c6")}
                title="apricot"
              />
              <div
                className={`color-circle ${
                  color === "#e4c6fd" ? "selected" : ""
                }`}
                style={{ backgroundColor: "#e4c6fd" }}
                onClick={() => setColor("#e4c6fd")}
                title="lavender"
              />
              <div
                className={`color-circle ${
                  color === "#d6fde4" ? "selected" : ""
                }`}
                style={{ backgroundColor: "#d6fde4" }}
                onClick={() => setColor("#d6fde4")}
                title="mint"
              />
              <div
                className={`color-circle ${
                  color === "#fdd6e4" ? "selected" : ""
                }`}
                style={{ backgroundColor: "#fdd6e4" }}
                onClick={() => setColor("#fdd6e4")}
                title="blush"
              />
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
          <Button variant="primary" type="submit">
            Zapisz
          </Button>
          {isEditMode && (
            <Button variant="danger" onClick={handleDelete}>
              Usuń
            </Button>
          )}
          <Button variant="secondary" onClick={onHide}>
            Anuluj
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EventModal;
