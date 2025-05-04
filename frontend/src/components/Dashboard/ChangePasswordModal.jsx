import React, { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const ChangePasswordModal = ({ show, onHide }) => {
  const { logout } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      setError("Proszę podać oba hasła");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data } = await api.patch("/user/password", {
        oldPassword,
        newPassword,
      });
      setSuccessMessage(data.data.message);
      // wylogowanie uzytkownika
      setTimeout(() => {
        logout();
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Coś poszło nie tak przy zmianie hasła"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered style={{ zIndex: 2000 }}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Zmiana hasła</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Form.Group className="mb-3" controlId="oldPassword">
            <Form.Label>Aktualne hasło</Form.Label>
            <Form.Control
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>Nowe hasło</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={4}
            />
            <Form.Text className="text-muted">Minimum 4 znaki.</Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Anuluj
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Zmieniam…
              </>
            ) : (
              "Zmień hasło"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
