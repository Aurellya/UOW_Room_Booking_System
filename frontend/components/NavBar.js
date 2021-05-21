import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { BiBookReader } from "react-icons/bi";
import { useContext, useState, useEffect } from "react";
import { logout } from "../lib/auth";
import AppContext from "../context/AppContext";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const UPDATE_QUERY = gql`
  mutation UpdateUser($id: ID!, $last_logout: DateTime) {
    updateUser(
      input: { where: { id: $id }, data: { last_logout: $last_logout } }
    ) {
      user {
        id
        username
        last_logout
      }
    }
  }
`;

export default function NavBar(props) {
  const { user, setUser } = useContext(AppContext);
  const [id, setId] = useState("");

  const [createLink] = useMutation(UPDATE_QUERY, {
    variables: {
      id: id,
      last_logout: new Date(),
    },
  });

  useEffect(() => {
    if (props.user) {
      setId(props.user.id);
    }
  }, [props]);

  var role = "";
  var profile = "";
  if (props.user) {
    if (props.user.role.name == "Authenticated") {
      role = "admin";
      profile = "adminProfile";
    } else if (props.user.role.name == "Student") {
      role = "student";
      profile = "studentProfile";
    } else if (props.user.role.name == "User_admin") {
      role = "user_admin";
      profile = "userAdminProfile";
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
                onClick={(e) => {
                  e.preventDefault();

                  if (id) {
                    logout();
                    createLink();
                    setUser(null);
                  }
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
            <Nav.Link href="/login">
              <Button variant="outline-dark" className="button1 button-h">
                Sign In
              </Button>
            </Nav.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
