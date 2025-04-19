import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import "../../styles/DroppableColumn.css";

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
  onAdd,
}) => {
  const { setNodeRef } = useDroppable({
    id: `day-${day.value}`,
  });

  const totalTimeText = computeTotalTime(sortedDayEventsData);

  const handleAdd = () => {
    onAdd({
      dayOfWeek: day.value,
      title: "",
      description: "",
      startTime: "08:00:00",
      endTime: "09:00:00",
      color: "#ff0000",
      isRecurring: false,
    });
  };

  return (
    <div ref={setNodeRef} className={`day-column ${isToday ? "today" : ""}`}>
      <div className={`day-column-header ${isToday ? "today" : ""}`}>
        {day.label}
      </div>

      <div className="day-column-info">
        <div
          className="add-button"
          onClick={handleAdd}
          style={{ cursor: "pointer" }}
        >
          <Plus size="20" />
        </div>
        {sortedDayEventsData.length === 0 ? "Brak wydarzeń" : totalTimeText}
      </div>

      <div className="day-column-content">{dayEventsNodes}</div>
    </div>
  );
};

export default DroppableColumn;
