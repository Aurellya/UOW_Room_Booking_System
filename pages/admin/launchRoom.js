import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CgCalendarDates } from "react-icons/cg";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Head from "next/head";

const QUERY = gql`
  {
    rooms(sort: "room_no") {
      id
      room_no
    }
  }
`;

const QUERY2 = gql`
  mutation CreateBookingSlot(
    $room: ID!
    $price: Float
    $date: Date
    $time_start: Time
    $time_end: Time
    $availability: Boolean
  ) {
    createBookingSlot(
      input: {
        data: {
          room: $room
          price: $price
          date: $date
          time_start: $time_start
          time_end: $time_end
          availability: $availability
        }
      }
    ) {
      bookingSlot {
        id
        date
        time_start
        time_end
        availability
        price
        room {
          room_no
        }
      }
    }
  }
`;

const launchRoom = () => {
  function useDidMount() {
    const [didMount, setDidMount] = useState(false);
    useEffect(() => {
      setDidMount(true);
    }, []);

    return didMount;
  }
  const didMount = useDidMount();

  const [startDate, setStartDate] = useState("");
  const [formState, setFormState] = useState(0);

  useEffect(() => {
    if (didMount) {
      createLink();
      document.getElementById("launch_room_form").reset();
      setStartDate("");
      var ele = document.getElementById("success_msg");
      ele.style.display = "block";
    }
  }, [formState]);

  const [createLink] = useMutation(QUERY2, {
    variables: {
      room: formState.room,
      price: formState.price,
      date: formState.date,
      time_start: formState.time_start,
      time_end: formState.time_end,
      availability: formState.availability,
    },
  });

  function clean_date(start_date) {
    if (start_date != null) {
      let months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      };
      let dates = start_date.toString().split(" ");
      var full_date = dates[3] + "-" + months[dates[1]] + "-" + dates[2];
    }
    let y = start_date ? full_date : 0;
    return y;
  }

  function addingRoom(e) {
    e.preventDefault();

    var room = document.getElementById("room").value.trim();
    var price = document.getElementById("price").value.trim();
    var date = clean_date(startDate);
    var time_start =
      document.getElementById("time_start").value.trim() + ":00.000";
    var time_end = document.getElementById("time_end").value.trim() + ":00.000";

    // check input
    if (
      room == "" ||
      isNaN(price) ||
      price == "" ||
      date == 0 ||
      time_start == ":00.000" ||
      time_end == ":00.000"
    ) {
      let ele = document.getElementById("warning_msg");
      ele.style.display = "block";
      return false;
    } else {
      setFormState({
        room: room,
        price: parseFloat(price),
        date: date,
        time_start: time_start,
        time_end: time_end,
        availability: true,
      });
    }
  }

  function remove_notif(el) {
    let x = document.getElementById(el);
    x.style.display = "none";
  }

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
          <Head>
            <title>Launch Room | UOW Room Booking System</title>
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <div
            id="success_msg"
            className="container alert alert-success alert-dismissible fade show mt-5"
            role="alert"
          >
            <strong>Success!</strong> The data successfully added to the
            database.
            <button
              type="button"
              className="close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => remove_notif("success_msg")}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div
            id="warning_msg"
            className="container alert alert-danger alert-dismissible fade show mt-5"
            role="alert"
          >
            <strong>Invalid Input!</strong> Your submission cancelled. Check
            again!
            <button
              type="button"
              className="close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => remove_notif("warning_msg")}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="container col-xxl-8 px-5 py-5 my-5 rounded-3 border shadow">
            <h4 className="mb-1 ">Launch Room</h4>
            <hr className="mb-4" />
            <form id="launch_room_form">
              <div className="row">
                <div className="form-group col-3">
                  <label htmlFor="room">Room Number</label>
                  <select
                    className="form-control"
                    id="room"
                    defaultValue="DEFAULT"
                  >
                    <option value="DEFAULT" disabled>
                      Room Number
                    </option>

                    {searchQuery.map((res) => (
                      <option value={res.id} key={res.id}>
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
                      minDate={new Date()}
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
                  <label htmlFor="time_Start">Start Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="time_start"
                    placeholder="Start Time"
                  />
                </div>

                <div className="form-group col-3">
                  <label htmlFor="time_end">End Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="time_end"
                    placeholder="End Time"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn filter-btn-sm mt-3"
                  onClick={(e) => addingRoom(e)}
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
