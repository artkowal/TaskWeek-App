// src/components/Schedule/WeekView.jsx
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import api from "../../api";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

const daysOfWeek = [
  { label: "Poniedziałek", value: 1 },
  { label: "Wtorek", value: 2 },
  { label: "Środa", value: 3 },
  { label: "Czwartek", value: 4 },
  { label: "Piątek", value: 5 },
  { label: "Sobota", value: 6 },
  { label: "Niedziela", value: 7 },
];

const WeekView = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get("/event");
      setEvents(data.data || []);
    } catch (error) {
      console.error("Błąd pobierania wydarzeń:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenModal = (event = null) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setShowModal(false);
  };

  const handleSaveEventSuccess = () => {
    fetchEvents();
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        overflowX: "auto",
        height: "100%",
      }}
    >
      {daysOfWeek.map((day) => {
        const dayEvents = events.filter((evt) => evt.dayOfWeek === day.value);

        return (
          <div
            key={day.value}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              borderRight: "1px solid #ddd",
              padding: "0.5rem",
              backgroundColor: "#f4f4f4",
              height: "100%",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "0.85rem",
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              {day.label}
            </div>

            <Button
              variant="success"
              size="sm"
              onClick={() =>
                handleOpenModal({
                  dayOfWeek: day.value,
                  title: "",
                  description: "",
                  startTime: "08:00",
                  endTime: "09:00",
                  color: "#ff0000",
                  isRecurring: false,
                })
              }
              style={{ marginBottom: "0.5rem" }}
            >
              + Dodaj
            </Button>

            <div style={{ overflowY: "auto", flex: 1 }}>
              {dayEvents.map((evt) => (
                <EventCard
                  key={evt.id}
                  event={evt}
                  onClick={() => handleOpenModal(evt)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {showModal && (
        <EventModal
          show={showModal}
          onHide={handleCloseModal}
          eventData={selectedEvent}
          onSaveSuccess={handleSaveEventSuccess}
        />
      )}
    </div>
  );
};

export default WeekView;
