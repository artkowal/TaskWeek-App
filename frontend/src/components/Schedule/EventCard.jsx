import React from "react";
import { Card } from "react-bootstrap";
import { Clock, FileText } from "lucide-react";

import "../../styles/EventCard.css";

const EventCard = ({ event, onClick }) => {
  const { title, startTime, endTime, color, isRecurring, description } = event;
  const hasDescription = description && description.trim() !== "";

  const formattedStartTime = startTime ? startTime.substring(0, 5) : "";
  const formattedEndTime = endTime ? endTime.substring(0, 5) : "";

  return (
    <Card
      className="event-card"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <Card.Body>
        <div className="event-card-time">
          <Clock size={12} style={{ marginRight: "4px" }} />
          <span>
            {formattedStartTime} - {formattedEndTime}
          </span>
        </div>

        <Card.Title className="event-card-title">{title}</Card.Title>

        <div className="event-card-footer">
          <div>
            {isRecurring && (
              <span className="event-card-recurring">Cykliczne</span>
            )}
          </div>

          {hasDescription && (
            <FileText
              size={14}
              style={{
                color: "#555",
              }}
              title="Wydarzenie zawiera opis"
            />
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
