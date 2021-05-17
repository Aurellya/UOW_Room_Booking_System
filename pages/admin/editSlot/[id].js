import { useQuery, useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CgCalendarDates } from "react-icons/cg";

const GET_ROOM_INFO = gql`
  query BookingSlot($id: ID!) {
    bookingSlot(id: $id) {
      id
      date
      time_start
      time_end
      price
      availability
      room {
        id
        room_no
        block
        capacity
        promo_code
      }
    }
  }
`;

const QUERY = gql`
  {
    rooms(sort: "room_no") {
      id
      room_no
    }
  }
`;

const UPDATE_QUERY = gql`
  mutation UpdateBookingSlot(
    $id: ID!
    $room: ID
    $price: Float
    $date: Date
    $time_start: Time
    $time_end: Time
  ) {
    updateBookingSlot(
      input: {
        where: { id: $id }
        data: {
          room: $room
          price: $price
          date: $date
          time_start: $time_start
          time_end: $time_end
        }
      }
    ) {
      bookingSlot {
        id
        date
        time_start
        time_end
        price
        availability
        room {
          id
          room_no
        }
      }
    }
  }
`;

const editSlot = () => {
  const router = useRouter();

  function useDidMount() {
    const [didMount, setDidMount] = useState(false);
    useEffect(() => {
      setDidMount(true);
    }, []);

    return didMount;
  }

  const didMount = useDidMount();

  const [formState, setFormState] = useState(0);
  const [startDate, setStartDate] = useState("");

  const [createLink] = useMutation(UPDATE_QUERY, {
    variables: {
      id: router.query.id,
      room: formState.room,
      price: formState.price,
      date: formState.date,
      time_start: formState.time_start,
      time_end: formState.time_end,
    },
  });

  useEffect(() => {
    if (didMount) {
      createLink();
      document.getElementById("launch_room_form").reset();
      setStartDate("");
      var ele = document.getElementById("success_msg");
      ele.style.display = "block";
    }
  }, [formState]);

  const { loading, error, data } = useQuery(GET_ROOM_INFO, {
    variables: { id: router.query.id },
  });

  useEffect(() => {
    if (data) {
      setStartDate(new Date(data.bookingSlot.date));
    }
  }, [data]);

  const { loading: loading2, error: error2, data: data2 } = useQuery(QUERY);

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

  function updateRoom(e) {
    e.preventDefault();

    var room = document.getElementById("room").value.trim();
    var price = document.getElementById("price").value.trim();
    var date = clean_date(startDate);

    var time_start = document.getElementById("time_start").value.trim();
    if (time_start.slice(-4) != ".000") {
      time_start += ":00.000";
    }

    var time_end = document.getElementById("time_end").value.trim();
    if (time_end.slice(-4) != ".000") {
      time_end += ":00.000";
    }

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
      });
    }
  }

  function remove_notif(el) {
    let x = document.getElementById(el);
    x.style.display = "none";
  }

  if (error || error2) return "Error Loading Room";
  if (loading || loading2) return <h1>Loading ...</h1>;

  if (data2.rooms && data2.rooms.length && data.bookingSlot) {
    const { bookingSlot } = data;

    var searchQuery = data2.rooms.filter((query) =>
      query.room_no.toUpperCase().includes("")
    );

    if (searchQuery.length != 0) {
      return (
        <>
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
            <h4 className="mb-1 ">Update Slot [ID: #{bookingSlot.id}]</h4>
            <hr className="mb-4" />
            <form id="launch_room_form">
              0
              <div className="row">
                <div className="form-group col-3">
                  <label htmlFor="room">Room Number</label>
                  <select
                    className="form-control"
                    id="room"
                    defaultValue={bookingSlot.room.room_no}
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
                    defaultValue={bookingSlot.price}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-3">
                  <label htmlFor="date">Date</label>
                  <div className="input-group">
                    <DatePicker
                      className="form-control"
                      minDate={new Date()}
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
                  <label htmlFor="time_Start">Start Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="time_start"
                    placeholder="Start Time"
                    defaultValue={bookingSlot.time_start}
                  />
                </div>

                <div className="form-group col-3">
                  <label htmlFor="time_end">End Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="time_end"
                    placeholder="End Time"
                    defaultValue={bookingSlot.time_end}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn filter-btn-sm mt-3"
                  onClick={(e) => updateRoom(e)}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </>
      );
    }
  }
  return <h1>Not Found</h1>;
};

export default editSlot;
