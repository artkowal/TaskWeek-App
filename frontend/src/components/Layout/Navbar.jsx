import { useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";
import "../../styles/Navbar.css"; // Import pliku CSS
import welcomeImage from "../../assets/taskweek_icon-55.png";

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
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/">
          <img
            className="brand-img"
            src={welcomeImage}
            alt="TaskWeek Welcome"
          />
          TaskWeek
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                <Navbar.Text className="welcome-text">
                  Witaj, {user.name}!
                </Navbar.Text>
                <Button
                  variant="outline-danger"
                  onClick={handleLogout}
                  className="ms-3"
                >
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
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
