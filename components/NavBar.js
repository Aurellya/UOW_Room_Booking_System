import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { BiBookReader } from "react-icons/bi";

const NavBar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="rounded-3 border shadow-sm"
    >
      <Navbar.Brand href="/">
        <BiBookReader size={32} />
        <span className="ml-2">
          <b>UOW Room Booking System</b>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/guides">Guides</Nav.Link>
        <Nav.Link href="/contact">Contact Us</Nav.Link>
        <Nav.Link href="/student/register">
          <Button variant="outline-dark" className="button1 button-h">
            Register
          </Button>
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
