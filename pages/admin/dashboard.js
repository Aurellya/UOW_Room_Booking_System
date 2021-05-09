import React, { useState, useContext } from "react";
import AvailableRoom from "../../components/AvailableRoom";
import BookedRoomAdmin from "../../components/BookedRoomAdmin";
import RoomList from "../../components/RoomList";
// import AppContext from "../../context/AppContext";

function dashboard(props) {
  // const { user, setUser } = useContext(AppContext);
  const [query, updateQuery] = useState("");

  const ids = ["roomlist", "availableroom", "bookedroom"];

  function filter_cat(id) {
    var x;

    if (id == "all") {
      for (x in ids) {
        document.getElementById(ids[x]).style.display = "block";
      }
    } else {
      for (x in ids) {
        if (ids[x] != id) {
          document.getElementById(ids[x]).style.display = "none";
        } else {
          document.getElementById(ids[x]).style.display = "block";
        }
      }
    }
  }

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
            onClick={() => filter_cat("roomlist")}
          >
            <div className="w-100 d-flex flex-column h-100 text-white text-shadow-1 text-center">
              <h3 className="display-6 lh-1 fw-bold my-auto">Room List</h3>
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
            onClick={() => filter_cat("bookedroom")}
          >
            <div className="w-100 d-flex flex-column h-100 text-white text-shadow-1 text-center">
              <h3 className="display-6 lh-1 fw-bold my-auto">Booked Room</h3>
            </div>
          </button>
        </div>
      </div>

      <div id="roomlist" className="mb-5">
        <RoomList search={query}></RoomList>
      </div>

      <div id="availableroom" className="mb-5">
        <AvailableRoom search={query}></AvailableRoom>
      </div>

      <div id="bookedroom">
        <BookedRoomAdmin search={query}></BookedRoomAdmin>
      </div>
    </div>
  );
}

export default dashboard;
