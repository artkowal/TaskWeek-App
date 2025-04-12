import React, { useEffect, useState } from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import api from "../../api";
import EventModal from "./EventModal";
import DroppableColumn from "./DroppableColumn";
import DraggableEvent from "./DraggableEvent";
import EventCard from "./EventCard";
import WeekHeader from "./WeekHeader";

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
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get("/event");
      setEvents(data.data || []);
    } catch (error) {
      console.error("Błąd pobierania wydarzeń:", error);
    }
  };

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
      <WeekHeader onAdd={handleOpenModal} />
      <div
        style={{ display: "flex", flex: 1, overflowX: "auto", height: "100%" }}
      >
        {daysOfWeek.map((day) => {
          const dayEvents = events.filter((evt) => evt.dayOfWeek === day.value);
          const sortedDayEventsData = sortEventsByTime(dayEvents);
          const dayEventsNodes = sortedDayEventsData.map((evt) => (
            <DraggableEvent
              key={evt.id}
              event={evt}
              onClick={handleOpenModal}
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
            />
          );
        })}
      </div>

      <DragOverlay style={{ zIndex: 9999 }}>
        {activeEvent ? (
          <div style={{ pointerEvents: "none" }}>
            <EventCard event={activeEvent} onClick={() => {}} />
          </div>
        ) : null}
      </DragOverlay>

      {showModal && (
        <EventModal
          show={showModal}
          onHide={handleCloseModal}
          eventData={selectedEvent}
          onSaveSuccess={handleSaveEventSuccess}
        />
      )}
    </DndContext>
  );
};

export default WeekView;
