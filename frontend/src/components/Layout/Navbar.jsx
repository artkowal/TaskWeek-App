import { useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "../../styles/Navbar.css";

const NavbarComponent = () => {
  const { user, checkAuth } = useAuth();

  useEffect(() => {
    if (user) checkAuth();
  }, [user, checkAuth]);

  return (
    <Navbar expand="lg" className="custom-navbar">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/">
          <span className="brand-text">TaskWeek</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-navbar-toggle"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/login" className="custom-nav-link">
              Zaloguj
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="custom-nav-link">
              Zarejestruj
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
