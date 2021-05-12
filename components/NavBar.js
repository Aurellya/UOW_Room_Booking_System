import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { BiBookReader } from "react-icons/bi";
import { useContext } from "react";
import { logout } from "../lib/auth";
import AppContext from "../context/AppContext";

export default function NavBar(props) {
  const { user, setUser } = useContext(AppContext);

  var role = "";
  var profile = "";
  if (props.user) {
    if (props.user.role.name == "Authenticated") {
      role = "admin";
      profile = "adminProfile";
    } else if (props.user.role.name == "Student") {
      role = "student";
      profile = "studentProfile";
    } else {
      role = "public";
    }
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="rounded-3 border shadow-sm"
    >
      <Navbar.Brand href={props.user ? `/${role}/dashboard` : "/"}>
        <BiBookReader size={32} />
        <span className="ml-2">
          <b>UOW Room Booking System</b>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        {props.user ? (
          <>
            <Nav.Link className="ml-auto" href={`/${role}/${profile}`}>
              <span className="username_nav">{props.user.username}</span>
            </Nav.Link>
            <Nav.Link>
              <Button
                variant="outline-dark"
                onClick={() => {
                  logout();
                  setUser(null);
                }}
                className="button1 button-h"
              >
                Logout
              </Button>
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/guides">Guides</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
            <Nav.Link href="/student/register">
              <Button variant="outline-dark" className="button1 button-h">
                Register
              </Button>
            </Nav.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
