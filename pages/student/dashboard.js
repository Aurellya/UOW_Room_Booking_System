// import React from "react";
import RoomList from "../../components/RoomList";
import React, { useState, useContext } from "react";
import AvailableRoom from "../../components/AvailableRoom";
import BookedRoom from "../../components/BookedRoom";
// import AppContext from "../../context/AppContext";

function dashboard(props) {
  // const { user, setUser } = useContext(AppContext);
  const [query, updateQuery] = useState("");

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        {/* available room */}
        <h1 className="h2">Available Room</h1>
      </div>
      <br />
      <AvailableRoom search={query} btnText="Book"></AvailableRoom>
      <br />
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        {/* my cart */}
        <h1 className="h2">My Booked Room</h1>
      </div>
      <br />
      <h2 className="mb-2">None</h2>
      {/* <BookedRoom search={query}></BookedRoom> */}
      <br />
    </div>
  );
}

export default dashboard;
