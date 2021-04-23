import NavBar from "./NavBar";
import Footer from "./Footer";
import React, { useContext } from "react";
import AppContext from "../context/AppContext";

const Layout = (props) => {
  const { user, setUser } = useContext(AppContext);

  return (
    <div>
      <NavBar user={user} />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
