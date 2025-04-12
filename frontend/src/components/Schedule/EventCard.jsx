import React from "react";
import { Card } from "react-bootstrap";

const EventCard = ({ event, onClick }) => {
  const { title, startTime, endTime, color, isRecurring } = event;

  return (
    <Card
      className="mb-2"
      style={{
        borderLeft: `4px solid ${color}`,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Card.Body>
        <Card.Title style={{ fontSize: "0.85rem" }}>{title}</Card.Title>
        <Card.Text style={{ fontSize: "0.65rem" }}>
          {startTime} - {endTime}
          <br />
          {isRecurring && <span className="text-success">Cykliczne</span>}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
