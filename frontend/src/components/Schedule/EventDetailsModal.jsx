import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Clock, FileText } from "lucide-react";

const EventDetailsModal = ({ show, onHide, event, onEdit }) => {
  if (!event) return null;

  const formattedStartTime = event.startTime
    ? event.startTime.substring(0, 5)
    : "";
  const formattedEndTime = event.endTime ? event.endTime.substring(0, 5) : "";

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Szczegóły wydarzenia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.65rem",
            color: "#555",
            marginBottom: "0.5rem",
          }}
        >
          <Clock size={12} style={{ marginRight: "4px" }} />
          <span>
            {formattedStartTime} - {formattedEndTime}
          </span>
          {event.description && event.description.trim() !== "" && (
            <FileText
              size={12}
              style={{ marginLeft: "auto", color: "#999" }}
              title="Wydarzenie zawiera opis"
            />
          )}
        </div>
        <h5 style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
          {event.title}
        </h5>
        {event.isRecurring && (
          <p style={{ fontSize: "0.65rem", color: "green" }}>Cykliczne</p>
        )}
        {event.description && event.description.trim() !== "" && (
          <>
            <p style={{ fontSize: "0.75rem" }}>{event.description}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            onHide();
            onEdit(event);
          }}
        >
          Edytuj
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventDetailsModal;
