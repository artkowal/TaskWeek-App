import { useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";

const NavbarComponent = () => {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) checkAuth();
  }, [user, checkAuth]);

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
      await checkAuth();
      navigate("/login");
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        TaskWeek
      </Navbar.Brand>
      <Nav className="ms-auto">
        {user ? (
          <>
            <Navbar.Text className="me-3">Witaj, {user.name}!</Navbar.Text>
            <Button variant="outline-danger" onClick={handleLogout}>
              Wyloguj
            </Button>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/login">
              Zaloguj
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Zarejestruj
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
