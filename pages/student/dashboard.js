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
      <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
        <div className="col">
          <button
            className="btn-filter w-100 card card-cover overflow-hidden text-white rounded-5 shadow-lg"
            onClick={() => filter_cat("all")}
          >
            <div className="w-100 d-flex flex-column h-100 text-white text-shadow-1 text-center">
              <h3 className="display-6 lh-1 fw-bold my-auto">Show All</h3>
            </div>
          </button>
        </div>

        <div className="col">
          <button
            className="btn-filter w-100 card card-cover overflow-hidden text-white rounded-5 shadow-lg"
            onClick={() => filter_cat("availableroom")}
          >
            <div className="w-100 d-flex flex-column h-100 text-white text-shadow-1 text-center">
              <h3 className="display-6 lh-1 fw-bold my-auto">Available Room</h3>
            </div>
          </button>
        </div>

        <div className="col">
          <button
            className="btn-filter w-100 card card-cover overflow-hidden text-white rounded-5 shadow-lg"
            onClick={() => filter_cat("active_booking")}
          >
            <div className="w-100 d-flex flex-column h-100 text-white text-shadow-1 text-center">
              <h3 className="display-6 lh-1 fw-bold my-auto">Active Booking</h3>
            </div>
          </button>
        </div>

        <div className="col">
          <button
            className="btn-filter w-100 card card-cover overflow-hidden text-white rounded-5 shadow-lg"
            onClick={() => filter_cat("history")}
          >
            <div className="w-100 d-flex flex-column h-100 text-white text-shadow-1 text-center">
              <h3 className="display-6 lh-1 fw-bold my-auto">History</h3>
            </div>
          </button>
        </div>
      </div>
      <div id="roomlist" className="mb-5">
        <AvailableRoom search={query} btnText="Book" staff=""></AvailableRoom>
      </div>

      <div id="bookedroom">
        <h1 className="h2">My Booked Room</h1>
        <hr />
        <h2 className="mb-5">None</h2>
      </div>
    </div>
  );
}

export default dashboard;
