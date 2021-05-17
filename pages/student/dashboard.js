import RoomList from "../../components/RoomList";
import React, { useState, useContext } from "react";
import AvailableRoom from "../../components/AvailableRoom";
import BookedRoom from "../../components/BookedRoom";
import History from "../../components/History";
import ActiveBooking from "../../components/ActiveBooking";
import MyCart from "../../components/MyCart";

function dashboard(props) {
  const [query, updateQuery] = useState("");

  const ids = ["availableroom", "my_cart", "active_booking", "history"];

  function filter_cat(id) {
    var x;

    for (x in ids) {
      if (ids[x] != id) {
        document.getElementById(ids[x]).style.display = "none";
      } else {
        document.getElementById(ids[x]).style.display = "block";
      }
    }
  }

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
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
            onClick={() => filter_cat("my_cart")}
          >
            <div className="w-100 d-flex flex-column h-100 text-white text-shadow-1 text-center">
              <h3 className="display-6 lh-1 fw-bold my-auto">My Cart</h3>
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

      <div id="availableroom" className="mb-5">
        <AvailableRoom search={query} btnText="Book" staff=""></AvailableRoom>
      </div>

      <div id="my_cart" className="mb-5">
        <MyCart />
      </div>

      <div id="active_booking" className="mb-5">
        <ActiveBooking />
      </div>

      <div id="history" className="mb-5">
        <History />
      </div>
    </div>
  );
}

export default dashboard;
