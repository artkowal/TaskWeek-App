import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Clock, FileText } from "lucide-react";

import "./EventDetailsModal.css";

const EventDetailsModal = ({ show, onHide, event, onEdit }) => {
  if (!event) return null;

  const formattedStartTime = event.startTime
    ? event.startTime.substring(0, 5)
    : "";
  const formattedEndTime = event.endTime ? event.endTime.substring(0, 5) : "";

  return (
    <Modal show={show} onHide={onHide} dialogClassName="event-details-modal">
      <Modal.Header closeButton>
        <Modal.Title>Szczegóły wydarzenia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="time-row">
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
        <p className="description-label">Tytuł:</p>
        <h5 className="event-title">{event.title}</h5>
        {event.description && event.description.trim() !== "" && (
          <>
            <p className="description-label">Opis:</p>
            <p className="description-text">{event.description}</p>
          </>
        )}
        {event.isRecurring && <p className="event-recurring">Cykliczne</p>}
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
