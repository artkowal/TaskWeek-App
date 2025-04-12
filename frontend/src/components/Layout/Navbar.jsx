import { useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Navbar.css";
import welcomeImage from "../../assets/taskweek_icon-55.png";

const NavbarComponent = () => {
  const { user, checkAuth } = useAuth();

  useEffect(() => {
    if (user) checkAuth();
  }, [user, checkAuth]);

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
            <Nav.Link as={Link} to="/login">
              Zaloguj
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Zarejestruj
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
