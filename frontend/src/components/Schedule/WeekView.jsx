// src/components/Harmonogram/WeekView.jsx
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
    <div>
      <h2>Harmonogram tygodnia</h2>
      {/* Główne opakowanie harmonogramu o stałej wysokości */}
      <div style={{ display: "flex", height: "80vh" }}>
        {daysOfWeek.map((day) => {
          const dayEvents = events.filter((evt) => evt.dayOfWeek === day.value);

          return (
            <div
              key={day.value}
              // Ustawiamy kolumnę jako flexbox w pionie
              style={{
                flex: 1,
                border: "1px solid #ccc",
                margin: "0 5px",
                display: "flex",
                flexDirection: "column",
                padding: "5px",
              }}
            >
              <h5 style={{ textAlign: "center" }}>{day.label}</h5>
              {/* Kontener na wydarzenia, który rośnie, a gdy zawartość przekroczy dostępny obszar, pojawi się scrollbar */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  marginBottom: "10px",
                }}
              >
                {dayEvents.map((evt) => (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    onClick={() => handleOpenModal(evt)}
                  />
                ))}
              </div>
              {/* Kontener przycisku, który dzięki margin-top: auto przylega do dołu */}
              <div style={{ marginTop: "auto" }}>
                <Button
                  variant="outline-primary"
                  size="sm"
                  style={{ width: "100%" }}
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
                >
                  Dodaj
                </Button>
              </div>
            </div>
          );
        })}
      </div>
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
