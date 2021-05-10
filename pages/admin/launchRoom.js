import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CgCalendarDates } from "react-icons/cg";
import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const QUERY = gql`
  {
    rooms(sort: "room_no") {
      id
      room_no
    }
  }
`;

const launchRoom = () => {
  const [startDate, setStartDate] = useState("");
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "Error loading rooms";
  if (loading) return <h1 className="text-center my-4">Fetching...</h1>;

  if (data.rooms && data.rooms.length) {
    var searchQuery = data.rooms.filter((query) =>
      query.room_no.toUpperCase().includes("")
    );

    if (searchQuery.length != 0) {
      return (
        <>
          <div className="container col-xxl-8 px-5 py-5 my-5 rounded-3 border shadow">
            <h4 className="mb-1 ">Launch Room</h4>
            <hr className="mb-4" />
            <form>
              <div className="row">
                <div className="form-group col-3">
                  <label htmlFor="block">Room Number</label>
                  <select
                    className="form-control"
                    id="room_no"
                    defaultValue="DEFAULT"
                  >
                    <option value="DEFAULT" disabled>
                      Room Number
                    </option>

                    {searchQuery.map((res) => (
                      <option value={res.room_no} key={res.id}>
                        {res.room_no}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-3">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Price"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-3">
                  <label htmlFor="date">Date</label>
                  <div className="input-group">
                    <DatePicker
                      className="form-control"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text" id="date">
                        <CgCalendarDates />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group col-3">
                  <label htmlFor="start_time">Start Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="start_time"
                    placeholder="Start Time"
                  />
                </div>

                <div className="form-group col-3">
                  <label htmlFor="end_date">End Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="end_time"
                    placeholder="End Time"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn filter-btn-sm mt-3"
                  onClick={(e) => alert("test")}
                >
                  Launch
                </button>
              </div>
            </form>
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <h1 className="text-center my-4">
          Fetching Data Unsuccessfully. <br />
          Refresh the page or Come back later!
        </h1>
      </>
    );
  }
};

export default launchRoom;
