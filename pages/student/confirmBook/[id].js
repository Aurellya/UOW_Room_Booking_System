import { useQuery, useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";
import { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CgCalendarDates } from "react-icons/cg";
import AppContext from "../../../context/AppContext";

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
        capacity
        promo_code
      }
    }
  }
`;

const CART_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      cart {
        id
        booking_slots {
          id
        }
      }
    }
  }
`;

const UPDATE_QUERY = gql`
  mutation UpdateCart($id: ID!, $booking_slots: [ID]) {
    updateCart(
      input: { where: { id: $id }, data: { booking_slots: $booking_slots } }
    ) {
      cart {
        id
        users {
          id
          username
        }
        booking_slots {
          id
        }
      }
    }
  }
`;

const ADD_QUERY = gql`
  mutation CreateCart($users: ID, $booking_slots: [ID]) {
    createCart(
      input: { data: { users: $users, booking_slots: $booking_slots } }
    ) {
      cart {
        id
        users {
          id
          username
        }
        booking_slots {
          id
        }
      }
    }
  }
`;

const confirmBook = () => {
  const [bookingSlotId, setBookingSlotId] = useState("");
  const [prevSlotId, setPrevSlotId] = useState([]);

  const { user, setUser } = useContext(AppContext);
  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    if (user) {
      setUser_id(user.id);
    }
  }, [user]);

  const router = useRouter();
  const [cartId, setCartId] = useState("");
  const [startDate, setStartDate] = useState("");

  const { loading, error, data } = useQuery(GET_ROOM_INFO, {
    variables: { id: router.query.id },
  });

  const { loading: loading2, error: error2, data: data2 } = useQuery(
    CART_QUERY,
    {
      variables: { id: user_id },
    }
  );

  useEffect(() => {
    if (data) {
      setStartDate(new Date(data.bookingSlot.date));
      setBookingSlotId(data.bookingSlot.id);
    }
  }, [data]);

  useEffect(() => {
    if (data2 && data2.user && data2.user.cart) {
      setCartId(data2.user.cart.id);
      let arr = [];
      data2.user.cart.booking_slots.forEach((bs) => {
        arr.push(bs.id);
      });
      if (bookingSlotId != "") {
        arr.push(bookingSlotId);
      }
      setPrevSlotId(arr);
    } else if (data2 && data2.user) {
      setPrevSlotId([bookingSlotId]);
    }
  }, [data2]);

  const [createLink] = useMutation(UPDATE_QUERY, {
    variables: {
      id: cartId,
      booking_slots: prevSlotId,
    },
    refetchQueries: () => [{ query: CART_QUERY, variables: { id: user_id } }],
  });

  const [createLink2] = useMutation(ADD_QUERY, {
    variables: {
      users: user_id,
      booking_slots: prevSlotId,
    },
    refetchQueries: () => [{ query: CART_QUERY, variables: { id: user_id } }],
  });

  function add_to_cart(e) {
    e.preventDefault();

    window.setTimeout(() => {
      if (cartId) {
        createLink();
      } else {
        createLink2();
      }
    }, 0);

    window.setTimeout(() => {
      window.location.href = "/student/dashboard#my_cart";
    }, 0);
  }

  function remove_notif(el) {
    let x = document.getElementById(el);
    x.style.display = "none";
  }

  if (error || error2) return "Error Loading Room";
  if (loading || loading2) return <h1>Loading ...</h1>;

  if (data.bookingSlot && data.bookingSlot.length != 0) {
    const { bookingSlot } = data;

    return (
      <>
        <div
          id="success_msg"
          className="container alert alert-success alert-dismissible fade show mt-5"
          role="alert"
        >
          <strong>Success!</strong> Your Booking successfully added to the cart.
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
          <strong>Invalid Input!</strong> Your Booking cancelled. Check again!
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
          <h3 className="mb-1 ">Room Details [ID: #{bookingSlot.id}]</h3>
          <hr className="mb-4" />
          <form id="launch_room_form">
            <div className="row">
              <div className="col-7">
                <div className="row">
                  <div className="form-group col-4">
                    <label htmlFor="room">Room Number</label>

                    <input
                      type="text"
                      className="form-control"
                      id="room"
                      placeholder="Room"
                      defaultValue={bookingSlot.room.room_no}
                      disabled
                    />
                  </div>
                  <div className="form-group col-4">
                    <label htmlFor="capacity">Capacity</label>
                    <input
                      type="text"
                      className="form-control"
                      id="capacity"
                      placeholder="Capacity"
                      defaultValue={bookingSlot.room.capacity}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-4">
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      placeholder="Price"
                      defaultValue={bookingSlot.price}
                      disabled
                    />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="promo_code">Promo Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="promo_code"
                      placeholder="Promo Code"
                      defaultValue={bookingSlot.room.promo_code}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="date">Date</label>
                    <div className="input-group">
                      <DatePicker
                        className="form-control"
                        selected={startDate}
                        disabled
                      />
                      <div className="input-group-append">
                        <span className="input-group-text" id="date">
                          <CgCalendarDates />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-4">
                    <label htmlFor="time_Start">Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="time_start"
                      placeholder="Start Time"
                      defaultValue={bookingSlot.time_start}
                      disabled
                    />
                  </div>

                  <div className="form-group col-4">
                    <label htmlFor="time_end">End Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="time_end"
                      placeholder="End Time"
                      defaultValue={bookingSlot.time_end}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-5">
                    <label htmlFor="availability">Availability</label>
                    <input
                      type="text"
                      className="form-control"
                      id="availability"
                      placeholder="Availability"
                      defaultValue={
                        bookingSlot.availability ? "Available" : "Not Available"
                      }
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="col-5">
                <div className="border p-4">
                  <h3>Total Price</h3>
                  <hr />
                  <br />
                  <div className="row">
                    <div className="col-8">
                      <ul style={{ listStyleType: "none" }} className="pl-2">
                        <li>Normal Price</li>
                        <br />
                        <li>Promo Code DISCOUNT 3%</li>
                        <li>'{bookingSlot.room.promo_code}'</li>
                      </ul>
                    </div>
                    <div className="col-4 text-right">
                      <ul style={{ listStyleType: "none" }}>
                        <li>${bookingSlot.price}</li>
                        <br />
                        <li style={{ color: "red" }}>
                          - $
                          {parseFloat(
                            ((bookingSlot.price * 3) / 100).toFixed(2)
                          ).toFixed(2)}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <hr />
                  <h5 className="text-right">
                    $
                    {parseFloat(
                      (
                        bookingSlot.price -
                        ((bookingSlot.price * 3) / 100).toFixed(2)
                      ).toFixed(2)
                    )}
                  </h5>
                  <br />
                  <br />
                  <button
                    type="submit"
                    className="btn filter-btn-sm mt-3"
                    onClick={(e) => add_to_cart(e)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
  return <h1>Not Found</h1>;
};

export default confirmBook;
