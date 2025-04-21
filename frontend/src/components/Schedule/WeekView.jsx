import React, { useEffect, useState } from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import api from "../../services/api";
import EventModal from "./EventModal";
import EventDetailsModal from "./EventDetailsModal";
import DroppableColumn from "./DroppableColumn";
import DraggableEvent from "./DraggableEvent";
import EventCard from "./EventCard";
import WeekHeader from "./WeekHeader";
import { List } from "lucide-react";

import "./WeekView.css";

const daysOfWeek = [
  { label: "Poniedziałek", value: 1 },
  { label: "Wtorek", value: 2 },
  { label: "Środa", value: 3 },
  { label: "Czwartek", value: 4 },
  { label: "Piątek", value: 5 },
  { label: "Sobota", value: 6 },
  { label: "Niedziela", value: 7 },
];

const WeekView = ({ onToggleTodo }) => {
  const [events, setEvents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);

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

  const handleAddEvent = (newEventData) => {
    setSelectedEvent(newEventData);
    setShowEditModal(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowDetailsModal(false);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedEvent(null);
    setShowEditModal(false);
  };

  const handleCloseDetailsModal = () => {
    setSelectedEvent(null);
    setShowDetailsModal(false);
  };

  const handleSaveEventSuccess = () => {
    fetchEvents();
  };

  const handleDragStart = (eventInfo) => {
    setActiveEvent(eventInfo.active.data.current.event);
  };

  const handleDragEnd = async (eventInfo) => {
    const { active, over } = eventInfo;
    if (!over) {
      setActiveEvent(null);
      return;
    }
    const activeData = active.data.current.event;
    const newDayOfWeek = parseInt(over.id.split("-")[1], 10);
    if (activeData.dayOfWeek !== newDayOfWeek) {
      setEvents((prevEvents) =>
        prevEvents.map((ev) =>
          ev.id === activeData.id ? { ...ev, dayOfWeek: newDayOfWeek } : ev
        )
      );
      try {
        await api.patch(`/event/${activeData.id}`, {
          ...activeData,
          dayOfWeek: newDayOfWeek,
        });
      } catch (error) {
        console.error("Błąd aktualizacji wydarzenia:", error);
      }
    }
    setActiveEvent(null);
  };

  const handleDragCancel = () => {
    setActiveEvent(null);
  };

  const sortEventsByTime = (dayEvents) => {
    return dayEvents.sort((a, b) => {
      const [ah, am] = a.startTime.split(":").map(Number);
      const [bh, bm] = b.startTime.split(":").map(Number);
      return ah * 60 + am - (bh * 60 + bm);
    });
  };

  // Aktualny dzień
  const jsDay = new Date().getDay();
  const currentDay = jsDay === 0 ? 7 : jsDay;

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <WeekHeader onAdd={handleAddEvent} />
      <div className="week-view-container">
        {daysOfWeek.map((day) => {
          const dayEvents = events.filter((evt) => evt.dayOfWeek === day.value);
          const sortedDayEventsData = sortEventsByTime(dayEvents);
          const dayEventsNodes = sortedDayEventsData.map((evt) => (
            <DraggableEvent
              key={evt.id}
              event={evt}
              onClick={handleEventClick}
            />
          ));
          const isToday = day.value === currentDay;
          return (
            <DroppableColumn
              key={day.value}
              day={day}
              isToday={isToday}
              sortedDayEventsData={sortedDayEventsData}
              dayEventsNodes={dayEventsNodes}
              onAdd={handleAddEvent}
            />
          );
        })}
      </div>

      <DragOverlay className="drag-overlay">
        {activeEvent ? (
          <div style={{ pointerEvents: "none" }}>
            <EventCard event={activeEvent} />
          </div>
        ) : null}
      </DragOverlay>

      {showEditModal && (
        <EventModal
          show={showEditModal}
          onHide={handleCloseEditModal}
          eventData={selectedEvent}
          onSaveSuccess={handleSaveEventSuccess}
        />
      )}

      {showDetailsModal && (
        <EventDetailsModal
          show={showDetailsModal}
          onHide={handleCloseDetailsModal}
          event={selectedEvent}
          onEdit={handleEdit}
        />
      )}

      {/* Przycisk toggle */}
      <button className="week-toggle-btn" onClick={onToggleTodo}>
        <List size={16} />
      </button>
    </DndContext>
  );
};

export default WeekView;
