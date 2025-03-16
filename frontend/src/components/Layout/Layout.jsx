import { Container } from "react-bootstrap";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container className="mt-4">{children}</Container>
    </>
  );
};

export default Layout;
