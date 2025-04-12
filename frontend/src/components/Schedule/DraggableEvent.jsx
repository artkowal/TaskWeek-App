import React, { useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import EventCard from "./EventCard";
import { GripVertical } from "lucide-react";

const DraggableEvent = ({ event, onClick }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: event.id,
    data: { event },
    activationConstraint: { distance: 5 },
  });

  const pointerDownCoords = useRef({ x: 0, y: 0 });
  const pointerDownTime = useRef(0);
  const dragged = useRef(false);

  const handlePointerDown = (e) => {
    dragged.current = false;
    pointerDownCoords.current = { x: e.clientX, y: e.clientY };
    pointerDownTime.current = Date.now();
  };

  const handlePointerMove = (e) => {
    const dx = Math.abs(e.clientX - pointerDownCoords.current.x);
    const dy = Math.abs(e.clientY - pointerDownCoords.current.y);
    if (dx > 5 || dy > 5) {
      dragged.current = true;
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const dt = Date.now() - pointerDownTime.current;
    if (!dragged.current && dt < 250) {
      onClick(event);
    }
  };

  return (
    <div ref={setNodeRef} style={{ position: "relative" }}>
      {/* Strefa kliknięcia */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
      >
        <EventCard event={event} />
      </div>

      {/* Chwytak przeciągania */}
      <div
        {...listeners}
        {...attributes}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          cursor: "grab",
          zIndex: 10,
        }}
        title="Przeciągnij"
      >
        <GripVertical size={16} color="#666" />
      </div>
    </div>
  );
};

export default DraggableEvent;
