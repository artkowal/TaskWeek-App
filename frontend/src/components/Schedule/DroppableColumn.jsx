// components/Schedule/DroppableColumn.jsx
import React from "react";
import { useDroppable } from "@dnd-kit/core";

function toMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== "string") return 0;
  const parts = timeStr.split(":");
  if (parts.length < 2) return 0;
  const hh = parseInt(parts[0], 10);
  const mm = parseInt(parts[1], 10);
  if (isNaN(hh) || isNaN(mm)) return 0;
  return hh * 60 + mm;
}

function computeTotalTime(eventsData) {
  let total = 0;
  for (const evt of eventsData) {
    total += toMinutes(evt.endTime) - toMinutes(evt.startTime);
  }
  if (total <= 0) return "0h";
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
}

const DroppableColumn = ({
  day,
  isToday,
  sortedDayEventsData,
  dayEventsNodes,
}) => {
  const { setNodeRef } = useDroppable({
    id: `day-${day.value}`,
  });

  const totalTimeText = computeTotalTime(sortedDayEventsData);

  return (
    <div
      ref={setNodeRef}
      className="day-column"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #ddd",
        padding: "0.5rem",
        height: "100%",
        backgroundColor: isToday ? "#fff9f2" : "inherit",
        minWidth: "130px",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "0.85rem",
          textAlign: "center",
          marginBottom: "0.25rem",
          width: "100%",
          borderBottom: "1px solid #ddd",
          paddingBottom: "0.25rem",
          color: isToday ? "#d35400" : "#333",
        }}
      >
        {day.label}
      </div>

      <div
        style={{
          fontSize: "0.75rem",
          textAlign: "right",
          margin: "15px",
          color: "#999",
        }}
      >
        {sortedDayEventsData.length === 0
          ? "Brak wydarzeń"
          : `${totalTimeText}`}
      </div>

      <div style={{ overflowY: "auto", overflowX: "hidden" }}>
        {dayEventsNodes}
      </div>
    </div>
  );
};

export default DroppableColumn;
