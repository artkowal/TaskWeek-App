// components/Schedule/EventCard.jsx
import React from "react";
import { Card } from "react-bootstrap";
import { Clock, FileText } from "lucide-react";

const EventCard = ({ event, onClick }) => {
  const { title, startTime, endTime, color, isRecurring, description } = event;
  const hasDescription = description && description.trim() !== "";

  const formattedStartTime = startTime ? startTime.substring(0, 5) : "";
  const formattedEndTime = endTime ? endTime.substring(0, 5) : "";

  return (
    <Card
      className="mb-2"
      style={{
        borderLeft: `4px solid ${color}`,
        cursor: "pointer",
        position: "relative",
        height: "112px",
        minWidth: "130px",
        maxWidth: "auto",
      }}
      onClick={onClick}
    >
      <Card.Body style={{ padding: "0.75rem", position: "relative" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.5rem",
            fontSize: "0.65rem",
            color: "#555",
          }}
        >
          <Clock size={12} style={{ marginRight: "4px" }} />
          <span>
            {formattedStartTime} - {formattedEndTime}
          </span>
        </div>

        <Card.Title
          style={{
            fontSize: "0.75rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </Card.Title>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.65rem",
            color: "#333",
          }}
        >
          {isRecurring && <span style={{ color: "green" }}>Cykliczne</span>}

          {hasDescription && (
            <FileText
              size={14}
              style={{
                color: "#999",
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
