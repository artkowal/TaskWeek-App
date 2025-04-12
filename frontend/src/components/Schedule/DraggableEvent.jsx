import React from "react";
import { useDraggable } from "@dnd-kit/core";
import EventCard from "./EventCard";

const DraggableEvent = ({ event, onClick }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: event.id,
    data: { event },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => onClick(event)}
    >
      <EventCard event={event} onClick={() => {}} />
    </div>
  );
};

export default DraggableEvent;
